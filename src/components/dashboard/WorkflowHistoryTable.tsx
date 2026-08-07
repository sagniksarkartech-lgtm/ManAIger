import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface HistoryRow {
  id: string;
  agent: string;
  status: 'Completed' | 'Pending Approval' | 'In Review';
  date: string;
  result: string;
}

const mockHistory: HistoryRow[] = [
  {
    id: '#WF-9401',
    agent: 'Invoice Agent',
    status: 'Completed',
    date: '2026-08-06 18:42',
    result: 'Approved $14,250.00 vendor payment to Stratos Cloud',
  },
  {
    id: '#WF-9402',
    agent: 'Email Agent',
    status: 'Completed',
    date: '2026-08-06 18:35',
    result: 'Sent priority support draft response to Acme Corp',
  },
  {
    id: '#WF-9403',
    agent: 'Invoice Agent',
    status: 'Pending Approval',
    date: '2026-08-06 18:10',
    result: 'Extracted line items from PO #9402; awaiting finance sign-off',
  },
  {
    id: '#WF-9404',
    agent: 'Email Agent',
    status: 'In Review',
    date: '2026-08-06 17:50',
    result: 'Intent flagged for manual compliance check',
  },
  {
    id: '#WF-9405',
    agent: 'Invoice Agent',
    status: 'Completed',
    date: '2026-08-06 17:15',
    result: 'Reconciled $6,120.00 annual software license renewal',
  },
  {
    id: '#WF-9406',
    agent: 'Email Agent',
    status: 'Completed',
    date: '2026-08-06 16:40',
    result: 'Categorized 42 customer inquiry emails into Zendesk',
  },
];

export const WorkflowHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHistory = mockHistory.filter((row) => {
    const matchesSearch =
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.result.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Workflow History</h3>
          <p className="text-xs text-gray-400 mt-0.5">Immutable audit timeline of executed AI tasks</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Table Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search history by ID or Agent..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#0D0D14] text-white">All Statuses</option>
              <option value="Completed" className="bg-[#0D0D14] text-white">Completed</option>
              <option value="Pending Approval" className="bg-[#0D0D14] text-white">Pending Approval</option>
              <option value="In Review" className="bg-[#0D0D14] text-white">In Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Shell */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 uppercase font-mono tracking-wider">
              <th className="py-3 px-4">Workflow ID</th>
              <th className="py-3 px-4">AI Agent</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date / Time</th>
              <th className="py-3 px-4">Execution Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {filteredHistory.map((row) => {
              return (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-300">{row.id}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{row.agent}</td>
                  <td className="py-3.5 px-4">
                    {row.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {row.status === 'Pending Approval' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/20 border border-purple-500/40 text-purple-300">
                        <Clock className="w-3 h-3" />
                        Pending Approval
                      </span>
                    )}
                    {row.status === 'In Review' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <AlertCircle className="w-3 h-3" />
                        In Review
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{row.date}</td>
                  <td className="py-3.5 px-4 text-gray-300 font-normal">{row.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <div>
          Showing <span className="font-bold text-white">1-6</span> of <span className="font-bold text-white">15,284</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-purple-300 px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 font-bold">
            Page {currentPage} of 2,548
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
