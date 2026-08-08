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

## Epic 3: Market Data Layer
**Goal:** Fetch, store, and retrieve historical Open, High, Low, Close, and Volume (OHLCV) market data for financial tickers.

*   **Ingestion:** The system must accept ticker symbols (e.g., `RELIANCE.NS`) and fetch data based on `period` and `interval`.
*   **Acceptance Criteria:**
    *   Store parsed OHLCV data securely in the database.
    *   Provide querying capabilities to retrieve stored history with set limits.
    *   Generate tracked ticker summaries, including total bars, date ranges, and the latest close price.

## Epic 4: P&L Dashboard
**Goal:** Provide real-time tracking and summarization of portfolio positions and Profit & Loss (P&L).

*   **Processing:** Track the creation and closure of Long and Short market positions.
*   **Acceptance Criteria:**
    *   Log new positions requiring `ticker`, `entry_price`, and `quantity`.
    *   Generate a real-time portfolio summary calculating total cost, current portfolio value, and open/closed position counts.
    *   Calculate and display Unrealized P&L (and percentage) for open positions.
    *   Calculate Realized P&L accurately when a position is closed at an `exit_price`.

## Epic 5: Technical Indicator Analysis
**Goal:** Compute standard technical indicators from historical price data to evaluate market trends and generate signals.

*   **Processing:** Ingest raw OHLCV DataFrames to calculate financial metrics.
*   **Acceptance Criteria:**
    *   Compute RSI (Relative Strength Index).
    *   Compute MACD (Moving Average Convergence Divergence) including signal lines and histograms.
    *   Compute moving averages including SMA 20, SMA 50, and EMA.
    *   Compute Bollinger Bands (Upper, Middle, and Lower bounds).
    *   Generate a combined technical bias/signal summary based on recent indicator states.

## Epic 6: Strategy Backtesting Engine
**Goal:** Simulate algorithmic trading strategies against historical price data to evaluate historical viability.

*   **Processing:** Execute strategies over historical OHLCV DataFrames with a defined `initial_capital`.
*   **Acceptance Criteria (Strategies):**
    *   Execute Moving Average (MA) Crossover strategies with configurable fast and slow periods.
    *   Execute RSI Mean Reversion strategies with configurable overbought and oversold thresholds.
*   **Acceptance Criteria (Metrics):**
    *   Output core financial metrics: Total Strategy Return, Benchmark (Buy & Hold) Return, and Win Rate.
    *   Output risk metrics: Max Drawdown, Sharpe Ratio, and Profit Factor.

## Epic 7: Company Fundamentals Profiling
**Goal:** Extract and summarize core financial and qualitative data for tracked companies.

*   **Ingestion:** Accept a ticker symbol to retrieve corporate data.
*   **Acceptance Criteria:**
    *   Retrieve general company info (Name, Sector, Industry, Current Price).
    *   Extract valuation metrics (Market Cap, P/E Ratio, Forward P/E, P/B Ratio).
    *   Extract profitability metrics (Trailing EPS, Revenue Growth, Profit Margins).

## Epic 8: Probabilistic Price Forecasting
**Goal:** Generate multi-day future price forecasts using probabilistic models with associated confidence intervals.

*   **Processing:** Analyze historical price DataFrames to project a future `forecast_days` window.
*   **Acceptance Criteria:**
    *   Provide backtested model accuracy metrics based on a historical validation window (MAPE, MAE, Directional Trend Accuracy).
    *   Generate daily target median/expected prices for the forecast window.
    *   Calculate and provide 80% and 95% confidence range bounds (lower and upper) for each forecasted day.