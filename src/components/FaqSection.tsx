import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'AI',
    question: 'How do MANAIGER AI agents handle complex or ambiguous edge cases?',
    answer:
      'When an AI agent encounters a payload below your predefined confidence threshold (e.g. 90%), it automatically flags the task and routes it to your human approval queue with contextual recommendations, ensuring zero hallucinations affect production data.',
  },
  {
    category: 'Security',
    question: 'Is company data protected and SOC2 Type II compliant?',
    answer:
      'Yes. MANAIGER AI is built from the ground up for regulated enterprise environments. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain strict SOC2 Type II compliance and zero data training retention policies.',
  },
  {
    category: 'Pricing',
    question: 'What pricing models are available for enterprise deployment?',
    answer:
      'We offer transparent usage-based tiers alongside custom Enterprise plans. Enterprise packages include dedicated agent deployments, custom workflow engineering, SLA guarantees, and 24/7 dedicated solutions engineering.',
  },
  {
    category: 'Workflow',
    question: 'How long does it take to integrate with existing software and APIs?',
    answer:
      'Most enterprise integrations take less than 10 minutes. MANAIGER AI provides native integrations for Salesforce, HubSpot, QuickBooks, SAP, Zendesk, Gmail, Outlook, and custom REST/GraphQL webhooks.',
  },
  {
    category: 'Agents',
    question: 'Can I customize AI agent behavior and human approval rules?',
    answer:
      'Absolutely. You can define granular business logic, prompt guidelines, role-based approval thresholds, and automated escalation paths directly within the command center dashboard.',
  },
  {
    category: 'Support',
    question: 'What support channels and SLAs are included with MANAIGER AI?',
    answer:
      'Standard plans include priority email and chat support. Enterprise customers receive a dedicated Slack/Teams connect channel, a technical account manager, and a guaranteed 99.9% uptime SLA.',
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="documentation" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-3"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight leading-tight"
          >
            Got Questions? <span className="purple-gradient-text">We Have Answers</span>
          </motion.h2>
        </div>

        {/* 6 Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-bold shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-300' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/[0.06] font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
