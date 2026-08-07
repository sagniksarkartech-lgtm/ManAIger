import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const comparisons = [
  {
    traditionalTitle: 'Manual',
    traditionalDesc: 'Employees waste 15+ hours weekly copying data between tools.',
    manaigerTitle: 'Automated',
    manaigerDesc: 'AI agents execute end-to-end task pipelines instantly 24/7.',
  },
  {
    traditionalTitle: 'Slow',
    traditionalDesc: 'Invoice approvals & email replies sit in bottlenecks for days.',
    manaigerTitle: 'Fast',
    manaigerDesc: 'Instant processing with sub-minute human approval workflows.',
  },
  {
    traditionalTitle: 'Error Prone',
    traditionalDesc: 'Human fatigue leads to lost attachments, mistyped POs & missed SLAs.',
    manaigerTitle: 'Human Approved',
    manaigerDesc: 'AI recommends with 97%+ precision; human confirms with 1-click.',
  },
  {
    traditionalTitle: 'No Visibility',
    traditionalDesc: 'Opaque email threads with no audit trail or operational metrics.',
    manaigerTitle: 'Audit Ready',
    manaigerDesc: 'Full cryptographic event logs documenting every recommendation.',
  },
];

export const WhyManaigerSection = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            THE PARADIGM SHIFT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            Why <span className="purple-gradient-text">MANAIGER AI</span>
          </motion.h2>
        </div>

        {/* 4 Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.manaigerTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {/* Traditional Side */}
                <div className="p-4 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                      TRADITIONAL
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1.5">{item.traditionalTitle}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {item.traditionalDesc}
                  </p>
                </div>

                {/* MANAIGER AI Side */}
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                      MANAIGER AI
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1.5">{item.manaigerTitle}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-normal">
                    {item.manaigerDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
