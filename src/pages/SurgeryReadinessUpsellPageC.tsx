import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { LogoCarousel } from "../components/LogoCarousel";
import { Shield, CheckCircle2, TrendingUp, Heart, Activity, X, Star } from "lucide-react";
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
      console.log("✅ ContentSquare loaded successfully on Surgery Readiness page C");
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

  // NEW: badges for the button section (same shape as your original snippet)
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
    {/* Hero Section (Single Column) */}
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-[14px] py-8">
        <div className="space-y-8 mt-32 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
            The £37 Pre-Op check that could <strong>save you weeks of recovery</strong>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you’ve got a surgery date, your biggest risk isn’t the operation. It’s showing up under-prepared.
          </p>
          <div className="relative mt-10">
            <div className="relative aspect-[3/4] max-w-sm mx-auto mb-[-45px] pb-[20px]">
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

        {/* Trust Badges (inside hero) */}
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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Who this is for</h2>
        <ul className="mt-6 space-y-3 list-disc pl-6">
          <li className="text-base">Men 55+ in the UK with an upcoming elective surgery</li>
          <li className="text-base">Self-starters who want a clear plan and measurable progress</li>
          <li className="text-base">Anyone who wants to walk into pre-assessment confident and well-prepared</li>
          <li className="text-base mb-5">Surgeries we support men with:</li>
        </ul>

        {/* NEW SECTION: Surgery types buttons (directly under the hero) */}
        <div className="mt-5 flex flex-wrap gap-2">
          {surgeryBadges.map((badge, badgeIndex) => (
            <Button
              key={badgeIndex}
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
            <span className="font-semibold">Who it’s not for:</span> if you want a magic pill or plan to ignore the
            action steps, skip this.
          </p>
        </div>
      </div>
    </section>

    {/* What most men miss before surgery */}
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-[14px] py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What most men miss before surgery</h2>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Hospitals focus on the operation. Smart patients focus on the <em>inputs</em> that drive outcomes:
        </p>
        <ul className="mt-6 space-y-3 list-disc pl-6">
          <li className="text-base">
            <span className="font-semibold">Cardiometabolic load</span> (blood pressure, glucose, visceral fat)
          </li>
          <li className="text-base">
            <span className="font-semibold">Inflammation &amp; recovery capacity</span> (sleep, alcohol, stress)
          </li>
          <li className="text-base">
            <span className="font-semibold">Medication burden &amp; interactions</span>
          </li>
          <li className="text-base">
            <span className="font-semibold">Mobility &amp; strength</span> (how well you’ll tolerate anaesthesia and
            bounce back)
          </li>
        </ul>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          If those are off, you’re more likely to have complications and a slower recovery. The fix isn’t “do
          everything.” It’s to find the <em>few</em> levers that move your readiness the most.
        </p>
      </div>
    </section>

    {/* The 10-Minute Solution */}
    <section className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-[14px] py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">The 10-Minute Solution</h2>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Surgical Readiness Assessment distills your pre-op picture into a clear plan you can act on today.
        </p>
        <h3 className="mt-6 font-semibold text-base">What you get immediately:</h3>
        <ul className="mt-4 space-y-3 list-disc pl-6">
          <li className="text-base">
            <span className="font-semibold">Readiness Score</span> — a single number that shows where you stand now.
          </li>
          <li className="text-base">
            <span className="font-semibold">Risk Breakdown</span> — anaesthesia tolerance, cardiometabolic flags,
            inflammation markers, medication burden, mobility/strength.
          </li>
          <li className="text-base">
            <span className="font-semibold">Priority Action Plan (2–3 moves)</span> — the smallest set of changes that
            move the score the most.
          </li>
        </ul>

        {/* Testimonial */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 shadow-sm mt-[50px]">
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-muted-foreground mb-4">
            “At 59, I was nervous about my shoulder surgery—mostly because I didn’t feel ready. I’d lost confidence in
            my strength and worried recovery would take forever. Then I went through this assessment and worked with
            specialist doctors who actually showed me what was holding me back. They helped me build strength safely,
            improve my nutrition, and prepare properly.
          </p>
          <p className="text-muted-foreground mb-4">
            By the time surgery came, I felt stronger and more in control. My recovery was smoother than I ever
            expected—I was moving comfortably and feeling like myself again far sooner than I thought possible.”
          </p>
          <div className="space-y-1">
            <p className="font-medium">David M.</p>
            <p className="text-sm text-muted-foreground">Shoulder Surgery Patient</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why This Works (Without Turning Your Life Upside Down) */}
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-[14px] py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Why this works</h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">(Without turning your life upside down)</p>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Most pre-op advice is generic. We focus on <strong>high-yield inputs</strong>: the 20% of actions that drive
          80% of your readiness. No complicated meal plans. No two-hour gym sessions. Just clear, measurable changes
          that compound quickly over a few weeks.
        </p>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          You’ll know exactly <em>what</em> to do, <em>why</em> it matters, and <em>how</em> it affects your score.
        </p>
      </div>
    </section>

    {/* What Happens After You Buy */}
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-0">
      <div className="max-w-5xl mx-auto px-[14px] py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What happens after you buy</h2>
        <ol className="mt-6 space-y-4 list-decimal pl-6">
          <li className="text-base">Take the 10-minute assessment online. No clinics, no waiting rooms.</li>
          <li className="text-base">See your Readiness Score and Risk Breakdown instantly.</li>
          <li className="text-base">Implement your 2–3 Priority Moves. We include simple how-to guides.</li>
        </ol>
        <div className="mt-8 flex items-center gap-3 text-primary">
          <CheckCircle2 className="w-5 h-5" />
          <p className="text-base font-medium">
            Everything is online, clinically designed, and backed by real-world results.
          </p>
        </div>
      </div>
    </section>

    {/* What it costs (And What It’s Worth) */}
    <section className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-[14px] py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What it costs</h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">(And what it’s worth)</p>
        <ul className="mt-6 space-y-3 list-disc pl-6">
          <li className="text-base">
            <span className="font-semibold">Surgical Readiness Assessment</span> — £37 one-time.
          </li>
        </ul>
        <p className="mt-3 text-base">
          Designed to help you avoid the costly stuff: extra nights in hospital, delayed recovery, time off work,
          anxiety from not knowing.
        </p>
        <p className="mt-6 text-base max-w-3xl">
          <span className="font-semibold">Simple math:</span> if this helps you shave even <strong>2–3 days</strong>{" "}
          off recovery or avoid one avoidable complication, it pays for itself many times over.
        </p>
        <div className="mt-8 flex items-center gap-3 text-primary">
          <Star className="w-5 h-5" />
          <p className="font-medium">Clinically designed. Bespoke to you.</p>
        </div>
      </div>
    </section>

    {/* Testimonial Section */}
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-[14px] my-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm mt-[30px]">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "I'm 67 and was terrified about my hip replacement. This assessment showed me I had low protein and poor
              fitness—things my surgeon never mentioned. I spent 6 weeks preparing properly. Recovery was faster than
              expected and I was walking without a stick in 3 weeks."
            </p>
            <div className="space-y-1">
              <p className="font-medium">Michael R.</p>
              <p className="text-sm text-muted-foreground">Hip Replacement Patient</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "After taking the assessment, I realized my diabetes wasn't as well controlled as I thought. My doctor
              adjusted my medication 2 months before surgery. No infections, no complications. I wish every surgical
              patient knew about this."
            </p>
            <div className="space-y-1">
              <p className="font-medium">James T.</p>
              <p className="text-sm text-muted-foreground">Cardiac Surgery Patient</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "The assessment flagged that I was taking too many medications that could interfere with anesthesia. My
              GP reviewed everything and stopped two unnecessary ones. I felt safer going into surgery knowing this
              had been addressed."
            </p>
            <div className="space-y-1">
              <p className="font-medium">Robert K.</p>
              <p className="text-sm text-muted-foreground">Prostate Surgery Patient</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-0">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="hover:no-underline"> Is this medical advice? </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  It’s an assessment and planning tool designed by clinicians to help you prepare. It does not replace
                  medical advice from your surgeon or GP. Always follow your care team’s instructions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="hover:no-underline"> How fast will I see changes? </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  Most men implement the 2–3 moves within days. Many see sleep, energy, and mobility improvements
                  within 2–3 weeks.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="hover:no-underline"> Will this delay my surgery? </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  No. The aim is to improve readiness before your date. If your Score flags something that needs a
                  clinician’s attention, we’ll say so.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="hover:no-underline"> What if I’m not techy? </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>It’s simple. If you can read email, you can do this.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="hover:no-underline"> What if I need help? </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  You can keep it DIY, join the <strong>21-Day Prehab Challenge</strong>, or apply for the concierge
                  protocol if you want hands-on support.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="relative bg-white py-16 px-0">
      <div className="max-w-5xl mx-auto px-[14px] text-center">
        <div className="space-y-6 mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
            The Bottom Line
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            You’ve got one shot at showing up ready. For £37, you can replace guesswork with a plan.
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
