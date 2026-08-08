***

### 2. Updated `AGENTS_AND_SKILLS.md`

```markdown
# ManAIger: Agents & Skills Architecture

**Track A: Business Process Automation** | **"Deploy or Die" Hackathon**

This document details the custom AI architecture for ManAIger . To ensure production-grade reliability and strict adherence to our Human-in-the-Loop (HITL) mandate, we have built a decoupled, polymorphic agent ecosystem grounded in SOLID design principles. 

---

## 1. The Core Contract: `BaseAgent`

All AI agents in the platform inherit from a strict Abstract Base Class (`backend/app/agents/base_agent.py`). This prevents runtime errors and enforces architectural invariants.

### Design Principles Applied
*   **Open/Closed Principle (SOLID-O):** The base class is open for extension (creating new specialized agents) but closed for modification. 
*   **Liskov Substitution Principle (SOLID-L):** Any concrete agent can be utilized interchangeably by higher-level modules without the caller knowing the specific agent type.
*   **Dependency Inversion (SOLID-D):** FastAPI routes and orchestration layers depend entirely on the `BaseAgent` abstraction, not concrete implementations.

### Required Implementations
Every subclass must implement:
*   `name`: A unique identifier (e.g., "EmailAgent", "QuantitativeAgent").
*   `description`: A concise summary for observability tools.
*   `process(data)`: The polymorphic entry-point that guarantees a standard `{ "agent": str, "status": str }` return structure.

---

## 2. The Orchestrator: `RouterAgent` (Triage)

The `RouterAgent` acts as the central dispatch hub for all unstructured data and operational triggers entering the system. 

### Strategy & Routing
Instead of hardcoding complex `if/else` branching logic, the `RouterAgent` utilizes the **Strategy Pattern**. 
1.  It intercepts incoming payloads and extracts a `type` discriminator field.
2.  It queries the internal `AgentRegistry` to find the mapped specialized agent.
3.  It dynamically delegates the payload to the target agent's `process()` method.
4.  It enriches the final output with a `routed_by` provenance tag for full observability tracing.

This ensures the `RouterAgent` remains completely agnostic to the internal business logic of the specialized agents or the Gemini API itself.

---

## 3. Specialized Execution Agents

Specialized agents handle the heavy lifting of interacting with the LLM, running Python services, and processing specific data domains.

*   **EmailAgent:** Triggered via `POST /process-email`. It leverages an async execution pattern (`process_async`) to prevent event-loop blocking while interfacing with Gemini 2.5 Flash. It extracts summaries, categories, priorities, sentiments, and drafts suggested replies.
*   **InvoiceAgent:** Triggered via `POST /process-invoice`. Responsible for extracting structured data from uploaded PDFs using OCR vision parsing capabilities.
*   **QuantitativeAgent:** Interfaces with the FinTech services layer. It ingests technical indicator summaries (RSI, MACD, Bollinger Bands) and probabilistic price forecasts to draft actionable trading signals or portfolio adjustments. 

---

## 4. The HITL Intercept: `queue_for_human_approval`

To enforce the hackathon's strict safety requirements, AI agents **do not** possess direct execution authority. 

Instead of an agent calling an external API to send an email, authorize a payment, or execute a market position in the portfolio, it must invoke a custom Python skill: `queue_for_human_approval`.

### How the Intercept Skill Works:
1.  **Halt Execution:** The specialized agent drafts the proposed action (e.g., the JSON payload for a drafted email response or a proposed Long position on RELIANCE.NS).
2.  **Database Push:** The `queue_for_human_approval` skill takes the agent's output and pushes it to PostgreSQL via the `WorkflowService`.
3.  **State Mutation:** The data is inserted into the queue with a mandatory `PENDING_APPROVAL` status.
4.  **UI Handoff:** The data is surfaced to the `GET /approvals` endpoint, populating the React dashboard for human authorization. 

This architectural hard-stop guarantees that ManAIger remains an *autonomous-drafting* system rather than an *autonomous-executing* system, ensuring zero risk of unapproved enterprise actions or rogue financial trades.