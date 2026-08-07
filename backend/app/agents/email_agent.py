"""
email_agent.py
==============
Concrete AI agent responsible for email-related processing tasks.
Integrates Google's Gemini API via GeminiService.

Design Principles
-----------------
- Single Responsibility Principle (SOLID-S):
    Focuses solely on orchestrating email-specific AI analysis using GeminiService.
    Does not know about HTTP, routing, or response serialisation.

- Open/Closed Principle (SOLID-O):
    Extends BaseAgent without modifying the core agent interface contract.

- Dependency Injection (SOLID-D):
    Accepts an injected GeminiService instance or instantiates a default one.
    This makes the agent fully testable in isolation.
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

    Performs NLP intent analysis, categorisation, sentiment analysis,
    priority scoring, and suggested reply generation for enterprise emails.

    The two entry-points are:
      - process_async(data)  – called directly by FastAPI route (preferred)
      - process(data)        – sync wrapper required by BaseAgent contract
    """

    def __init__(self, gemini_service: Optional[GeminiService] = None):
        self._gemini_service = gemini_service or GeminiService()

    # ------------------------------------------------------------------
    # BaseAgent abstract property implementations
    # ------------------------------------------------------------------

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

    # ------------------------------------------------------------------
    # Primary async entry-point (called by FastAPI route)
    # ------------------------------------------------------------------

    async def process_async(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Asynchronously processes an email payload via GeminiService.

        Parameters
        ----------
        data : Dict[str, Any]
            Expected keys:
              - "content" : str  – raw email body (required)
              - "subject" : str  – email subject line (optional)
              - "sender"  : str  – sender address (optional)

        Returns
        -------
        Dict[str, Any]
            On success:
              {
                "success": True,
                "agent": "EmailAgent",
                "summary": "...",
                "category": "...",
                "priority": "...",
                "sentiment": "...",
                "suggested_reply": "..."
              }

            On failure:
              {
                "success": False,
                "agent": "EmailAgent",
                "error": "<reason>"
              }
        """
        content: Optional[str] = data.get("content")
        subject: Optional[str] = data.get("subject")
        sender: Optional[str] = data.get("sender")

        # Guard: reject empty content before hitting the API
        if not content or not str(content).strip():
            logger.warning("EmailAgent: Empty email content provided.")
            return {
                "success": False,
                "agent": self.name,
                "error": "Email content is required and cannot be empty."
            }

        try:
            # Delegate to GeminiService for AI analysis
            logger.info(f"EmailAgent: Sending email to GeminiService. Subject='{subject}' Sender='{sender}'")
            analysis_result = await self._gemini_service.analyze_email(
                email_text=content,
                subject=subject,
                sender=sender
            )

            # GeminiService returns None when API call or JSON validation fails
            if not analysis_result:
                logger.error("EmailAgent: GeminiService returned None — API error or invalid JSON response.")
                return {
                    "success": False,
                    "agent": self.name,
                    "error": "AI analysis failed. The Gemini service returned no valid response."
                }

            # Return the full structured Gemini analysis to the route
            logger.info(f"EmailAgent: Successfully received AI analysis. Category='{analysis_result.get('category')}'")
            return {
                "success": True,
                "agent": self.name,
                "summary": analysis_result["summary"],
                "category": analysis_result["category"],
                "priority": analysis_result["priority"],
                "sentiment": analysis_result["sentiment"],
                "suggested_reply": analysis_result["suggested_reply"]
            }

        except Exception as exc:
            logger.exception(f"EmailAgent: Unexpected exception during processing: {exc}")
            return {
                "success": False,
                "agent": self.name,
                "error": f"Unexpected error during email analysis: {str(exc)}"
            }

    # ------------------------------------------------------------------
    # Sync wrapper — required by BaseAgent abstract contract
    # Used by RouterAgent and any non-async callers
    # ------------------------------------------------------------------

    def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synchronous wrapper for BaseAgent contract compatibility.

        FastAPI routes should prefer process_async() directly.
        This method safely runs the async logic in a new event loop.
        """
        try:
            try:
                loop = asyncio.get_running_loop()
            except RuntimeError:
                loop = None

            if loop and loop.is_running():
                # Running inside an existing event loop — use nest_asyncio if available
                try:
                    import nest_asyncio
                    nest_asyncio.apply()
                    return loop.run_until_complete(self.process_async(data))
                except ImportError:
                    logger.warning("EmailAgent: nest_asyncio not installed; sync call inside async context may block.")
                    return {
                        "success": False,
                        "agent": self.name,
                        "error": "Cannot run sync process() inside an active event loop. Use process_async() instead."
                    }
            else:
                return asyncio.run(self.process_async(data))

        except Exception as exc:
            logger.error(f"EmailAgent sync wrapper error: {exc}")
            return {
                "success": False,
                "agent": self.name,
                "error": f"Sync wrapper error: {str(exc)}"
            }
