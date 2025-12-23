import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment} from '../App';
import { Thermometer, Play } from 'lucide-react';
import heroImage from '/assests/symp-sever-hero.webp';
import benefitsImage from '/assests/symp-sec.webp';

// Symptom Severity Assessment definition
const symptomSeverityAssessment: Assessment = {
  id: '10',
  name: 'Symptom Severity Index',
  description:
    'Comprehensive assessment capturing frequency and intensity of pain, fatigue, digestive or joint issues.',
  price: 43,
  image:benefitsImage,
  icon: <Thermometer className="w-6 h-6" />,
  features: ['Pain intensity scoring', 'Fatigue impact analysis', 'Digestive symptom tracking'],
};

interface SymptomSeverityUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}


export function SymptomSeverityUpsellPage({ onAddToBasket, onOpenBasket }: SymptomSeverityUpsellPageProps) {
    const [isHovered, setIsHovered] = useState(false);

  const handleStartAssessment = () => {
    onAddToBasket(symptomSeverityAssessment);
    onOpenBasket();

  };


  const handleTryDemo = () => {
    window.location.hash = 'symptom-severity-index-questions';
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
      alt="Symptom Severity Index Report"
      width={1600}
      height={2000}
      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 500px"
      quality={85}
      priority
      className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
      fetchPriority="high"
      decoding="async"
    />
    <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
  </div>
</div>
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              Symptom Severity Assessment
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Track Your Symptoms.
              <span className="block text-primary">Take Control.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Get clear insights into your symptom patterns and personalised strategies for effective management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="px-8 bg-black text-white hover:bg-black/90 transition-colors duration-200"
              >
                Get full analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Heading Section (templated) */}
      <section className="py-8 pt-[35px] pr-[0px] pb-[28px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-left mx-[0px] my-[14px] font-bold">Understand Your Symptoms. Take Control.</h1>
            <h2 className="text-muted-foreground text-left">
              Your personalised Symptom Severity Index reveals the true impact of pain, fatigue, and other symptoms on your daily life — with evidence-based strategies to manage them effectively.
            </h2>
            <p className="text-left text-muted-foreground mt-6">
              This assessment captures frequency and intensity across validated scales. Tracking patterns helps you communicate with clinicians, detect flares earlier, and tailor management to improve daily function and quality of life.
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
      <h3 className="font-bold mb-3">Clarity</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Understand your symptoms at a glance<br />
        with one simple, clear score.<br />
        Know exactly where you stand today.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Speed</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Complete your check-in in moments,<br />
        from anywhere and at any time.<br />
        Quick insights, without the wait.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 left-0 lg:-left-16 xl:-left-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Insight</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Spot patterns in your symptoms early.<br />
        Understand what triggers flare-ups.<br />
        Turn data into real health awareness.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Confidence</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Share clear results with your clinician.<br />
        Build stronger, informed conversations.<br />
        Confidence begins with understanding.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Protection</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Take action early to prevent flare-ups.<br />
        Stay one step ahead of your symptoms.<br />
        Protect your health proactively.
      </p>
    </CardContent>
  </Card>

  <Card className="absolute bottom-4 right-0 lg:-right-16 xl:-right-24 w-[220px] h-[180px] bg-white shadow-lg border-0 pointer-events-auto">
    <CardContent className="p-6 h-full flex flex-col">
      <h3 className="font-bold mb-3">Personal</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        Follow a plan built around your health.<br />
        Address your unique needs with care.<br />
        Your health, your personalized path.
      </p>
    </CardContent>
  </Card>
</div>


{/* Mobile Layout - Grid Below Image */}
<div className="md:hidden grid grid-cols-2 gap-4">
  {[
    ['Clarity', 'Understand your symptoms at a glance with one simple score.'],
    ['Speed', 'Complete your check-in quickly, anytime, anywhere.'],
    ['Insight', 'Spot patterns early to better manage flare-ups.'],
    ['Confidence', 'Share clear results to guide better conversations with clinicians.'],
    ['Protection', 'Take action early to help prevent avoidable flare-ups.'],
    ['Personal', 'Follow a plan designed around your unique health needs.'],
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
                    <h3 className="font-medium">{symptomSeverityAssessment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {symptomSeverityAssessment.description}
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
                              Pain intensity scoring and pattern analysis
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Fatigue impact assessment and energy tracking
                            </li>
                            <li className="flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                              Digestive and joint symptom evaluation
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="how-long">
                        <AccordionTrigger className="text-sm text-left">
                          How long does it take to complete?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          The assessment takes just 15–20 minutes online. Results are usually ready the same day, with a detailed report and personalised management strategies sent to your email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="who-for">
                        <AccordionTrigger className="text-sm text-left">
                          Who is this assessment for?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Designed for anyone with persistent symptoms seeking clarity and control. It's particularly helpful for men over 40 navigating ongoing pain, fatigue, digestive issues, or joint problems.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="accuracy">
                        <AccordionTrigger className="text-sm text-left">
                          How accurate are the results?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          Our methodologies are evidence-based and developed with clinicians. They provide robust insights but are not a substitute for medical diagnosis. Discuss results with your healthcare provider.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-auto">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">£{symptomSeverityAssessment.price.toFixed(2)}</p>
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
                    Get full analysis
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
