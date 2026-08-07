/**
 * EmailAgentCard.tsx
 * ==================
 * Dashboard card for the Email Agent.
 *
 * Changes from original:
 * - "Process Email" button now calls analyzeEmail() via emailApi.ts (Axios POST).
 * - Loading spinner shown on button while request is in-flight.
 * - Button is disabled during loading to prevent double-submissions.
 * - On success: displays a glass result card below the input with all 5 AI fields.
 * - On error: displays a red error message.
 * - Page layout, card header, textarea, sample payload, and all existing
 *   styles are completely unchanged.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Upload, Zap, Loader2,
  AlertCircle, Tag, BarChart2, Smile, MessageSquare, FileText
} from 'lucide-react';
import { analyzeEmail } from '../../services/emailApi';
import type { EmailAnalysisResult } from '../../services/emailApi';

// ── Priority colour map ──────────────────────────────────────────────────────
const PRIORITY_STYLES: Record<string, string> = {
  Critical: 'bg-red-500/10 border-red-500/30 text-red-400',
  High:     'bg-orange-500/10 border-orange-500/30 text-orange-400',
  Medium:   'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  Low:      'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
};

// ── Sentiment colour map ─────────────────────────────────────────────────────
const SENTIMENT_STYLES: Record<string, string> = {
  Positive: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  Neutral:  'bg-blue-500/10 border-blue-500/30 text-blue-400',
  Negative: 'bg-red-500/10 border-red-500/30 text-red-400',
};

// ── Badge component ──────────────────────────────────────────────────────────
const Badge = ({ label, value, styles }: { label: string; value: string; styles: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">{label}</span>
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-bold font-mono ${styles}`}>
      {value}
    </span>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
export const EmailAgentCard = () => {
  const [emailText, setEmailText]       = useState('');
  const [isLoading, setIsLoading]       = useState(false);
  const [result, setResult]             = useState<EmailAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleEmail = `Subject: Urgent: Enterprise Contract SLA Extension Query
From: Marcus Vance <marcus@veloce.com>
Message: Hi Team, we need to extend our SLA response time coverage to 24/7 for Q4. Please confirm pricing and updated contract terms. Thanks!`;

  const handleSampleInsert = () => {
    setEmailText(sampleEmail);
    setResult(null);
    setErrorMessage(null);
  };

  const handleProcessEmail = async () => {
    if (!emailText.trim()) return;

    setIsLoading(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const data = await analyzeEmail({ content: emailText });

      if (!data.success) {
        setErrorMessage(data.error ?? 'AI analysis failed. Please try again.');
      } else {
        setResult(data);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not reach the backend. Ensure the FastAPI server is running on port 8000.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* ── Card Header (unchanged) ─────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Email Agent</h3>
              <p className="text-xs text-purple-300 font-medium">NLP &amp; Intent Classification</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            Running
          </span>
        </div>

        {/* ── Textarea (unchanged) ────────────────────────────────────── */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <label htmlFor="email-input-field" className="font-semibold text-gray-300">
              Input Email Content
            </label>
            <button
              type="button"
              onClick={handleSampleInsert}
              className="text-purple-400 hover:text-purple-300 text-[11px] underline cursor-pointer"
            >
              Load Sample Payload
            </button>
          </div>
          <textarea
            id="email-input-field"
            rows={4}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste raw email header or customer inquiry here..."
            className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors font-sans leading-relaxed"
          />
        </div>

        {/* ── Error Message ───────────────────────────────────────────── */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── AI Result Glass Card ────────────────────────────────────── */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mb-4 rounded-2xl border border-purple-500/20 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
            >
              {/* Result header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-purple-500/5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-widest">
                  Gemini AI Analysis
                </span>
                <span className="ml-auto text-[10px] text-gray-500 font-mono">{result.agent}</span>
              </div>

              <div className="p-4 space-y-4">
                {/* Summary */}
                {result.summary && (
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mb-1">Summary</p>
                      <p className="text-xs text-gray-200 leading-relaxed">{result.summary}</p>
                    </div>
                  </div>
                )}

                {/* Category · Priority · Sentiment badges */}
                <div className="flex flex-wrap gap-4">
                  {result.category && (
                    <Badge
                      label="Category"
                      value={result.category}
                      styles="bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                    />
                  )}
                  {result.priority && (
                    <Badge
                      label="Priority"
                      value={result.priority}
                      styles={PRIORITY_STYLES[result.priority] ?? PRIORITY_STYLES['Medium']}
                    />
                  )}
                  {result.sentiment && (
                    <Badge
                      label="Sentiment"
                      value={result.sentiment}
                      styles={SENTIMENT_STYLES[result.sentiment] ?? SENTIMENT_STYLES['Neutral']}
                    />
                  )}
                </div>

                {/* Suggested Reply */}
                {result.suggested_reply && (
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mb-1">Suggested Reply</p>
                      <div className="text-xs text-gray-300 leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 whitespace-pre-wrap">
                        {result.suggested_reply}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Buttons (layout unchanged) ──────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSampleInsert}
          className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-purple-400" />
          <span>Upload Email</span>
        </button>

        <button
          type="button"
          id="process-email-btn"
          onClick={handleProcessEmail}
          disabled={isLoading || !emailText.trim()}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 text-purple-200 animate-spin" />
              <span>Analysing…</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-purple-200" />
              <span>Process Email</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
