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

interface ChecklistStep {
  id: number;
  title: string;
  timeline: string;
  icon: React.ReactNode;
  description: string;
  actionItems: string[];
  whyItMatters: string;
  clinicalGuidance: string;
  completed: boolean;
}

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

  // Dynamic score (1-100) - can be passed as prop or fetched
  const targetScore = 49;
  
  // Animated score state - starts at 0 and animates to targetScore
  const [animatedScore, setAnimatedScore] = useState(0);

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

  const handleBackToAssessments = () => {
    window.history.back();
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

  const steps: ChecklistStep[] = [
    {
      id: 1,
      title: "Schedule Pre-Operative Assessment",
      timeline: "6-8 weeks before surgery",
      icon: <Calendar className="h-5 w-5" />,
      description:
        "Book your comprehensive pre-operative medical assessment to evaluate your fitness for surgery.",
      actionItems: [
        "Contact your surgical team or GP to arrange assessment",
        "Request blood tests, ECG, and any required imaging",
        "Compile your complete medical history and current medications",
        "Note any allergies or previous adverse reactions to medications",
        "Prepare questions about the procedure and recovery",
      ],
      whyItMatters:
        "Pre-operative assessment identifies potential risks and allows time to optimize your health before surgery. Studies show proper preoperative evaluation reduces complications by up to 30%.",
      clinicalGuidance:
        "NICE guidelines recommend thorough preoperative assessment for all elective procedures. This typically includes cardiovascular assessment, respiratory function, and metabolic screening to ensure you're in optimal condition for surgery.",
      completed: false,
    },
    {
      id: 2,
      title: "Optimize Your Physical Fitness",
      timeline: "6-8 weeks before surgery",
      icon: <Activity className="h-5 w-5" />,
      description:
        "Implement a structured exercise program to improve your cardiovascular fitness and muscular strength.",
      actionItems: [
        "Aim for 150 minutes of moderate aerobic exercise weekly",
        "Include resistance training 2-3 times per week",
        "Focus on core strengthening and mobility exercises",
        "Gradually increase intensity under professional guidance",
        "Consider working with a physiotherapist for surgery-specific preparation",
      ],
      whyItMatters:
        "Enhanced Recovery After Surgery (ERAS) protocols demonstrate that preoperative physical conditioning can reduce hospital stay by 2-3 days and lower complication rates significantly.",
      clinicalGuidance:
        "Research shows that 'prehabilitation' programs improve surgical outcomes. The Royal College of Surgeons emphasizes that physically fitter patients experience better recovery trajectories and reduced postoperative complications.",
      completed: false,
    },
    {
      id: 3,
      title: "Optimize Nutrition & Body Composition",
      timeline: "6-8 weeks before surgery",
      icon: <Apple className="h-5 w-5" />,
      description:
        "Adjust your diet to support healing, optimize body composition, and prepare your metabolic system.",
      actionItems: [
        "Increase protein intake to 1.2-1.5g per kg body weight",
        "Ensure adequate vitamin D, vitamin C, and zinc levels",
        "Minimize processed foods and refined sugars",
        "Stay well-hydrated (2-3 litres of water daily)",
        "Consider consultation with a nutritionist for personalized guidance",
        "If overweight, work toward modest weight reduction (5-10%)",
      ],
      whyItMatters:
        "Optimal nutrition supports wound healing, immune function, and metabolic stability. Adequate protein intake is particularly crucial for tissue repair and recovery.",
      clinicalGuidance:
        "ESPEN (European Society for Clinical Nutrition) guidelines recommend nutritional optimization before major surgery. Poor nutritional status is associated with increased infection risk and delayed wound healing.",
      completed: false,
    },
    {
      id: 4,
      title: "Review and Optimize Medications",
      timeline: "4-6 weeks before surgery",
      icon: <Pill className="h-5 w-5" />,
      description:
        "Conduct a comprehensive medication review with your healthcare provider to ensure optimal perioperative management.",
      actionItems: [
        "List all prescription medications with doses and frequencies",
        "Include all over-the-counter medications and supplements",
        "Discuss any anticoagulants or antiplatelet medications",
        "Identify medications that may need to be stopped or adjusted",
        "Ensure optimal control of chronic conditions (diabetes, hypertension)",
        "Plan for medication management during recovery period",
      ],
      whyItMatters:
        "Certain medications can increase surgical risks or interact with anesthesia. Proper medication management is essential for safety and optimal outcomes.",
      clinicalGuidance:
        "NICE perioperative guidelines emphasize comprehensive medication review. Anticoagulants, antiplatelet agents, and some supplements may need to be discontinued at specific intervals before surgery.",
      completed: false,
    },
    {
      id: 5,
      title: "Eliminate Smoking and Limit Alcohol",
      timeline: "Minimum 4 weeks before surgery",
      icon: <Cigarette className="h-5 w-5" />,
      description:
        "Completely cease smoking and significantly reduce or eliminate alcohol consumption.",
      actionItems: [
        "Stop smoking completely at least 4 weeks before surgery",
        "Consider nicotine replacement therapy or cessation programs",
        "Reduce alcohol to no more than 2 units per day",
        "Plan to remain abstinent for at least 2 weeks post-surgery",
        "Seek support from smoking cessation services if needed",
        "Inform your surgical team of your smoking/alcohol history",
      ],
      whyItMatters:
        "Smoking increases surgical complications by 3-6 fold, including wound infections, respiratory complications, and impaired healing. Alcohol can interfere with anesthesia and medication metabolism.",
      clinicalGuidance:
        "Royal College of Anaesthetists and NICE strongly recommend smoking cessation at minimum 4 weeks (ideally 8 weeks) before surgery. Even short-term cessation significantly reduces complication rates.",
      completed: false,
    },
    {
      id: 6,
      title: "Optimize Sleep and Stress Management",
      timeline: "4-6 weeks before surgery",
      icon: <Bed className="h-5 w-5" />,
      description:
        "Establish healthy sleep patterns and implement stress reduction techniques to support your body's healing capacity.",
      actionItems: [
        "Aim for 7-9 hours of quality sleep per night",
        "Maintain consistent sleep and wake times",
        "Practice relaxation techniques (meditation, deep breathing)",
        "Consider mindfulness or cognitive behavioral therapy",
        "Limit screen time before bed",
        "Address any sleep disorders with your healthcare provider",
      ],
      whyItMatters:
        "Adequate sleep supports immune function, wound healing, and metabolic health. Chronic sleep deprivation is associated with increased surgical complications and slower recovery.",
      clinicalGuidance:
        "Research demonstrates that perioperative sleep quality impacts immune function and inflammatory responses. Stress management techniques are associated with reduced anxiety and improved surgical experiences.",
      completed: false,
    },
    {
      id: 7,
      title: "Complete Required Documentation",
      timeline: "3-4 weeks before surgery",
      icon: <FileText className="h-5 w-5" />,
      description:
        "Ensure all administrative, legal, and insurance documentation is properly completed and filed.",
      actionItems: [
        "Review and sign surgical consent forms",
        "Understand the procedure, risks, and expected outcomes",
        "Verify insurance coverage and pre-authorization",
        "Complete advance directive or living will if desired",
        "Arrange time off work and notify employer",
        "Document any specific preferences or concerns",
        "Obtain copies of all medical records and test results",
      ],
      whyItMatters:
        "Proper documentation ensures legal protection, financial clarity, and that your preferences are respected throughout your surgical journey.",
      clinicalGuidance:
        "Informed consent is both a legal and ethical requirement. Take time to understand all aspects of your procedure and don't hesitate to ask questions before signing consent forms.",
      completed: false,
    },
    {
      id: 8,
      title: "Prepare Your Home for Recovery",
      timeline: "2-3 weeks before surgery",
      icon: <Home className="h-5 w-5" />,
      description:
        "Modify your living space to facilitate safe and comfortable recovery after surgery.",
      actionItems: [
        "Set up a recovery area on the ground floor if possible",
        "Remove trip hazards (loose rugs, clutter, cords)",
        "Install grab bars in bathroom if needed",
        "Prepare comfortable seating with good back support",
        "Stock up on easy-to-prepare, nutritious meals",
        "Place frequently used items within easy reach",
        "Ensure adequate lighting throughout your home",
        "Consider renting or purchasing mobility aids if needed",
      ],
      whyItMatters:
        "A properly prepared home environment reduces fall risk, promotes independence, and supports a smoother recovery process.",
      clinicalGuidance:
        "Occupational therapy guidelines emphasize environmental preparation for post-surgical patients. Fall prevention is particularly important during the recovery period when mobility may be compromised.",
      completed: false,
    },
    {
      id: 9,
      title: "Arrange Support Network and Transportation",
      timeline: "2-3 weeks before surgery",
      icon: <Users className="h-5 w-5" />,
      description:
        "Organize a reliable support system for surgery day and the initial recovery period.",
      actionItems: [
        "Arrange transportation to and from the hospital",
        "Confirm someone will stay with you for the first 24-48 hours",
        "Identify friends or family who can help with daily tasks",
        "Plan for assistance with meals, household chores, and errands",
        "Share your recovery plan with your support network",
        "Provide emergency contacts to your support team",
        "Consider professional home care if family support is limited",
      ],
      whyItMatters:
        "Adequate support during recovery is associated with better outcomes, fewer complications, and reduced hospital readmissions. You shouldn't navigate recovery alone.",
      clinicalGuidance:
        "NHS guidance emphasizes the importance of post-discharge support. Many procedures require mandatory supervision for 24-48 hours post-anesthesia, and ongoing assistance significantly improves recovery quality.",
      completed: false,
    },
    {
      id: 10,
      title: "Prepare Your Surgery Day Kit",
      timeline: "1 week before surgery",
      icon: <ShoppingBag className="h-5 w-5" />,
      description:
        "Pack all necessary items for your hospital stay and immediate recovery period.",
      actionItems: [
        "Pack comfortable, loose-fitting clothing",
        "Bring slip-on shoes or slippers with non-slip soles",
        "Include toiletries and personal hygiene items",
        "Bring your ID, insurance cards, and medical documents",
        "Pack current medications in original containers",
        "Include phone charger and essential contact numbers",
        "Bring reading material or entertainment for recovery",
        "Consider bringing small pillow for comfort during transport",
        "Leave valuables at home",
      ],
      whyItMatters:
        "Being properly prepared reduces stress on surgery day and ensures you have everything needed for a comfortable hospital stay and initial recovery.",
      clinicalGuidance:
        "Hospital guidelines recommend arriving prepared but minimizing valuables. Comfortable clothing facilitates medical care and reduces friction on surgical sites.",
      completed: false,
    },
  ];

  const handleToggleStep = (stepId: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-[100vh] h-[100dvh] flex flex-col items-center justify-center  overflow-hidden">
      <div className="w-full gap-4 max-w-md h-full flex flex-col">
        {/* White card for results */}
        <div className="bg-white m-4 flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="p-4 sm:p-6 flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Your free results
            </h1>

            {/* Semi-circular Progress Gauge */}
            <div className="flex relative flex-col items-center mb-4">
              <div className="w-40 sm:w-48 h-24 sm:h-28">
          

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
            <div className="mt-2">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                Top 3 risk drivers
              </h2>
              <div className="space-y-2">
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
                        className="text-gray-600 text-sm sm:text-base font-bold select-none"
                        style={{
                          filter: "blur(4px)",
                          WebkitFilter: "blur(4px)",
                          userSelect: "none",
                        }}
                      >
                        Risk factor hidden
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
          <div className="bg-white bottom-0 rounded-2xl unlock-plan-section p-4 sm:p-6 flex-shrink-0 mb-6">
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="payment-badge">
                  <img src="/assests/appleicon.svg" alt="Apple Pay" className="payment-badge-icon-apple" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/stripeicon.svg" alt="Stripe" className="payment-badge-icon-stripe" />
                </div>
                <div className="payment-badge">
                  <img src="/assests/visaicon.svg" alt="Visa" className="payment-badge-icon-visa" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src="/assests/30days.svg" alt="30 Day Money Back Guarantee" className="guarantee-badge" />
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
