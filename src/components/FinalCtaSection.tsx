import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FinalCtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Neon Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-600/20 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-10 sm:p-16 md:p-20 text-center border border-purple-500/30 relative overflow-hidden shadow-[0_0_90px_rgba(168,85,247,0.25)]"
        >
          {/* Subtle Glow Corner */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>ENTERPRISE WORKFLOW AUTOMATION</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight leading-tight mb-6">
            Ready to <span className="purple-gradient-text">automate your business?</span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-normal mb-10">
            Deploy AI agents to your workflow in under 10 minutes with enterprise-grade human control.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] border border-purple-400/40 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Sign Up Free</span>
              <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/docs')}
              className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white text-base font-medium rounded-xl border border-white/10 hover:border-purple-400/40 transition-all duration-300 backdrop-blur-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book Demo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
