import { AnimatedPage } from '../components/AnimatedPage';
import { Sparkles, Shield, Cpu, Zap } from 'lucide-react';

export const FeaturesPage = () => {
  return (
    <AnimatedPage>
      <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 min-h-screen relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto z-10 relative">
          {/* Premium Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ENTERPRISE CAPABILITIES</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
              Platform <span className="purple-gradient-text">Features</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Explore the core automation modules, security standards, and orchestration tools engineered for high-throughput enterprise operations.
            </p>
          </div>

          {/* Feature Placeholders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Core Agent Engine</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Autonomous intent parsing and contextual payload extraction across email and unstructured documents.
              </p>
              <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs font-mono text-purple-300">
                [Feature Module Placeholder]
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Human Approval Gatekeeper</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Configurable confidence thresholds ensuring 100% of critical decisions require explicit human sign-off.
              </p>
              <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs font-mono text-purple-300">
                [Gatekeeper Module Placeholder]
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise Integrations</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Seamless API connectors for Salesforce, SAP, QuickBooks, Zendesk, and custom REST webhooks.
              </p>
              <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs font-mono text-purple-300">
                [Integrations Module Placeholder]
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
