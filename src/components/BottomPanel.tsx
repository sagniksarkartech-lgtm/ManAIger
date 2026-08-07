import { ArrowRight } from 'lucide-react';

interface FeatureItem {
  number: string;
  label: string;
}

const features: FeatureItem[] = [
  { number: '01', label: 'Workflows' },
  { number: '02', label: 'Approvals' },
  { number: '03', label: 'Compliance' },
];

export const BottomPanel = () => {
  return (
    <div className="mt-auto w-full max-w-5xl px-4 sm:px-6 z-10">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm">
        {/* Row 1 — 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-end">
          {/* Left: micro-label + H2 serif */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              WHAT WE DO
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
              Automate Workflows. <br className="hidden sm:inline" />
              Not Decisions.
            </h2>
          </div>

          {/* Right: body bottom-aligned */}
          <div className="flex items-end">
            <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
              MANAIGER AI uses specialized AI agents to analyze emails, process invoices and recommend actions. Every important decision stays under human control through an approval workflow and complete audit logging.
            </p>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full" />

        {/* Row 2 — 3 interactive rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 py-4 sm:py-6">
          {features.map((item) => (
            <div
              key={item.number}
              className="group bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 cursor-pointer px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
            >
              <div className="flex items-center text-sm sm:text-base">
                <span className="text-[#191919]/40">{item.number}</span>
                <span className="mx-2 text-[#191919]/30">/</span>
                <span className="font-medium text-[#191919]">{item.label}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
