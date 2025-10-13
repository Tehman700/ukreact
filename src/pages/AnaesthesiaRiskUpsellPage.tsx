import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment } from '../App';
import { Heart, Play } from 'lucide-react';
import heroImage from '/assests/anaesthesia-hero.webp';
import benefitsImage from '/assests/sec.webp';

// --- Utilities
const formatPrice = (value: number, currency: string = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);

// Anaesthesia Risk Screener Assessment definition (single source of truth)
const anaesthesiaRiskAssessment: Assessment = {
  id: '8',
  name: 'Anaesthesia Risk Screener',
  description:
    'Fast, evidence-based screening to flag sleep apnoea risk, drug interactions, and lifestyle factors that raise anaesthesia complications—before you go to theatre.',
  price: 34.99,
  image: heroImage,
  icon: <Heart className="w-6 h-6" />,
  features: [
    'Sleep apnoea risk scoring',
    'Medication + supplement interaction check',
    'Alcohol and airway safety evaluation',
  ],
};

interface AnaesthesiaRiskUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function AnaesthesiaRiskUpsellPage({ onAddToBasket, onOpenBasket }: AnaesthesiaRiskUpsellPageProps) {

    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(anaesthesiaRiskAssessment);
    onOpenBasket();

  };
const handleTryDemo = () => {
    window.location.hash = 'anaesthesia-risk-screener-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
    <ImageWithFallback
      src={heroImage}
      alt="Anaesthesia Risk Screener Report"
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
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">Anaesthesia Risk Assessment</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Screen Hidden Risks.
              <span className="block text-primary">Make Anaesthesia Safer.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              A quick, focused safety check that highlights what could complicate your anaesthetic—and how to fix it before surgery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my screening now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Context / Why it matters */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Safer Anaesthesia Starts Here</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised screener pinpoints airway, medication, and sleep-related risks that can turn a simple anaesthetic into a complicated one—so you and your team can plan ahead.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              Knowing your specific risks means medication choices, fasting advice, and monitoring can be tailored to you. That reduces complications, shortens recovery, and makes the whole experience smoother and safer.
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
                  src={benefitsImage}
                  alt="Luther Health Surgery Benefits"
                  className="w-200 h-auto object-cover rounded-lg"
                />
              </div>

              {/* Desktop Overlapping Cards */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                <Card className="absolute top-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Clarity at a Glance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      A single readiness score gives you an elegant <br /> straightforward measure of
                      <br /> where you stand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Exclusive Insight</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      Uncovers hidden risks so you can address
                      <br /> them before they become <br />
                      obstacles.
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Premium Protection</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      Reduced complications mean a smoother
                      <br /> safer surgical journey.
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Accelerated Recovery</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      Optimised preparation ensures you return
                      <br /> to the lifestyle you enjoy, faster.
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Confidence Restored</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      Peace of mind knowing you're entering
                      <br />
                      surgery at your very best.
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Bespoke Planning</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      A personalised improvement plan crafted
                      <br /> around your top priorities.
                    </p>
                  </CardContent>
                </Card>
              </div>

{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Safety', 'Spot and address potential risks early to keep your procedure safe.'],
    ['Precision', 'Ensure the right drug and dose decisions for your unique needs.'],
    ['Airway', 'Identify sleep apnoea or reflux risks before they become problems.'],
    ['Confidence', 'Walk in with clarity and a solid plan for what comes next.'],
    ['Recovery', 'Wake up smoother with fewer surprises and faster stabilization.'],
    ['Personal', 'Get recommendations designed around your health and history.'],
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

      {/* Assessment Card */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{anaesthesiaRiskAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{anaesthesiaRiskAssessment.description}</p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">What's included in this screening?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalised airway and sleep apnoea risk score
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Medication, supplement, and alcohol interaction review
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Clear pre-op adjustments you can make now
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most people finish in 6–8 minutes online. Your results are usually ready the same day, with a practical safety summary for you and discussion points for your anaesthesia team.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is it for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Anyone preparing for surgery who wants the safest possible anaesthetic. It’s especially helpful if you snore or pause breathing at night, take multiple medicines or supplements, or drink regularly.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our screeners follow evidence-based methods developed with clinicians and informed by current research and national guidance. They provide robust insights but are not a medical diagnosis—please review with your healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{formatPrice(anaesthesiaRiskAssessment.price)}</p>
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
                    Get my screening now
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
