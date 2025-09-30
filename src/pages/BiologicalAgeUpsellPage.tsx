import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Assessment, BasketItem } from './AssessmentsPage';
import { Clock, Play } from 'lucide-react';
import biologicalAgeImage from '/assests/bio-sec.webp';
import heroImage from '/assests/bio-hero.webp';
// --- Utilities
const formatPrice = (value: number, currency: string = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);

// Biological Age Assessment definition (single source of truth)
const biologicalAgeAssessment: Assessment = {
  id: '2',
  name: 'Practical Biological Age Proxy',
  description:
    'A pragmatic, evidence-informed proxy for biological age showing where you may be ageing faster—and what to change first.',
  price: 299.99,
  image: biologicalAgeImage,
  icon: <Clock className="w-6 h-6" />,
  category: 'Longevity',
  features: [
    'Biological vs chronological age comparison',
    'Age-acceleration analysis across key markers',
    'Priority actions to slow biological ageing',
  ],
};

export function BiologicalAgeUpsellPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToBasket = (assessment: Assessment) => {
    setBasketItems((prev) => {
      const existingItem = prev.find((item) => item.assessment.id === assessment.id);
      if (existingItem) {
        return prev.map((item) =>
          item.assessment.id === assessment.id ? { ...item, quantity: item.quantity + 1 } : item
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
      prev.map((item) => (item.assessment.id === assessmentId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = useMemo(
    () => basketItems.reduce((total, item) => total + item.assessment.price * item.quantity, 0),
    [basketItems]
  );

  const handleStartAssessment = () => addToBasket(biologicalAgeAssessment);
  const handleTryDemo = () => {
    window.location.hash = 'biological-age-calculator-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              <ImageWithFallback
                src={heroImage}
                alt="Biological Age Report preview"
                className="w-full h-auto object-cover rounded-lg mt-[26px]"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">Biological Age Assessment</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Discover Your True Age.
              <span className="block text-primary">Extend Your Healthspan.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              A practical age proxy that highlights what’s pushing you faster—and the highest‑impact changes to slow it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleTryDemo} size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" />
                Try Demo Quiz
              </Button>
              <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                Get my age now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Know it. Then improve it.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Biological Age proxy reveals if you’re ageing faster than expected—and where small changes can create the biggest slowdown.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              Understanding your age trajectory helps target nutrition, movement, sleep, and recovery so you can protect energy, cognition, and mobility for longer.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback
                  src={biologicalAgeImage}
                  alt="Longevity benefits visual"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Clarity */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground">One score, clear direction.</p>
                  </CardContent>
                </Card>

                {/* Top Right - Trajectory */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Trajectory</h3>
                    <p className="text-sm text-muted-foreground">See if ageing is accelerated.</p>
                  </CardContent>
                </Card>

                {/* Middle Left - Metabolism */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Metabolism</h3>
                    <p className="text-sm text-muted-foreground">Glucose, lipids, inflammation.</p>
                  </CardContent>
                </Card>

                {/* Middle Right - Recovery */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Recovery</h3>
                    <p className="text-sm text-muted-foreground">Sleep and stress load insights.</p>
                  </CardContent>
                </Card>

                {/* Bottom Left - Confidence */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Act on what matters most.</p>
                  </CardContent>
                </Card>

                {/* Bottom Right - Personal */}
                <Card className="absolute bottom-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">Recommendations matched to you.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Layout - Grid Below Image */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                {[
                  ['Clarity', 'One score, clear direction.'],
                  ['Trajectory', 'See if ageing is accelerated.'],
                  ['Metabolism', 'Glucose, lipids, inflammation.'],
                  ['Recovery', 'Sleep and stress load insights.'],
                  ['Confidence', 'Act on what matters most.'],
                  ['Personal', 'Recommendations matched to you.'],
                ].map(([title, body]) => (
                  <Card key={title as string} className="bg-white shadow-lg">
                    <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
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

      {/* Assessment Card */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{biologicalAgeAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{biologicalAgeAssessment.description}</p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">What's included in this assessment?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Biological vs chronological age comparison
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Acceleration analysis across metabolic and recovery markers
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              A short-list of highest‑impact actions to slow ageing
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most people finish in 15–30 minutes online. Your results are usually ready the same day, with a practical summary and step‑by‑step recommendations sent to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is it for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Anyone who wants a clear, actionable picture of how they’re ageing—and how to improve it. It’s particularly relevant for men over 40 focused on energy, mobility, and long‑term healthspan.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our approach is evidence‑informed and developed with clinicians. It provides robust guidance but is not a diagnosis or substitute for clinical testing. Please review results with your healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{formatPrice(biologicalAgeAssessment.price)}</p>
                      </div>
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
                    Get my age now
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
        totalPrice={totalPrice}
      />
    </div>
  );
}
