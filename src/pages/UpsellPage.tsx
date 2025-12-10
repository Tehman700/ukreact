import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Product } from '../App';
import { CheckCircle2, BookOpen } from 'lucide-react';
import surgeryImage from 'figma:asset/9ebef07fad65729c6d4470987d218e08b54ab491.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

interface UpsellPageProps {
  onAddToCart: (product: Product) => void;
}

export function UpsellPage({ onAddToCart }: UpsellPageProps) {
  const handleRequestQuote = (product: any) => {
    sessionStorage.setItem(
      'requestedService',
      JSON.stringify({
        name: product.name,
        category: product.category,
        price: product.price,
      })
    );
    window.location.hash = 'contact';
  };

  const surgeryConditioningProduct = {
    id: '2',
    name: 'Pre & Post-Surgery Conditioning',
    price: 399.99,
    image: surgeryImage,
    category: 'Surgery Conditioning',
    sizes: ['2 Weeks', '4 Weeks', '8 Weeks'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description:
      'Comprehensive pre-operative conditioning program crafted by doctors to optimize surgical outcomes, reduce complications, and accelerate healing.',
    isTrialOffer: true,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Intro Section */}
      <CardContent className="max-w-3xl mx-auto py-10 px-6 space-y-6">
        <p className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-lg">
          Thanks for your feedback — it helps us support more men just like you.
        </p>

        <Separator />

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            After reviewing your assessment, our team identified a few key areas
            that could use extra strengthening before surgery. That’s completely
            normal — and exactly why we created the:
          </p>
          <h4 className="text-lg font-semibold">
            21-Day Surgery Conditioning Challenge
          </h4>
          <p className="text-sm text-muted-foreground">
            This doctor-led program is designed to help you:
          </p>
          <ul className="space-y-1">
            <li className="flex items-start space-x-2 text-sm text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>Go into surgery stronger</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>Come out safer</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-muted-foreground">
              <span className="text-green-500">✓</span>
              <span>Recover faster</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            It’s fast. Structured. And proven to work.
          </p>
          <p className="text-sm text-muted-foreground font-bold">
            All for only £200.
          </p>
        </div>
      </CardContent>

      {/* Product & Clinical Info Section */}
      <section className="container mx-auto max-w-6xl px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Card */}
          <ProductCard
            product={surgeryConditioningProduct}
            onRequestQuote={handleRequestQuote}
            onAddToCart={onAddToCart}
          />

          {/* Clinical Info */}
          <CardContent className="space-y-8">
            {/* Risk Factors */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-orange-600">
                Most men go into surgery weaker than they need to be — and pay
                the price:
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span className="text-orange-500">⚠</span>
                  <span>Longer recovery times</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span className="text-orange-500">⚠</span>
                  <span>Higher risk of complications</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span className="text-orange-500">⚠</span>
                  <span>Muscle loss and reduced mobility</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                But here’s the truth:
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                How you go in is how you come out.
              </p>
              <p className="text-sm text-muted-foreground">
                If you want to walk out of surgery safer, stronger, and back to
                life faster — you need to prepare before the procedure.
              </p>
            </div>

            <Separator />

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-base">
                What does the evidence say?
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Fitter patients recover faster: exercise before surgery cuts complications by 50%</li>
                <li>• One in three last-minute cancellations happen because patients aren’t fit for surgery.</li>
                <li>• Up to 3.5% of elective surgeries are cancelled due to poor preparation.</li>
                <li>• Prehab works: fitter patients spend nearly a day less in hospital after surgery.</li>
                <li>• Smoking, drinking, and low fitness triple your risk of surgical complications.</li>
                <li>• A few weeks of prep can save weeks of recovery.</li>
                <li>• Patients who prepare recover quicker, avoid ICU, and get home sooner.</li>
                <li>• NHS evidence is clear: the stronger you go in, the faster you get out.</li>
              </ul>
            </div>

            <Separator />

            {/* Strengths */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>21-Day Results Guarantee</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                We stand behind this program — because it works.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>
                    If you follow the plan for 21 days and don’t feel
                    noticeably stronger, more mobile, and better prepared for
                    surgery — we’ll work with you 1-on-1 until you do. And if
                    you’re still not satisfied, we’ll give you your full
                    investment back as a credit.
                  </span>
                </li>
              </ul>
              <p className="font-bold text-sm text-muted-foreground">
                No catch. No fine print.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full lg:w-auto mt-6"
              onClick={() => (window.location.hash = 'assessments')}
            >
              Start preparing for surgery now
            </Button>
          </CardContent>
        </div>

        {/* Sources & References */}
        <Card className="mt-12 bg-background border-muted">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="sources-references">
                <AccordionTrigger className="font-medium hover:no-underline">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Sources & References</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>
                      • NICE – Perioperative Care in Adults (NG180){' '}
                      <a
                        href="https://www.nice.org.uk/guidance/ng180/chapter/Recommendations"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Centre for Perioperative Care (CPOC) – Preoperative
                      Assessment and Optimisation Guidance (2021){' '}
                      <a
                        href="https://cpoc.org.uk/sites/cpoc/files/documents/2021-06/Preoperative%20assessment%20and%20optimisation%20guidance_format.pdf?"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • NHS England – Earlier Screening, Risk Assessment and
                      Health Optimisation in Perioperative Pathways{' '}
                      <a
                        href="https://www.england.nhs.uk/long-read/earlier-screening-risk-assessment-and-health-optimisation-in-perioperative-pathways/"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Systematic Review & Network Meta-analysis (BMJ, 2024){' '}
                      <a
                        href="https://erassociety.org/guidelines/"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Umbrella Review (British Journal of Anaesthesia, 2021){' '}
                      <a
                        href="https://www.bmj.com/content/388/bmj-2024-081164"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Freedom of Information Survey on NHS Prehabilitation
                      Provision (BJA, 2024){' '}
                      <a
                        href="https://www.bjanaesthesia.org.uk/article/S0007-0912%2824%2900018-7/fulltext"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Nottingham University Hospitals NHS Trust – Cancer
                      Prehabilitation Service{' '}
                      <a
                        href="https://patientexperiencenetwork.org/case-study/nottingham-university-hospitals-nhs-trust-cancer-prehabilitation-service"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                    <li>
                      • Orthopaedics (Physiotherapy Journal, 2025){' '}
                      <a
                        href="https://www.physiotherapyjournal.com/article/S0031-9406(25)00166-X/abstract"
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        ↗
                      </a>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-muted mt-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>Disclaimer:</strong> All information provided is
                      based on current UK medical guidelines and evidence-based
                      medicine. Individual circumstances may vary, and
                      professional medical advice should always be sought for
                      specific health concerns.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}