import { AnimatedPage } from '../components/AnimatedPage';
import { Compass, Cpu, UserCheck } from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <AnimatedPage>
      <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 min-h-screen relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto z-10 relative">
          {/* Premium Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>ARCHITECTURE & PIPELINE</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
              How <span className="purple-gradient-text">It Works</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Understand how MANAIGER AI securely routes, processes, and validates business workflows with human-in-the-loop control.
            </p>
          </div>

          {/* Pipeline Placeholders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4">PHASE 01</div>
              <Compass className="w-8 h-8 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Ingestion & Routing</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Automatic trigger detection via incoming emails, invoice uploads, or API webhooks.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4">PHASE 02</div>
              <Cpu className="w-8 h-8 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Agent Execution</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Specialized domain AI agent extracts payload data and drafts recommended action.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4">PHASE 03</div>
              <UserCheck className="w-8 h-8 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Human Sign-off</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Designated team member approves recommendation with 1-click before final dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
