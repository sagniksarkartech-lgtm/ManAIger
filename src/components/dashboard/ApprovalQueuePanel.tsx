import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, Filter } from 'lucide-react';

interface ApprovalItem {
  id: number;
  agent: 'Invoice Agent' | 'Email Agent';
  name: string;
  suggestion: string;
  amount?: string;
  time: string;
}

const initialApprovals: ApprovalItem[] = [
  {
    id: 1,
    agent: 'Invoice Agent',
    name: 'Vendor Invoice #INV-8910',
    suggestion: 'Recommend approving payment to Stratos Cloud Services based on matched PO #9401.',
    amount: '$14,250.00',
    time: '2m ago',
  },
  {
    id: 2,
    agent: 'Email Agent',
    name: 'Enterprise SLA Extension Query',
    suggestion: 'Drafted 24/7 priority support quote for Acme Corp. Confidence: 97%.',
    time: '8m ago',
  },
  {
    id: 3,
    agent: 'Invoice Agent',
    name: 'Supplier PO Verification #INV-9402',
    suggestion: 'Extracted 14 line items. Verified tax rate and PO total calculation.',
    amount: '$8,400.00',
    time: '15m ago',
  },
  {
    id: 4,
    agent: 'Email Agent',
    name: 'Customer Refund Claim #RF-4920',
    suggestion: 'Recommend approving $340.00 refund under 14-day warranty terms.',
    amount: '$340.00',
    time: '32m ago',
  },
  {
    id: 5,
    agent: 'Invoice Agent',
    name: 'Software License Renewal #INV-3019',
    suggestion: 'Flagged 5% annual price escalation. Ready for finance lead sign-off.',
    amount: '$6,120.00',
    time: '45m ago',
  },
];

export const ApprovalQueuePanel = () => {
  const [approvals] = useState<ApprovalItem[]>(initialApprovals);
  const [actionedIds, setActionedIds] = useState<{ [key: number]: 'approved' | 'rejected' }>({});

  const handleAction = (id: number, status: 'approved' | 'rejected') => {
    setActionedIds({ ...actionedIds, [id]: status });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden h-full flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Approval Queue</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                5 Pending
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Human gatekeeping required</p>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
            title="Filter Queue"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Pending Approval Cards */}
        <div className="space-y-3">
          {approvals.map((item) => {
            const actionStatus = actionedIds[item.id];
            const isInvoice = item.agent === 'Invoice Agent';

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        isInvoice
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {item.agent}
                    </span>
                    <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[180px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                </div>

                <p className="text-[11px] text-gray-300 leading-normal font-normal">
                  <span className="text-purple-300 font-semibold">AI Suggestion: </span>
                  {item.suggestion}
                </p>

                {item.amount && (
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1">
                    <span>Value:</span>
                    <span className="text-emerald-400">{item.amount}</span>
                  </div>
                )}

                {/* Approve / Reject Actions */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  {actionStatus ? (
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        actionStatus === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border-red-500/40'
                      }`}
                    >
                      {actionStatus === 'approved' ? 'Approved ✓' : 'Rejected ✗'}
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, 'rejected')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-gray-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                        <span>Reject</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction(item.id, 'approved')}
                        className="px-3 py-1 text-[11px] font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 text-center">
        <span className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Audit trail logged for all approval decisions</span>
        </span>
      </div>
    </motion.div>
  );
};
