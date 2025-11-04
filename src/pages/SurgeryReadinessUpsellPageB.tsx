import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { Shield } from "lucide-react";
import { LogoCarousel } from "../components/LogoCarousel";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import heroImage from "/assets/surgery-hero.webp";
import SimpleSwipeCarousel from "../components/SimpleSwipeCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// --- NEW FUNCTION ADDED HERE ---
export function GallerySection() {
  const images = [
    "/assets/01c579a5598743915ff434681ec8bb1f394d7816.png",
    "/assets/1d3650155b960261d923b43759d5822627f2ff7f.png",
    "/assets/31a0d62591eaf7b51f56d60f63824150a1786f8d.png",
  ];

  return (
    <section className="w-full py-8 md:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          See the Surgery Journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-md">
              <ImageWithFallback
                src={src}
                alt={`Surgery gallery image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// --- END OF NEW FUNCTION ---

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
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-b";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    if (document.getElementById(CS_SCRIPT_ID)) {
      console.log("✅ ContentSquare already loaded");
      return;
    }

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

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        console.log("🧹 Removing ContentSquare script");
        existingScript.remove();
      }
    };
  }, []);

  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  // Images for the SimpleSwipeCarousel
  const carouselImages = [
    "/assets/01c579a5598743915ff434681ec8bb1f394d7816.png",
    "/assets/1d3650155b960261d923b43759d5822627f2ff7f.png",
    "/assets/31a0d62591eaf7b51f56d60f63824150a1786f8d.png",
  ];

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

      {/* Gallery */}
      <GallerySection />

      {/* Recovery Progress Photos */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Recovery Progress Photos
        </h2>
        <SimpleSwipeCarousel images={carouselImages} className="mt-4" />
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  Who is this assessment for?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Men over 60 preparing for surgery</li>
                    <li>Those with health issues like diabetes, high blood pressure, or heart problems</li>
                    <li>Anyone worried about healing slow or facing complications</li>
                    <li>Men who want to stay strong and independent after surgery</li>
                    <li>Anyone who wants a simple plan to improve their outcome</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">Who is this NOT for?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Anyone not planning surgery soon</li>
                    <li>Those expecting the doctor to handle everything</li>
                    <li>People unwilling to make changes</li>
                    <li>Anyone okay with risking a long or painful recovery</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">How will it help you?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>You might be asking yourself:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>“Will my body handle the surgery?”</li>
                    <li>“What if I don’t bounce back?”</li>
                    <li>“What if something goes wrong?”</li>
                  </ul>
                  <p>This assessment gives you control. You’ll get:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A clear picture of your current readiness</li>
                    <li>Insight into what’s putting you at risk</li>
                    <li>Steps to take before surgery to lower that risk</li>
                    <li>A simple plan to heal faster and recover stronger</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">What do I get?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A short, easy assessment (under 10 minutes)</li>
                    <li>Instant results — no waiting</li>
                    <li>A clear, custom action plan</li>
                    <li>The option to get expert help if you want it</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">Why does this matter?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Most people show up for surgery unprepared. That leads to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Longer hospital stays</li>
                    <li>Pain that drags on for weeks</li>
                    <li>Getting stuck in bed</li>
                    <li>Needing more help from others</li>
                    <li>Even re-hospitalization</li>
                  </ul>
                  <p>But you can avoid that. This assessment helps you:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Recover faster</li>
                    <li>Lower your risk</li>
                    <li>Feel more confident</li>
                    <li>Stay independent</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">How long does it take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Less than 10 minutes.</p>
                  <p>No fluff. No medical jargon. Just real answers.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">What happens after I take it?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A breakdown of how prepared your body is</li>
                    <li>What needs improvement — and how to do it</li>
                    <li>Clear next steps (you decide how far to go)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">Is it private?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. 100%. Your answers are safe and confidential.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">Why should I take this now?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Waiting is risky.</p>
                  <p>The sooner you prepare, the better your recovery will be.</p>
                  <p>Don’t wait until it’s too late. Take action now — while you can.</p>
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
              Don’t Walk Into Surgery Blind. <br />
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
                Reduce my surgical risk now (only £37)
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
