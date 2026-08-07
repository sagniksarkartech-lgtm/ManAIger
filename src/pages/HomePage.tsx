import { AnimatedPage } from '../components/AnimatedPage';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { AiAgentsSection } from '../components/AiAgentsSection';
import { DashboardPreviewSection } from '../components/DashboardPreviewSection';
import { WhyManaigerSection } from '../components/WhyManaigerSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';

export const HomePage = () => {
  return (
    <AnimatedPage>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiAgentsSection />
      <DashboardPreviewSection />
      <WhyManaigerSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </AnimatedPage>
  );
};
