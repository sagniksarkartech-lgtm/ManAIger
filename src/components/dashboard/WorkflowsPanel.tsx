import { motion } from 'framer-motion';
import { GitBranch, CheckCircle2, Clock, AlertCircle, Search, Filter } from 'lucide-react';

const workflows = [
  { id: '#WF-9401', agent: 'Invoice Agent', type: 'Invoice Processing', status: 'Completed' as const, date: '2026-08-06 18:42', result: 'Approved $14,250.00 vendor payment to Stratos Cloud' },
  { id: '#WF-9402', agent: 'Email Agent', type: 'Email Classification', status: 'Completed' as const, date: '2026-08-06 18:35', result: 'Sent priority support draft response to Acme Corp' },
  { id: '#WF-9403', agent: 'Invoice Agent', type: 'PO Matching', status: 'Pending Approval' as const, date: '2026-08-06 18:10', result: 'Extracted line items from PO #9402; awaiting finance sign-off' },
  { id: '#WF-9404', agent: 'Email Agent', type: 'Compliance Check', status: 'In Review' as const, date: '2026-08-06 17:50', result: 'Intent flagged for manual compliance check' },
  { id: '#WF-9405', agent: 'Invoice Agent', type: 'License Renewal', status: 'Completed' as const, date: '2026-08-06 17:15', result: 'Reconciled $6,120.00 annual software license renewal' },
  { id: '#WF-9406', agent: 'Email Agent', type: 'Batch Classification', status: 'Completed' as const, date: '2026-08-06 16:40', result: 'Categorized 42 customer inquiry emails into Zendesk' },
  { id: '#WF-9407', agent: 'Invoice Agent', type: 'Duplicate Detection', status: 'Completed' as const, date: '2026-08-06 15:20', result: 'Flagged duplicate invoice #INV-3011 for manual review' },
  { id: '#WF-9408', agent: 'Email Agent', type: 'Escalation Routing', status: 'Completed' as const, date: '2026-08-06 14:05', result: 'Routed 3 high-priority emails to executive support channel' },
];

const statusConfig = {
  'Completed': { icon: CheckCircle2, cls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
  'Pending Approval': { icon: Clock, cls: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
  'In Review': { icon: AlertCircle, cls: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
};

export const WorkflowsPanel = () => {
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
            <GitBranch className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Workflow Manager</h2>
            <p className="text-xs text-gray-400 mt-0.5">Active and historical workflow execution pipeline</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workflows..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors w-56"
            />
          </div>
          <button type="button" className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Workflows', value: '15,284', color: 'text-white' },
          { label: 'Success Rate', value: '97.8%', color: 'text-emerald-400' },
          { label: 'Avg Execution', value: '0.42s', color: 'text-purple-400' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] text-gray-400 font-semibold mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Workflow Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase font-mono tracking-wider">
                <th className="py-3.5 px-5">Workflow ID</th>
                <th className="py-3.5 px-5">AI Agent</th>
                <th className="py-3.5 px-5">Type</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Date / Time</th>
                <th className="py-3.5 px-5">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {workflows.map((row) => {
                const cfg = statusConfig[row.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 font-mono font-bold text-purple-300">{row.id}</td>
                    <td className="py-3.5 px-5 font-medium text-white">{row.agent}</td>
                    <td className="py-3.5 px-5 text-gray-300">{row.type}</td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${cfg.cls}`}>
                        <StatusIcon className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-gray-400 font-mono">{row.date}</td>
                    <td className="py-3.5 px-5 text-gray-300 font-normal max-w-xs truncate">{row.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
