import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import Slider from "react-slick";
import { ShoppingBasket } from "../components/ShoppingBasket";
import { Assessment, BasketItem } from "./AssessmentsPage";
import { SurgeryAdditionalCarousels } from "../components/SurgeryAdditionalCarousels";
import biologicalAgeImage from "/assests/completed02.webp";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";

import {
  ArrowLeft,
  Activity,
  Apple,
  Pill,
  Cigarette,
  Bed,
  FileText,
  Home,
  Users,
  ShoppingBag,
  Calendar,
  TrendingUp,
  X,
  Shield,
  Mail,
  Lock,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const surgeryReadinessAssessment: Assessment = {
  id: "1",
  name: "Surgery Readiness Score",
  description:
    "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
  price: 1.0,
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

export function SurgeryPreparationChecklistPage({
  onAddToBasket: externalAddToBasket,
  onOpenBasket: externalOpenBasket,
}: SurgeryPreparationChecklistPageProps = {}) {
  console.log("🏗️ SurgeryPreparationChecklistPage MOUNTED");
  console.log("🔧 Props received:", {
    hasExternalAddToBasket: !!externalAddToBasket,
    hasExternalOpenBasket: !!externalOpenBasket,
  });

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<any>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [targetScore, setTargetScore] = useState(49);

  // Dynamic score (1-100) - can be passed as prop or fetched
  
  // Animated score state - starts at 0 and animates to targetScore
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const loadReport = () => {
      try {
        setLoading(true);

        const storedReport = sessionStorage.getItem('assessmentReport');
        const storedAssessmentType = sessionStorage.getItem('assessmentType');

        console.log('Loading stored report:', storedReport ? 'Found' : 'Not found');

        if (!storedReport) {
          throw new Error('No assessment report found. Please complete the assessment first.');
        }

        console.log(storedReport);

        const report = JSON.parse(storedReport);

        if (storedAssessmentType !== 'Surgery Readiness') {
          console.warn('Assessment type mismatch:', storedAssessmentType);
        }

        console.log('Report loaded successfully:', {
          overallScore: report.overallScore,
          categoriesCount: report.results?.length || 0
        });

        setAiReport(report);

        setTargetScore(report.overallScore || 49);

      } catch (err) {
        console.error('Error loading report:', err);
        setError(err instanceof Error ? err.message : 'Unable to load report');
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  // Animation effect - animate from 0 to targetScore on mount
  useEffect(() => {
    const duration = 2500; // Animation duration in ms (slower)
    const startTime = Date.now();
    const startValue = 0;
    const endValue = targetScore;

    // Easing function for ultra smooth animation (ease-in-out sine)
    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const animateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutSine(progress);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
      
      setAnimatedScore(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    // Start animation after a small delay
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animateScore);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [targetScore]);

  // Apply page-scoped body classes while this page is mounted
  useEffect(() => {
    const classes = ["md:overflow-auto", "overflow-hidden", "h-screen"];
    classes.forEach((c) => document.body.classList.add(c));
    return () => {
      classes.forEach((c) => document.body.classList.remove(c));
    };
  }, []);

  // Calculate gauge indicator position based on score (1-100)
  const getGaugeIndicatorPosition = (scoreValue: number) => {
    // Clamp score between 0 and 100
    const clampedScore = Math.max(0, Math.min(100, scoreValue));
    
    // Arc parameters (based on SVG viewBox 0 0 204 110)
    const centerX = 102;
    const centerY = 104;
    const radius = 96;
    
    // Convert score to angle (π to 0, left to right)
    // Score 0 = 180° (left), Score 100 = 0° (right)
    const angle = Math.PI * (1 - clampedScore / 120);
    
    // Calculate position on arc
    const cx = centerX + radius * Math.cos(angle);
    const cy = centerY - radius * Math.sin(angle);
    
    return { cx, cy };
  };

  // Get indicator color based on score
  const getIndicatorColor = (scoreValue: number) => {
    if (scoreValue < 20) return "#EA916E"; // Red/orange
    if (scoreValue < 60) return "#F5BC3A"; // Yellow
    if (scoreValue < 75) return "#9FE377"; // Light green
    return "#2ECE7E"; // Green
  };

  const indicatorPos = getGaugeIndicatorPosition(animatedScore);
  const indicatorColor = getIndicatorColor(animatedScore);

  const addToBasket = (assessment: Assessment) => {
    console.log("🛒 addToBasket called with:", assessment.name);

    // Use external basket function if provided, otherwise use local state
    if (externalAddToBasket) {
      console.log("📤 Using EXTERNAL addToBasket function");
      externalAddToBasket(assessment);
      if (externalOpenBasket) {
        console.log("📤 Calling EXTERNAL openBasket");
        externalOpenBasket();
      }
      return;
    }

    console.log("📥 Using LOCAL basket state");
    // Fallback to local state management
    setBasketItems((prev) => {
      const existingItem = prev.find(
        (item) => item.assessment.id === assessment.id
      );
      if (existingItem) {
        return prev.map((item) =>
          item.assessment.id === assessment.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { assessment, quantity: 1 }];
    });
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems((prev) =>
      prev.filter((item) => item.assessment.id !== assessmentId)
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce(
      (total, item) => total + item.assessment.price * item.quantity,
      0
    );
  };


  const handleStartAssessment = () => {
    console.log("🎯 handleStartAssessment called");
    console.log("📦 Assessment to add:", surgeryReadinessAssessment);
    console.log("🔧 externalAddToBasket exists:", !!externalAddToBasket);
    console.log("🔧 externalOpenBasket exists:", !!externalOpenBasket);

    sessionStorage.setItem("surgery_variant", "A");

    addToBasket(surgeryReadinessAssessment);
    setEmailFormVisible(false);

    // Open basket - either external or local
    if (externalOpenBasket) {
      console.log("✅ Opening EXTERNAL basket");
      externalOpenBasket();
    } else {
      console.log("✅ Opening LOCAL basket");
      setIsBasketOpen(true);
    }
  };




  // Show error state if report not found
  if (error || !aiReport) {
    return (
      <div className="risk-driver-container bg-gray-100 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full bg-white max-w-md mx-4 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Report Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || 'No assessment report found. Please complete the assessment first.'}
            </p>
            <Button 
              onClick={() => window.location.hash = 'surgery-readiness-assessment-questions'}
              className="w-full"
            >
              Back to Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="risk-driver-container bg-gray-100 h-screen flex flex-col items-center overflow-hidden">
      <div className="w-full bg-white max-w-md h-screen flex flex-col overflow-hidden">
        {/* White card for results */}
        <div className="bg-white m-4 flex-1 flex flex-col overflow-y-auto min-h-0">
          <div className="risk-driver-main sm:p-6 flex-shrink-0">
            <h1 className="risk-driver-title font-bold text-gray-900 mb-4">
              Your free results
            </h1>

            {/* Semi-circular Progress Gauge */}
            <div className="flex relative flex-col items-center mb-4">
              <div className="w-40 sm:w-48 h-25 sm:h-28">
          

                <svg className="w-full h-full" viewBox="0 0 204 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M200.361 107.186C201.855 107.186 203.07 105.974 203.03 104.481C202.377 79.8042 192.802 56.2014 176.092 38.075C175.076 36.9729 173.354 36.9536 172.282 38.0016C171.215 39.0455 171.197 40.754 172.207 41.8532C187.94 58.9657 196.967 81.2146 197.618 104.48C197.66 105.974 198.867 107.186 200.361 107.186Z" fill="#2ECE7E"/>
                  <path d="M171.42 37.1049C172.475 36.0476 172.477 34.3335 171.395 33.3046C153.532 16.3192 130.118 6.41879 105.521 5.44989C104.024 5.39092 102.794 6.59391 102.775 8.09203C102.756 9.58999 103.956 10.8156 105.453 10.8768C128.634 11.8248 150.696 21.1517 167.557 37.1319C168.645 38.1631 170.362 38.1663 171.42 37.1049Z" fill="#9FE377"/>
                  <path d="M99.4775 8.10576C99.4465 6.60781 98.2062 5.41494 96.7097 5.48627C72.1211 6.65827 48.7892 16.7517 31.0668 33.884C29.9932 34.9218 30.0097 36.6358 31.0727 37.6844C32.1399 38.737 33.8567 38.7196 34.9361 37.6795C51.6655 21.5606 73.6502 12.0518 96.8228 10.9124C98.319 10.8389 99.5086 9.60348 99.4775 8.10576Z" fill="#F5BC3A"/>
                  <path d="M29.1041 39.7719C28.007 38.7507 26.286 38.8125 25.2976 39.9392C9.03828 58.4732 0.0465395 82.3055 5.72177e-06 106.991C-0.00281093 108.485 1.24173 109.666 2.73544 109.629C4.22886 109.592 5.40567 108.351 5.41071 106.857C5.48913 83.5823 13.9669 61.1166 29.2743 43.6203C30.2574 42.4966 30.197 40.7891 29.1041 39.7719Z" fill="#EA916E"/>
                  {/* Dynamic indicator circle based on score */}
                  <circle
                    cx={indicatorPos.cx}
                    cy={indicatorPos.cy}
                    r="9"
                    fill="white"
                    stroke={indicatorColor}
                    strokeWidth="5"
                  />
                </svg>

              </div>
              <div className="text-center absolute mt-2 bottom-0">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {animatedScore}
                  <span className="text-lg sm:text-xl font-normal text-gray-400">
                    /100
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Surgery readiness</p>
              </div>
            </div>

            {/* Top 3 risk drivers */}
            <div className="mt-4">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-4">
                Top 3 risk drivers
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((id) => (
                  <div
                    key={id}
                    className="risk-driver-item flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg width="12" height="16" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 2.238 4.238 0 7 0C9.762 0 12 2.238 12 5V8H12.4C13.28 8 14 8.72 14 9.6V16.6C14 17.92 12.92 19 11.6 19H2.4C1.08 19 0 17.92 0 16.6V9.6C0 8.72 0.72 8 1.6 8H2V5ZM10 5V8H4V5C4 3.342 5.342 2 7 2C8.658 2 10 3.342 10 5ZM7 10.25C6.60234 10.2496 6.21639 10.3846 5.90573 10.6329C5.59507 10.8811 5.37822 11.2278 5.2909 11.6157C5.20357 12.0037 5.25098 12.4098 5.42531 12.7672C5.59965 13.1246 5.89051 13.412 6.25 13.582V16C6.25 16.1989 6.32902 16.3897 6.46967 16.5303C6.61032 16.671 6.80109 16.75 7 16.75C7.19891 16.75 7.38968 16.671 7.53033 16.5303C7.67098 16.3897 7.75 16.1989 7.75 16V13.582C8.10949 13.412 8.40035 13.1246 8.57469 12.7672C8.74902 12.4098 8.79643 12.0037 8.7091 11.6157C8.62178 11.2278 8.40493 10.8811 8.09427 10.6329C7.78361 10.3846 7.39766 10.2496 7 10.25Z" fill="#858585"/>
                        </svg>
                      </div>
                      <div
                        className="text-gray-600 text-lg lg:text-base font-bold select-none"
                        style={{
                          filter: "blur(4px)",
                          WebkitFilter: "blur(4px)",
                          userSelect: "none",
                        }}
                      >
                        RiskfactorhiddenRiskfactorabcd
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

       
        </div>
               {/* Unlock card - separate from results card */}
          <div className="bg-white bottom-0 unlock-plan-section sm:p-6 flex-shrink-0">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              Unlock your personalised plan
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5ZM5.18613 7.854L8.35267 3.89547L7.78067 3.43787L5.08053 6.81193L3.168 5.2184L2.69867 5.7816L5.18613 7.854Z" fill="#89BF57"/>
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-gray-600">
                  See your full score and risk
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5ZM5.18613 7.854L8.35267 3.89547L7.78067 3.43787L5.08053 6.81193L3.168 5.2184L2.69867 5.7816L5.18613 7.854Z" fill="#89BF57"/>
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-gray-600">
                  Get the exact steps to reverse risks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5ZM5.18613 7.854L8.35267 3.89547L7.78067 3.43787L5.08053 6.81193L3.168 5.2184L2.69867 5.7816L5.18613 7.854Z" fill="#89BF57"/>
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-gray-600">
                  30 day full refund guarantee
                </span>
              </div>
            </div>

            {/* Payment icons and guarantee badge */}
            {/* Payment icons and guarantee badge for desktop */}
            <div className="hidden sm:flex items-end justify-between mb-4 relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="payment-badge">
                  <img src="/assests/apple-p-icn.png" alt="Apple Pay" className="payment-badge-icon-apple" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/s-p-icn.png" alt="Stripe" className="payment-badge-icon-stripe" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/v-p-icn.png" alt="Visa" className="payment-badge-icon-visa" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src="/assests/lg-imgt.png" alt="30 Day Money Back Guarantee" className="guarantee-badge guarantee-badge-lg" />
              </div>
            </div>

            {/* Payment icons and guarantee badge for mobile */}
            <div className="flex sm:hidden items-end justify-between mb-4 relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="payment-badge">
                  <img src="/assests/apple-icn.png" alt="Apple Pay" className="payment-badge-icon-apple" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/stripe-icn.png" alt="Stripe" className="payment-badge-icon-stripe" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/v-icn.png" alt="Visa" className="payment-badge-icon-visa" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src="/assests/lg-imgt.png" alt="30 Day Money Back Guarantee" className="guarantee-badge guarantee-badge-lg" />
              </div>
            </div>

            <Button
              onClick={handleStartAssessment}
              size="lg"
              className="w-full"
              aria-label="Start Surgery Readiness Score assessment"
            >
              Unlock My Full Plan (£37)
            </Button>
          </div>
      </div>
  

      {/* Shopping Basket - Only render if using local state */}
      {!externalAddToBasket && (
        <ShoppingBasket
          isOpen={isBasketOpen}
          onClose={() => setIsBasketOpen(false)}
          items={basketItems}
          onRemoveItem={removeFromBasket}
          onUpgradeToBundle={() => {}}
          totalPrice={getTotalPrice()}
        />
      )}
    </div>
  );
}

export default SurgeryPreparationChecklistPage;
