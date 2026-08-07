from typing import Optional
from pydantic import BaseModel, Field

class EmailProcessRequest(BaseModel):
    content: Optional[str] = Field(None, description="Raw text content of the email payload")
    sender: Optional[str] = Field(None, description="Sender email address")
    subject: Optional[str] = Field(None, description="Email subject line")

class ProcessResponse(BaseModel):
    success: bool = Field(True, json_schema_extra={"example": True})
    message: str = Field("Email received successfully.", json_schema_extra={"example": "Email received successfully."})
