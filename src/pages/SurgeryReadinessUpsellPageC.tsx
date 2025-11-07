import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { LogoCarousel } from "../components/LogoCarousel";
import {
  Shield,
  CheckCircle2,
  X,
  Star,
} from "lucide-react";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import heroImage from "../assets/SurgeryHeroVarient1.webp";

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

export function SurgeryReadinessUpsellPageC({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  // ContentSquare script injection - only on this page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-c"; // unique for page C
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    if (document.getElementById(CS_SCRIPT_ID)) {
      console.log("✅ ContentSquare already loaded on C");
      return;
    }

    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;

    script.onload = () => {
      console.log(
        "✅ ContentSquare loaded successfully on Surgery Readiness page C"
      );
    };

    script.onerror = () => {
      console.error("❌ Failed to load ContentSquare script (C)");
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        console.log("🧹 Removing ContentSquare script (C)");
        existingScript.remove();
      }
    };
  }, []);

  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  // NEW: badges for the button section
  const surgeryBadges: { label: string }[] = [
    { label: "Knee Surgery" },
    { label: "Hip Replacement" },
    { label: "Shoulder Surgery" },
    { label: "Hernia Repair" },
    { label: "Cataract Surgery" },
    { label: "Gallbladder Surgery" },
    { label: "Heart Surgery" },
    { label: "Cosmetic Surgery" },
    { label: "Weight Loss Surgery" },
    { label: "Prostate Surgery" },
    { label: "Spinal Surgery" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-[14px] py-8">
          <div className="space-y-8 mt-30 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              The £37 Pre-Op check that could{" "}
              <strong>save you weeks of recovery</strong>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you’ve got a surgery date, your biggest risk isn’t the
              operation. It’s showing up under-prepared.
            </p>
            <div className="relative mt-10">
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <ImageWithFallback
                  src={heroImage}
                  alt="Smiling male patient in hospital gown representing the Surgery Readiness Score"
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 500px"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  quality={85}
                  className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
              </div>
            </div>
          </div>

          {/* Trust Badges */}
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
        </div>
      </section>

      {/* Who This Is For */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-[14px] py-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Who this is for
          </h2>
          <ul className="mt-6 space-y-3 list-disc pl-6">
            <li className="text-base">
              Men 55+ in the UK with an upcoming elective surgery
            </li>
            <li className="text-base">
              Self-starters who want a clear plan and measurable progress
            </li>
            <li className="text-base">
              Anyone who wants to walk into pre-assessment confident and
              well-prepared
            </li>
          </ul>

          {/* Surgery Types */}
          <div className="mt-5 flex flex-wrap gap-2">
            {surgeryBadges.map((badge, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="h-auto py-1 px-3 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-white text-foreground border-border hover:bg-muted/50 rounded-lg"
                aria-label={`Surgery type: ${badge.label}`}
              >
                {badge.label}
              </Button>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2">
            <X className="w-5 h-5 text-muted-foreground mt-1" />
            <p className="text-base">
              <span className="font-semibold">Who it’s not for:</span> if you
              want a magic pill or plan to ignore the action steps, skip this.
            </p>
          </div>
        </div>
      </section>

      {/* Additional sections omitted for brevity — all follow same structure */}

      {/* CTA Section */}
      <section className="relative bg-white py-16">
        <div className="max-w-5xl mx-auto px-[14px] text-centre">
          <div className="space-y-6 mt-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
              The Bottom Line
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              You’ve got one shot at showing up ready. For £37, you can replace
              guesswork with a plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleStartAssessment}
                aria-label="Start Surgery Readiness Assessment"
              >
                Start your Surgical Readiness Assessment now
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
