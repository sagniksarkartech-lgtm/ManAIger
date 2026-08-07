from pydantic import BaseModel, Field

class InvoiceProcessResponse(BaseModel):
    success: bool = Field(True, json_schema_extra={"example": True})
    message: str = Field("Invoice received successfully.", json_schema_extra={"example": "Invoice received successfully."})
