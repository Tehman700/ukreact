import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from './AssessmentsPage';
import { Users, Play } from 'lucide-react';
import heroImage from '/assests/lifestyle-hero.webp';
import sec from '/assests/lifestyle-sec.webp';

// --- Utilities
const formatPrice = (value: number, currency: string = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);

// Lifestyle Limiter Assessment definition (single source of truth)
const lifestyleLimiterAssessment: Assessment = {
  id: '14',
  name: 'Lifestyle Limiter Score',
  description:
    'Quantifies how symptoms are limiting work, social life, and daily independence—then points to the fastest wins.',
  price: 44.99,
  image: heroImage,
  icon: <Users className="w-6 h-6" />,
  category: 'Chronic Symptoms',
  features: [
    'Work performance impact',
    'Social and relationship limitations',
    'Independence and daily function score',
  ],
};
interface LifestyleLimiterUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function LifestyleLimiterUpsellPage({ onAddToBasket, onOpenBasket }: LifestyleLimiterUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(lifestyleLimiterAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'lifestyle-limiter-score-questions';
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
      alt="Lifestyle Limiter Score preview"
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
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">Lifestyle Impact Assessment</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Reclaim Your Life.
              <span className="block text-primary">Reduce the Limits.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              A clear, practical score that shows what’s holding you back at work, in relationships, and day‑to‑day—and how to start fixing it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my score now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Measure it. Improve it.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Lifestyle Limiter Score quantifies how symptoms restrict work, social life, and independence—then gives targeted steps to loosen those limits.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              With the right adjustments to pacing, routines, and recovery, many people regain capacity without flare‑ups. Use your score to guide workplace changes, plan social energy, and protect what matters most.
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
                  src={sec}
                  alt="Lifestyle impact visual"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Overlapping Cards - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0">
                {/* Top Left - Work */}
                <Card className="absolute top-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="pt-[15px] pr-[14px] pb-[21px] pl-[14px]">
                    <h3 className="font-medium mb-2">Work</h3>
                    <p className="text-sm text-muted-foreground">Focus, stamina, productivity.</p>
                  </CardContent>
                </Card>

                {/* Top Right - Social */}
                <Card className="absolute top-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Social</h3>
                    <p className="text-sm text-muted-foreground">Connection without burnout.</p>
                  </CardContent>
                </Card>

                {/* Middle Left - Independence */}
                <Card className="absolute top-1/2 -translate-y-1/2 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Independence</h3>
                    <p className="text-sm text-muted-foreground">Daily tasks, safely paced.</p>
                  </CardContent>
                </Card>

                {/* Middle Right - Energy */}
                <Card className="absolute top-1/2 -translate-y-1/2 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Energy</h3>
                    <p className="text-sm text-muted-foreground">Plan days to avoid crashes.</p>
                  </CardContent>
                </Card>

                {/* Bottom Left - Confidence */}
                <Card className="absolute bottom-40 -left-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Confidence</h3>
                    <p className="text-sm text-muted-foreground">Know your limits—and expand them.</p>
                  </CardContent>
                </Card>

                {/* Bottom Right - Direction */}
                <Card className="absolute bottom-40 -right-8 max-w-xs bg-white/95 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Direction</h3>
                    <p className="text-sm text-muted-foreground">Clear next steps that fit.</p>
                  </CardContent>
                </Card>
              </div>

{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Work', 'Stay focused longer and get more done. Build stamina without pushing past your limits.'],
    ['Social', 'Enjoy meaningful connections while protecting your energy. Stay engaged, not burnt out.'],
    ['Independence', 'Handle daily tasks at your own pace. Stay safe, steady, and in control.'],
    ['Energy', 'Plan your day around natural highs and lows. Prevent crashes before they happen.'],
    ['Confidence', 'Know your limits clearly—and gradually push them further. Build strength with trust.'],
    ['Direction', 'Get clear, personalized next steps. Make every day feel more structured and doable.'],
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
                    <h3 className="font-medium">{lifestyleLimiterAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{lifestyleLimiterAssessment.description}</p>
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
                              Work performance and productivity impact analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Social and relationship limitation assessment
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Independence and daily living capacity scoring
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most people finish in 10–15 minutes online. Your results are usually ready the same day, with a clear summary and practical next steps sent to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is it for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Anyone managing ongoing symptoms who wants to protect work, relationships, and independence. It’s especially useful for people balancing chronic conditions with professional and family life.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">How accurate are the results?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our screeners follow evidence‑informed methods developed with clinicians. They provide robust guidance but are not a diagnosis—please review results with your healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{formatPrice(lifestyleLimiterAssessment.price)}</p>
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
