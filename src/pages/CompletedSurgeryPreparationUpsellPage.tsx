import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from './AssessmentsPage';
import {
  AlertTriangle,
  Shield,
  Play,
  Heart,
  Activity,
  Zap
} from 'lucide-react';
import biologicalAgeImage from '/assests/completed02.webp';
import heroImage from '/assests/completed02.webp';
import benefitsImage from '/assests/completed02.webp';

// Completed Surgery Preparation Bundle Assessment definition
const completedSurgeryPreparationAssessment: Assessment = {
  id: '21',
  name: 'Completed Surgery Preparation Bundle',
  description:
    'Comprehensive surgical preparation assessment combining readiness, complication risk, recovery prediction, anaesthesia screening, and mobility evaluation in one complete bundle.',
  price: 149.99,
  image: biologicalAgeImage,
  icon: <Shield className="w-6 h-6" />,
  category: 'Surgery',
  features: [
    'Complete surgical readiness assessment',
    'Comprehensive risk factor analysis',
    'Personalized preparation strategies'
  ]
};

export function CompletedSurgeryPreparationUpsellPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (assessment: Assessment) => {
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
    setIsBasketOpen(true);
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems(prev => prev.filter(item => item.assessment.id !== assessmentId));
  };

  const updateQuantity = (assessmentId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(assessmentId);
      return;
    }
    setBasketItems(prev =>
      prev.map(item => (item.assessment.id === assessmentId ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.assessment.price * item.quantity, 0);
  };

  const handleStartAssessment = () => {
    addToBasket(completedSurgeryPreparationAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'completed-surgery-preparation-bundle-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (templated) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              <ImageWithFallback
                src={heroImage}
                alt="Completed Surgery Preparation Bundle Report"
                className="w-full h-auto object-cover rounded-lg mt-[26px]"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              Complete Surgery Preparation Bundle
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Master Your Surgery.
              <span className="block text-primary">Control Your Outcome.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your complete surgical preparation assessment covering all critical factors — from readiness to recovery — in one comprehensive bundle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleTryDemo} size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" /> Try Demo Quiz
              </Button>
              <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
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
              Complete Surgical Excellence. One Comprehensive Assessment.
            </h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Surgery Preparation Bundle combines five critical assessments into one complete surgical readiness evaluation — covering every aspect of your surgical journey.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment combines Surgery Readiness Score, Complication Risk Checker, Recovery Speed Predictor, Anaesthesia Risk Screener, and Mobility & Strength Score into one complete surgical preparation evaluation. Understanding your complete surgical profile is crucial because successful outcomes depend on multiple interconnected factors. Early comprehensive assessment allows you to optimise every aspect of your surgical preparation for the best possible outcome.
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
                  src={benefitsImage}
                  alt="Luther Health Surgery Bundle Benefits"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Comprehensive */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Comprehensive</h3>
                    <p className="text-sm text-muted-foreground">Five critical areas, one bundle.</p>
                  </CardContent>
                </Card>
                {/* Top Right - Speed */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Speed</h3>
                    <p className="text-sm text-muted-foreground">Prep now, recover faster.</p>
                  </CardContent>
                </Card>
                {/* Middle Left - Insight */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">Spot risks before they grow.</p>
                  </CardContent>
                </Card>
                {/* Middle Right - Confidence */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Enter surgery at your best.</p>
                  </CardContent>
                </Card>
                {/* Bottom Left - Protection */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Protection</h3>
                    <p className="text-sm text-muted-foreground">Lower risk, smoother journey.</p>
                  </CardContent>
                </Card>
                {/* Bottom Right - Personal */}
                <Card className="absolute bottom-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">A plan built for you.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Layout - Grid Below Image */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Comprehensive</h3>
                    <p className="text-sm text-muted-foreground">Five areas, one bundle.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Speed</h3>
                    <p className="text-sm text-muted-foreground">Prep now, recover faster.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">Spot risks early.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Enter surgery at your best.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Protection</h3>
                    <p className="text-sm text-muted-foreground">Lower risk pathway.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">Tailored to you.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Surgery Preparation Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{completedSurgeryPreparationAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedSurgeryPreparationAssessment.description}
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
                              <Shield className="w-3 h-3 mr-2 flex-shrink-0" />
                              Surgery Readiness Score — complete preparation assessment
                            </li>
                            <li className="flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-2 flex-shrink-0" />
                              Complication Risk Checker — lifestyle and comorbidity analysis
                            </li>
                            <li className="flex items-center">
                              <Zap className="w-3 h-3 mr-2 flex-shrink-0" />
                              Recovery Speed Predictor — personal healing timeline
                            </li>
                            <li className="flex items-center">
                              <Heart className="w-3 h-3 mr-2 flex-shrink-0" />
                              Anaesthesia Risk Screener — critical safety assessment
                            </li>
                            <li className="flex items-center">
                              <Activity className="w-3 h-3 mr-2 flex-shrink-0" />
                              Mobility & Strength Score — baseline physical assessment
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does the complete bundle take?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The complete bundle assessment takes approximately 45–60 minutes to complete online, covering all five surgical preparation areas comprehensively. Your results are usually ready the same day, and we'll send you a detailed report along with personalised surgical preparation recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this complete bundle for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This comprehensive bundle is designed for individuals preparing for surgery who want complete peace of mind and optimal preparation. It is particularly valuable for those having major procedures, wanting to minimise risks, or seeking to optimise recovery outcomes. By combining all five critical surgical assessments, it provides complete insight into your surgical readiness and preparation needs.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How comprehensive and accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our comprehensive bundle combines evidence-based methodologies from all five specialised surgical assessments, developed in collaboration with surgical teams, anaesthetists, and recovery specialists. The bundle provides the most complete picture of your surgical preparation possible through online assessment; however, it complements rather than replaces pre-operative consultations with your surgical team.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£149.99</p>
                        <Badge variant="secondary" className="text-xs">Save £55 vs individual</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Complete 5-assessment bundle</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button onClick={handleTryDemo} className="w-full" variant="default">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Quiz
                  </Button>
                  <Button onClick={handleStartAssessment} className="w-full" variant="outline">
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
