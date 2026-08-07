import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, LogOut } from 'lucide-react';

export const DashboardHeader = () => {
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 px-6 border-b border-white/10 bg-[#08080C]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search workflows, invoices, agents..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
        />
      </div>

      {/* Right Tools: Notifications, User & Logout */}
      <div className="flex items-center gap-4">
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>All Systems Nominal</span>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.08] transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center border border-[#08080C]">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0D0D14] border border-white/15 shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-purple-400 font-semibold">3 Unread</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="text-white font-semibold">Invoice #INV-8910 Approved</div>
                  <div className="text-gray-400 text-[11px]">Approved by Finance Team 2m ago</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="text-white font-semibold">Email Agent SLA Alert</div>
                  <div className="text-gray-400 text-[11px]">High urgency email queued for review</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-400/40 flex items-center justify-center font-bold text-xs text-white shadow-md">
            AI
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-white tracking-tight">Enterprise Ops Admin</div>
            <div className="text-[10px] text-purple-300 font-mono">admin@manaiger.ai</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:text-white hover:bg-red-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
