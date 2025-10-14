import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from './AssessmentsPage';
import { Pill, Play, Users } from 'lucide-react';
import heroImage from '/assests/burden-hero.webp';
import sec from '/assests/burden-sec.webp';


// Medication Burden Assessment definition
const medicationBurdenAssessment: Assessment = {
  id: '12',
  name: 'Medication Burden Calculator',
  description:
    'Comprehensive analysis weighing prescription load and potential drug interaction risks.',
  price: 47,
  image: sec,
  icon: <Pill className="w-6 h-6" />,
  category: 'Chronic Symptoms',
  features: [
    'Polypharmacy assessment',
    'Drug interaction screening',
    'Side effect burden analysis',
  ],
};

interface MedicationBurdenUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}
export function MedicationBurdenUpsellPage({ onAddToBasket, onOpenBasket }: MedicationBurdenUpsellPageProps) {

    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(medicationBurdenAssessment);
    onOpenBasket();
  };

  const handleTryDemo = () => {
    window.location.hash = 'medication-burden-calculator-questions';
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
      alt="Medication Burden Calculator Report"
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
              Medication Burden Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Optimize Your Medications.
              <span className="block text-primary">Reduce Risks.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Evaluate your medication load and identify opportunities for safer,
              more effective treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Calculate Burden
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">
              Safer Medications. Better Outcomes.
            </h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Medication Burden Calculator reveals hidden risks
              in your prescription regimen — and shows you how to optimise for
              safer, more effective treatment.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This report identifies factors unique to your medication profile
              that may affect safety and effectiveness. Understanding your
              polypharmacy risks is vital because it helps you make informed
              decisions about your treatments, prepare for potential
              interactions, and work with your healthcare team to minimise
              adverse effects while maximising therapeutic benefits.
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
                  src={medicationBurdenAssessment.image}
                  alt="Medication safety and optimisation"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

{/* Desktop Overlapping Cards */}
<div className="hidden md:block absolute inset-0 pointer-events-none">
  <Card className="absolute top-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Clarity</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        See your full medication impact clearly ahead<br />
        in one simple, easy-to-read score.<br />
        Gain a clear picture of what matters.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Safety</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Spot risks linked to multiple medications<br />
        early and take simple, smart steps to<br />
        prevent unwanted effects before they grow.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Insight</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Understand what truly triggers side effects<br />
        or flare-ups. Know the warning patterns<br />
        before they have a chance to build.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Plan meaningful changes with your clinician<br />
        using clear, trusted insights. Feel fully<br />
        in control of your ongoing treatment.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Protection</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Lower the chance of flare-ups and other<br />
        complications by building strong daily<br />
        habits that keep your body safer.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow a tailored plan built around your<br />
        unique needs and goals. Every single step<br />
        focuses on supporting your best health.
      </p>
    </CardContent>
  </Card>
</div>



{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'See your full medication impact in one simple score. Gain a clear picture of what truly matters.'],
    ['Safety', 'Spot risks linked to multiple medications early. Take steps to prevent unwanted effects.'],
    ['Insight', 'Understand what triggers side effects or flare-ups. Know the patterns before they grow.'],
    ['Confidence', 'Plan changes with your clinician using clear insights. Feel in control of your treatment.'],
    ['Protection', 'Lower the chance of flare-ups and complications. Build habits that keep you safer.'],
    ['Personal', 'Follow a plan tailored to your needs. Every step focuses on your health and goals.'],
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

      {/* Medication Burden Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{medicationBurdenAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {medicationBurdenAssessment.description}
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
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Polypharmacy risk assessment and scoring
                            </li>
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Drug interaction screening and analysis
                            </li>
                            <li className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Personalised medication optimisation recommendations
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Most assessments take just 15–20 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalised recommendations straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals taking multiple medications who want to understand and optimise their medication safety. It's particularly relevant for those managing chronic conditions with complex regimens. By highlighting interaction risks and burden factors, it supports patients who want to work more effectively with their healthcare providers.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our assessments are grounded in evidence‑based methodologies, developed in collaboration with healthcare professionals and informed by reputable research, clinical trial data, and national guidance. They provide robust insights but do not replace medical advice. Please review results with your clinician.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          £{medicationBurdenAssessment.price.toFixed(2)}
                        </p>
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
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
