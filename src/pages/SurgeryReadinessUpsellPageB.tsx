import React from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { Shield } from "lucide-react";
import { LogoCarousel } from "../components/LogoCarousel";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import heroImage from "/assests/surgery-hero.webp";
import SurgeryHeroVarient1 from "../assets/SurgeryHeroVarient1.webp";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: "1",
  name: "Surgery Readiness Score",
  description:
    "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
  price: 37.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  category: "Pre-Surgery",
  features: [
    "Pre-surgical health optimization",
    "Risk assessment protocols",
    "Recovery timeline planning",
  ],
};

interface SurgeryReadinessUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function SurgeryReadinessUpsellPageB({
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
        <div className="max-w-5xl mx-auto px-[14px] py-8">
          {/* Text */}
          <div className="space-y-6 mt-10 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Reduce your surgical risks.<strong> Today</strong>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most surgical complications are predictable and preventable. We show you exactly what to fix before it's too late.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Buttons or CTA could go here */}
            </div>

            {/* Image moved to bottom */}
            <div className="relative mt-10">
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <ImageWithFallback
                 src={SurgeryHeroVarient1}
                  alt="Surgery Readiness Score Report"
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 500px"
                  quality={85}
                  priority
                  className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>



     


  {/* CTA Section */}
<section className="relative bg-white py-16">
  <div className="max-w-5xl mx-auto px-[14px] text-left">
    <div className="space-y-6 mt-10">
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
        If you're over 60 and have health issues, don't leave your recovery to chance. 
        This quick assessment could save you weeks of pain and problems.
      </p>

     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
  <Button 
    size="lg" 
    className="w-full sm:w-auto"
    onClick={handleStartAssessment}
  >
    Reduce my surgical risk now (only £37)
  </Button>
</div>

    </div>
  </div>

  {/* Subtle hairline divider */}
  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
</section>



      {/* Logo carousel at the bottom */}
      <div className="container mx-auto px-4 pb-12">
        <LogoCarousel />
      </div>
    </div>
  );
}
