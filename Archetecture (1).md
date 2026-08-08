# ManAIger : System Architecture

## 1. High-Level System Overview

ManAIger operates on a strictly decoupled front-to-back architecture, utilizing a stateless backend API that interfaces with a stateful PostgreSQL database. Designed as an internal FinTech operations dashboard, it handles unstructured data ingestion (invoices, support emails) alongside advanced quantitative market analysis, algorithmic backtesting, and portfolio management. All AI-driven operational actions are explicitly paused in a database queue pending human authorization.

### The HITL Pipeline
1. **Ingestion:** Unstructured inputs (emails, invoices) or market data triggers enter via the frontend or backend webhooks.
2. **Triage:** `router_agent.py` evaluates the intent and routes the payload to the corresponding specialized agent.
3. **Drafting (Not Execution):** Specialized agents execute their logic (e.g., drafting a client response or recommending a portfolio position) but are structurally blocked from finalizing actions via the `queue_for_human_approval` intercept skill.
4. **Human Authorization:** The proposed action is pushed to the frontend dashboard.
5. **Execution:** Only upon explicit approval via the React UI does the backend execute the final state change.

---

## 2. Technology Stack

### Frontend (Client Layer)
The presentation layer is optimized for rapid rendering and strict linting to maintain clean code during hackathon sprints.
*   **Core:** React 19 (`^19.2.8`) & TypeScript.
*   **Build Tool:** Vite (`^8.2.0`) for HMR and optimized production builds.
*   **Routing:** React Router v7 (`^7.18.2`) for declarative route management.
*   **Styling & UI:** TailwindCSS v4 (`^4.3.3`), Framer Motion for micro-interactions, and `lucide-react` for iconography.
*   **Network:** Axios (`^1.19.0`) for interceptor-ready HTTP requests to the backend.
*   **Code Quality:** Oxlint (`^1.75.0`) enforces strict AST-based linting rules to prevent anti-patterns.

### Backend (API & AI Layer)
The server layer acts as the orchestrator for AI agents, quantitative analysis engines, and the database connection pool.
*   **Core:** FastAPI (Python 3) for asynchronous, type-safe API routing.
*   **Server:** Uvicorn running on `0.0.0.0:8000`.
*   **CORS:** Explicitly configured middleware allowing origins (primarily `http://localhost:5173` during development).
*   **AI & Data Science:** Gemini API (via custom service classes) and `pandas` for OHLCV DataFrame manipulation and technical indicator calculations.
*   **Data Validation:** Pydantic models ensuring strict schema enforcement for AI outputs.

### Database & Persistence
*   **Engine:** PostgreSQL (Hosted via Supabase).
*   **ORM:** SQLAlchemy (Models initialized in `backend/app/models/__init__.py`).

---

## 3. Database Schema Logic (State Machine)

To enforce our HITL requirement and support portfolio management, our database design acts as a strict state machine.

**Core Entities:**
*   `WorkflowTask`: The central record for any ingested data or AI-proposed action.
    *   `id` (UUID)
    *   `source_type` (Enum: EMAIL, INVOICE, TRADE_SIGNAL)
    *   `raw_payload` (JSONB)
    *   `proposed_action` (JSONB - populated by the AI agent)
    *   `status` (Enum: PENDING_TRIAGE, PENDING_APPROVAL, APPROVED, REJECTED, EXECUTED)
    *   `human_feedback` (Text - optional context for rejection)
*   `MarketData`: Stores historical OHLCV data for tracked tickers.
*   `PortfolioPosition`: Tracks active and closed Long/Short market positions, including `entry_price`, `quantity`, and `exit_price` for real-time P&L calculation.

Agents never write to a `status` of `EXECUTED`. They strictly transition tasks from `PENDING_TRIAGE` to `PENDING_APPROVAL`.

---

## 4. Separation of Concerns & Directory Structure

Our project enforces strict boundaries between agents, skills, quantitative services, API routing, and UI components.

### Backend Structure
```text
backend/app/
├── agents/             # AI Logic & LLM Prompts
│   ├── base_agent.py   # Abstract base class enforcing HITL intercepts
│   ├── router_agent.py # The TriageAgent logic
│   ├── email_agent.py  # Specialized email drafting
│   ├── invoice_agent.py# Specialized extraction
│   └── quant_agent.py  # Analyzes market data and proposes trades
├── core/               # Application lifecycle & config
├── database/           # Supabase connection management
├── models/             # SQLAlchemy ORM definitions
├── routers/            # FastAPI Endpoints
│   ├── health.py       # Infrastructure checks
│   └── workflows.py    # Primary API contract for frontend
├── schemas/            # Pydantic schemas (Input/Output validation)
├── services/           # Business logic & Quantitative Engines
│   ├── market_data_service.py   # OHLCV fetching and storage
│   ├── portfolio_service.py     # P&L and position management
│   ├── indicator_service.py     # RSI, MACD, SMA, Bollinger Bands
│   ├── backtest_service.py      # Strategy simulation
│   ├── fundamentals_service.py  # Corporate profile extraction
│   └── forecast_service.py      # Probabilistic price forecasting
└── utils/              
    └── main.py         # FastAPI application entry 
    
### Frontend Structure

src/
├── assets/             # Static media
├── components/         # Reusable UI building blocks (shadcn/ui)
│   └── dashboard/      # HITL specific visual components
├── context/            # React Context (Auth state)
├── pages/              # Route-level components (AgentsPage, DocsPage, etc.)
└── services/           
    └── api_client.ts   # Axios wrappers mirroring backend routers