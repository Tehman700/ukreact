import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from './AssessmentsPage';
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
  Apple
} from 'lucide-react';
import biologicalAgeImage from 'figma:asset/ae26560251861502d9f57c797cb56850e241396b.png';
import heroImage from 'figma:asset/816df46b1563ebaa0e031d306f4b6df626181562.png';

// Nutrition & Body Composition Assessment definition
const nutritionBodyCompositionAssessment: Assessment = {
  id: '19',
  name: 'Nutrition & Body Composition Score',
  description: 'Comprehensive nutritional and body composition assessment to optimize metabolic health, body composition, and nutritional status.',
  price: 49.99, // Fixed: was 179.99, now matches globalAssessments
  image: biologicalAgeImage,
  icon: <Apple className="w-6 h-6" />,
  category: 'Nutrition',
  features: ['Body composition analysis', 'Nutritional deficiency assessment', 'Personalized nutrition optimization strategies']
};

export function NutritionBodyCompositionUpsellPage() {
  const [isHovered, setIsHovered] = useState(false);
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
      prev.map(item =>
        item.assessment.id === assessmentId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + (item.assessment.price * item.quantity), 0);
  };

  const handleStartAssessment = () => {
    addToBasket(nutritionBodyCompositionAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'nutrition-body-composition-score-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background p-[0px] bg-[rgba(249,249,249,1)]">
        <div className="container mx-auto px-4 bg-[rgba(249,249,249,1)]">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
                  Nutrition & Body Composition Assessment
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Optimize Your Body.
                  <span className="block text-primary">Master Your Nutrition.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Get your complete nutrition and body composition score with evidence-based strategies to optimize metabolic health and achieve your ideal physique.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleTryDemo} size="lg" className="px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Quiz
                  </Button>
                  <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                    Get my nutrition score
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Transform Your Body. Fuel Your Performance.</h1>
            <h2 className="text-muted-foreground text-left">Your personalized Nutrition & Body Composition Score reveals your metabolic efficiency and nutritional status — and how to optimize both for peak performance.</h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment evaluates key factors that influence your body composition, nutritional status, and metabolic health. Understanding your nutrition and body composition profile is crucial because proper nutrition and optimal body composition are fundamental to peak performance, disease prevention, and long-term health. Early identification allows you to implement targeted nutritional interventions to optimize your physique and enhance metabolic function.
            </p>
          </div>
        </div>
      </section>

      {/* Nutrition & Body Composition Assessment Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{nutritionBodyCompositionAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {nutritionBodyCompositionAssessment.description}
                    </p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">
                          What's included in this assessment?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Comprehensive body composition analysis and muscle-to-fat ratio assessment
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Nutritional deficiency screening and dietary quality evaluation
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalized nutrition optimization strategies and meal planning guidance
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalized nutrition recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for health-conscious individuals who want to optimize their body composition and nutritional status. It is particularly relevant for those seeking to improve athletic performance, achieve specific physique goals, or address metabolic concerns. By analyzing key nutritional and body composition factors, it supports those who want to make evidence-based dietary and lifestyle changes for optimal health outcomes.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
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
                        <p className="font-medium">£49.99</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button 
                    onClick={handleTryDemo}
                    className="w-full"
                    variant="default"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Quiz
                  </Button>
                  <Button 
                    onClick={handleStartAssessment}
                    className="w-full"
                    variant="outline"
                  >
                    Get my nutrition score
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