"""
workflows.py
============
FastAPI APIRouter defining all Workflow & Agent HTTP endpoints.

Routing responsibilities:
  POST /process-email    → EmailAgent (Gemini AI email analysis)
  POST /process-invoice  → InvoiceAgent (OCR invoice parsing — unchanged)
  GET  /workflows        → WorkflowService (workflow history list)
  GET  /approvals        → WorkflowService (pending approvals queue)

Design Principles
-----------------
- Single Responsibility:
    This file owns HTTP routing only. All business logic lives in
    agents and services — the router just wires requests to them.

- Dependency Inversion:
    Routes depend on agent and service abstractions, not implementations.
    Agent instances are module-level singletons (fast, avoids re-init overhead).

- Clean Architecture:
    EmailAgent, InvoiceAgent, and RouterAgent are NOT cross-modified here.
    Only EmailAgent's process_email route is updated to return live AI data.
"""

import logging
from typing import Optional

from fastapi import APIRouter, File, UploadFile, Body

from app.schemas.email import EmailProcessRequest, EmailAnalysisResponse
from app.schemas.invoice import InvoiceProcessResponse
from app.schemas.workflow import WorkflowListResponse
from app.schemas.approval import ApprovalListResponse
from app.services.workflow_service import WorkflowService
from app.agents.email_agent import EmailAgent
from app.agents.invoice_agent import InvoiceAgent

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Workflows & Agents"])

# Module-level agent singletons — instantiated once at startup
email_agent = EmailAgent()
invoice_agent = InvoiceAgent()


# ---------------------------------------------------------------------------
# POST /process-email
# ---------------------------------------------------------------------------

@router.post(
    "/process-email",
    response_model=EmailAnalysisResponse,
    summary="Process Incoming Email via Gemini AI",
    description=(
        "Receives an email payload (content, subject, sender) and runs it through "
        "EmailAgent → GeminiService (Gemini 2.5 Flash). Returns structured AI analysis "
        "including summary, category, priority, sentiment, and suggested reply."
    )
)
async def process_email(
    payload: Optional[EmailProcessRequest] = Body(None)
) -> EmailAnalysisResponse:
    """
    Route handler for POST /process-email.

    - Delegates to EmailAgent.process_async() — never blocks the event loop.
    - Returns the full Gemini AI JSON on success.
    - Returns a structured error JSON if EmailAgent or GeminiService fails.
    - InvoiceAgent and RouterAgent are not involved here.
    """
    # Build the data dict expected by EmailAgent.process_async()
    data = {
        "content": payload.content if payload else None,
        "subject": payload.subject if payload else None,
        "sender": payload.sender if payload else None,
    }

    logger.info(f"POST /process-email received. Subject='{data.get('subject')}' Sender='{data.get('sender')}'")

    # Await the async agent — returns success or error dict
    result = await email_agent.process_async(data)

    # Unpack result into the typed response model
    return EmailAnalysisResponse(
        success=result.get("success", False),
        agent=result.get("agent"),
        error=result.get("error"),
        summary=result.get("summary"),
        category=result.get("category"),
        priority=result.get("priority"),
        sentiment=result.get("sentiment"),
        suggested_reply=result.get("suggested_reply"),
    )


# ---------------------------------------------------------------------------
# POST /process-invoice  (InvoiceAgent — NOT modified)
# ---------------------------------------------------------------------------

@router.post(
    "/process-invoice",
    response_model=InvoiceProcessResponse,
    summary="Process Invoice File",
    description="Receives an uploaded invoice file for OCR vision parsing."
)
async def process_invoice(file: Optional[UploadFile] = File(None)) -> InvoiceProcessResponse:
    filename = file.filename if file else "uploaded_invoice.pdf"
    _ = invoice_agent.process_file(filename=filename)
    return InvoiceProcessResponse(
        success=True,
        message="Invoice received successfully."
    )


# ---------------------------------------------------------------------------
# GET /workflows
# ---------------------------------------------------------------------------

@router.get(
    "/workflows",
    response_model=WorkflowListResponse,
    summary="Get Workflow History List",
    description="Retrieves the list of processed enterprise workflow records."
)
async def get_workflows() -> WorkflowListResponse:
    workflows = WorkflowService.get_dummy_workflows()
    return WorkflowListResponse(
        success=True,
        count=len(workflows),
        workflows=workflows
    )


# ---------------------------------------------------------------------------
# GET /approvals
# ---------------------------------------------------------------------------

@router.get(
    "/approvals",
    response_model=ApprovalListResponse,
    summary="Get Pending Approvals Queue",
    description="Retrieves pending human approval items queued for sign-off."
)
async def get_approvals() -> ApprovalListResponse:
    approvals = WorkflowService.get_dummy_approvals()
    return ApprovalListResponse(
        success=True,
        count=len(approvals),
        approvals=approvals
    )
