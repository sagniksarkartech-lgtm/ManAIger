import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, CheckCircle2, Mail, FileText } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', emails: 38, invoices: 22 },
  { day: 'Tue', emails: 45, invoices: 28 },
  { day: 'Wed', emails: 52, invoices: 31 },
  { day: 'Thu', emails: 41, invoices: 35 },
  { day: 'Fri', emails: 67, invoices: 40 },
  { day: 'Sat', emails: 23, invoices: 12 },
  { day: 'Sun', emails: 18, invoices: 8 },
];

const maxVal = Math.max(...weeklyData.flatMap((d) => [d.emails, d.invoices]));

export const AnalyticsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
          <BarChart3 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Analytics</h2>
          <p className="text-xs text-gray-400 mt-0.5">Platform performance and agent utilisation metrics</p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: '15,284', icon: CheckCircle2, change: '+14.2%', color: 'text-emerald-400' },
          { label: 'Avg Response', value: '0.42s', icon: Clock, change: '-8.5%', color: 'text-emerald-400' },
          { label: 'Emails Processed', value: '8,412', icon: Mail, change: '+22.1%', color: 'text-emerald-400' },
          { label: 'Invoices Processed', value: '6,872', icon: FileText, change: '+9.7%', color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-semibold">{stat.label}</span>
              <stat.icon className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3 h-3" />
              <span className={stat.color}>{stat.change}</span>
              <span className="text-gray-500">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Weekly Agent Activity</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Emails vs Invoices processed per day</p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-purple-500" />
              <span className="text-gray-400">Emails</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
              <span className="text-gray-400">Invoices</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-3 h-48">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="flex items-end gap-1 w-full h-40">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.emails / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex-1 bg-gradient-to-t from-purple-600/80 to-purple-400/60 rounded-t-lg min-h-[4px]"
                  title={`Emails: ${d.emails}`}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.invoices / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 bg-gradient-to-t from-indigo-600/80 to-indigo-400/60 rounded-t-lg min-h-[4px]"
                  title={`Invoices: ${d.invoices}`}
                />
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { name: 'Email Agent', accuracy: 97.8, tasks: '8,412', uptime: '99.97%', color: 'from-purple-600 to-purple-400' },
          { name: 'Invoice Agent', accuracy: 95.3, tasks: '6,872', uptime: '99.94%', color: 'from-indigo-600 to-indigo-400' },
        ].map((agent) => (
          <div key={agent.name} className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="text-sm font-bold text-white mb-4">{agent.name} Performance</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white font-bold">{agent.accuracy}%</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.accuracy}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${agent.color} rounded-full`}
                  />
                </div>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Tasks Processed</span>
                <span className="text-white font-bold">{agent.tasks}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Uptime</span>
                <span className="text-emerald-400 font-bold">{agent.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
