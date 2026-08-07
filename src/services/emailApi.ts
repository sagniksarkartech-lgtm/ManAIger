/**
 * emailApi.ts
 * ===========
 * API service layer for the Email Agent.
 *
 * Responsibilities:
 * - Owns all Axios HTTP logic for POST /process-email.
 * - Exports a typed `analyzeEmail()` function used by EmailAgentCard.
 * - Exports the `EmailAnalysisResult` interface so components can type responses.
 *
 * The component (EmailAgentCard) never imports axios directly.
 * This separation keeps HTTP concerns out of UI components.
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

/** Shape of the request body sent to the backend */
export interface EmailPayload {
  content: string;
  subject?: string;
  sender?: string;
}

/** Shape of the successful AI analysis response from the backend */
export interface EmailAnalysisResult {
  success: boolean;
  agent?: string;
  error?: string;
  summary?: string;
  category?: string;
  priority?: string;
  sentiment?: string;
  suggested_reply?: string;
}

/**
 * Sends an email payload to the FastAPI EmailAgent endpoint.
 * Returns a typed EmailAnalysisResult.
 * Throws an error (with a message) on network or HTTP failure.
 */
export async function analyzeEmail(payload: EmailPayload): Promise<EmailAnalysisResult> {
  const response = await axios.post<EmailAnalysisResult>(
    `${BASE_URL}/process-email`,
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000, // 30s — Gemini can be slow on first call
    }
  );
  return response.data;
}
