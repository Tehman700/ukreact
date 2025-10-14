import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from './AssessmentsPage';
import {
  Play,
  Activity,
  Shield,
  TrendingUp,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';
import biologicalAgeImage from '/assests/functional-sec.webp';
import heroImage from '/assests/functional-hero.webp';

// Functional Fitness Age Assessment definition
const functionalFitnessAgeAssessment: Assessment = {
  id: '20',
  name: 'Functional Fitness Age Test',
  description:
    'Comprehensive physical capability assessment to determine your functional fitness age and identify movement quality decline patterns.',
  price: 44,
  image: biologicalAgeImage,
  icon: <Activity className="w-6 h-6" />,
  category: 'Fitness',
  features: [
    'Movement quality analysis',
    'Physical capability assessment',
    'Personalized fitness optimization strategies',
  ],
};

interface FunctionalFitnessAgeUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function FunctionalFitnessAgeUpsellPage({ onAddToBasket, onOpenBasket }: FunctionalFitnessAgeUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(functionalFitnessAgeAssessment);
    onOpenBasket();
  };
  const handleTryDemo = () => {
    window.location.hash = 'functional-fitness-age-test-questions';
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
      alt="Functional Fitness Age Report"
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
              Functional Fitness Age Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Move Like You’re Younger.
              <span className="block text-primary">Age Like a Champion.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover your true functional fitness age and get evidence-based strategies to move better, stronger, and younger than your years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get my fitness age
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Defy Your Age. Master Your Movement.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Functional Fitness Age reveals how well your body moves compared to your chronological age — and how to turn back the clock on physical decline.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment evaluates balance, mobility, strength, and endurance to identify gaps that accelerate functional ageing. Early identification lets you implement targeted interventions to preserve independence, reduce injury risk, and perform at your best.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Overlapping Cards (templated) */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background Image */}
              <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-0">
                <ImageWithFallback
                  src={biologicalAgeImage}
                  alt="Functional Fitness Benefits"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

{/* Desktop Overlapping Cards */}
<div className="hidden md:block absolute inset-0 pointer-events-none">
  <Card className="absolute top-4 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Clarity</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Understand your fitness age clearly<br />
        with one simple score that reflects<br />
        your real capacity and daily strength.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Speed</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Get fast, accurate insights through<br />
        a quick test designed to fit easily<br />
        into your daily training schedule.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Insight</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Identify weak links and imbalances<br />
        early on so you can train smarter<br />
        and build a stronger foundation.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Know exactly where you stand today<br />
        and how to improve performance<br />
        without risking overtraining fatigue.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Protection</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Train with precision and intention<br />
        to reduce injury risks and maintain<br />
        strength and mobility long term.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[240px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow a personalized training plan<br />
        crafted around your strengths, goals<br />
        and recovery needs for real results.
      </p>
    </CardContent>
  </Card>
</div>

{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'Understand your fitness age in one simple score that reflects your real physical capacity.'],
    ['Speed', 'Get fast, accurate insights with a quick test designed to fit easily into your routine.'],
    ['Insight', 'Identify weak links early so you can train smarter and build a stronger foundation.'],
    ['Confidence', 'Know exactly where you stand and how to improve without risking overtraining.'],
    ['Protection', 'Train with precision to lower your risk of injuries and support long-term performance.'],
    ['Personal', 'Receive a training plan built around your unique strengths, goals, and recovery needs.'],
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

      {/* Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
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
                              Personalised movement optimisation strategies and training protocols
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalised movement recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is for anyone who wants to understand and optimise their physical capabilities. It's particularly relevant if you're noticing movement limitations, want to prevent age-related decline, or aim to enhance athletic performance. By analysing key movement and fitness factors, it supports you to maintain peak physical function throughout your lifespan.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our methodologies are evidence-based and developed with exercise physiology and movement science experts. They provide robust insights, but they aren't a substitute for comprehensive fitness testing or biomechanical analysis. We recommend discussing results with a qualified fitness professional or physical therapist.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£44.00</p>
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
                    Get my fitness age
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
