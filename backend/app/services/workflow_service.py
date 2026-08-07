from typing import List
from app.schemas.workflow import WorkflowItem
from app.schemas.approval import ApprovalItem

class WorkflowService:
    @staticmethod
    def get_dummy_workflows() -> List[WorkflowItem]:
        return [
            WorkflowItem(
                id="#WF-9401",
                agent="Invoice Agent",
                status="Completed",
                date="2026-08-06 18:42",
                result="Approved $14,250.00 vendor payment to Stratos Cloud"
            ),
            WorkflowItem(
                id="#WF-9402",
                agent="Email Agent",
                status="Completed",
                date="2026-08-06 18:35",
                result="Sent priority support draft response to Acme Corp"
            ),
            WorkflowItem(
                id="#WF-9403",
                agent="Invoice Agent",
                status="Pending Approval",
                date="2026-08-06 18:10",
                result="Extracted line items from PO #9402; awaiting finance sign-off"
            ),
            WorkflowItem(
                id="#WF-9404",
                agent="Email Agent",
                status="In Review",
                date="2026-08-06 17:50",
                result="Intent flagged for manual compliance check"
            ),
            WorkflowItem(
                id="#WF-9405",
                agent="Invoice Agent",
                status="Completed",
                date="2026-08-06 17:15",
                result="Reconciled $6,120.00 annual software license renewal"
            ),
            WorkflowItem(
                id="#WF-9406",
                agent="Email Agent",
                status="Completed",
                date="2026-08-06 16:40",
                result="Categorized 42 customer inquiry emails into Zendesk"
            ),
        ]

    @staticmethod
    def get_dummy_approvals() -> List[ApprovalItem]:
        return [
            ApprovalItem(
                id=1,
                agent="Invoice Agent",
                name="Vendor Invoice #INV-8910",
                suggestion="Recommend approving payment to Stratos Cloud Services based on matched PO #9401.",
                amount="$14,250.00",
                time="2m ago"
            ),
            ApprovalItem(
                id=2,
                agent="Email Agent",
                name="Enterprise SLA Extension Query",
                suggestion="Drafted 24/7 priority support quote for Acme Corp. Confidence: 97%.",
                amount=None,
                time="8m ago"
            ),
            ApprovalItem(
                id=3,
                agent="Invoice Agent",
                name="Supplier PO Verification #INV-9402",
                suggestion="Extracted 14 line items. Verified tax rate and PO total calculation.",
                amount="$8,400.00",
                time="15m ago"
            ),
            ApprovalItem(
                id=4,
                agent="Email Agent",
                name="Customer Refund Claim #RF-4920",
                suggestion="Recommend approving $340.00 refund under 14-day warranty terms.",
                amount="$340.00",
                time="32m ago"
            ),
            ApprovalItem(
                id=5,
                agent="Invoice Agent",
                name="Software License Renewal #INV-3019",
                suggestion="Flagged 5% annual price escalation. Ready for finance lead sign-off.",
                amount="$6,120.00",
                time="45m ago"
            ),
        ]
