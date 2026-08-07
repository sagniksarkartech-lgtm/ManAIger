import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Upload, Zap } from 'lucide-react';

export const EmailAgentCard = () => {
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState('');

  const sampleEmail = `Subject: Urgent: Enterprise Contract SLA Extension Query
From: Marcus Vance <marcus@veloce.com>
Message: Hi Team, we need to extend our SLA response time coverage to 24/7 for Q4. Please confirm pricing and updated contract terms. Thanks!`;

  const handleSampleInsert = () => {
    setEmailText(sampleEmail);
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
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Email Agent</h3>
              <p className="text-xs text-purple-300 font-medium">NLP & Intent Classification</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            Running
          </span>
        </div>

        {/* Textarea */}
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
      </div>

      {/* Buttons */}
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
          onClick={() => navigate('/workflows')}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-purple-200" />
          <span>Process Email</span>
        </button>
      </div>
    </motion.div>
  );
};
