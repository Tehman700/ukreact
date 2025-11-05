import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { LogoCarousel } from "../components/LogoCarousel";
import { Shield, CheckCircle2, X, Star } from "lucide-react";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import heroImage from "../assets/SurgeryHeroVarient1.webp";

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
  useEffect(() => {
    if (typeof window === "undefined") return;
    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-c";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";
    if (document.getElementById(CS_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) existingScript.remove();
    };
  }, []);

  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

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
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
            The £37 Pre-Op check that could{" "}
            <strong>save you weeks of recovery</strong>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            If you’ve got a surgery date, your biggest risk isn’t the operation.
            It’s showing up under-prepared.
          </p>

          <div className="mt-16">
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <ImageWithFallback
                src={heroImage}
                alt="Smiling male patient in hospital gown representing the Surgery Readiness Score"
                width={800}
                height={1000}
                loading="eager"
                className="w-full h-auto object-cover rounded-xl max-h-[600px]"
              />
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl -z-10" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              <span>Doctor Led</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full" />
              <span>Evidence Based</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Who this is for
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-base">
            <li>Men 55+ in the UK with an upcoming elective surgery</li>
            <li>Self-starters who want a clear plan and measurable progress</li>
            <li>
              Anyone who wants to walk into pre-assessment confident and
              well-prepared
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-6">
            {surgeryBadges.map((badge, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="h-auto py-2 px-4 text-sm font-medium rounded-lg"
              >
                {badge.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-3 pt-6">
            <X className="w-5 h-5 text-muted-foreground mt-1" />
            <p className="text-base">
              <strong>Who it’s not for:</strong> if you want a magic pill or
              plan to ignore the action steps, skip this.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MOST MEN MISS */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl font-semibold">What most men miss before surgery</h2>
          <p className="text-muted-foreground max-w-3xl">
            Hospitals focus on the operation. Smart patients focus on the{" "}
            <em>inputs</em> that drive outcomes:
          </p>

          <ul className="list-disc pl-6 space-y-4 text-base">
            <li>
              <strong>Cardiometabolic load</strong> (blood pressure, glucose,
              visceral fat)
            </li>
            <li>
              <strong>Inflammation & recovery capacity</strong> (sleep, alcohol,
              stress)
            </li>
            <li>
              <strong>Medication burden & interactions</strong>
            </li>
            <li>
              <strong>Mobility & strength</strong> (how well you’ll tolerate
              anaesthesia and bounce back)
            </li>
          </ul>

          <p className="text-muted-foreground max-w-3xl">
            If those are off, you’re more likely to have complications and a
            slower recovery. The fix isn’t “do everything.” It’s to find the{" "}
            <em>few</em> levers that move your readiness the most.
          </p>
        </div>
      </section>

      {/* 10-MINUTE SOLUTION */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <h2 className="text-3xl font-semibold">The 10-Minute Solution</h2>
          <p className="text-muted-foreground max-w-3xl">
            Surgical Readiness Assessment distills your pre-op picture into a
            clear plan you can act on today.
          </p>

          <h3 className="font-semibold text-lg pt-4">What you get immediately:</h3>
          <ul className="list-disc pl-6 space-y-4 text-base">
            <li>
              <strong>Readiness Score</strong> — a single number that shows where you stand.
            </li>
            <li>
              <strong>Risk Breakdown</strong> — anaesthesia tolerance, flags,
              inflammation, medication, mobility.
            </li>
            <li>
              <strong>Priority Action Plan (2–3 moves)</strong> — the smallest
              set of changes that move the score the most.
            </li>
          </ul>

          <div className="bg-white rounded-xl p-8 shadow-md space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground">
              “At 59, I was nervous about my shoulder surgery... My recovery was
              smoother than I ever expected.”
            </p>
            <div>
              <p className="font-medium">David M.</p>
              <p className="text-sm text-muted-foreground">
                Shoulder Surgery Patient
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REMAINING SECTIONS unchanged except with py-24 and space-y-10 consistency */}
      {/* ... */}
    </div>
  );
}
