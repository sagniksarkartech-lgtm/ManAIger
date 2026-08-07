"""
invoice_agent.py
================
Concrete AI agent responsible for all invoice-related processing tasks.

Current State
-------------
Returns a deterministic mock response.  No OCR, no Gemini, no external calls.

Future Integration Points (commented stubs)
-------------------------------------------
- Google Cloud Vision API (or Gemini vision) for PDF/image OCR
- Line-item extraction and normalisation
- Purchase Order (PO) matching against the ERP database
- Anomaly / duplicate detection
- Auto-approval for invoices under a configured threshold
- Human escalation queue entry for high-value or suspicious invoices

Architecture Note
-----------------
InvoiceAgent is a LEAF node in the agent graph — identical pattern to
EmailAgent.  Both are discovered and managed by the AgentRegistry;
neither knows about the other.
"""

from typing import Any, Dict, Optional
from .base_agent import BaseAgent


class InvoiceAgent(BaseAgent):
    """
    Handles inbound invoice payloads for the MANAIGER platform.

    Responsibilities (future)
    -------------------------
    1. OCR text extraction         → parse PDF/image to structured text
    2. Line-item parsing           → extract vendor, amount, line items
    3. PO matching                 → cross-reference internal purchase orders
    4. Anomaly detection           → duplicate invoices, mismatched totals
    5. Approval recommendation     → auto-approve or queue for human sign-off
    """

    # ------------------------------------------------------------------
    # BaseAgent abstract property implementations
    # ------------------------------------------------------------------

    @property
    def name(self) -> str:
        """Unique identifier used across logs, responses, and the registry."""
        return "InvoiceAgent"

    @property
    def description(self) -> str:
        """One-line description surfaced in the AgentRegistry catalogue."""
        return (
            "Processes invoice files: OCR extraction, PO matching, "
            "anomaly detection, and approval recommendation."
        )

    # ------------------------------------------------------------------
    # Core Processing Method
    # ------------------------------------------------------------------

    def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Entry-point for invoice processing.

        Parameters
        ----------
        data : Dict[str, Any]
            Expected keys (all optional for now):
              - "filename"    : str   – name of the uploaded file
              - "file_bytes"  : bytes – raw file content (for OCR)
              - "vendor"      : str   – pre-extracted vendor name (optional)

        Returns
        -------
        Dict[str, Any]
            Mock structured result.  Schema is stable — future OCR/Gemini
            integration will fill the same keys with real values.
        """
        # ── Safely extract known keys; ignore anything unknown ──────────
        filename: Optional[str] = data.get("filename", "uploaded_invoice.pdf")
        vendor: Optional[str] = data.get("vendor")

        # ── [FUTURE] OCR extraction call goes here ───────────────────────
        # raw_text = await vision_client.extract_text(file_bytes)

        # ── [FUTURE] Gemini line-item parsing goes here ──────────────────
        # line_items = await gemini_client.parse_invoice(raw_text)
        # po_match    = await erp_client.match_po(line_items)

        # ── Mock response (architecture deliverable) ────────────────────
        return {
            "agent": self.name,
            "status": "success",
            "summary": "Mock invoice summary",      # ← real: Gemini summary
            "filename": filename,
            "extracted_vendor": vendor or "Unknown", # ← real: OCR output
            "recommended_action": "queue_for_approval",
            # Additional fields the real implementation will populate:
            # "line_items": line_items,
            # "po_match": po_match,
            # "total_amount": "$14,250.00",
            # "anomaly_detected": False,
            # "confidence": 0.95,
        }
