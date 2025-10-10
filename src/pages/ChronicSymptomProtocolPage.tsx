import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { BookOpen, CheckCircle2, ShoppingCart } from 'lucide-react';
import { Product } from '../App';

interface ChronicSymptomProtocolPageProps {
  onAddToCart: (product: Product) => void;
  onOpenBasket?: () => void;
}

// Base product definition
const chronicSymptomProtocol = {
  id: '15',
  name: '21 Day Chronic Symptom Management Challenge',
  price: 300.0,
  image:
    'https://images.unsplash.com/photo-1740479050129-7fef21254518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbmljJTIwaGVhbHRoJTIwcHJvdG9jb2wlMjBjaGFsbGVuZ2V8ZW58MXx8fHwxNzU3MzQ2NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  category: 'Chronic Symptom Management',
  sizes: ['3 Weeks', '6 Weeks', '12 Weeks'],
  colors: ['Standard', 'Enhanced', 'Premium'],
  description: '',
  isTrialOffer: true,
};

export function ChronicSymptomProtocolPage({ onAddToCart, onOpenBasket }: ChronicSymptomProtocolPageProps) {
  // Check if user just came from successful payment and redirect to calendar
  useEffect(() => {
    // Check if URL has the hash indicating this is the success page
    const hash = window.location.hash;

    console.log('🔍 ChronicSymptomProtocol - Checking for payment redirect');
    console.log('📍 Current hash:', hash);

    // If we're on the chronic-symptom-protocol-challenge page, redirect to calendar
    if (hash.includes('chronic-symptom-protocol-challenge')) {
      console.log('🎉 Payment success detected! Redirecting to Google Calendar...');

      // Add a small delay to show the page briefly, then redirect
      setTimeout(() => {
        window.location.href = 'https://calendar.app.google/yGirmgpsvgqgZJH26';
      }, 1500); // 1.5 second delay for better UX
    }
  }, []);

  const handleRequestQuote = (product: any) => {
    sessionStorage.setItem(
      'requestedService',
      JSON.stringify({
        name: product.name,
        category: product.category,
        price: product.price,
      }),
    );
    window.location.hash = 'contact';
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);

    // Open basket after adding to cart
    if (onOpenBasket) {
      setTimeout(() => onOpenBasket(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero + Product Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hero / Context */}
        <CardContent className="space-y-8">
          <p className="text-sm lg:text-base text-muted-foreground bg-blue-50 p-3 rounded-lg">
            Thanks for your feedback — it helps us support more people just like you.
          </p>

          <Separator />

          <div>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed pb-5">
              Your assessment has identified a few key areas where daily symptoms may be holding you back. That's completely normal — and exactly why we created the:
            </p>

            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <span className="pb-3 text-lg lg:text-xl">
                21-Day Chronic Symptom Challenge.
              </span>
            </h4>

            <p className="text-sm lg:text-base text-muted-foreground pb-3">
              This doctor-led program is designed to help you:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Reduce daily symptom flare-ups</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Improve strength, energy, and mobility</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Regain control of your day-to-day life</span>
              </li>
            </ul>

            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed py-5">
              It's simple. Structured. And proven to make a difference.
            </p>

            <p className="text-sm lg:text-base text-muted-foreground">
              <span className="text-[rgba(54,54,54,1)] font-bold">All for only £300.</span>
            </p>
          </div>
        </CardContent>

        {/* Product Card */}
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <ProductCard
            product={chronicSymptomProtocol}
            onRequestQuote={handleRequestQuote}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Clinical Info */}
      <div className="container max-w-5xl mx-auto px-4 space-y-12">
        <CardContent className="space-y-12">
          {/* Challenges */}
          <div>
            <h4 className="font-medium mb-4 text-orange-600 text-lg">
              Most people live with symptoms longer than they need to — and pay the price:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Constant fatigue and low energy</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Frustrating flare-ups and setbacks</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Lost confidence and reduced quality of life</span>
              </li>
            </ul>
            <p className="text-sm lg:text-base text-muted-foreground mt-6">
              <strong>How you manage your symptoms today shapes how you feel tomorrow.</strong>
            </p>
          </div>

          <Separator />

          {/* Evidence */}
          <div>
            <h4 className="font-medium mb-4 text-lg">What does the evidence say?</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>4 in 10 adults live with a long-term condition</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>1 in 3 have limiting chronic problems</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>34% of adults experience chronic pain; increases with age</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Our approach reduces pain, increases energy & lowers risk of heart disease.</span>
              </li>
            </ul>
          </div>

          <Separator />

          {/* Guarantee */}
          <div>
            <h4 className="font-medium mb-4 flex items-center space-x-2 text-green-600 text-lg">
              <CheckCircle2 className="h-5 w-5" />
              <span>21-Day Results Guarantee</span>
            </h4>
            <p className="text-sm lg:text-base text-[rgba(113,113,130,1)] my-4">
              We stand behind this program — because it works.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>If you follow the plan for 21 days and don't feel improvements — we'll work with you 1-on-1 until you do. If still unsatisfied, we'll credit your full investment toward other services.</span>
              </li>
            </ul>
            <p className="text-sm lg:text-base text-[rgba(113,113,130,1)] mt-6">No catch. No fine print.</p>
          </div>

          <Button
            size="lg"
            className="w-full lg:w-auto px-8 py-3"
            onClick={() => (window.location.hash = 'assessments')}
          >
            Start managing your symptoms today
          </Button>
        </CardContent>

        {/* Sources & References */}
        <Card className="mt-6 bg-background border-muted">
          <CardContent className="py-5 px-5">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sources-references">
                  <AccordionTrigger className="font-medium hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Sources & References</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm text-muted-foreground leading-relaxed list-none pl-0 space-y-2">
                      <li>
                        • NHS Digital – Health Survey for England 2022 (Part 2, Adult Health){" "}
                        <a
                          href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england/2022-part-2/adult-health"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • NHS Digital – Longstanding Conditions (2011–2019, Experimental Statistics){" "}
                        <a
                          href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-england-additional-analyses/ethnicity-and-health-2011-2019-experimental-statistics/longstanding-conditions"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • NICE Clinical Knowledge Summaries – Chronic Pain (Background & Prevalence){" "}
                        <a
                          href="https://cks.nice.org.uk/topics/chronic-pain/background-information/prevalence/"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • UK Government – Health Matters: Physical Activity (Prevention and Management of Long-Term Conditions){" "}
                        <a
                          href="https://www.gov.uk/government/publications/health-matters-physical-activity/health-matters-physical-activity-prevention-and-management-of-long-term-conditions"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • Knowledge Hub – UK Chief Medical Officers' Physical Activity Report{" "}
                        <a
                          href="https://www.activeoxfordshire.org/uploads/health-matters-prevention-mgt-of-long-term-conditions.pdf"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • Active Oxfordshire – Health Matters: Prevention & Management of Long-Term Conditions{" "}
                        <a
                          href="https://www.england.nhs.uk/long-read/earlier-screening-risk-assessment-and-health-optimisation-in-perioperative-pathways/"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • UK Government – Health Matters: Getting Every Adult Active Every Day{" "}
                        <a
                          href="https://www.gov.uk/government/publications/health-matters-getting-every-adult-active-every-day/health-matters-getting-every-adult-active-every-day"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li>
                        • NICE – Depression in Adults with a Chronic Physical Health Problem (Guideline CG91){" "}
                        <a
                          href="https://www.nice.org.uk/Guidance/CG91"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                      <li className="mt-[0px] mr-[0px] mb-[10px] ml-[0px]">
                        • NHS England – Harnessing the Benefits of Physical Activity{" "}
                        <a
                          href="https://www.england.nhs.uk/ourwork/public-health/harnessing-the-benefits-of-physical-activity/"
                          className="text-blue-600 hover:underline"
                        >
                          ↗
                        </a>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-muted">
                      <p className="text-xs text-muted-foreground">
                        <strong>Disclaimer:</strong> All information provided is based on current UK medical guidelines and evidence-based medicine. Individual circumstances may vary, and professional medical advice should always be sought for specific health concerns.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
        <Separator />
      </div>
    </div>
  );
}