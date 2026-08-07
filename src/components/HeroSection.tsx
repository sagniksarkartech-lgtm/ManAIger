import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, ShieldCheck, Zap } from 'lucide-react';
import { BoomerangVideoBg } from './BoomerangVideoBg';

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/how-it-works');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Background Video Canvas & Ambient Neon Glow */}
      <BoomerangVideoBg />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080C]/40 via-[#08080C]/70 to-[#08080C] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Main Content Box */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white font-normal max-w-4xl"
        >
          Let AI Agents <br />
          <span className="purple-gradient-text">Manage Your Business —</span> <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300/90 font-light block mt-3 font-sans">
            You Stay In Control.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-300/90 font-normal leading-relaxed"
        >
          Automate emails, invoices, approvals and repetitive business workflows using intelligent AI agents while keeping humans in complete control.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] border border-purple-400/40 inline-flex items-center gap-2 group cursor-pointer"
          >
            <Zap className="w-4 h-4 text-purple-200 fill-purple-200 group-hover:scale-110 transition-transform" />
            <span>Sign Up Free</span>
          </button>

          <button
            type="button"
            onClick={handleWatchDemo}
            className="px-7 py-3.5 sm:px-8 sm:py-4 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white text-sm sm:text-base font-medium rounded-xl border border-white/10 hover:border-purple-400/40 transition-all duration-300 backdrop-blur-md inline-flex items-center gap-2 group cursor-pointer"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400/20 group-hover:scale-110 transition-transform" />
            <span>Watch Demo</span>
          </button>
        </motion.div>
      </div>

      {/* Four Live Stats - Enterprise Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="z-10 mt-16 sm:mt-20 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
      >
        <div className="glass-card glass-card-hover rounded-2xl p-5 text-left border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono font-medium mb-3">
            <span>PRECISION</span>
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans mb-1">
            97.8%
          </div>
          <div className="text-xs text-gray-300 font-medium">
            Automation Accuracy
          </div>
          <div className="text-[11px] text-gray-400 mt-2 pt-2 border-t border-white/[0.06]">
            Tested across 500K+ payloads
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-5 text-left border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono font-medium mb-3">
            <span>ENTERPRISE</span>
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Global
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans mb-1">
            620+
          </div>
          <div className="text-xs text-gray-300 font-medium">
            Active Businesses
          </div>
          <div className="text-[11px] text-gray-400 mt-2 pt-2 border-t border-white/[0.06]">
            Fintech, SaaS & Ops teams
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-5 text-left border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono font-medium mb-3">
            <span>VOLUME</span>
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              Monthly
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans mb-1">
            245K+
          </div>
          <div className="text-xs text-gray-300 font-medium">
            Tasks Automated
          </div>
          <div className="text-[11px] text-gray-400 mt-2 pt-2 border-t border-white/[0.06]">
            Sub-minute avg execution
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-5 text-left border border-white/10 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono font-medium mb-3">
            <span>AGENTS</span>
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans mb-1 flex items-center gap-2">
            <span>2</span>
            <ShieldCheck className="w-5 h-5 text-purple-400 inline" />
          </div>
          <div className="text-xs text-gray-300 font-medium">
            Autonomous Core Agents
          </div>
          <div className="text-[11px] text-gray-400 mt-2 pt-2 border-t border-white/[0.06]">
            100% Human Gatekeeping
          </div>
        </div>
      </motion.div>
    </section>
  );
};
