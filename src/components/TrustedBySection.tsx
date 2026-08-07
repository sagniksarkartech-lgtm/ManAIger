import { motion } from 'framer-motion';

const companies = [
  { name: 'ACME Corp', logo: 'ACME CORP' },
  { name: 'Veloce AI', logo: 'VELOCE' },
  { name: 'Stratos Labs', logo: 'STRATOS' },
  { name: 'Hyperion', logo: 'HYPERION' },
  { name: 'Pulse Systems', logo: 'PULSE' },
  { name: 'Nexus Enterprise', logo: 'NEXUS' },
];

export const TrustedBySection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative border-y border-white/[0.06] bg-[#0A0A10]/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400 font-semibold mb-8 sm:mb-12"
        >
          Trusted by innovative teams
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-12 items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
        >
          {companies.map((comp) => (
            <div
              key={comp.name}
              className="flex items-center justify-center p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all group"
            >
              <span className="font-sans font-bold text-sm sm:text-base tracking-wider text-gray-400 group-hover:text-purple-300 transition-colors">
                {comp.logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
