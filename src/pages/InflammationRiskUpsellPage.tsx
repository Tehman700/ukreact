import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from '../App';
import { Heart, Play } from 'lucide-react';
import heroImage from '/assests/inflammation-hero.webp';
import benefitsImage from '/assests/inflammation-sec.webp';

// Inflammation Risk Assessment definition
const inflammationRiskAssessment: Assessment = {
  id: '11',
  name: 'Inflammation Risk Score',
  description: 'Evidence-based assessment rooted in diet, lifestyle, sleep patterns, and stress levels.',
  price: 38.99,
  image:
    'https://images.unsplash.com/photo-1670698783848-5cf695a1b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZsYW1tYXRpb24lMjBkaWV0JTIwbGlmZXN0eWxlJTIwaGVhbHRofGVufDF8fHx8MTc1NzM0NjYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  icon: <Heart className="w-6 h-6" />,
  features: ['Dietary inflammation analysis', 'Lifestyle factor assessment', 'Stress impact evaluation']
};


interface InflammationRiskUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}
export function InflammationRiskUpsellPage({ onAddToBasket, onOpenBasket }: InflammationRiskUpsellPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(inflammationRiskAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'inflammation-risk-score-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (matches template layout) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
    <ImageWithFallback
      src={heroImage}
      alt="Inflammation Risk Score Report"
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
              Inflammation Risk Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Reduce Inflammation.
              <span className="block text-primary">Restore Health.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Identify your personal inflammation triggers and get targeted strategies for lasting relief.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleTryDemo} size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" />
                Try Demo Quiz
              </Button>
              <Button onClick={handleStartAssessment} variant="outline" size="lg" className="px-8">
                Get my score now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (matches template) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Reduce Inflammation. Optimize Health.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalized Inflammation Risk Score reveals how diet, lifestyle, and stress patterns contribute to chronic inflammation — with targeted strategies to reduce your risk.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment analyzes lifestyle factors that influence your inflammatory status based on evidence-based research. Understanding your inflammation risk is vital because chronic inflammation underlies many health conditions, affects recovery and healing, and impacts your overall well-being and longevity.
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
                <ImageWithFallback src={benefitsImage} alt="Luther Health Inflammation Benefits" className="w-full h-auto object-cover rounded-lg" />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Clarity */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground">Your risk in one score.</p>
                  </CardContent>
                </Card>
                {/* Top Right - Relief */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Relief</h3>
                    <p className="text-sm text-muted-foreground">Act on triggers fast.</p>
                  </CardContent>
                </Card>
                {/* Middle Left - Insight */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">Spot patterns driving flare-ups.</p>
                  </CardContent>
                </Card>
                {/* Middle Right - Resilience */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Resilience</h3>
                    <p className="text-sm text-muted-foreground">Build habits that protect.</p>
                  </CardContent>
                </Card>
                {/* Bottom Left - Prevention */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Prevention</h3>
                    <p className="text-sm text-muted-foreground">Lower long-term risk.</p>
                  </CardContent>
                </Card>
                {/* Bottom Right - Personal */}
                <Card className="absolute bottom-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">A plan built for you.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Layout - Grid Below Image */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Clarity</h3>
                    <p className="text-sm text-muted-foreground">Your risk in one score.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Relief</h3>
                    <p className="text-sm text-muted-foreground">Act on triggers fast.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Insight</h3>
                    <p className="text-sm text-muted-foreground">Spot patterns driving flare-ups.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Resilience</h3>
                    <p className="text-sm text-muted-foreground">Build habits that protect.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Prevention</h3>
                    <p className="text-sm text-muted-foreground">Lower long-term risk.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-[6px] pr-[14px] pb-[13px] pl-[14px]">
                    <h3 className="font-medium mb-2">Personal</h3>
                    <p className="text-sm text-muted-foreground">A plan built for you.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inflammation Risk Assessment Card (matches template structure) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{inflammationRiskAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{inflammationRiskAssessment.description}</p>
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
                              Dietary inflammation analysis and food scoring
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Lifestyle factor assessment and risk evaluation
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Stress impact evaluation and management strategies
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take to complete?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 10–15 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report with personalized anti-inflammatory strategies straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is this assessment for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals who want to understand and reduce their inflammation risk through lifestyle optimization. It's particularly valuable for men over 40 who may be experiencing signs of chronic inflammation or want to prevent inflammatory conditions. By identifying risk factors early, it supports those who want to take proactive steps for long-term health.
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
                        <p className="font-medium">£{inflammationRiskAssessment.price.toFixed(2)}</p>
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
                    Get my inflammation analysis now
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
