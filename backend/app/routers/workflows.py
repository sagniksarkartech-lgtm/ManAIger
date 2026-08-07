from typing import Optional
from fastapi import APIRouter, File, UploadFile, Body
from app.schemas.email import EmailProcessRequest, ProcessResponse
from app.schemas.invoice import InvoiceProcessResponse
from app.schemas.workflow import WorkflowListResponse
from app.schemas.approval import ApprovalListResponse
from app.services.workflow_service import WorkflowService
from app.agents.email_agent import EmailAgent
from app.agents.invoice_agent import InvoiceAgent

router = APIRouter(tags=["Workflows & Agents"])

email_agent = EmailAgent()
invoice_agent = InvoiceAgent()

@router.post(
    "/process-email",
    response_model=ProcessResponse,
    summary="Process Incoming Email Payload",
    description="Receives an email payload for AI agent processing."
)
async def process_email(payload: Optional[EmailProcessRequest] = Body(None)) -> ProcessResponse:
    # Trigger EmailAgent skeleton
    _ = email_agent.process(
        content=payload.content if payload else None,
        sender=payload.sender if payload else None,
        subject=payload.subject if payload else None
    )
    return ProcessResponse(
        success=True,
        message="Email received successfully."
    )

@router.post(
    "/process-invoice",
    response_model=InvoiceProcessResponse,
    summary="Process Invoice File",
    description="Receives an uploaded invoice file for OCR vision parsing."
)
async def process_invoice(file: Optional[UploadFile] = File(None)) -> InvoiceProcessResponse:
    # Trigger InvoiceAgent skeleton
    filename = file.filename if file else "uploaded_invoice.pdf"
    _ = invoice_agent.process_file(filename=filename)
    return InvoiceProcessResponse(
        success=True,
        message="Invoice received successfully."
    )

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
