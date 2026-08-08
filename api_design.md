# REST API Design & Contracts

This document defines the strict HTTP contracts between the React frontend and the FastAPI backend. All endpoints are hosted under `http://localhost:8000`.

## 1. POST /process-email
**Controller:** `routers/workflows.py` -> `EmailAgent`
**Description:** Receives an email payload and runs it through Gemini AI for analysis and response drafting.

**Request Body (`EmailProcessRequest`):**
```json
{
  "content": "Raw text content of the email payload",
  "sender": "customer@example.com",
  "subject": "Email subject line"
}
Response Body (EmailAnalysisResponse):

JSON
{
  "success": true,
  "agent": "EmailAgent",
  "error": null,
  "summary": "Concise 1-2 sentence summary of the email.",
  "category": "Refund",
  "priority": "High",
  "sentiment": "Negative",
  "suggested_reply": "AI-drafted professional reply ready for human review."
}
2. POST /process-invoice
Controller: routers/workflows.py -> InvoiceAgent
Description: Receives an uploaded invoice file for OCR vision parsing.

Request: multipart/form-data containing a file (UploadFile).

Response Body (InvoiceProcessResponse):

JSON
{
  "success": true,
  "message": "Invoice received successfully."
}
3. GET /approvals
Controller: WorkflowService
Description: Retrieves pending human approval items queued for sign-off. Populates the HITL dashboard.

Response Body (ApprovalListResponse):

JSON
{
  "success": true,
  "count": 5,
  "approvals": [
    {
      "id": 1,
      "agent": "Invoice Agent",
      "name": "Vendor Invoice #INV-8910",
      "suggestion": "Recommend approving payment to Stratos Cloud Services based on matched PO #9401.",
      "amount": "$14,250.00",
      "time": "2m ago"
    }
  ]
}
4. GET /workflows
Controller: WorkflowService
Description: Retrieves the list of processed, finalized enterprise workflow records.

Response Body (WorkflowListResponse):

JSON
{
  "success": true,
  "count": 6,
  "workflows": [
    {
      "id": "#WF-9401",
      "agent": "Invoice Agent",
      "status": "Completed",
      "date": "2026-08-06 18:42",
      "result": "Approved $14,250.00 vendor payment to Stratos Cloud"
    }
  ]
}