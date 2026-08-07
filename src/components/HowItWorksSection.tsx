import { motion } from 'framer-motion';
import { Upload, Compass, Cpu, UserCheck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload Email or Invoice',
    description: 'Trigger requests automatically via email forward, document upload, or API webhook.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Router Agent detects request',
    description: 'Contextual AI router parses intent, urgency, and extracts key payload fields.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Specialized AI Agent processes it',
    description: 'Dedicated Email or Invoice Agent evaluates business rules and drafts recommended action.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Human reviews AI recommendation',
    description: 'Designated approver receives a clean summary card for single-click approval or edit.',
    icon: UserCheck,
  },
  {
    number: '05',
    title: 'Workflow completed',
    description: 'Automated execution is dispatched to downstream systems with complete audit logs.',
    icon: CheckCircle2,
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#060609]/60">
      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            END-TO-END PIPELINE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            How <span className="purple-gradient-text">MANAIGER AI</span> Works
          </motion.h2>
        </div>

        {/* Steps Timeline Container */}
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-indigo-500 to-purple-800 -translate-x-1/2 opacity-30" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-purple-400 font-bold tracking-widest px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30">
                          STEP {step.number}
                        </span>
                        <Icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Badge Node */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[#0E0C16] border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-bold text-sm z-20 shrink-0">
                    {step.number}
                  </div>

                  {/* Spacer for desktop layout balance */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
