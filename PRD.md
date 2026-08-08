# Product Requirements Document (PRD)

## Epic 1: Intelligent Support Triage
**Goal:** Automate the ingestion, categorization, and drafting of responses for inbound customer support and enterprise emails, requiring human sign-off before dispatch.

*   **Ingestion:** The system must accept raw text `content`, `sender`, and `subject` via `POST /process-email`.
*   **AI Processing:** The `EmailAgent` must route the payload to Gemini 2.5 Flash.
*   **Acceptance Criteria (Data Extraction):** 
    *   Extract a 1-2 sentence `summary`.
    *   Categorize the intent (Refund, Complaint, Inquiry, Payment, Technical Support, General).
    *   Assign a `priority` level (Low, Medium, High, Critical).
    *   Analyze `sentiment` (Positive, Neutral, Negative).
*   **Acceptance Criteria (Action):** The AI must generate a `suggested_reply` drafted in a professional tone, ready for human review.
*   **Constraint:** The agent cannot dispatch the email. It must return the structured `EmailAnalysisResponse` payload.

## Epic 2: Invoice Processing
**Goal:** Extract structured vendor and financial data from raw PDF invoices to accelerate accounts payable workflows.

*   **Ingestion:** The system must accept `multipart/form-data` file uploads via `POST /process-invoice`.
*   **AI Processing:** The `InvoiceAgent` utilizes OCR vision parsing to extract line items, vendor names, and total amounts.
*   **Acceptance Criteria:** 
    *   Successfully parse standard invoice formats.
    *   Queue the parsed data as an `ApprovalItem` (e.g., "Recommend approving payment to Stratos Cloud Services based on matched PO").
*   **Constraint:** The agent cannot trigger financial transactions. It must yield an `InvoiceProcessResponse` confirming receipt and queue the result for human verification.