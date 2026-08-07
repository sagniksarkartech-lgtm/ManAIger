import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  Cpu,
  History,
  Settings,
  Check,
  TrendingUp,
  Clock,
  ShieldCheck,
  Filter,
  RefreshCw,
} from 'lucide-react';

export const DashboardPreviewSection = () => {
  const [approvedItems, setApprovedItems] = useState<number[]>([]);

  const toggleApprove = (id: number) => {
    if (approvedItems.includes(id)) {
      setApprovedItems(approvedItems.filter((i) => i !== id));
    } else {
      setApprovedItems([...approvedItems, id]);
    }
  };

  return (
    <section id="dashboard" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#06060A]">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            ENTERPRISE PLATFORM
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            Human-in-the-Loop <br />
            <span className="purple-gradient-text">Command Center</span>
          </motion.h2>
        </div>

        {/* Dashboard Mockup Shell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/15 bg-[#0D0D14]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.15)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                https://app.manaiger.ai/command-center
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-xs font-bold text-white">
                AI
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Sidebar */}
            <div className="lg:col-span-3 border-r border-white/10 p-5 bg-white/[0.01] flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3 px-3">
                    NAVIGATION
                  </div>
                  <nav className="space-y-1">
                    <a
                      href="#dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-white font-medium text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-400" />
                      <span>Overview</span>
                    </a>
                    <a
                      href="#approvals"
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm font-medium"
                    >
                      <div className="flex items-center gap-3">
                        <CheckSquare className="w-4 h-4 text-gray-400" />
                        <span>Approvals</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                        3
                      </span>
                    </a>
                    <a
                      href="#agents"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm font-medium"
                    >
                      <Cpu className="w-4 h-4 text-gray-400" />
                      <span>AI Agents</span>
                    </a>
                    <a
                      href="#audit"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm font-medium"
                    >
                      <History className="w-4 h-4 text-gray-400" />
                      <span>Audit Trail</span>
                    </a>
                  </nav>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3 px-3">
                    SYSTEM
                  </div>
                  <nav className="space-y-1">
                    <a
                      href="#settings"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm font-medium"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Settings</span>
                    </a>
                  </nav>
                </div>
              </div>

              {/* Agent Status Box */}
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="text-xs font-semibold text-purple-200 mb-1">Human Gatekeeping Active</div>
                <div className="text-[11px] text-purple-300/70 leading-normal">
                  100% of high-value actions require explicit human sign-off.
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-9 p-6 sm:p-8 space-y-6">
              {/* Analytics Top Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Active Workflows</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">1,482</div>
                  <div className="text-[11px] text-emerald-400 mt-1">↑ +14.2% this week</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Avg Approval Time</span>
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">1.2m</div>
                  <div className="text-[11px] text-purple-400 mt-1">⚡ 94% faster than manual</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Accuracy Rate</span>
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">97.8%</div>
                  <div className="text-[11px] text-purple-400 mt-1">Verified audit trail</div>
                </div>
              </div>

              {/* Approval Queue Section */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                    <span>Pending Approval Queue</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300">
                      3 Action Required
                    </span>
                  </h4>
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white">
                      <Filter className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Queue Items */}
                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 font-semibold">
                          INVOICE AGENT
                        </span>
                        <span className="text-xs font-semibold text-white">Vendor Invoice #INV-8910</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Recommend approving <strong className="text-white">$14,250.00</strong> to Stratos Cloud Services.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleApprove(1)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                          approvedItems.includes(1)
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{approvedItems.includes(1) ? 'Approved ✓' : 'Approve Action'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 font-semibold">
                          EMAIL AGENT
                        </span>
                        <span className="text-xs font-semibold text-white">Enterprise SLA Extension Query</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Drafted custom contract response for Acme Corp priority support.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleApprove(2)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                          approvedItems.includes(2)
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{approvedItems.includes(2) ? 'Approved ✓' : 'Approve Action'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
