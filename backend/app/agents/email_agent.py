"""
email_agent.py
==============
Concrete AI agent responsible for email-related processing tasks.
Integrates Google's Gemini API via GeminiService.

Design Principles
-----------------
- Single Responsibility Principle (SOLID-S):
    Focuses on orchestrating email-specific AI analysis using GeminiService.

- Open/Closed Principle (SOLID-O):
    Extends BaseAgent without modifying the core agent interface contract.

- Dependency Injection (SOLID-D):
    Accepts an injected instance of GeminiService or instantiates default service.
"""

import asyncio
import logging
from typing import Any, Dict, Optional

from .base_agent import BaseAgent
from app.services.gemini_service import GeminiService

logger = logging.getLogger(__name__)


class EmailAgent(BaseAgent):
    """
    Intelligent Email Agent powered by Google's Gemini API.
    Performs NLP intent analysis, categorization, sentiment analysis, priority scoring,
    and suggested reply generation for enterprise customer emails.
    """

    def __init__(self, gemini_service: Optional[GeminiService] = None):
        self._gemini_service = gemini_service or GeminiService()

    @property
    def name(self) -> str:
        """Unique identifier for the agent."""
        return "EmailAgent"

    @property
    def description(self) -> str:
        """One-line description surfaced in the AgentRegistry catalogue."""
        return (
            "Processes inbound email payloads using Gemini AI: intent classification, "
            "category assignment, sentiment detection, priority scoring, and reply generation."
        )

    async def process_async(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Asynchronous processing method that queries GeminiService for intelligent analysis.

        Parameters
        ----------
        data : Dict[str, Any]
            Expected payload keys:
              - "content" : str  – raw body content of the email
              - "subject" : str  – email subject line (optional)
              - "sender"  : str  – sender address or name (optional)

        Returns
        -------
        Dict[str, Any]
            Analyzed email result or failure error structure if validation fails.
        """
        content: Optional[str] = data.get("content")
        subject: Optional[str] = data.get("subject")
        sender: Optional[str] = data.get("sender")

        if not content or not str(content).strip():
            logger.warning("EmailAgent: Empty email content provided.")
            return {
                "success": False,
                "error": "Invalid AI response"
            }

        try:
            # Query GeminiService asynchronously
            analysis_result = await self._gemini_service.analyze_email(
                email_text=content,
                subject=subject,
                sender=sender
            )

            # If GeminiService failed or returned invalid JSON
            if not analysis_result:
                logger.error("EmailAgent: GeminiService returned None or invalid JSON response.")
                return {
                    "success": False,
                    "error": "Invalid AI response"
                }

            # Return structured success response
            return {
                "agent": self.name,
                "status": "success",
                "summary": analysis_result["summary"],
                "category": analysis_result["category"],
                "priority": analysis_result["priority"],
                "sentiment": analysis_result["sentiment"],
                "suggested_reply": analysis_result["suggested_reply"]
            }

        except Exception as exc:
            logger.exception(f"EmailAgent: Exception during process execution: {exc}")
            return {
                "success": False,
                "error": "Invalid AI response"
            }

    def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synchronous wrapper for BaseAgent contract compatibility.
        """
        try:
            try:
                loop = asyncio.get_running_loop()
            except RuntimeError:
                loop = None

            if loop and loop.is_running():
                # If running inside existing event loop, schedule task safely
                import nest_asyncio
                nest_asyncio.apply()
                return loop.run_until_complete(self.process_async(data))
            else:
                return asyncio.run(self.process_async(data))
        except Exception as exc:
            logger.error(f"EmailAgent sync wrapper error: {exc}")
            return {
                "success": False,
                "error": "Invalid AI response"
            }
