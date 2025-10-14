import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from './AssessmentsPage';
import { CheckCircle2, AlertTriangle, Clock, Shield, TrendingUp, Users, Star, ArrowRight, Play, Apple } from 'lucide-react';
import biologicalAgeImage from '/assests/nutrition-sec.webp';
import heroImage from '/assests/nutrition-hero.webp';

// Nutrition & Body Composition Assessment definition (templated structure)
const nutritionBodyCompositionAssessment: Assessment = {
  id: '19',
  name: 'Nutrition & Body Composition Score',
  description:
    'Comprehensive nutritional and body composition assessment to optimise metabolic health, body composition, and nutritional status.',
  price: 47.00,
  image: biologicalAgeImage,
  icon: <Apple className="w-6 h-6" />,
  category: 'Nutrition',
  features: ['Body composition analysis', 'Nutritional deficiency assessment', 'Personalised nutrition optimisation strategies']
};

interface NutritionBodyCompositionUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function NutritionBodyCompositionUpsellPage({ onAddToBasket, onOpenBasket }: NutritionBodyCompositionUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);


  const handleStartAssessment = () => {
    onAddToBasket(nutritionBodyCompositionAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'nutrition-body-composition-score-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (templated layout) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
    <ImageWithFallback
      src={heroImage}
      alt="Nutrition & Body Composition Score Report"
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
          {/* Left Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              Nutrition & Body Composition Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Optimise Your Body.
              <span className="block text-primary">Master Your Nutrition.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your complete nutrition and body composition score with evidence-based strategies to optimise metabolic health and achieve your ideal physique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my nutrition now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated copy adapted) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Transform Your Body. Fuel Your Performance.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Nutrition & Body Composition Score reveals your metabolic efficiency and nutritional status — and how to optimise both for peak performance.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment evaluates key factors that influence your body composition, nutritional status, and metabolic health. Understanding your nutrition and body composition profile is crucial because proper nutrition and optimal body composition are fundamental to peak performance, disease prevention, and long-term health. Early identification allows you to implement targeted nutritional interventions to optimise your physique and enhance metabolic function.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards (templated UI) */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback src={biologicalAgeImage} alt="Luther Health Nutrition Benefits" className="w-full h-auto object-cover rounded-lg" />
              </div>


{/* Desktop Overlapping Cards */}
<div className="hidden md:block absolute inset-0 pointer-events-none">
  <Card className="absolute top-4 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Clarity</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        See your nutrition clearly in one score<br />
        to understand how your daily choices<br />
        shape energy, strength, and health.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Precision</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Get targeted nutrient insights crafted<br />
        to fit your body, goals, and metabolism,<br />
        making your plan smarter and stronger.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Performance</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Fuel your training and recovery better<br />
        with the right nutrients at the right time<br />
        for energy, endurance, and power.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow a clear and structured plan and<br />
        backed by evidence and real science<br />
        so you stay consistent every day.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Metabolism</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Support better insulin sensitivity and<br />
        balanced energy with a nutrition plan<br />
        designed to work with your body.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Receive a fully personalized strategy<br />
        shaped by your goals, lifestyle, and needs<br />
        to build lasting health and strength.
      </p>
    </CardContent>
  </Card>
</div>


{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'See your nutrition in one simple score — making it easy to understand what fuels your health.'],
    ['Precision', 'Get targeted macro and micronutrient insights designed to support your unique goals.'],
    ['Performance', 'Fuel your training and recovery with the right nutrients at the right time for your body.'],
    ['Confidence', 'Follow a clear, evidence-based plan built to help you stay consistent and feel your best.'],
    ['Metabolism', 'Support better insulin sensitivity and energy balance with smart, tailored nutrition.'],
    ['Personal', 'Receive strategies customized to your body, your goals, and your long-term health.'],
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

      {/* Assessment Card (templated layout + dynamic price) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{nutritionBodyCompositionAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{nutritionBodyCompositionAssessment.description}</p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">What's included in this assessment?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Comprehensive body composition analysis and muscle-to-fat ratio assessment
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Nutritional deficiency screening and dietary quality evaluation
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Personalised nutrition optimisation strategies and meal planning guidance
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take to complete?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalised nutrition recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is this assessment for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for health-conscious individuals who want to optimise their body composition and nutritional status. It is particularly relevant for those seeking to improve athletic performance, achieve specific physique goals, or address metabolic concerns. By analysing key nutritional and body composition factors, it supports those who want to make evidence-based dietary and lifestyle changes for optimal health outcomes.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in collaboration with nutrition and exercise physiology experts and informed by reputable, cutting-edge research, clinical trial data, and scientific guidance. They are designed to provide robust and reliable insights; however, they are not a substitute for comprehensive metabolic testing or DEXA scans. We strongly recommend that results are reviewed and discussed with an appropriate healthcare provider or registered dietitian.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£{nutritionBodyCompositionAssessment.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button
                    onClick={handleStartAssessment}
                    className="w-full bg-black text-white hover:bg-black/90 transition-colors duration-200"
                  >
                    Get my nutrition now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
