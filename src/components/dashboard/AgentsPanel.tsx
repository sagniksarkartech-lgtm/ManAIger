import { motion } from 'framer-motion';
import { Bot, Mail, FileText, Activity, Zap, ShieldCheck } from 'lucide-react';

const agents = [
  {
    name: 'Email Agent',
    icon: Mail,
    status: 'Running' as const,
    version: 'v1.0.0',
    description: 'NLP intent classification, priority scoring, and context-aware draft response generation for inbound emails.',
    color: 'purple',
    stats: { processed: '8,412', accuracy: '97.8%', avgTime: '0.38s' },
    capabilities: ['Intent Classification', 'Priority Scoring', 'Draft Reply Generation', 'Escalation Routing'],
  },
  {
    name: 'Invoice Agent',
    icon: FileText,
    status: 'Running' as const,
    version: 'v1.0.0',
    description: 'OCR text extraction, line-item parsing, PO matching, anomaly detection, and auto-approval recommendation.',
    color: 'indigo',
    stats: { processed: '6,872', accuracy: '95.3%', avgTime: '0.51s' },
    capabilities: ['OCR Extraction', 'Line-Item Parsing', 'PO Matching', 'Anomaly Detection'],
  },
];

export const AgentsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">AI Agents</h2>
            <p className="text-xs text-gray-400 mt-0.5">Autonomous agents with human-in-the-loop gatekeeping</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>2 Active Agents</span>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const colorMap = {
            purple: {
              iconBg: 'bg-purple-500/10 border-purple-500/30',
              iconText: 'text-purple-300',
              tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
              glow: 'bg-purple-600/10',
            },
            indigo: {
              iconBg: 'bg-indigo-500/10 border-indigo-500/30',
              iconText: 'text-indigo-300',
              tagBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
              glow: 'bg-indigo-600/10',
            },
          };
          const colors = colorMap[agent.color as keyof typeof colorMap];

          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 ${colors.glow} rounded-full blur-3xl pointer-events-none`} />

              {/* Agent Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${colors.iconBg} border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.iconText}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{agent.name}</h3>
                    <p className="text-[11px] text-gray-400 font-mono">{agent.version}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {agent.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed mb-5">{agent.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Processed', value: agent.stats.processed, icon: Activity },
                  { label: 'Accuracy', value: agent.stats.accuracy, icon: ShieldCheck },
                  { label: 'Avg Time', value: agent.stats.avgTime, icon: Zap },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                    <stat.icon className="w-3.5 h-3.5 text-purple-400 mx-auto mb-1.5" />
                    <div className="text-sm font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Capabilities */}
              <div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Capabilities</div>
                <div className="flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${colors.tagBg}`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
