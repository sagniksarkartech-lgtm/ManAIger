# ManAIger

**One dashboard to run an entire startup.**

ManAIger is an autonomous business operations center designed to ingest unstructured enterprise data, route it via AI agents, and queue proposed actions for mandatory Human-in-the-Loop (HITL) approval. Built for Track A (Business Process Automation) of the "Deploy or Die" Agent-Driven Lifecycle Hackathon.

## 🚀 The Agent-Driven Lifecycle (ADLC) Approach
We deliberately steered the AI to build this project progressively. Rather than relying on single-shot prompt generation, we utilized a strict ADLC:
1.  **Schema-First Design:** Defined strictly typed Pydantic models to guarantee predictable AI outputs.
2.  **Decoupled Orchestration:** Built a `RouterAgent` to dynamically dispatch tasks using the Strategy Pattern, keeping AI logic isolated from API logic.
3.  **The HITL Intercept:** Engineered a hard-stop `queue_for_human_approval` skill that intercepts all AI execution attempts and forces them into a PostgreSQL state machine.

## 💻 Technology Stack
*   **Frontend:** React 19, TypeScript, Vite, TailwindCSS (v4), shadcn/ui.
*   **Backend:** FastAPI (Python 3), Uvicorn, Pydantic, SQLAlchemy.
*   **AI Engine:** Google Gemini 2.5 Flash (`google-genai>=0.1.0`).
*   **Database:** PostgreSQL (Supabase).

## 🛠️ Local Setup Instructions

### 1. Backend (FastAPI + AI Agents)
Navigate to the `backend/` directory:
```bash
# Install dependencies
pip install -r requirements.txt

# Start the Uvicorn server
python run.py


2. Frontend (React + Vite)
Navigate to the root frontend directory:

Bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev