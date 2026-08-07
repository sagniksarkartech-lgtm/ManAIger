import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, FileText, ArrowRight } from 'lucide-react';

export const AiAgentsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="ai-agents" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            INTELLIGENT AGENTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            Specialized <span className="purple-gradient-text">AI Agents</span>
          </motion.h2>
        </div>

        {/* 2 Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Card 1: Email Agent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-500" />

            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Email Agent</h3>
                    <p className="text-xs text-purple-300 font-medium mt-0.5">NLP & Intent Classification</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    Running
                  </span>
                </div>
              </div>

              <p className="text-base text-gray-300 leading-relaxed font-normal mb-8">
                Processes customer emails automatically. Evaluates incoming request urgency, matches context against CRM history, and generates ready-to-approve email drafts.
              </p>

              {/* Simulation Mock Container */}
              <div className="bg-[#0B0A14] border border-white/10 rounded-2xl p-5 mb-8 text-xs font-mono text-gray-300 space-y-3">
                <div className="flex items-center justify-between text-gray-400 border-b border-white/[0.06] pb-2">
                  <span>INCOMING EMAIL #8492</span>
                  <span className="text-purple-400 font-bold">97% Accuracy</span>
                </div>
                <div className="text-gray-300 font-sans text-sm">
                  <span className="text-purple-400 font-semibold">Subject:</span> Urgent: Billing Inquiry & Refund Request
                </div>
                <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs font-sans text-purple-200">
                  <span className="font-semibold text-purple-300 block mb-1">AI Recommendation:</span>
                  "Approve refund of $340.00 for order #8492 based on 14-day warranty policy. Draft response attached."
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">97%</span>
                <span className="text-xs text-gray-400 block">Accuracy Metric</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/agents')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
              >
                <span>Deploy Email Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Invoice Agent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-500" />

            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Invoice Agent</h3>
                    <p className="text-xs text-indigo-300 font-medium mt-0.5">OCR & Vision Parsing</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    Running
                  </span>
                </div>
              </div>

              <p className="text-base text-gray-300 leading-relaxed font-normal mb-8">
                Reads invoices and extracts structured data. Verifies vendor PO numbers, line item calculations, tax details, and flags duplicate or anomalous charges.
              </p>

              {/* Simulation Mock Container */}
              <div className="bg-[#0B0A14] border border-white/10 rounded-2xl p-5 mb-8 text-xs font-mono text-gray-300 space-y-3">
                <div className="flex items-center justify-between text-gray-400 border-b border-white/[0.06] pb-2">
                  <span>VENDOR INVOICE #INV-4920</span>
                  <span className="text-indigo-400 font-bold">95% Accuracy</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="bg-white/[0.03] p-2 rounded border border-white/5">
                    <span className="text-gray-400 block text-[10px]">Vendor</span>
                    <span className="text-white font-medium">Stratos Cloud Systems</span>
                  </div>
                  <div className="bg-white/[0.03] p-2 rounded border border-white/5">
                    <span className="text-gray-400 block text-[10px]">Total Amount</span>
                    <span className="text-white font-medium">$12,450.00 USD</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-xs font-sans text-indigo-200">
                  <span className="font-semibold text-indigo-300 block mb-1">AI Recommendation:</span>
                  "Matched PO #9401. Verified line items & tax rate. Ready for human finance approval."
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">95%</span>
                <span className="text-xs text-gray-400 block">Accuracy Metric</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/agents')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                <span>Deploy Invoice Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
