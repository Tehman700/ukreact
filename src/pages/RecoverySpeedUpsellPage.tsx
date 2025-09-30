import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from '../App';
import { Zap, Play } from 'lucide-react';
import heroImage from '/assests/recovery-hero.webp';
import sec from '/assests/recovery-sec.webp';


// Recovery Speed Predictor Assessment definition
const recoverySpeedAssessment: Assessment = {
  id: '7',
  name: 'Recovery Speed Predictor',
  description:
    'Personalised recovery timeline based on nutrition, mindset, and home support systems to optimise healing.',
  price: 44.99,
  image:sec,
  icon: <Zap className="w-6 h-6" />,
  features: ['Nutrition impact analysis', 'Mental readiness assessment', 'Support system optimisation'],
};

export function RecoverySpeedUpsellPage() {
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

  const getTotalPrice = () =>
    basketItems.reduce((total, item) => total + item.assessment.price * item.quantity, 0);

  const handleStartAssessment = () => addToBasket(recoverySpeedAssessment);

  const handleTryDemo = () => {
    window.location.hash = 'recovery-speed-predictor-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (templated) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-2xl mx-auto lg:max-w-xl">
    <ImageWithFallback
      src={heroImage}
      alt="Recovery Speed Predictor Report"
      width={1600}
      height={2000}
      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 900px"
      quality={90}
      priority
      className="w-full h-auto object-cover rounded-lg mt-6 max-h-[900px]"
    />
    <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
  </div>
</div>

          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              Recovery Speed Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Predict Your Recovery.
              <span className="block text-primary">Optimise Healing.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your personalised recovery timeline and targeted strategies to accelerate healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleTryDemo} size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" /> Try Demo Quiz
              </Button>
              <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                Get prediction now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Predict Your Recovery. Optimise Your Healing.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Recovery Speed Assessment reveals how nutrition, mindset, and support systems will impact
              your healing timeline — with specific strategies to accelerate your recovery.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This prediction tool analyses factors unique to you that influence healing speed. Understanding your
              recovery potential is vital because it helps you set realistic expectations, optimise your preparation
              strategies, and work with your healthcare team to minimise recovery time and complications.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards (adapted from template) */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback
                  src={recoverySpeedAssessment.image}
                  alt="Luther Health Recovery Benefits"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

<div className="hidden md:block absolute inset-0">
  {/* Top Left - Timeline */}
  <Card className="absolute top-4 left-4 lg:left-8 xl:left-12 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Timeline</h3>
      <p className="text-sm text-muted-foreground">
        See your likely recovery for smoother healing <br />
        Plan each stage with confidence.
      </p>
    </CardContent>
  </Card>

  {/* Top Right - Nutrition */}
  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Nutrition</h3>
      <p className="text-sm text-muted-foreground">
        Fuel your body with the right foods. <br />
        Support steady healing every day.
      </p>
    </CardContent>
  </Card>

  {/* Middle Left - Mindset */}
  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Mindset</h3>
      <p className="text-sm text-muted-foreground">
        Build resilience and focus to stay strong. <br />
        Approach recovery with a clear outlook.
      </p>
    </CardContent>
  </Card>

  {/* Middle Right - Support */}
  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Support</h3>
      <p className="text-sm text-muted-foreground">
        Optimise help at home for peace of mind. <br />
        Rely on care that eases recovery.
      </p>
    </CardContent>
  </Card>

  {/* Bottom Left - Confidence */}
  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground">
        Know what to expect every step ahead. <br />
        Face surgery with calm assurance.
      </p>
    </CardContent>
  </Card>

  {/* Bottom Right - Personal */}
  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[190px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground">
        A plan built around your unique needs. <br />
        Tailored guidance for a smoother path.
      </p>
    </CardContent>
  </Card>
</div>



              {/* Mobile Layout - Grid Below Image */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Timeline</h3>
                    <p className="text-sm text-muted-foreground">Your phased recovery.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Nutrition</h3>
                    <p className="text-sm text-muted-foreground">Fuel healing daily.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Mindset</h3>
                    <p className="text-sm text-muted-foreground">Resilience & focus.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Support</h3>
                    <p className="text-sm text-muted-foreground">Help at home.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Expectations set.</p>
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

      {/* Recovery Speed Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{recoverySpeedAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{recoverySpeedAssessment.description}</p>
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
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Nutrition impact
                              analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Mental readiness
                              assessment
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Support system
                              optimisation
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take to complete?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 10–12 minutes to complete online. Your results are usually ready the
                          same day, and we'll send you a detailed report with your predicted recovery timeline and
                          optimisation strategies straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is this assessment for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals preparing for surgery who want to optimise their
                          recovery speed and outcomes. It's particularly valuable for men over 40 who want to understand
                          how their nutrition, mindset, and home environment will impact healing. By providing
                          personalised recovery predictions, it supports patients who want to take active steps to
                          accelerate their healing process.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in collaboration with
                          healthcare professionals and informed by reputable, cutting-edge research, clinical trial
                          data, and national body guidance. They are designed to provide robust and reliable insights;
                          however, they are not a substitute for a formal medical diagnosis. We strongly recommend that
                          results are reviewed and discussed with an appropriate healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£{recoverySpeedAssessment.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <Button onClick={handleTryDemo} className="w-full" variant="default">
                    <Play className="w-4 h-4 mr-2" /> Start Assessment
                  </Button>
                  <Button onClick={handleStartAssessment} className="w-full" variant="outline">
                    Get prediction now
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
