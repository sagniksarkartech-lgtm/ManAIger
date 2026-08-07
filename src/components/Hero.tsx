import { BoomerangVideoBg } from './BoomerangVideoBg';
import { BottomPanel } from './BottomPanel';

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen w-full">
      {/* Full-bleed Boomerang Video Background */}
      <BoomerangVideoBg />

      {/* Hero Copy Content */}
      <div className="z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/60 font-medium mb-2.5 sm:mb-3">
          AI Workflow Automation Platform
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter text-[#191919] font-normal">
          Let AI Agents <br />
          Manage Your Work — <br />
          You Stay In Control.
        </h1>

        <p className="max-w-sm sm:max-w-xl mt-4 sm:mt-5 text-sm md:text-base text-[#191919]/70 leading-relaxed">
          MANAIGER AI intelligently automates business workflows including emails, invoices, approvals and repetitive operations while keeping humans in complete control.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="/signup"
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 inline-block"
          >
            Sign Up Free
          </a>
          <a
            href="#watch-demo"
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white/80 backdrop-blur-sm border border-gray-300 text-[#191919] text-sm font-medium rounded-lg hover:bg-white transition-colors duration-200 inline-block"
          >
            Watch Demo
          </a>
        </div>

        {/* Four Statistics */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-semibold text-[#191919]">97.8%</span>
            <span className="text-[11px] sm:text-xs text-[#191919]/60 font-medium mt-0.5">Automation Accuracy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-semibold text-[#191919]">15,000+</span>
            <span className="text-[11px] sm:text-xs text-[#191919]/60 font-medium mt-0.5">Workflows Processed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-semibold text-[#191919]">2</span>
            <span className="text-[11px] sm:text-xs text-[#191919]/60 font-medium mt-0.5">AI Agents</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-semibold text-[#191919]">24/7</span>
            <span className="text-[11px] sm:text-xs text-[#191919]/60 font-medium mt-0.5">Business Automation</span>
          </div>
        </div>
      </div>

      {/* Bottom Info Panel anchored to bottom of hero section */}
      <BottomPanel />
    </section>
  );
};
