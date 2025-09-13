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
  Activity
} from 'lucide-react';
import biologicalAgeImage from 'figma:asset/ae26560251861502d9f57c797cb56850e241396b.png';
import heroImage from 'figma:asset/816df46b1563ebaa0e031d306f4b6df626181562.png';

// Functional Fitness Age Assessment definition
const functionalFitnessAgeAssessment: Assessment = {
  id: '20',
  name: 'Functional Fitness Age Test',
  description: 'Comprehensive physical capability assessment to determine your functional fitness age and identify movement quality decline patterns.',
  price: 44.99, // Fixed: was 129.99, now matches globalAssessments
  image: biologicalAgeImage,
  icon: <Activity className="w-6 h-6" />,
  category: 'Fitness',
  features: ['Movement quality analysis', 'Physical capability assessment', 'Personalized fitness optimization strategies']
};

export function FunctionalFitnessAgeUpsellPage() {
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
    addToBasket(functionalFitnessAgeAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'functional-fitness-age-test-questions';
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
                  Functional Fitness Age Assessment
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Move Like You're 25.
                  <span className="block text-primary">Age Like A Champion.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover your true functional fitness age and get evidence-based strategies to move better, stronger, and younger than your years.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleTryDemo} size="lg" className="px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo Quiz
                  </Button>
                  <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                    Get my fitness age
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
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Defy Your Age. Master Your Movement.</h1>
            <h2 className="text-muted-foreground text-left">Your personalized Functional Fitness Age reveals how well your body moves compared to your chronological age — and how to turn back the clock on physical decline.</h2>
            <p className="text-left text-muted-foreground mt-6">
              This comprehensive assessment evaluates key factors that influence your movement quality, physical capability, and functional aging. Understanding your functional fitness age is crucial because movement deterioration is one of the earliest signs of aging and a primary predictor of health outcomes. Early identification allows you to implement targeted interventions to maintain and improve physical function throughout your lifespan.
            </p>
          </div>
        </div>
      </section>

      {/* Functional Fitness Age Assessment Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{functionalFitnessAgeAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {functionalFitnessAgeAssessment.description}
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
                              Comprehensive movement quality and physical capability analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Functional fitness age calculation with age-specific benchmarks
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalized movement optimization strategies and training protocols
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalized movement recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for health-conscious individuals who want to understand and optimize their physical capabilities. It is particularly relevant for those experiencing movement limitations, seeking to prevent age-related decline, or wanting to enhance athletic performance. By analyzing key movement and fitness factors, it supports those who want to maintain peak physical function throughout their lifespan.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in collaboration with exercise physiology and movement science experts and informed by reputable, cutting-edge research, clinical trial data, and scientific guidance. They are designed to provide robust and reliable insights; however, they are not a substitute for comprehensive fitness testing or biomechanical analysis. We strongly recommend that results are reviewed and discussed with an appropriate fitness professional or physical therapist.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£44.99</p>
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
                    Get my fitness age
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