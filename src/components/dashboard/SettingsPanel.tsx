import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Save, Check } from 'lucide-react';

export const SettingsPanel = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    displayName: 'Enterprise Ops Admin',
    email: 'admin@manaiger.ai',
    role: 'Administrator',
    emailNotifications: true,
    approvalAlerts: true,
    weeklyDigest: false,
    autoApproveThreshold: '$500',
    requireMFA: true,
    auditLogging: true,
    theme: 'Dark',
    language: 'English',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <SettingsIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
            <p className="text-xs text-gray-400 mt-0.5">Configure platform preferences and security policies</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Profile</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Display Name</label>
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Role</label>
            <select
              value={settings.role}
              onChange={(e) => setSettings({ ...settings, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0D0C15] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            >
              <option>Administrator</option>
              <option>Operations Manager</option>
              <option>Finance Lead</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive email alerts for workflow completions' },
            { key: 'approvalAlerts' as const, label: 'Approval Alerts', desc: 'Instant alerts when items enter the approval queue' },
            { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Summary report of platform activity every Monday' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-xs font-semibold text-white">{item.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings[item.key] ? 'bg-purple-600' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings[item.key] ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Security & Compliance</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Auto-Approve Threshold</label>
            <select
              value={settings.autoApproveThreshold}
              onChange={(e) => setSettings({ ...settings, autoApproveThreshold: e.target.value })}
              className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-[#0D0C15] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            >
              <option>Disabled (all require approval)</option>
              <option>$100</option>
              <option>$500</option>
              <option>$1,000</option>
              <option>$5,000</option>
            </select>
            <p className="text-[10px] text-gray-500 mt-1">Invoices below this amount are auto-approved by agents</p>
          </div>
          {[
            { key: 'requireMFA' as const, label: 'Require MFA', desc: 'Multi-factor authentication for admin access' },
            { key: 'auditLogging' as const, label: 'Audit Logging', desc: 'Full audit trail for all approval decisions' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-xs font-semibold text-white">{item.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings[item.key] ? 'bg-purple-600' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings[item.key] ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Palette className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Appearance</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0D0C15] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            >
              <option>Dark</option>
              <option>Light (Coming Soon)</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-purple-400" />
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0D0C15] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-colors"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
