import { AnimatedPage } from '../components/AnimatedPage';
import { BookOpen, Terminal, Code2, ShieldCheck } from 'lucide-react';

export const DocsPage = () => {
  return (
    <AnimatedPage>
      <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 min-h-screen relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto z-10 relative">
          {/* Premium Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>DEVELOPER RESOURCES</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
              Documentation & <br />
              <span className="purple-gradient-text">API Reference</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Integrate MANAIGER AI into your software stack using our REST API, webhooks, or native SDKs.
            </p>
          </div>

          {/* API Snippet Placeholder Shell */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>POST /v1/workflows/trigger</span>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                TypeScript SDK
              </span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-purple-200 overflow-x-auto leading-relaxed">
              <code>{`import { ManaigerAI } from '@manaiger/sdk';

const manaiger = new ManaigerAI({ apiKey: process.env.MANAIGER_API_KEY });

const execution = await manaiger.workflows.trigger({
  agent: 'email-agent',
  requireHumanApproval: true
});`}</code>
            </pre>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Quick Start Guide</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect your inbox or accounting software in under 5 minutes with webhooks.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <Code2 className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Webhook Callbacks</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Receive signed payload notifications upon human approval or AI task completion.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">SOC2 & Compliance</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Cryptographic audit logs, TLS 1.3 encryption, and zero model training rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
