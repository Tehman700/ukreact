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
  Zap
} from 'lucide-react';
import biologicalAgeImage from 'figma:asset/ae26560251861502d9f57c797cb56850e241396b.png';
import heroImage from 'figma:asset/816df46b1563ebaa0e031d306f4b6df626181562.png';

// Resilience Index Assessment definition
const resilienceIndexAssessment: Assessment = {
  id: '18',
  name: 'Resilience Index',
  description: 'Comprehensive mental and physical resilience assessment to measure your ability to adapt, recover, and thrive under stress.',
  price: 49.99, // Fixed: was 149.99, now matches globalAssessments
  image: biologicalAgeImage,
  icon: <Zap className="w-6 h-6" />,
  category: 'Mental Health',
  features: ['Stress resilience analysis', 'Recovery capacity assessment', 'Personalized resilience building strategies']
};

export function ResilienceIndexUpsellPage() {
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
    addToBasket(resilienceIndexAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'resilience-index-questions';
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
                  Resilience Index Assessment
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Build Resilience.
                  <span className="block text-primary">Thrive Under Pressure.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover your resilience capacity and get evidence-based strategies to bounce back stronger from life's challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleTryDemo} size="lg" className="px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Quiz
                  </Button>
                  <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                    Get my resilience score
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
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Strengthen Your Mind. Master Adversity.</h1>
            <h2 className="text-muted-foreground text-left">Your personalized Resilience Index reveals your capacity to adapt, recover, and thrive under stress — and how to build unshakeable mental strength.</h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment evaluates key factors that influence your psychological resilience and stress response. Understanding your resilience capacity is crucial because mental resilience is the foundation of peak performance, emotional wellbeing, and long-term success. Early identification allows you to implement targeted strategies to strengthen your mental fortitude and optimize your response to life's inevitable challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Resilience Index Assessment Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{resilienceIndexAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {resilienceIndexAssessment.description}
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
                              Comprehensive stress resilience and adaptability analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Mental and emotional recovery capacity assessment
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalized resilience building strategies and mental training protocols
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalized resilience building recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for high-achieving professionals who want to understand and optimize their resilience capacity. It is particularly relevant for individuals facing high-stress environments, major life transitions, or those seeking to enhance their mental toughness. By analyzing key resilience factors, it supports those who want to build unshakeable confidence and perform at their peak under pressure.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in collaboration with psychology and resilience experts and informed by reputable, cutting-edge research, clinical trial data, and scientific guidance. They are designed to provide robust and reliable insights; however, they are not a substitute for comprehensive psychological evaluation. We strongly recommend that results are reviewed and discussed with an appropriate mental health provider.
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
                    Get my resilience score
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