import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment } from '../App';
import { Shield } from 'lucide-react';
import surgeryReadinessImage from 'figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png';
import heroImage from '/assests/surgery-hero.webp';
import benefitsImage from '/assests/surgery-sec.webp';

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: '1',
  name: 'Surgery Readiness Score',
  description:
    'Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.',
  price: 37.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  category: 'Pre-Surgery',
  features: [
    'Pre-surgical health optimization',
    'Risk assessment protocols',
    'Recovery timeline planning',
  ],
};

interface SurgeryReadinessUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function SurgeryReadinessUpsellPage({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'surgery-readiness-assessment-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-0 px-[14px] pb-[30px]">
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
              <ImageWithFallback
                src={heroImage}
                alt="Surgery Readiness Score Report"
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
              Surgery Readiness Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Optimize Your Surgery.
              <span className="block text-primary">Minimize Risks.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get your personalized readiness score and evidence-based strategies for the best
              possible outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my score
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section */}
      <section className="py-8 pt-[35px] pb-[28px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left my-[14px] font-bold">Reduce Risks. Improve Recovery.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Surgery Readiness Score shows what could hold you back — and
              importantly how to fix it before the operation.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This report identifies factors unique to you that may affect your readiness for
              surgery. Knowing your surgery-specific risks is vital because it helps you make
              informed decisions, prepare for potential challenges, and work with your healthcare
              team to minimize complications and support a safer recovery.
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
                  [
                    'Clarity at a Glance',
                    'A single readiness score gives you an elegant, straightforward measure of where you stand.',
                  ],
                  [
                    'Accelerated Recovery',
                    'With the right preparation, your recovery can be quicker and easier, so you can get back to doing what you love, sooner.',
                  ],
                  ['Exclusive Insight', 'Uncovers hidden risks so you can address them before they become obstacles.'],
                  ['Confidence Restored', "Peace of mind knowing you're entering surgery at your very best."],
                  ['Premium Protection', 'Reduced complications mean a smoother, safer surgical journey.'],
                  ['Bespoke Planning', 'A personalised improvement plan crafted around your top priorities.'],
                ].map(([title, body]) => (
                  <Card key={title} className="bg-white shadow-lg">
                    <CardContent className="p-4">
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

      {/* Surgery Readiness Assessment Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="font-medium">{surgeryReadinessAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {surgeryReadinessAssessment.description}
                    </p>
                  </div>

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
                              Your personalized readiness score
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              An in-depth report detailing your current health status
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Bespoke recommendations designed to reduce risks and optimise your
                              outcome
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results
                          are usually ready the same day, and we'll send you a detailed report along
                          with personalized recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals preparing for surgery who wish
                          to optimise their health and recovery outcomes. It is particularly
                          relevant for men over 50 who may be awaiting procedures such as joint
                          replacement or other planned operations. By highlighting key health
                          factors and providing evidence-based recommendations, it supports patients
                          who want to reduce risks, enhance resilience, and improve post-surgical
                          recovery.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence-based methodologies, developed in
                          collaboration with healthcare professionals and informed by reputable,
                          cutting-edge research, clinical trial data, and national body guidance.
                          They are designed to provide robust and reliable insights; however, they
                          are not a substitute for a formal medical diagnosis. We strongly recommend
                          that results are reviewed and discussed with an appropriate healthcare
                          provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          £{surgeryReadinessAssessment.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    onClick={handleStartAssessment}
                    className="w-full bg-black text-white hover:bg-black/90 transition-colors duration-200"
                  >
                    Get my score now
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
