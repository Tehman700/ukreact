import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from '../App';
import { AlertTriangle, Play } from 'lucide-react';
import heroImage from '/assests/complication-hero.webp';
import benefitsImage from '/assests/complication-sec.webp';

// Complication Risk Checker Assessment definition (matches template structure)
const complicationRiskAssessment: Assessment = {
  id: '6',
  name: 'Complication Risk Checker',
  description:
    'Comprehensive lifestyle and comorbidity analysis to predict and prevent surgical complications before they occur.',
  price: 39.99,
  image:
    'https://images.unsplash.com/photo-1682365114794-14b870355d21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29tcGxpY2F0aW9uJTIwcmlzayUyMGFzc2VzbWVudHxlbnwxfHx8fDE3NTczMTU2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  icon: <AlertTriangle className="w-6 h-6" />,
  features: ['Lifestyle risk factor analysis', 'Comorbidity assessment scoring', 'Personalized prevention strategies']
};

interface ComplicationRiskUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function ComplicationRiskUpsellPage({ onAddToBasket, onOpenBasket }: SurgeryReadinessUpsellPageProps) {
//   const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
//   const [isBasketOpen, setIsBasketOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(complicationRiskAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'complication-risk-checker-questions';
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
      alt="Complication Risk Checker Report"
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
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground"> Complication Risk Assessment </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Prevent Complications.
              <span className="block text-primary">Protect Your Health.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Identify your hidden risk factors and get specific strategies to minimise surgical complications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleTryDemo} size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" /> Try Demo Quiz
              </Button>
              <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                Get my risk analysis now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated copy adapted) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Identify Hidden Risks. Prevent Complications.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Complication Risk Assessment reveals lifestyle and health factors that could impact your surgery — with specific strategies to address them beforehand.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment identifies factors unique to you that may increase your risk of surgical complications. Understanding these hidden risks is vital because it helps you take proactive steps, work with your healthcare team to optimise your health, and significantly improve your surgical outcomes and recovery experience.
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
                <ImageWithFallback src={benefitsImage} alt="Luther Health Benefits" className="w-full h-auto object-cover rounded-lg" />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                {/* Top Left - Clarity */}
<Card className="absolute top-4 left-4 lg:left-8 xl:left-12 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
  <CardContent className="p-6 h-full flex flex-col">
    <h3 className="font-bold mb-3">Clarity</h3>
    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
      Your risk profile in one glance, made simple.
    </p>
  </CardContent>
</Card>


                {/* Top Right - Speed */}
  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Speed</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify"> Act now, avoid setbacks, with confidence. </p>
                  </CardContent>
                </Card>
                {/* Middle Left - Insight */}
  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Insight</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify"> Spot complication before they grow, with clarity. </p>
                  </CardContent>
                </Card>
                {/* Middle Right - Confidence */}
  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Confidence</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify"> Go into surgery prepared, for recovery. </p>
                  </CardContent>
                </Card>
                {/* Bottom Left - Protection */}
<Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Protection</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify"> Lower risk, smoother recovery, through insight. </p>
                  </CardContent>
                </Card>
                {/* Bottom Right - Personal */}
  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-bold mb-3">Personal</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify"> Strategies tailored to you, with precision. </p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Layout - Grid Below Image */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground"> Your risk profile in one glance, made simple.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Speed</h3>
                    <p className="text-sm text-muted-foreground"> Act now, avoid setbacks, with confidence. </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground"> Spot complication before they grow, with clarity. </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground"> Go into surgery prepared, for recovery. </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Protection</h3>
                    <p className="text-sm text-muted-foreground"> Lower risk, smoother recovery, through insight. </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground"> Strategies tailored to you, with precision. </p>
                  </CardContent>
                </Card>
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
                    <h3 className="font-medium">{complicationRiskAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{complicationRiskAssessment.description}</p>
                  </div>

                  {/* FAQ Accordion */}
                  <div className="flex-1">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="what-included">
                        <AccordionTrigger className="text-sm text-left">What's included in this assessment?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-3">
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Lifestyle risk factor analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Comorbidity assessment scoring
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" /> Personalised prevention strategies
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take to complete?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 5–7 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report with personalised risk reduction strategies straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is this assessment for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals preparing for surgery who want to identify and minimise potential complications. It's particularly valuable for men over 40 who may have multiple health factors that could impact surgical outcomes. By identifying hidden risks early, it supports patients who want to optimise their health and improve their surgery success rates.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
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
                        <p className="font-medium">£{complicationRiskAssessment.price.toFixed(2)}</p>
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
                    Get my risk analysis now
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
