from typing import Optional
from pydantic import BaseModel, Field


class EmailProcessRequest(BaseModel):
    """Request payload for POST /process-email."""
    content: Optional[str] = Field(None, description="Raw text content of the email payload")
    sender: Optional[str] = Field(None, description="Sender email address")
    subject: Optional[str] = Field(None, description="Email subject line")


class ProcessResponse(BaseModel):
    """Generic success/failure response (kept for backwards compatibility)."""
    success: bool = Field(True, json_schema_extra={"example": True})
    message: str = Field("Email received successfully.", json_schema_extra={"example": "Email received successfully."})


class EmailAnalysisResponse(BaseModel):
    """
    Structured response returned by POST /process-email.
    Carries the full Gemini AI analysis result or an error payload.
    """
    success: bool = Field(..., description="True if Gemini analysis succeeded, False on error.")
    agent: Optional[str] = Field(None, description="Name of the agent that processed this email.")
    error: Optional[str] = Field(None, description="Error message when success is False.")

    # Gemini analysis fields (populated on success)
    summary: Optional[str] = Field(None, description="Concise 1-2 sentence summary of the email.")
    category: Optional[str] = Field(
        None, description="One of: Refund, Complaint, Inquiry, Payment, Technical Support, General."
    )
    priority: Optional[str] = Field(
        None, description="One of: Low, Medium, High, Critical."
    )
    sentiment: Optional[str] = Field(
        None, description="One of: Positive, Neutral, Negative."
    )
    suggested_reply: Optional[str] = Field(
        None, description="AI-drafted professional reply ready for human review."
    )
