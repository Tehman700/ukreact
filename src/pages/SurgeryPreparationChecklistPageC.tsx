import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import Slider from 'react-slick';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from './AssessmentsPage';
import { SurgeryAdditionalCarousels } from '../components/SurgeryAdditionalCarousels';
import biologicalAgeImage from '/assests/completed02.webp';
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
  Mail
} from 'lucide-react';

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

export function SurgeryPreparationChecklistPageC({
  onAddToBasket: externalAddToBasket,
  onOpenBasket: externalOpenBasket
}: SurgeryPreparationChecklistPageCProps = {}) {
  console.log('🏗️ SurgeryPreparationChecklistPageC MOUNTED');
  console.log('🔧 Props received:', {
    hasExternalAddToBasket: !!externalAddToBasket,
    hasExternalOpenBasket: !!externalOpenBasket
  });

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (assessment: Assessment) => {
    console.log('🛒 addToBasket called with:', assessment.name);

    // Use external basket function if provided, otherwise use local state
    if (externalAddToBasket) {
      console.log('📤 Using EXTERNAL addToBasket function');
      externalAddToBasket(assessment);
      if (externalOpenBasket) {
        console.log('📤 Calling EXTERNAL openBasket');
        externalOpenBasket();
      }
      return;
    }

    console.log('📥 Using LOCAL basket state');
    // Fallback to local state management
    setBasketItems(prev => {
      const existingItem = prev.find(item => item.assessment.id === assessment.id);
      if (existingItem) {
        return prev.map(item =>
          item.assessment.id === assessment.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { assessment, quantity: 1 }];
    });
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems(prev => prev.filter(item => item.assessment.id !== assessmentId));
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.assessment.price * item.quantity, 0);
  };

  const handleBackToAssessments = () => {
    window.history.back();
  };

  const handleStartAssessment = () => {
    console.log('🎯 handleStartAssessment called');
    console.log('📦 Assessment to add:', surgeryReadinessAssessment);
    console.log('🔧 externalAddToBasket exists:', !!externalAddToBasket);
    console.log('🔧 externalOpenBasket exists:', !!externalOpenBasket);

    sessionStorage.setItem("surgery_variant", "C");

    addToBasket(surgeryReadinessAssessment);
    setEmailFormVisible(false);

    // Open basket - either external or local
    if (externalOpenBasket) {
      console.log('✅ Opening EXTERNAL basket');
      externalOpenBasket();
    } else {
      console.log('✅ Opening LOCAL basket');
      setIsBasketOpen(true);
    }
  };

  const steps: ChecklistStep[] = [
    {
      id: 1,
      title: "Schedule Pre-Operative Assessment",
      timeline: "6-8 weeks before surgery",
      icon: <Calendar className="h-5 w-5" />,
      description: "Book your comprehensive pre-operative medical assessment to evaluate your fitness for surgery.",
      actionItems: [
        "Contact your surgical team or GP to arrange assessment",
        "Request blood tests, ECG, and any required imaging",
        "Compile your complete medical history and current medications",
        "Note any allergies or previous adverse reactions to medications",
        "Prepare questions about the procedure and recovery"
      ],
      whyItMatters: "Pre-operative assessment identifies potential risks and allows time to optimize your health before surgery. Studies show proper preoperative evaluation reduces complications by up to 30%.",
      clinicalGuidance: "NICE guidelines recommend thorough preoperative assessment for all elective procedures. This typically includes cardiovascular assessment, respiratory function, and metabolic screening to ensure you're in optimal condition for surgery.",
      completed: false
    },
    {
      id: 2,
      title: "Optimize Your Physical Fitness",
      timeline: "6-8 weeks before surgery",
      icon: <Activity className="h-5 w-5" />,
      description: "Implement a structured exercise program to improve your cardiovascular fitness and muscular strength.",
      actionItems: [
        "Aim for 150 minutes of moderate aerobic exercise weekly",
        "Include resistance training 2-3 times per week",
        "Focus on core strengthening and mobility exercises",
        "Gradually increase intensity under professional guidance",
        "Consider working with a physiotherapist for surgery-specific preparation"
      ],
      whyItMatters: "Enhanced Recovery After Surgery (ERAS) protocols demonstrate that preoperative physical conditioning can reduce hospital stay by 2-3 days and lower complication rates significantly.",
      clinicalGuidance: "Research shows that 'prehabilitation' programs improve surgical outcomes. The Royal College of Surgeons emphasizes that physically fitter patients experience better recovery trajectories and reduced postoperative complications.",
      completed: false
    },
    {
      id: 3,
      title: "Optimize Nutrition & Body Composition",
      timeline: "6-8 weeks before surgery",
      icon: <Apple className="h-5 w-5" />,
      description: "Adjust your diet to support healing, optimize body composition, and prepare your metabolic system.",
      actionItems: [
        "Increase protein intake to 1.2-1.5g per kg body weight",
        "Ensure adequate vitamin D, vitamin C, and zinc levels",
        "Minimize processed foods and refined sugars",
        "Stay well-hydrated (2-3 litres of water daily)",
        "Consider consultation with a nutritionist for personalized guidance",
        "If overweight, work toward modest weight reduction (5-10%)"
      ],
      whyItMatters: "Optimal nutrition supports wound healing, immune function, and metabolic stability. Adequate protein intake is particularly crucial for tissue repair and recovery.",
      clinicalGuidance: "ESPEN (European Society for Clinical Nutrition) guidelines recommend nutritional optimization before major surgery. Poor nutritional status is associated with increased infection risk and delayed wound healing.",
      completed: false
    },
    {
      id: 4,
      title: "Review and Optimize Medications",
      timeline: "4-6 weeks before surgery",
      icon: <Pill className="h-5 w-5" />,
      description: "Conduct a comprehensive medication review with your healthcare provider to ensure optimal perioperative management.",
      actionItems: [
        "List all prescription medications with doses and frequencies",
        "Include all over-the-counter medications and supplements",
        "Discuss any anticoagulants or antiplatelet medications",
        "Identify medications that may need to be stopped or adjusted",
        "Ensure optimal control of chronic conditions (diabetes, hypertension)",
        "Plan for medication management during recovery period"
      ],
      whyItMatters: "Certain medications can increase surgical risks or interact with anesthesia. Proper medication management is essential for safety and optimal outcomes.",
      clinicalGuidance: "NICE perioperative guidelines emphasize comprehensive medication review. Anticoagulants, antiplatelet agents, and some supplements may need to be discontinued at specific intervals before surgery.",
      completed: false
    },
    {
      id: 5,
      title: "Eliminate Smoking and Limit Alcohol",
      timeline: "Minimum 4 weeks before surgery",
      icon: <Cigarette className="h-5 w-5" />,
      description: "Completely cease smoking and significantly reduce or eliminate alcohol consumption.",
      actionItems: [
        "Stop smoking completely at least 4 weeks before surgery",
        "Consider nicotine replacement therapy or cessation programs",
        "Reduce alcohol to no more than 2 units per day",
        "Plan to remain abstinent for at least 2 weeks post-surgery",
        "Seek support from smoking cessation services if needed",
        "Inform your surgical team of your smoking/alcohol history"
      ],
      whyItMatters: "Smoking increases surgical complications by 3-6 fold, including wound infections, respiratory complications, and impaired healing. Alcohol can interfere with anesthesia and medication metabolism.",
      clinicalGuidance: "Royal College of Anaesthetists and NICE strongly recommend smoking cessation at minimum 4 weeks (ideally 8 weeks) before surgery. Even short-term cessation significantly reduces complication rates.",
      completed: false
    },
    {
      id: 6,
      title: "Optimize Sleep and Stress Management",
      timeline: "4-6 weeks before surgery",
      icon: <Bed className="h-5 w-5" />,
      description: "Establish healthy sleep patterns and implement stress reduction techniques to support your body's healing capacity.",
      actionItems: [
        "Aim for 7-9 hours of quality sleep per night",
        "Maintain consistent sleep and wake times",
        "Practice relaxation techniques (meditation, deep breathing)",
        "Consider mindfulness or cognitive behavioral therapy",
        "Limit screen time before bed",
        "Address any sleep disorders with your healthcare provider"
      ],
      whyItMatters: "Adequate sleep supports immune function, wound healing, and metabolic health. Chronic sleep deprivation is associated with increased surgical complications and slower recovery.",
      clinicalGuidance: "Research demonstrates that perioperative sleep quality impacts immune function and inflammatory responses. Stress management techniques are associated with reduced anxiety and improved surgical experiences.",
      completed: false
    },
    {
      id: 7,
      title: "Complete Required Documentation",
      timeline: "3-4 weeks before surgery",
      icon: <FileText className="h-5 w-5" />,
      description: "Ensure all administrative, legal, and insurance documentation is properly completed and filed.",
      actionItems: [
        "Review and sign surgical consent forms",
        "Understand the procedure, risks, and expected outcomes",
        "Verify insurance coverage and pre-authorization",
        "Complete advance directive or living will if desired",
        "Arrange time off work and notify employer",
        "Document any specific preferences or concerns",
        "Obtain copies of all medical records and test results"
      ],
      whyItMatters: "Proper documentation ensures legal protection, financial clarity, and that your preferences are respected throughout your surgical journey.",
      clinicalGuidance: "Informed consent is both a legal and ethical requirement. Take time to understand all aspects of your procedure and don't hesitate to ask questions before signing consent forms.",
      completed: false
    },
    {
      id: 8,
      title: "Prepare Your Home for Recovery",
      timeline: "2-3 weeks before surgery",
      icon: <Home className="h-5 w-5" />,
      description: "Modify your living space to facilitate safe and comfortable recovery after surgery.",
      actionItems: [
        "Set up a recovery area on the ground floor if possible",
        "Remove trip hazards (loose rugs, clutter, cords)",
        "Install grab bars in bathroom if needed",
        "Prepare comfortable seating with good back support",
        "Stock up on easy-to-prepare, nutritious meals",
        "Place frequently used items within easy reach",
        "Ensure adequate lighting throughout your home",
        "Consider renting or purchasing mobility aids if needed"
      ],
      whyItMatters: "A properly prepared home environment reduces fall risk, promotes independence, and supports a smoother recovery process.",
      clinicalGuidance: "Occupational therapy guidelines emphasize environmental preparation for post-surgical patients. Fall prevention is particularly important during the recovery period when mobility may be compromised.",
      completed: false
    },
    {
      id: 9,
      title: "Arrange Support Network and Transportation",
      timeline: "2-3 weeks before surgery",
      icon: <Users className="h-5 w-5" />,
      description: "Organize a reliable support system for surgery day and the initial recovery period.",
      actionItems: [
        "Arrange transportation to and from the hospital",
        "Confirm someone will stay with you for the first 24-48 hours",
        "Identify friends or family who can help with daily tasks",
        "Plan for assistance with meals, household chores, and errands",
        "Share your recovery plan with your support network",
        "Provide emergency contacts to your support team",
        "Consider professional home care if family support is limited"
      ],
      whyItMatters: "Adequate support during recovery is associated with better outcomes, fewer complications, and reduced hospital readmissions. You shouldn't navigate recovery alone.",
      clinicalGuidance: "NHS guidance emphasizes the importance of post-discharge support. Many procedures require mandatory supervision for 24-48 hours post-anesthesia, and ongoing assistance significantly improves recovery quality.",
      completed: false
    },
    {
      id: 10,
      title: "Prepare Your Surgery Day Kit",
      timeline: "1 week before surgery",
      icon: <ShoppingBag className="h-5 w-5" />,
      description: "Pack all necessary items for your hospital stay and immediate recovery period.",
      actionItems: [
        "Pack comfortable, loose-fitting clothing",
        "Bring slip-on shoes or slippers with non-slip soles",
        "Include toiletries and personal hygiene items",
        "Bring your ID, insurance cards, and medical documents",
        "Pack current medications in original containers",
        "Include phone charger and essential contact numbers",
        "Bring reading material or entertainment for recovery",
        "Consider bringing small pillow for comfort during transport",
        "Leave valuables at home"
      ],
      whyItMatters: "Being properly prepared reduces stress on surgery day and ensures you have everything needed for a comfortable hospital stay and initial recovery.",
      clinicalGuidance: "Hospital guidelines recommend arriving prepared but minimizing valuables. Comfortable clothing facilitates medical care and reduces friction on surgical sites.",
      completed: false
    }
  ];

  const handleToggleStep = (stepId: number) => {
    setCompletedSteps(prev => {
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
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleBackToAssessments}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-medium">Back</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-2 text-left">Surgery Preparation Bundle</h1>
          <p className="text-muted-foreground text-left">
            Here are your comprehensive guides to optimal surgical preparation and recovery.
          </p>
        </div>

        {/* Checklist Steps */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="prep-steps" className="border border-border rounded-lg overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="text-left">
                <h2 className="text-lg font-medium">Prep Checklist</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Ten essential steps to cut complications and speed recovery. Print-and-go, with timelines for 90/60/30/7/1 days before surgery.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4">
                <div className="overflow-visible py-8">
                  <Slider
                    dots={false}
                    arrows={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={1.15}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    touchThreshold={10}
                  >
                    {steps.map((step) => (
                      <div key={step.id} className="px-3">
                        <Card className="h-full shadow-lg">
                          <CardHeader>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                                  {step.icon}
                                </div>
                                <CardTitle className="text-lg pt-1">
                                  Step {step.id}: {step.title}
                                </CardTitle>
                              </div>

                              <div>
                                <Badge variant="outline" className="text-xs">
                                  {step.timeline}
                                </Badge>
                              </div>

                              <CardDescription>
                                {step.description}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="action-items" className="border-0">
                                <AccordionTrigger className="py-3 hover:no-underline">
                                  <span className="text-sm font-medium">Action Items</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2 ml-4">
                                    {step.actionItems.map((item, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>

                              <Separator className="my-2" />

                              <AccordionItem value="why-matters" className="border-0">
                                <AccordionTrigger className="py-3 hover:no-underline">
                                  <span className="text-sm font-medium">Why This Matters</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.whyItMatters}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>

                              <Separator className="my-2" />

                              <AccordionItem value="clinical-guidance" className="border-0">
                                <AccordionTrigger className="py-3 hover:no-underline">
                                  <span className="text-sm font-medium">Clinical Guidance</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.clinicalGuidance}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bonus Guides Label */}
<div className="mt-8 mb-4 text-center">
  <Badge
    variant="outline"
    className="text-sm text-white bg-black py-[10px] px-[12px] border-black"
  >
    Bonus Guides
  </Badge>
</div>





        {/* Additional Carousels */}
        <div>
          <SurgeryAdditionalCarousels />
        </div>

        {/* Ready for Surgery Section */}
        <div className="mt-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Get every resource in one click. Sent straight to your email. Delivered immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setEmailFormVisible(true)} className="px-4 py-3">
                <Mail className="h-4 w-4 mr-2" />
                Email me the resource bundle
              </Button>
            </div>
          </div>
        </div>

        {/* Popup Modal */}
        {emailFormVisible && (
          <>
            <div
              className="fixed inset-0 bg-black/80 z-50 transition-opacity duration-300"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative"
              >
                <div className="flex justify-center mb-6">
                  <TrendingUp className="h-16 w-16 text-black" />
                </div>

                <div className="text-center space-y-4">
                  <h3 className="font-semibold text-xl">Your next step</h3>
                  <p className="text-sm text-muted-foreground">
                    Recover faster, with fewer complications. Turn today's answers into a customised Readiness Score and bespoke plan tailored to you.
                  </p>
                  <Button
                    onMouseDown={(e) => {
                      console.log('🖱️ BUTTON MOUSE DOWN!');
                      e.preventDefault();
                      e.stopPropagation();
                      handleStartAssessment();
                    }}
                    size="lg"
                    className="w-full mt-6"
                    type="button"
                  >
                    Get my bespoke plan
                  </Button>
                </div>

                <button
                  onClick={() => {
                    console.log('❌ Close button clicked');
                    setEmailFormVisible(false);
                  }}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Important Information */}
        <Card className="mt-8 mb-4 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">i</span>
                </div>
              </div>
              <div className="flex-1 pl-2">
                <h3 className="font-medium mb-2">Important Information</h3>
                <p className="text-sm text-muted-foreground">
                  This checklist is designed to complement, not replace, guidance from your surgical team. Always follow the specific instructions provided by your surgeon and anesthesiologist. If you have any concerns or questions, contact your healthcare provider directly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default SurgeryPreparationChecklistPageC;