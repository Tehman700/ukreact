import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from '../App';
import {
  Users,
  Play,
  Stethoscope,
} from 'lucide-react';
import biologicalAgeImage from '/assests/completed01.webp';
import heroImage from '/assests/completed01.webp';

// Completed Chronic Symptoms Bundle Assessment definition
const completedChronicSymptomsAssessment: Assessment = {
  id: '22',
  name: 'Completed Chronic Symptoms Bundle',
  description:
    'Comprehensive chronic symptom management assessment combining severity analysis, inflammation risk, medication burden, energy patterns, and lifestyle impact evaluation in one complete bundle.',
  price: 179.99,
  image: biologicalAgeImage,
  icon: <Stethoscope className="w-6 h-6" />,
  category: 'Chronic Symptoms',
  features: [
    'Complete chronic symptom assessment',
    'Comprehensive lifestyle impact analysis',
    'Personalized management strategies',
  ],
};

export function CompletedChronicSymptomsUpsellPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (assessment: Assessment) => {
    setBasketItems((prev) => {
      const existingItem = prev.find(
        (item) => item.assessment.id === assessment.id,
      );
      if (existingItem) {
        return prev.map((item) =>
          item.assessment.id === assessment.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { assessment, quantity: 1 }];
    });
    setIsBasketOpen(true);
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems((prev) =>
      prev.filter((item) => item.assessment.id !== assessmentId),
    );
  };

  const updateQuantity = (assessmentId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(assessmentId);
      return;
    }
    setBasketItems((prev) =>
      prev.map((item) =>
        item.assessment.id === assessmentId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce(
      (total, item) => total + item.assessment.price * item.quantity,
      0,
    );
  };

  const handleStartAssessment = () => {
    addToBasket(completedChronicSymptomsAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'completed-chronic-symptoms-bundle-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (templated) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
    <ImageWithFallback
      src={heroImage}
      alt="Completed Chronic Symptoms Bundle Report"
      width={1600}
      height={2000}
      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 500px"
      quality={85}
      priority
      className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
    />
    <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
  </div>
</div>
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              Complete Chronic Symptoms Bundle
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Master Your Symptoms.
              <span className="block text-primary">Control Your Life.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your complete chronic symptom assessment covering all critical
              factors — from severity to lifestyle impact — in one comprehensive
              bundle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get complete assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">
              Complete Symptom Management. One Comprehensive Assessment.
            </h1>
            <h2 className="text-muted-foreground text-left">
              Your personalized Chronic Symptoms Bundle combines five critical
              assessments into one complete symptom management evaluation —
              covering every aspect of your chronic condition journey.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment combines Symptom Severity Index,
              Inflammation Risk Score, Medication Burden Calculator, Daily
              Energy Audit, and Lifestyle Limiter Score into one complete
              chronic symptom evaluation. Understanding your complete symptom
              profile is crucial because successful management depends on
              multiple interconnected factors. Early comprehensive assessment
              allows you to optimize every aspect of your symptom management for
              the best possible quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards (templated) */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback
                  src={biologicalAgeImage}
                  alt="Luther Health Chronic Symptoms Bundle Benefits"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Clarity */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground">
                      Everything in one place.
                    </p>
                  </CardContent>
                </Card>

                {/* Top Right - Speed */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Speed</h3>
                    <p className="text-sm text-muted-foreground">
                      Start improvements today.
                    </p>
                  </CardContent>
                </Card>

                {/* Middle Left - Insight */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">
                      Spot triggers before they flare.
                    </p>
                  </CardContent>
                </Card>

                {/* Middle Right - Confidence */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">
                      Take control of your day.
                    </p>
                  </CardContent>
                </Card>

                {/* Bottom Left - Protection */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce risks and flare-ups.
                    </p>
                  </CardContent>
                </Card>

                {/* Bottom Right - Personal */}
                <Card className="absolute bottom-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">
                      A plan tailored to you.
                    </p>
                  </CardContent>
                </Card>
              </div>

{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'Track everything in one clear view to understand your health patterns.'],
    ['Speed', 'Start meaningful improvements today with focused daily steps.'],
    ['Insight', 'Spot triggers early and prevent flare-ups before they escalate.'],
    ['Confidence', 'Take back control of your day with structured, simple actions.'],
    ['Protection', 'Build stronger defenses to reduce flare-ups and setbacks.'],
    ['Personal', 'Follow a tailored plan built around your unique needs and goals.'],
  ].map(([title, body]) => (
    <Card key={title as string} className="bg-white shadow-lg">
      <CardContent className="pt-[20px] pr-[14px] pb-[14px] pl-[18px]">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  ))}
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Completed Chronic Symptoms Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{completedChronicSymptomsAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedChronicSymptomsAssessment.description}
                    </p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">
                          What's included in this assessment bundle?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Symptom Severity Index — Pain, fatigue, and symptom intensity analysis
                            </li>
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Inflammation Risk Score — Diet, lifestyle, and inflammatory marker assessment
                            </li>
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Medication Burden Calculator — Drug interaction and side effect analysis
                            </li>
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Daily Energy Audit — Fatigue patterns and energy optimization
                            </li>
                            <li className="flex items-center">
                              <Users className="w-3 h-3 mr-2 flex-shrink-0" />
                              Lifestyle Limiter Score — Work, social, and activity impact assessment
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does the complete bundle take?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The complete bundle assessment takes approximately 15–20 minutes to complete online, covering all five chronic symptom management areas comprehensively. Your results are usually ready the same day, and we'll send you a detailed report along with personalized symptom management recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this complete bundle for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This comprehensive bundle is designed for individuals managing chronic symptoms who want complete insight into their condition and optimization strategies. It is particularly valuable for those with ongoing pain, fatigue, digestive issues, or multiple symptoms seeking comprehensive management approaches. By combining all five critical symptom assessments, it provides complete insight into your symptom patterns and management needs.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How comprehensive and accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our comprehensive bundle combines evidence-based methodologies from all five specialized chronic symptom assessments, developed in collaboration with pain specialists, rheumatologists, and chronic disease management experts. The bundle provides the most complete picture of your symptom management possible through online assessment; however, it complements rather than replaces consultations with your healthcare team.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          £{completedChronicSymptomsAssessment.price.toFixed(2)}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Save £35 vs individual
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Complete 5‑assessment bundle
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button
                    onClick={handleStartAssessment}
                    className="w-full bg-black text-white hover:bg-black/90 transition-colors duration-200"
                  >
                    Get complete assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shopping Basket */}
      <ShoppingBasket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onRemoveItem={removeFromBasket}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}
