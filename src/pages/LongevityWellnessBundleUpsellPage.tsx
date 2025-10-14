import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
interface Assessment {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
}

interface BasketItem {
  assessment: Assessment;
  quantity: number;
}
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Play,
  Heart,
  Activity,
  Zap,
  Apple,
  Stethoscope,
} from 'lucide-react';
import biologicalAgeImage from '/assests/long-hero.webp';
import heroImage from '/assests/long-hero.webp';

// The Complete Longevity Bundle Assessment definition
const longevityWellnessBundleAssessment: Assessment = {
  id: '23',
  name: 'The Complete Longevity Bundle',
  description:
    'Comprehensive longevity optimization assessment combining Biological Age Calculator, Cardiometabolic Risk Score, Resilience Index, Nutrition & Body Composition Score, and Functional Fitness Age Test in one complete bundle.',
  price: 138,
  image: biologicalAgeImage,
  icon: <Clock className="w-6 h-6" />,
  category: 'Longevity',
  features: [
    'Biological Age Calculator assessment',
    'Cardiometabolic Risk Score analysis',
    'Resilience Index & Nutrition evaluation',
    'Functional Fitness Age testing',
    'Personalized longevity optimization strategies',
  ],
};

export function LongevityWellnessBundleUpsellPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (assessment: Assessment) => {
    setBasketItems((prev) => {
      const existingItem = prev.find((item) => item.assessment.id === assessment.id);
      if (existingItem) {
        return prev.map((item) =>
          item.assessment.id === assessment.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { assessment, quantity: 1 }];
    });
    setIsBasketOpen(true);
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.assessment.id !== assessmentId));
  };

  const updateQuantity = (assessmentId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(assessmentId);
      return;
    }
    setBasketItems((prev) =>
      prev.map((item) => (item.assessment.id === assessmentId ? { ...item, quantity } : item)),
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.assessment.price * item.quantity, 0);
  };

  const handleStartAssessment = () => {
    addToBasket(longevityWellnessBundleAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'longevity-wellness-bundle-questions';
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
      alt="Longevity & Wellness Bundle Report"
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
              The Complete Longevity Bundle
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Optimize Your Longevity.
              <span className="block text-primary">Master Your Wellness.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your complete longevity optimization assessment covering all critical factors—from biological age to
              functional fitness—in one comprehensive bundle.
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
              Complete Longevity Optimization. One Comprehensive Assessment.
            </h1>
            <h2 className="text-muted-foreground text-left">
              Your personalized Complete Longevity Bundle combines five critical assessments into one complete longevity
              evaluation — covering every aspect of your aging and wellness optimization.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment combines Biological Age Calculator, Cardiometabolic Risk Score, Resilience
              Index, Nutrition & Body Composition Score, and Functional Fitness Age Test into one complete longevity
              optimization evaluation. Understanding your complete wellness profile is crucial because healthy aging
              depends on multiple interconnected factors. Early comprehensive assessment allows you to optimize every
              aspect of your longevity and wellness for the best possible healthspan.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards (templated & adapted) */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback
                  src={biologicalAgeImage}
                  alt="Luther Health Longevity Benefits"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Clarity */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground">Your wellness in one view.</p>
                  </CardContent>
                </Card>
                {/* Top Right - Speed */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Speed</h3>
                    <p className="text-sm text-muted-foreground">Assess now, improve sooner.</p>
                  </CardContent>
                </Card>
                {/* Middle Left - Insight */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">Find what limits healthspan.</p>
                  </CardContent>
                </Card>
                {/* Middle Right - Confidence */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Follow a clear plan.</p>
                  </CardContent>
                </Card>
                {/* Bottom Left - Protection */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Protection</h3>
                    <p className="text-sm text-muted-foreground">Lower lifetime disease risk.</p>
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
  {[
    ['Clarity', 'See your wellness profile in one simple, powerful view.'],
    ['Speed', 'Assess your current health and start improving right away.'],
    ['Insight', 'Identify the habits and risks that limit your healthspan.'],
    ['Confidence', 'Follow a clear plan designed to guide every next step.'],
    ['Protection', 'Strengthen your defenses and lower lifetime disease risk.'],
    ['Personal', 'Get a plan tailored to your unique health and goals.'],
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

      {/* Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb:[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{longevityWellnessBundleAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{longevityWellnessBundleAssessment.description}</p>
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
                              <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
                              Biological Age Calculator — Advanced aging analysis
                            </li>
                            <li className="flex items-center">
                              <Heart className="w-3 h-3 mr-2 flex-shrink-0" />
                              Cardiometabolic Risk Score — Heart and metabolic health assessment
                            </li>
                            <li className="flex items-center">
                              <Zap className="w-3 h-3 mr-2 flex-shrink-0" />
                              Resilience Index — Mental and physical resilience evaluation
                            </li>
                            <li className="flex items-center">
                              <Apple className="w-3 h-3 mr-2 flex-shrink-0" />
                              Nutrition & Body Composition Score — Comprehensive nutrition analysis
                            </li>
                            <li className="flex items-center">
                              <Activity className="w-3 h-3 mr-2 flex-shrink-0" />
                              Functional Fitness Age Test — Movement quality and capability analysis
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does the complete bundle take?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The complete bundle assessment takes approximately 60–75 minutes to complete online, covering
                          all five longevity optimization areas comprehensively. Your results are usually ready the same
                          day, and we'll send you a detailed report along with personalized longevity optimization
                          recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this complete bundle for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This comprehensive bundle is designed for individuals serious about optimizing their longevity
                          and healthspan who want complete insight into their aging process. It is particularly valuable
                          for those interested in anti-aging strategies, wanting to extend healthy years, or seeking to
                          optimize biological function. By combining all five critical longevity assessments, it provides
                          complete insight into your wellness optimization needs.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How comprehensive and accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our comprehensive bundle combines evidence-based methodologies from all five specialized
                          longevity assessments, developed in collaboration with longevity researchers, nutritionists,
                          and wellness specialists. The bundle provides the most complete picture of your longevity
                          optimization potential possible through online assessment; however, it complements rather than
                          replaces consultations with healthcare professionals.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£138</p>
                        <Badge variant="secondary" className="text-xs">Save £80 vs individual</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Complete 5-assessment bundle</p>
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
