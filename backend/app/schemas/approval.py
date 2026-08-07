from typing import List, Optional
from pydantic import BaseModel, Field

class ApprovalItem(BaseModel):
    id: int = Field(..., json_schema_extra={"example": 1})
    agent: str = Field(..., json_schema_extra={"example": "Invoice Agent"})
    name: str = Field(..., json_schema_extra={"example": "Vendor Invoice #INV-8910"})
    suggestion: str = Field(..., json_schema_extra={"example": "Recommend approving payment to Stratos Cloud Services based on matched PO #9401."})
    amount: Optional[str] = Field(None, json_schema_extra={"example": "$14,250.00"})
    time: str = Field(..., json_schema_extra={"example": "2m ago"})

class ApprovalListResponse(BaseModel):
    success: bool = Field(True, json_schema_extra={"example": True})
    count: int = Field(..., json_schema_extra={"example": 5})
    approvals: List[ApprovalItem]
