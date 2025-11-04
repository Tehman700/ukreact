import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Assessment } from "../App";
import { LogoCarousel } from "../components/LogoCarousel";
import { Shield, CheckCircle2, TrendingUp, Heart, Activity, X, Star } from "lucide-react";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import heroImage from "../assets/SurgeryHeroVarient1.webp";
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

    // Cleanup on unmount
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (Single Column) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-[14px] py-8">
          <div className="space-y-6 mt-10 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              The £37 Pre-Op Check That Could Save You Weeks of Recovery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you’ve got a surgery date, your biggest risk isn’t the operation.
              It’s showing up under-prepared.
            </p>

            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              When “Martin,” 59, got his hip replacement date, the hospital sent a
              leaflet and a checklist. Helpful—until he realised nobody was looking at
              his actual risks: blood pressure creeping up, stubborn belly fat, poor
              sleep, and a medicine cabinet that looked like a mini-pharmacy. He felt
              like he was rolling the dice.
            </p>

            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              That’s the gap <strong>Surgical Readiness Assessment</strong> was built
