# Data Lifecycle & HITL Workflow

This document traces the exact lifecycle of a single piece of data as it travels through CommandHQ AI, highlighting the mandatory Human-in-the-Loop (HITL) checkpoints.

## Phase 1: Ingestion & Triage
1. **Input:** Unstructured data enters the system (e.g., an email via `POST /process-email` or an invoice via `POST /process-invoice`).
2. **Routing:** The `RouterAgent` intercepts the payload. It extracts the discriminator field (type) and queries the AgentRegistry to delegate the task (e.g., routing to `EmailAgent` or `InvoiceAgent`).

## Phase 2: AI Processing & Draft Generation
3. **Execution:** The specialized agent processes the payload asynchronously (`process_async`).
4. **Analysis:** The AI extracts structured data (e.g., mapping an email to a `category`, `priority`, and `sentiment`, or parsing invoice totals).
5. **Drafting:** The AI generates a proposed action (e.g., a `suggested_reply` or a financial recommendation).

## Phase 3: The HITL Intercept
6. **Queueing:** Instead of acting on the drafted response, the backend triggers the `WorkflowService`.
7. **State Mutation:** The item is formatted as an `ApprovalItem` and pushed to the database state with a `status` of `Pending Approval` or `In Review`.

## Phase 4: Human Authorization
8. **Surfacing:** The React frontend polls `GET /approvals` and populates the dashboard UI.
9. **Review:** A human operator reviews the AI's `suggestion` and confidence metrics.
10. **Authorization:** The human explicitly approves or rejects the action via the UI.

## Phase 5: Finalization
11. **Execution:** Only upon explicit UI approval does the backend execute the final action (e.g., sending the drafted email or flagging the invoice for payment).
12. **Archiving:** The task is moved to `GET /workflows` and logged as a `WorkflowItem` with a status of `Completed`, providing a full audit trail of the AI's recommendation and the human's authorization.