from typing import List
from pydantic import BaseModel, Field

class WorkflowItem(BaseModel):
    id: str = Field(..., json_schema_extra={"example": "#WF-9401"})
    agent: str = Field(..., json_schema_extra={"example": "Invoice Agent"})
    status: str = Field(..., json_schema_extra={"example": "Completed"})
    date: str = Field(..., json_schema_extra={"example": "2026-08-06 18:42"})
    result: str = Field(..., json_schema_extra={"example": "Approved $14,250.00 vendor payment to Stratos Cloud"})

class WorkflowListResponse(BaseModel):
    success: bool = Field(True, json_schema_extra={"example": True})
    count: int = Field(..., json_schema_extra={"example": 6})
    workflows: List[WorkflowItem]
