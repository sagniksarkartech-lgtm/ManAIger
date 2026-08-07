import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  GitBranch,
  Bot,
  CheckSquare,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type DashboardTab =
  | 'dashboard'
  | 'workflows'
  | 'agents'
  | 'approvals'
  | 'history'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export const Sidebar = ({ collapsed, onToggleCollapse, activeTab, onTabChange }: SidebarProps) => {
  const menuItems: { label: string; tab: DashboardTab; icon: typeof LayoutDashboard; badge?: string }[] = [
    { label: 'Dashboard', tab: 'dashboard', icon: LayoutDashboard },
    { label: 'Workflows', tab: 'workflows', icon: GitBranch },
    { label: 'AI Agents', tab: 'agents', icon: Bot },
    { label: 'Approval Queue', tab: 'approvals', icon: CheckSquare, badge: '5' },
    { label: 'History', tab: 'history', icon: History },
    { label: 'Analytics', tab: 'analytics', icon: BarChart3 },
    { label: 'Settings', tab: 'settings', icon: Settings },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-[#0B0B12]/95 border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 z-40 select-none backdrop-blur-2xl"
    >
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
              <svg viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5">
                <path d="M 144 256 L 27.598 256 L 144 139.598 Z" />
                <path d="M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z" />
                <path d="M 0 204.402 L 0 112 L 92.402 112 Z" />
              </svg>
            </div>
            {!collapsed && (
              <span className="font-semibold text-base tracking-tight text-white whitespace-nowrap">
                MANAIGER AI
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onTabChange(item.tab)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-300'
                  }`}
                />
                {!collapsed && (
                  <span className="whitespace-nowrap truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-200 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Human Gatekeeping</span>
          </div>
          <div className="text-[11px] text-purple-300/70 leading-relaxed">
            100% of critical decisions require approval.
          </div>
        </div>
      )}
    </motion.aside>
  );
};
