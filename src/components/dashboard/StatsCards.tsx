import { motion } from 'framer-motion';
import { ShieldCheck, Clock, TrendingUp, Bot } from 'lucide-react';

const stats = [
  {
    title: 'Automation Accuracy',
    value: '97.8%',
    subtitle: 'Tested across 500K+ payloads',
    icon: ShieldCheck,
    badge: 'Verified',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    title: 'Pending Approvals',
    value: '12',
    subtitle: 'Requires human gatekeeper sign-off',
    icon: Clock,
    badge: 'Action Required',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    title: 'Processed Workflows',
    value: '15,284',
    subtitle: 'Sub-minute avg execution time',
    icon: TrendingUp,
    badge: '↑ +14.2%',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  },
  {
    title: 'Active AI Agents',
    value: '2',
    subtitle: 'Email Agent & Invoice Agent',
    icon: Bot,
    badge: 'Running',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">{item.title}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                  {item.value}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>{item.subtitle}</span>
              <Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
