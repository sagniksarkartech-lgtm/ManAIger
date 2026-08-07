"""
gemini_service.py
=================
Reusable service layer for interacting with Google's Gemini API.

Design Principles
-----------------
- Single Responsibility Principle (SOLID-S):
    Encapsulates all HTTP communication, prompt construction, JSON parsing,
    validation, and error handling related to Gemini API calls.

- Dependency Inversion Principle (SOLID-D):
    Agents depend on this service abstraction rather than implementing
    low-level API request logic directly.

- Async Non-blocking I/O:
    Uses async HTTP requests to maintain high backend throughput under load.
"""

import json
import logging
import re
from typing import Any, Dict, Optional
import httpx

from app.config import settings

logger = logging.getLogger(__name__)

VALID_CATEGORIES = {"Refund", "Complaint", "Inquiry", "Payment", "Technical Support", "General"}
VALID_PRIORITIES = {"Low", "Medium", "High", "Critical"}
VALID_SENTIMENTS = {"Positive", "Neutral", "Negative"}

SYSTEM_PROMPT = """You are an expert Enterprise Customer Support Analyst for MANAIGER AI platform.
Analyze the provided email payload thoroughly and provide a structured classification and response recommendation.

CRITICAL INSTRUCTIONS:
1. You MUST respond with ONLY a single valid JSON object.
2. Do NOT include markdown code blocks, backticks (```json), or any conversational intro/outro text.
3. The JSON object MUST strictly contain the following keys:
   - "summary": A concise 1-2 sentence summary of the email content.
   - "category": Must be exactly one of: "Refund", "Complaint", "Inquiry", "Payment", "Technical Support", "General".
   - "priority": Must be exactly one of: "Low", "Medium", "High", "Critical".
   - "sentiment": Must be exactly one of: "Positive", "Neutral", "Negative".
   - "suggested_reply": A professional, empathetic, and context-aware draft response ready for human review.

Required JSON Structure:
{
  "summary": "...",
  "category": "Inquiry",
  "priority": "Medium",
  "sentiment": "Neutral",
  "suggested_reply": "..."
}"""


class GeminiService:
    """
    Service responsible for querying Google's Gemini API and returning validated JSON data.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model_name = "gemini-1.5-flash"
        self.endpoint_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent"

    async def analyze_email(self, content: str, subject: Optional[str] = None, sender: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Sends email content to Gemini API and parses the structured JSON analysis.

        Parameters
        ----------
        content : str
            Body content of the email.
        subject : Optional[str]
            Subject line of the email.
        sender : Optional[str]
            Sender address or name.

        Returns
        -------
        Optional[Dict[str, Any]]
            Validated JSON dictionary if successful, or None if validation/API call fails.
        """
        if not self.api_key or self.api_key == "YOUR_API_KEY":
            logger.error("GeminiService: GEMINI_API_KEY is not configured in .env file.")
            return None

        # Build prompt payload
        user_prompt = f"EMAIL PAYLOAD:\nSender: {sender or 'Unknown'}\nSubject: {subject or 'No Subject'}\nContent:\n{content}"

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{SYSTEM_PROMPT}\n\n{user_prompt}"}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json"
            }
        }

        headers = {
            "Content-Type": "application/json"
        }

        params = {
            "key": self.api_key
        }

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(self.endpoint_url, json=payload, headers=headers, params=params)
                
                if response.status_code != 200:
                    logger.error(f"Gemini API error (HTTP {response.status_code}): {response.text}")
                    return None

                response_data = response.json()
                
                # Extract text output from Gemini response structure
                candidates = response_data.get("candidates", [])
                if not candidates:
                    logger.error("Gemini Service: Empty candidates list returned from API.")
                    return None

                parts = candidates[0].get("content", {}).get("parts", [])
                if not parts:
                    logger.error("Gemini Service: Missing text parts in candidate response.")
                    return None

                raw_text = parts[0].get("text", "").strip()
                return self._clean_and_validate_json(raw_text)

        except httpx.TimeoutException:
            logger.error("Gemini Service: Request timed out while connecting to Gemini API.")
            return None
        except httpx.RequestError as exc:
            logger.error(f"Gemini Service: HTTP request error occurred: {exc}")
            return None
        except Exception as exc:
            logger.exception(f"Gemini Service: Unexpected error during API call: {exc}")
            return None

    def _clean_and_validate_json(self, raw_text: str) -> Optional[Dict[str, Any]]:
        """
        Cleans markdown code fences and validates required schema keys and enum values.
        """
        try:
            # Strip markdown ```json ... ``` wrappers if present
            cleaned_text = re.sub(r"^```(?:json)?\s*", "", raw_text, flags=re.MULTILINE)
            cleaned_text = re.sub(r"\s*```$", "", cleaned_text, flags=re.MULTILINE).strip()

            parsed_data = json.loads(cleaned_text)

            if not isinstance(parsed_data, dict):
                logger.error("Gemini Service Validation Error: Output is not a JSON object.")
                return None

            # Verify required keys
            required_keys = {"summary", "category", "priority", "sentiment", "suggested_reply"}
            if not required_keys.issubset(parsed_data.keys()):
                missing = required_keys - set(parsed_data.keys())
                logger.error(f"Gemini Service Validation Error: Missing required JSON keys {missing}")
                return None

            # Normalize and sanitize enum values
            category = str(parsed_data.get("category")).title()
            priority = str(parsed_data.get("priority")).title()
            sentiment = str(parsed_data.get("sentiment")).title()

            if category not in VALID_CATEGORIES:
                logger.warning(f"Gemini Service: Unrecognized category '{category}', defaulting to 'General'")
                parsed_data["category"] = "General"
            else:
                parsed_data["category"] = category

            if priority not in VALID_PRIORITIES:
                logger.warning(f"Gemini Service: Unrecognized priority '{priority}', defaulting to 'Medium'")
                parsed_data["priority"] = "Medium"
            else:
                parsed_data["priority"] = priority

            if sentiment not in VALID_SENTIMENTS:
                logger.warning(f"Gemini Service: Unrecognized sentiment '{sentiment}', defaulting to 'Neutral'")
                parsed_data["sentiment"] = "Neutral"
            else:
                parsed_data["sentiment"] = sentiment

            return parsed_data

        except json.JSONDecodeError as exc:
            logger.error(f"Gemini Service Validation Error: Invalid JSON output from Gemini: {exc}")
            return None
