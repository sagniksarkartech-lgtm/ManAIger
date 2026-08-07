"""
gemini_service.py
=================
Reusable service layer for interacting with Google's Gemini API using the official google-genai SDK.

Design Principles
-----------------
- Single Responsibility Principle (SOLID-S):
    Encapsulates all Google Gemini SDK interactions, prompt construction, structured JSON parsing,
    schema validation, error handling, and logging.

- Dependency Inversion Principle (SOLID-D):
    Agents and API endpoints depend on this service abstraction rather than implementing
    low-level SDK or HTTP requests directly.

- Async Non-blocking I/O:
    Uses async client calls (client.aio.models.generate_content) to maintain backend throughput.
"""

import json
import logging
import re
from typing import Any, Dict, Optional

try:
    from google import genai
    from google.genai import types
    from google.genai.errors import APIError
    HAS_GENAI_SDK = True
except ImportError:
    genai = None
    types = None
    APIError = Exception
    HAS_GENAI_SDK = False

import httpx
from app.config import settings

logger = logging.getLogger(__name__)

# Enforced enum validations for structured analysis
VALID_CATEGORIES = {"Refund", "Complaint", "Inquiry", "Payment", "Technical Support", "General"}
VALID_PRIORITIES = {"Low", "Medium", "High", "Critical"}
VALID_SENTIMENTS = {"Positive", "Neutral", "Negative"}

SYSTEM_INSTRUCTION = """You are an expert Enterprise Customer Support Analyst for MANAIGER AI platform.
Analyze the provided email text thoroughly and output ONLY a single valid JSON object.

CRITICAL REQUIREMENTS:
1. Do NOT include markdown formatting, backticks (```json), or introductory/explanatory text.
2. Output strictly a single JSON object with exact keys:
   - "summary": A concise 1-2 sentence summary of the email.
   - "category": Must be one of ["Refund", "Complaint", "Inquiry", "Payment", "Technical Support", "General"].
   - "priority": Must be one of ["Low", "Medium", "High", "Critical"].
   - "sentiment": Must be one of ["Positive", "Neutral", "Negative"].
   - "suggested_reply": A empathetic, professional, context-aware draft reply.

Example JSON output:
{
  "summary": "Customer is asking about refund policy for subscription.",
  "category": "Refund",
  "priority": "High",
  "sentiment": "Negative",
  "suggested_reply": "Dear Customer, thank you for reaching out..."
}"""


class GeminiService:
    """
    Reusable service for querying Google's Gemini API (Gemini 2.5 Flash) via official google-genai SDK.
    Reads API key from .env (via settings.GEMINI_API_KEY) and returns structured JSON.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: str = "gemini-2.0-flash"):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model_name = model_name
        self._client = None

        if HAS_GENAI_SDK and self.api_key and self.api_key != "YOUR_API_KEY":
            try:
                self._client = genai.Client(api_key=self.api_key)
                logger.info(f"GeminiService initialized with model {self.model_name} via google-genai SDK.")
            except Exception as exc:
                logger.error(f"GeminiService: Failed to initialize genai.Client: {exc}")

    async def analyze_email(self, email_text: str, subject: Optional[str] = None, sender: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Asynchronously sends email text to Gemini 2.5 Flash and returns structured JSON.

        Parameters
        ----------
        email_text : str
            The raw text/body of the email to analyze.
        subject : Optional[str]
            Optional subject line.
        sender : Optional[str]
            Optional sender name/address.

        Returns
        -------
        Optional[Dict[str, Any]]
            Structured JSON dictionary if analysis succeeds, or None if API/validation fails.
        """
        if not email_text or not str(email_text).strip():
            logger.warning("GeminiService: Provided email_text is empty.")
            return None

        if not self.api_key or self.api_key == "YOUR_API_KEY":
            logger.error("GeminiService: GEMINI_API_KEY is not configured in .env file.")
            return None

        # Build prompt payload
        prompt_content = f"EMAIL TEXT TO ANALYZE:\n"
        if sender:
            prompt_content += f"Sender: {sender}\n"
        if subject:
            prompt_content += f"Subject: {subject}\n"
        prompt_content += f"Content:\n{email_text}"

        # 1. Try official google-genai SDK if available
        if HAS_GENAI_SDK and self._client:
            models_to_try = [self.model_name]
            for fallback in ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]:
                if fallback not in models_to_try:
                    models_to_try.append(fallback)

            for target_model in models_to_try:
                try:
                    logger.info(f"Sending async request to Gemini API ({target_model}) via google-genai SDK...")
                    config = types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                        temperature=0.2,
                        response_mime_type="application/json"
                    )
                    
                    response = await self._client.aio.models.generate_content(
                        model=target_model,
                        contents=prompt_content,
                        config=config
                    )

                    if response and response.text:
                        validated = self._clean_and_validate_json(response.text)
                        if validated:
                            return validated

                except APIError as exc:
                    logger.error(f"GeminiService APIError via SDK ({target_model}): {exc}")
                except Exception as exc:
                    logger.exception(f"GeminiService unexpected error via SDK ({target_model}): {exc}")

        # 2. Fallback REST HTTP client if SDK is initializing or fallback needed
        return await self._fallback_rest_analyze(prompt_content)

    async def _fallback_rest_analyze(self, prompt_content: str) -> Optional[Dict[str, Any]]:
        """
        Fallback REST call using httpx if google-genai SDK is unavailable or loading.
        """
        endpoint_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent"
        payload = {
            "contents": [{"parts": [{"text": f"{SYSTEM_INSTRUCTION}\n\n{prompt_content}"}]}],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json"
            }
        }
        params = {"key": self.api_key}

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(endpoint_url, json=payload, params=params)
                if response.status_code != 200:
                    logger.error(f"GeminiService REST API Error (HTTP {response.status_code}): {response.text}")
                    return None
                
                res_json = response.json()
                candidates = res_json.get("candidates", [])
                if not candidates:
                    logger.error("GeminiService: REST response candidates list is empty.")
                    return None

                parts = candidates[0].get("content", {}).get("parts", [])
                if not parts:
                    logger.error("GeminiService: REST response missing content parts.")
                    return None

                raw_text = parts[0].get("text", "").strip()
                return self._clean_and_validate_json(raw_text)

        except Exception as exc:
            logger.exception(f"GeminiService REST fallback error: {exc}")
            return None

    def _clean_and_validate_json(self, raw_text: str) -> Optional[Dict[str, Any]]:
        """
        Cleans markdown code fences and validates required JSON schema keys and enum constraints.
        """
        try:
            # Strip markdown ```json ... ``` code block markers if present
            cleaned_text = re.sub(r"^```(?:json)?\s*", "", raw_text, flags=re.MULTILINE)
            cleaned_text = re.sub(r"\s*```$", "", cleaned_text, flags=re.MULTILINE).strip()

            parsed_data = json.loads(cleaned_text)

            if not isinstance(parsed_data, dict):
                logger.error("GeminiService Invalid JSON: Output is not a dictionary object.")
                return None

            # Verify required schema format keys
            required_keys = {"summary", "category", "priority", "sentiment", "suggested_reply"}
            if not required_keys.issubset(parsed_data.keys()):
                missing = required_keys - set(parsed_data.keys())
                logger.error(f"GeminiService Schema Error: Missing required JSON keys: {missing}")
                return None

            # Normalize enum values
            category = str(parsed_data.get("category", "")).title()
            priority = str(parsed_data.get("priority", "")).title()
            sentiment = str(parsed_data.get("sentiment", "")).title()

            parsed_data["category"] = category if category in VALID_CATEGORIES else "General"
            parsed_data["priority"] = priority if priority in VALID_PRIORITIES else "Medium"
            parsed_data["sentiment"] = sentiment if sentiment in VALID_SENTIMENTS else "Neutral"
            parsed_data["summary"] = str(parsed_data.get("summary", "")).strip()
            parsed_data["suggested_reply"] = str(parsed_data.get("suggested_reply", "")).strip()

            logger.info("GeminiService: Successfully parsed and validated email analysis JSON.")
            return parsed_data

        except json.JSONDecodeError as exc:
            logger.error(f"GeminiService Invalid JSON Error: Failed to parse Gemini response: {exc}")
            return None
        except Exception as exc:
            logger.exception(f"GeminiService unexpected validation error: {exc}")
            return None
