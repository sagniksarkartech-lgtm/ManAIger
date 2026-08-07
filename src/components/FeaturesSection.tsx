import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, FileText, ShieldCheck, Cpu, History, Lock } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Email Agent',
    description:
      'Reads, categorizes, and drafts context-aware responses automatically with enterprise tone alignment.',
    image: '/features/email_agent.png',
  },
  {
    icon: FileText,
    title: 'Invoice Agent',
    description:
      'Extracts structured line items, verifies purchase orders, and reconciles vendor payments seamlessly.',
    image: '/features/invoice_agent.png',
  },
  {
    icon: ShieldCheck,
    title: 'Human Approval',
    description:
      'Keeps critical financial and operational decisions gated with single-click human sign-offs.',
    image: '/features/human_approval.png',
  },
  {
    icon: Cpu,
    title: 'Workflow Automation',
    description:
      'End-to-end orchestration connecting your core business stack, databases, and custom APIs.',
    image: '/features/workflow_automation.png',
  },
  {
    icon: History,
    title: 'Audit Logs',
    description:
      'Immutable, event-driven timeline documenting every action and recommendation taken by AI or human.',
    image: '/features/audit_logs.png',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'SOC2 Type II compliant, end-to-end encrypted with zero data training retention policies.',
    image: '/features/enterprise_security.png',
  },
];

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            CORE CAPABILITIES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            Everything you need to <br className="hidden sm:inline" />
            <span className="purple-gradient-text">automate intelligently</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate('/features')}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 relative border border-white/10 overflow-hidden group flex flex-col justify-between cursor-pointer"
              >
                {/* Purple glow spotlight on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-all duration-500" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-purple-400/60 transition-all duration-300">
                    <Icon className="w-6 h-6 text-purple-300 group-hover:text-purple-200" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>

                  {/* Feature Preview Image */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-purple-500/40 transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center text-xs font-medium text-purple-400/80 group-hover:text-purple-300 transition-colors">
                  <span>Learn more</span>
                  <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
