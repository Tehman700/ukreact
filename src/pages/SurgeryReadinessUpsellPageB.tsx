import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { Shield } from "lucide-react";
import { LogoCarousel } from "../components/LogoCarousel";
import { CheckCircle2, Clock, TrendingUp, Heart, Activity, X, Check, Star } from "lucide-react";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
// import heroImage from "/assests/surgery-hero.webp";
import heroImage from "../assets/SurgeryHeroVarient1.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: "90",
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
  // ContentSquare script injection - only on this page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-b";
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
  }, []); // Empty dependency array = runs once on mount

  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

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

 {/* Us vs Them Section */}
      <section className="relative bg-white py-16">
        <div className="max-w-5xl mx-auto px-[14px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
              The Luther Health Difference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most surgical preparation is reactive. We're proactive.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 min-w-[200px]"></th>
                  <th className="text-center py-4 px-4 min-w-[200px]">
                    <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg">
                      Luther Health
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 min-w-[200px] text-muted-foreground">
                    Standard NHS Pathway
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4">Pre-surgical risk assessment</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <span className="text-sm text-muted-foreground">Basic only</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Personalized optimization plan</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <X className="w-6 h-6 text-gray-300" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Nutrition & fitness guidance</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <X className="w-6 h-6 text-gray-300" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Medication review for surgery</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <span className="text-sm text-muted-foreground">Limited</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Instant results</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <span className="text-sm text-muted-foreground">Weeks wait</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Specialist follow-up available</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <X className="w-6 h-6 text-gray-300" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Recovery timeline prediction</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <X className="w-6 h-6 text-gray-300" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Time to complete</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <span className="text-sm">10 minutes</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      <span className="text-sm text-muted-foreground">Multiple appointments</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
 {/* Testimonial Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-[14px]">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-2">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "I'm 67 and was terrified about my hip replacement. This assessment showed me I had low protein and poor fitness—things my surgeon never mentioned. I spent 6 weeks preparing properly. Recovery was faster than expected and I was walking without a stick in 3 weeks."
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
                "After taking the assessment, I realized my diabetes wasn't as well controlled as I thought. My doctor adjusted my medication 2 months before surgery. No infections, no complications. I wish every surgical patient knew about this."
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
                "The assessment flagged that I was taking too many medications that could interfere with anesthesia. My GP reviewed everything and stopped two unnecessary ones. I felt safer going into surgery knowing this had been addressed."
              </p>
              <div className="space-y-1">
                <p className="font-medium">Robert K.</p>
                <p className="text-sm text-muted-foreground">Prostate Surgery Patient</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "I'm a surgeon myself and I took this before my own knee replacement. It's exactly the kind of systematic pre-operative assessment we should all be doing but rarely have time for. Invaluable for patients who want to optimize their outcomes."
              </p>
              <div className="space-y-1">
                <p className="font-medium">Dr. Andrew M.</p>
                <p className="text-sm text-muted-foreground">Orthopedic Surgeon & Patient</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
{/* Image Section (uses SurgeryHeroVarient1.webp 3x) */}
<section className="relative bg-white py-16">
  <div className="max-w-5xl mx-auto px-[14px] text-left">
    <div className="space-y-6 mt-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
        See What’s Possible <br />
        <span className="text-primary">When You Prepare Properly.</span>
      </h2>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
        A picture speaks louder than words — here’s a glimpse of the difference
        proper preparation can make before surgery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <ImageWithFallback
            src={heroImage}
            alt="Preparation example"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="overflow-hidden rounded-2xl shadow-md">
          <ImageWithFallback
            src={heroImage}
            alt="Recovery example"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="overflow-hidden rounded-2xl shadow-md">
          <ImageWithFallback
            src={heroImage}
            alt="Results example"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
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
