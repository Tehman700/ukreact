import React from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment } from '../App';
import { Shield } from 'lucide-react';
import { LogoCarousel } from '../components/LogoCarousel';
import surgeryReadinessImage from 'figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png';
import heroImage from '/assets/surgery-hero.webp';

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: '1',
  name: 'Surgery Readiness Score',
  description:
    'Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.',
  price: 37.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  category: 'Pre-Surgery',
  features: [
    'Pre-surgical health optimization',
    'Risk assessment protocols',
    'Recovery timeline planning',
  ],
};

interface SurgeryReadinessUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function SurgeryReadinessUpsellPage({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (Single Column) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex flex-col gap-8 items-center py-0 px-[14px] pb-[30px]">
          {/* Image */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative aspect-[3/4]">
              <ImageWithFallback
                src={heroImage}
                alt="Surgery Readiness Score Report"
                width={1600}
                height={2000}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 70vw, 500px"
                quality={85}
                priority
                className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Reduce your surgical risks. Today.
              <span className="block text-primary">Or Just Hoping.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Most surgical complications are predictable and preventable. We show you exactly what to fix before it's too late.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartAssessment}
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Reduce my surgical risks now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
                <span>Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Doctor Led</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full" />
                <span>Evidence Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section */}
      <section className="py-8 pt-[35px] pb-[28px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left my-[14px] font-bold">Reduce Risks. Improve Recovery.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Surgery Readiness Score shows what could hold you back — and
              importantly how to fix it before the operation.
            </h2>
            <p className="text-left text-muted-foreground mt-6 whitespace-pre-line">
              🔍 <strong>Spot hidden risks</strong> before they become problems.
              {"\n\n"}🛡️ <strong>Prevent complications</strong> before they happen.
              {"\n\n"}⏱️ <strong>Recover faster</strong> with a body that’s ready.
              {"\n\n"}🧠 <strong>Get a custom plan</strong> built by real doctors.
              {"\n\n"}💸 <strong>Avoid setbacks</strong> that cost time, money, and health.
            </p>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-8">
        <LogoCarousel />
      </section>
    </div>
  );
}
.
