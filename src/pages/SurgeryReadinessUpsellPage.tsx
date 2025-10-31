import React from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Assessment } from '../App';
import { Shield } from 'lucide-react';
import { LogoCarousel } from '../components/LogoCarousel';
import surgeryReadinessImage from 'figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png';
import heroImage from '/assests/surgery-hero.webp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

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
  const handleStartAssessment = () => {
    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  return (
    <div className="min-h-screen bg-background">
     {/* Hero Section (Single Column) */}
<section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
  <div className="max-w-5xl mx-auto px-[14px] py-8">
    {/* Image */}
    <div className="relative">
      {/* ↓ changed max-w-md → max-w-sm to make the image smaller */}
      <div className="relative aspect-[3/4] max-w-sm mx-auto">
        <ImageWithFallback
          src={heroImage}
          alt="Surgery Readiness Score Report"
          width={800}
          height={1000}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 500px"
          quality={85}
          priority
          className="w-full h-auto object-cover rounded-lg mt-6 max-h-[600px]"
        />
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -z-10" />
      </div>
    </div>

    {/* Text */}
    <div className="space-y-6 mt-10 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
        Reduce your surgical risks.<strong> Today</strong>.
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Most surgical complications are predictable and preventable. We show you exactly what to fix before it's too late.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Buttons or CTA could go here */}
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground pt-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full" />
          <span>Regulated</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-600 rounded-full" />
          <span>Doctor Led</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-purple-600 rounded-full" />
          <span>Evidence Based</span>
        </div>
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
            <p className="text-left text-muted-foreground mt-6 whitespace-pre-line">
              🔍 <strong>Spot hidden risks</strong> before they become problems.
              {"\n\n"}🛡️ <strong>Prevent complications</strong> before they happen.
              {"\n\n"}⏱️ <strong>Recover faster</strong> with a body that’s ready.
              {"\n\n"}🧠 <strong>Get a custom plan</strong> built by real doctors.
              {"\n\n"}💸 <strong>Avoid setbacks</strong> that cost time, money, and health.
            </p>
          </div>
        </div>
      </section>
{/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  What is the Surgery Readiness Score?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The Surgery Readiness Score is a comprehensive pre-surgical assessment that evaluates your current health status and identifies potential risk factors that could affect your surgery or recovery. It provides personalized recommendations to optimize your health before your procedure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  How long does the assessment take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The assessment typically takes 10-15 minutes to complete. You'll answer questions about your medical history, current health status, lifestyle factors, and the specific surgery you're preparing for.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  When should I complete this assessment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ideally, complete the assessment as soon as your surgery is scheduled. The earlier you identify and address risk factors, the better your outcomes. Most patients benefit from completing this 4-8 weeks before their procedure, though it's valuable at any stage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  Will this replace my surgeon's pre-op assessment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. This assessment complements your surgeon's evaluation. It helps you proactively optimize your health and provides additional insights you can discuss with your surgical team. Always follow your surgeon's specific instructions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  What happens after I complete the assessment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You'll receive a detailed report with your Surgery Readiness Score, personalized risk factors, and evidence-based recommendations to optimize your health before surgery. You can share this report with your healthcare team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  Is my information secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. All data is encrypted and stored securely in compliance with UK healthcare regulations. We never share your personal information with third parties without your explicit consent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Logo carousel at the bottom */}
      <div className="container mx-auto px-4 pb-12">
        <LogoCarousel />
      </div>
    </div>
  );
}
