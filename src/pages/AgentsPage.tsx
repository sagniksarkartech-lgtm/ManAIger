import { AnimatedPage } from '../components/AnimatedPage';
import { Mail, FileText, Bot } from 'lucide-react';

export const AgentsPage = () => {
  return (
    <AnimatedPage>
      <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 min-h-screen relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto z-10 relative">
          {/* Premium Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>AUTONOMOUS AGENTS</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
              AI Agents <span className="purple-gradient-text">Directory</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Deploy pre-trained, domain-specific AI agents built for high-precision document parsing and automated customer communication.
            </p>
          </div>

          {/* Agent Placeholders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Email Agent Card */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Email Agent</h3>
                    <div className="text-xs text-purple-300">NLP & Intent Classifier</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Running • 97% Accuracy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Processes customer emails automatically, evaluates request urgency, and generates context-aware draft replies.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-purple-200">
                [Email Agent Configuration Placeholder]
              </div>
            </div>

            {/* Invoice Agent Card */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Invoice Agent</h3>
                    <div className="text-xs text-indigo-300">OCR & Vision Parser</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Running • 95% Accuracy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Reads multi-page invoices, extracts line items, verifies purchase orders, and flags price anomalies.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-indigo-200">
                [Invoice Agent Configuration Placeholder]
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
