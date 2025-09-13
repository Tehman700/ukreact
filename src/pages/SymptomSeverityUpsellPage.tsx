import image_58160ccd142f6effee31fd824869da70127d9968 from 'figma:asset/58160ccd142f6effee31fd824869da70127d9968.png';
import image_579ff64bca03156d9d1350ac1431855034562fdb from 'figma:asset/579ff64bca03156d9d1350ac1431855034562fdb.png';
import image_e724c754d0cc9dcd5eeeffb26d1d14964a61edd4 from 'figma:asset/e724c754d0cc9dcd5eeeffb26d1d14964a61edd4.png';
import image_e25c52e0f57dac5e760ea729fcfd7152cffc12bf from 'figma:asset/e25c52e0f57dac5e760ea729fcfd7152cffc12bf.png';
import image_01c579a5598743915ff434681ec8bb1f394d7816 from 'figma:asset/01c579a5598743915ff434681ec8bb1f394d7816.png';
import image_a73160b65e96ecdd062eaee8e759471d881c9156 from 'figma:asset/a73160b65e96ecdd062eaee8e759471d881c9156.png';
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from '../App';
import { 
  Thermometer, 
  Play
} from 'lucide-react';
import heroImage from 'figma:asset/816df46b1563ebaa0e031d306f4b6df626181562.png';

// Symptom Severity Assessment definition
const symptomSeverityAssessment: Assessment = {
  id: '10',
  name: 'Symptom Severity Index',
  description: 'Comprehensive assessment capturing frequency and intensity of pain, fatigue, digestive or joint issues.',
  price: 43.00, // Fixed: was 42.99, now matches globalAssessments
  image: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbmljJTIwcGFpbiUyMGFzc2Vzc21lbnQlMjBtZWRpY2FsfGVufDF8fHx8MTc1NzM0NjYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  icon: <Thermometer className="w-6 h-6" />,
  features: ['Pain intensity scoring', 'Fatigue impact analysis', 'Digestive symptom tracking']
};

export function SymptomSeverityUpsellPage() {
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
    addToBasket(symptomSeverityAssessment);
  };

  const handleTryDemo = () => {
    window.location.hash = 'symptom-severity-index-questions';
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
                  Symptom Severity Assessment
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Track Your Symptoms.
                  <span className="block text-primary">Take Control.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Get clear insights into your symptom patterns and personalized strategies for effective management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleTryDemo} size="lg" className="px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                  <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                    Get Full Analysis
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
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Understand Your Symptoms. Take Control.</h1>
            <h2 className="text-muted-foreground text-left">Your personalized Symptom Severity Index reveals the true impact of pain, fatigue, and other symptoms on your daily life — with evidence-based strategies to manage them effectively.</h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment captures the frequency and intensity of your symptoms across multiple validated scales. Understanding your symptom patterns is vital because it helps you track changes over time, communicate more effectively with healthcare providers, and develop targeted management strategies that can significantly improve your quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Symptom Severity Assessment Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{symptomSeverityAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {symptomSeverityAssessment.description}
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
                              Pain intensity scoring and pattern analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Fatigue impact assessment and energy tracking
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Digestive and joint symptom evaluation
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 15-20 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report with personalized symptom management strategies straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals experiencing chronic symptoms who want to better understand and manage their condition. It's particularly valuable for men over 40 dealing with persistent pain, fatigue, digestive issues, or joint problems. By providing detailed symptom tracking, it supports patients who want to optimize their treatment and improve their quality of life.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in collaboration with healthcare professionals and informed by reputable, cutting-edge research, clinical trial data, and national body guidance. They are designed to provide robust and reliable insights; however, they are not a substitute for a formal medical diagnosis. We strongly recommend that results are reviewed and discussed with an appropriate healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£{symptomSeverityAssessment.price.toFixed(2)}</p>
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
                    Start Assessment
                  </Button>
                  <Button 
                    onClick={handleStartAssessment}
                    className="w-full"
                    variant="outline"
                  >
                    Get my symptom analysis now
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