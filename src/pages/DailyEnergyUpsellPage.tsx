import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from './AssessmentsPage';
import { Battery, Play } from 'lucide-react';
import heroImage from '/assests/energy-hero.webp';
import sec from '/assests/energy-sec.webp';

// Daily Energy Assessment definition
const dailyEnergyAssessment: Assessment = {
  id: '13',
  name: 'Daily Energy Audit',
  description:
    'Detailed snapshot of fatigue patterns, sleep quality metrics, and stamina optimization potential.',
  price: 42,
  image: sec,
  icon: <Battery className="w-6 h-6" />,
  category: 'Chronic Symptoms',
  features: ['Energy pattern analysis', 'Sleep quality assessment', 'Stamina optimization plan'],
};

interface DailyEnergyUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}


export function DailyEnergyUpsellPage({ onAddToBasket, onOpenBasket }: DailyEnergyUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);


  const handleStartAssessment = () => {
    onAddToBasket(dailyEnergyAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'daily-energy-audit-questions';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section (templated) */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-[0px] px-[14px] pt-[0px] pr-[14px] pb-[30px] pl-[14px]">
{/* Image */}
<div className="relative order-1 lg:order-2">
  <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-sm">
    <ImageWithFallback
      src={heroImage}
      alt="Daily Energy Audit Report"
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
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">Daily Energy Assessment</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Boost Your Energy.
              <span className="block text-primary">Reclaim Vitality.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Uncover what's draining your energy and get personalized strategies for sustainable vitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my score now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Sustainable Energy. Peak Performance.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Daily Energy Audit reveals what's draining your vitality — and shows you the path to
              consistent, sustainable energy throughout your day.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This report identifies factors unique to your lifestyle that may be affecting your energy levels and
              stamina. Understanding your personal energy patterns is vital because it helps you make informed
              decisions about sleep, nutrition, and daily habits, optimise your peak performance times, and work toward
              sustained vitality that supports your professional and personal goals.
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
                <ImageWithFallback src={sec} alt="Luther Health Energy Benefits" className="w-full h-auto object-cover rounded-lg" />
              </div>

{/* Desktop Overlapping Cards */}
<div className="hidden md:block absolute inset-0 pointer-events-none">
  <Card className="absolute top-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Clarity</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        See your daily energy patterns clearly<br />
        at a glance and understand exactly when<br />
        your focus and strength peak the most.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Rhythm</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Work with your body’s natural energy peaks<br />
        and align daily tasks to those powerful<br />
        moments when you feel strongest.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Insight</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Spot early signs of dips or fatigue before<br />
        they build up. Act quickly to stay balanced<br />
        and prevent unnecessary burnout.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Focus</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Protect your deep-work hours by planning<br />
        intentionally. Use your energy wisely and<br />
        get more meaningful work done.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Recovery</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Recharge intentionally between tasks to<br />
        keep your energy flow steady and strong.<br />
        Build simple habits that last.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow guidance crafted for your unique<br />
        rhythm. Make each day feel smoother and<br />
        far more productive overall.
      </p>
    </CardContent>
  </Card>
</div>


{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'See your daily energy patterns at a glance. Understand exactly when you’re at your best.'],
    ['Rhythm', 'Work with your natural energy peaks. Align tasks to the moments you feel strongest.'],
    ['Insight', 'Spot early signs of energy dips. Act fast to stay balanced and avoid burnout.'],
    ['Focus', 'Protect your deep-work hours. Use your energy wisely to get more done.'],
    ['Recovery', 'Recharge intentionally between tasks. Build habits that keep energy steady.'],
    ['Personal', 'Follow guidance tailored to your unique rhythm. Make every day more productive.'],
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

      {/* Daily Energy Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{dailyEnergyAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">{dailyEnergyAssessment.description}</p>
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
                              Energy pattern analysis and peak performance timing
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Sleep quality assessment and optimisation strategies
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalised stamina enhancement recommendations
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">How long does it take to complete?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 12–18 minutes to complete online. Your results are usually ready
                          the same day, and we'll send you a detailed report along with personalised recommendations
                          straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">Who is this assessment for?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals experiencing fatigue, energy crashes, or
                          inconsistent vitality who want to optimise their daily energy management. It's particularly
                          relevant for busy professionals and men over 40 who need sustained energy for demanding
                          schedules. By identifying energy patterns and optimisation opportunities, it supports those who
                          want to achieve peak performance consistently.
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
                        <p className="font-medium">£42.00</p>
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
