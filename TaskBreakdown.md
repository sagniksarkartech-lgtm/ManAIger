# Agent-Driven Lifecycle (ADLC) Task Breakdown

This document outlines the phased, progressive execution plan used to build ManAIger, ensuring modularity and minimizing AI hallucination during development.

### Phase 1: Scaffolding & Configuration
*   Initialize the monorepo structure separating `backend/` and `src/`.
*   Configure Vite, React 19, and TailwindCSS v4 for the frontend.
*   Configure FastAPI, Uvicorn, and CORS middleware in `backend/app/utils/main.py`.
*   Lock strict linting rules (`.oxlintrc.json` and `.clinerules`) to enforce clean React hooks and SOLID principles.

### Phase 2: Schema-First Backend APIs
*   Define the single source of truth for data using Pydantic models (`schemas/email.py`, `schemas/invoice.py`, `schemas/approval.py`, `schemas/workflow.py`).
*   Implement stateless API routers (`routers/workflows.py`) that strictly adhere to the Pydantic schemas.

### Phase 3: AI Agent Orchestration
*   Define the abstract contract `BaseAgent` to enforce polymorphic behavior.
*   Implement the `RouterAgent` (Triage) to read incoming payload types and delegate tasks without `if/else` spaghetti code.
*   Build the specialized `EmailAgent` and `InvoiceAgent` to handle domain-specific LLM interactions.

### Phase 4: HITL Dashboard & Frontend Integration
*   Build strictly typed Axios service layers (`src/services/emailApi.ts`) that mirror backend schemas.
*   Develop the React dashboard UI to consume `GET /approvals` and `GET /workflows`.
*   Implement the visual state management for the human approval queue.

### Phase 5: Verification & End-to-End Testing
*   Trigger `POST /process-email` and verify the payload transitions correctly to the `GET /approvals` queue.
*   Validate that no actions execute without frontend approval.