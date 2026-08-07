import { motion } from 'framer-motion';
import { Star, Building2 } from 'lucide-react';

const testimonials = [
  {
    quote:
      'MANAIGER AI reduced our invoice processing turnaround from 4 days to under 2 minutes. The human-in-the-loop approval interface gave our finance team complete peace of mind.',
    author: 'Elena Rostova',
    title: 'VP of Financial Operations',
    company: 'Nexus Global Logistics',
    initials: 'ER',
  },
  {
    quote:
      'The Email Agent handles over 10,000 incoming customer inquiries per month with 97% classification accuracy. Our support agents now focus exclusively on high-touch enterprise accounts.',
    author: 'Marcus Vance',
    title: 'Chief Technology Officer',
    company: 'Veloce Commerce',
    initials: 'MV',
  },
  {
    quote:
      'Security and compliance were non-negotiable for us. MANAIGER AI delivered SOC2 compliance out of the box with zero data retention for LLM training.',
    author: 'Sophia Chen',
    title: 'Head of Enterprise Security',
    company: 'Stratos Financial',
    initials: 'SC',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#06060A]/80 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            CUSTOMER STORIES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight"
          >
            Validated by <span className="purple-gradient-text">Industry Leaders</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-400/40 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{item.author}</h4>
                  <div className="text-xs text-purple-300">{item.title}</div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3 text-gray-500" />
                    <span>{item.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
