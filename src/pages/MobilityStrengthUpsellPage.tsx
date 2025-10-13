import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from '../App';
import { Activity, Play } from 'lucide-react';
import heroImage from '/assests/mobility-hero.webp';
import benefitsImage from '/assests/mobility-sec.webp';

// Mobility & Strength Score Assessment definition
const mobilityStrengthAssessment: Assessment = {
  id: '9',
  name: 'Mobility & Strength Score',
  description:
    'Baseline physical assessment to track post-operative recovery progress and optimize rehabilitation outcomes.',
  price: 50,
  image:
    'https://images.unsplash.com/photo-1740572497450-4f4f2d3be984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGl0eSUyMHN0cmVuZ3RoJTIwYXNzZXNzbWVudCUyMHBoeXNpY2FsJTIwdGhlcmFweXxlbnwxfHx8fDE3NTczMTU2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  icon: <Activity className="w-6 h-6" />,
  features: ['Baseline mobility measurement', 'Strength assessment scoring', 'Recovery milestone tracking']
};

interface MobilityStrengthUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

export function MobilityStrengthUpsellPage({ onAddToBasket, onOpenBasket }: MobilityStrengthUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);


  const handleStartAssessment = () => {
    onAddToBasket(mobilityStrengthAssessment);
    onOpenBasket();

  };

  const handleTryDemo = () => {
    window.location.hash = 'mobility-strength-score-questions';
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
      alt="Mobility & Strength Score Report"
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
              Mobility & Strength Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Measure Your Baseline.
              <span className="block text-primary">Track Progress.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Establish your physical baseline and optimise your recovery potential with targeted rehabilitation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get mobility score now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Establish Your Baseline. Track Your Progress.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Mobility & Strength Assessment creates a precise baseline to measure recovery progress and optimise rehabilitation outcomes.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment establishes your unique physical baseline before surgery. Having this baseline is essential because it allows you to set realistic recovery goals, track meaningful progress during rehabilitation, and identify any potential setbacks early so you can achieve the best possible long-term outcomes.
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
      <h3 className="font-bold mb-3">Baseline</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Start with a clear snapshot of your<br />
        current strength and mobility levels.<br />
        Ensure to build the base for smarter progress.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Progress</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Track improvements with clarity time.<br />
        Celebrate small wins that leading to big results.<br />
        See your hard work come to life.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Function</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Focus on real-life movements that really <br />
        matter for everyday strength and ease.<br />
        Move better, not just lift heavier.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Stay strong motivated with visible milestones.<br />
        Gain trust in your body’s abilities.<br />
        Confidence fuels consistent growth.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Safety</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Spot any concerns before they grow and worse.<br />
        Adjust your plan with confidence, ease<br />
        Protect your progress every step.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow a tailored plan made for your timestamp.<br />
        Focus on your unique goals and strengths.<br />
        No one-size-fits-all — just your path.
      </p>
    </CardContent>
  </Card>
</div>

{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Baseline', 'Start with a clear snapshot of your current strength and mobility.'],
    ['Progress', 'Track improvements over time to see your gains clearly.'],
    ['Function', 'Focus on real-life movements that matter every day.'],
    ['Confidence', 'Stay motivated with visible milestones and steady growth.'],
    ['Safety', 'Spot any concerns early and adjust your plan with ease.'],
    ['Personal', 'Follow a tailored approach designed around your goals.'],
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

      {/* Mobility & Strength Assessment Card (templated) */}
      <section className="py-16 pt-[30px] pr-[0px] pb-[56px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{mobilityStrengthAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mobilityStrengthAssessment.description}
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
                              Baseline mobility measurement
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Strength assessment scoring
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Recovery milestone tracking
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 8–10 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed baseline report with recovery milestones and progress tracking guidance straight to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          This assessment is designed for individuals preparing for surgery who want to optimise their recovery outcomes through precise baseline measurement and progress tracking. It's particularly valuable for people facing joint replacement, spinal surgery, or other procedures affecting mobility. By establishing your baseline, it supports both patients and physiotherapists in creating effective rehabilitation plans.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
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
                        <p className="font-medium">£{mobilityStrengthAssessment.price.toFixed(2)}</p>
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
                    Get mobility score now
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
