import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { Shield } from "lucide-react";
import { LogoCarousel } from "../components/LogoCarousel";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import heroImage from "/assests/surgery-hero.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

declare global {
  interface Window {
    _uxa?: {
      push: (args: any[]) => void;
    };
  }
}

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: "1",
  name: "Surgery Readiness Score",
  description:
    "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
  price: 39.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  category: "Pre-Surgery",
  features: [
    "Pre-surgical health optimization",
    "Risk assessment protocols",
    "Recovery timeline planning",
  ],
};

interface SurgeryReadinessUpsellFinalBProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function SurgeryReadinessUpsellFinalB({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellFinalBProps) {
  const handleStartAssessment = () => {
    // Track ContentSquare event
    if (window._uxa && typeof window._uxa.push === 'function') {
      window._uxa.push(['trackDynamicVariable', {
        key: 'cta_click',
        value: 'reduce_surgical_risk_button'
      }]);
      console.log('✅ ContentSquare event tracked: CTA button clicked');
    }

    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  // ContentSquare script injection - only on this page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    // Check if script already exists
    if (document.getElementById(CS_SCRIPT_ID)) {
      console.log("✅ ContentSquare already loaded");
      return;
    }

    // Create and inject script
    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;

    script.onload = () => {
      console.log("✅ ContentSquare loaded successfully on Surgery Readiness page");
    };

    script.onerror = () => {
      console.error("❌ Failed to load ContentSquare script");
    };

    document.head.appendChild(script);

    // Cleanup: Remove script when component unmounts (user navigates away)
    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        console.log("🧹 Removing ContentSquare script");
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (Single Column) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-[14px] py-8">
          <div className="space-y-6 mt-10 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Reduce your surgical risks.<strong> Today</strong>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most surgical complications are predictable and preventable. We show you exactly what to fix before it's too late.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>

            <div className="relative mt-10">
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <ImageWithFallback
                  src={heroImage}
                  alt="Smiling male patient in hospital gown representing the Surgery Readiness Score"
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 500px"
                  fetchpriority="high"
                  decoding="async"
                  quality={85}
                  className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-4 bg-white">
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
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
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the Surgery Readiness Score?</AccordionTrigger>
                <AccordionContent>
                  It's a structured health assessment designed to identify and reduce modifiable risks before surgery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Who is this for?</AccordionTrigger>
                <AccordionContent>
                  Adults preparing for elective surgery—especially those over 60 or with existing health conditions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does it take?</AccordionTrigger>
                <AccordionContent>
                  The assessment itself takes about 10–15 minutes; your personalized guidance is immediate.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-white py-16">
        <div className="max-w-5xl mx-auto px-[14px] text-left">
          <div className="space-y-6 mt-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
              Don't Walk Into Surgery Blind. <br />
              <span className="text-primary">Know Your Risks. <br />Fix Them Now.</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              If you're over 60 and have health issues, don't leave your recovery to chance.
              This quick assessment could save you weeks of pain and problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleStartAssessment}
                aria-label="Start Surgery Readiness Score assessment"
              >
                Reduce my surgical risk now (only £39)
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </section>

      {/* Logo carousel */}
      <div className="container mx-auto px-4 pb-12">
        <LogoCarousel />
      </div>
    </div>
  );
}