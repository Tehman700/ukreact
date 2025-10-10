import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Product } from '../App';

interface LongevityChallengePageProps {
  onAddToCart: (product: Product) => void;
  onOpenBasket?: () => void;
}

export function LongevityFocusProtocolPage({ onAddToCart, onOpenBasket }: LongevityChallengePageProps) {
  const [showBookingPrompt, setShowBookingPrompt] = useState(false);

  // Check if user came from payment success and show booking popup
  useEffect(() => {
    const currentUrl = window.location.href;

    console.log('🔍 LongevityProtocol - Checking current URL');
    console.log('📍 Current URL:', currentUrl);

    // Check if the full URL matches the success redirect URL
    if (currentUrl === 'https://luther.health/Health-Audit.html#longevity-focus-protocol-challenge') {
      console.log('🎉 Payment success URL detected! Showing booking popup...');

      // Check if we've already shown the popup for this session
      const hasShownPopup = sessionStorage.getItem('longevityBookingShown');

      if (!hasShownPopup) {
        setShowBookingPrompt(true);
        // Mark that we've shown the popup
        sessionStorage.setItem('longevityBookingShown', 'true');
      }
    }
  }, []);

  const handleRequestQuote = (product: any) => {
    sessionStorage.setItem('requestedService', JSON.stringify({
      name: product.name,
      category: product.category,
      price: product.price
    }));
    window.location.hash = 'contact';
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);

    // Open basket after adding to cart
    if (onOpenBasket) {
      setTimeout(() => onOpenBasket(), 100);
    }
  };

  const handleBookConsultation = () => {
    // Open Google Calendar link in new tab
    window.open('https://calendar.app.google/yGirmgpsvgqgZJH26', '_blank');

    setShowBookingPrompt(false);
  };

  const handleBookLater = () => {
    setShowBookingPrompt(false);
  };

  const longevityChallenge = {
    id: '24',
    name: '21-Day Longevity Challenge',
    price: 300.00,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Longevity Optimization',
    sizes: ['21 Days'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description: '',
    isTrialOffer: true
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Booking Prompt Modal */}
      {showBookingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <h3 className="text-xl font-semibold text-center">
                Welcome to the Longevity Challenge!
              </h3>

              <p className="text-muted-foreground text-center">
                Your purchase is complete. Now let's schedule your initial consultation to get you started on your longevity journey.
              </p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleBookConsultation}
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Book Your Consultation Now
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You can always book your consultation from your account dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero + Product Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hero / Context */}
        <CardContent className="space-y-8">
          <p className="text-sm lg:text-base text-muted-foreground bg-blue-50 p-3 rounded-lg">
            Thanks for investing in your future health — small changes today compound into big benefits tomorrow.
          </p>

          <Separator />

          <div>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed pb-5">
              Your assessment has highlighted opportunities to strengthen your foundation for healthy aging. That's exactly why we created the:
            </p>

            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <span className="pb-3 text-lg lg:text-xl">
                21-Day Longevity Challenge.
              </span>
            </h4>

            <p className="text-sm lg:text-base text-muted-foreground pb-3">
              This doctor-led program is designed to help you:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Boost daily energy and mental clarity</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Improve strength, mobility, and resilience against aging</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>Lay the foundations for a longer, healthier lifespan</span>
              </li>
            </ul>

            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed py-5">
              It's structured, practical, and proven to make a measurable difference.
            </p>

            <p className="text-sm lg:text-base text-muted-foreground">
              <span className="text-[rgba(54,54,54,1)] font-bold">All for only £300.</span>
            </p>
          </div>
        </CardContent>

        {/* Product Card */}
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <ProductCard
            product={longevityChallenge}
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
              Most people wait until problems appear — and pay the price:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Declining energy and slower recovery</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Loss of muscle, strength, and confidence with age</span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-orange-500 mt-1">⚠</span>
                <span>Increased risk of chronic disease and reduced healthspan</span>
              </li>
            </ul>
            <p className="text-sm lg:text-base text-muted-foreground mt-6">
              <strong>The habits you build in 21 days can add years of vitality to your life.</strong>
            </p>
          </div>

          <Separator />

          {/* Evidence */}
          <div>
            <h4 className="font-medium mb-4 text-lg">What does the evidence say?</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>
                  Following 5 simple lifestyle habits — healthy diet, regular exercise, not smoking, moderate alcohol, and healthy weight — adds up to <strong>10–14 extra years of life expectancy</strong> (Harvard T.H. Chan School of Public Health).
                </span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>
                  Regular physical activity reduces risk of premature death by up to <strong>30%</strong> and lowers risk of heart disease, type 2 diabetes, and dementia (UK CMO Guidelines).
                </span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>
                  Adults who stay active are <strong>40% less likely to develop chronic conditions</strong> compared to inactive adults (NHS Healthy Ageing).
                </span>
              </li>
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>
                  Global Burden of Disease data shows that lifestyle factors account for the majority of preventable years lost to disease worldwide (The Lancet, GBD Study).
                </span>
              </li>
            </ul>
          </div>

          <Separator />

          {/* Guarantee */}
          <div>
            <h4 className="font-medium mb-4 flex items-center space-x-2 text-green-600 text-lg">
              <CheckCircle2 className="h-5 w-5" />
              <span>21-Day Vitality Guarantee</span>
            </h4>
            <p className="text-sm lg:text-base text-[rgba(113,113,130,1)] my-4">
              We stand behind this program — because it creates change you can feel.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm lg:text-base text-muted-foreground">
                <span className="text-green-500 mt-1">✓</span>
                <span>
                  If you follow the plan for 21 days and don't notice improvements in energy, strength, or wellbeing — we'll work with you 1-on-1 until you do. If still unsatisfied, we'll credit your full investment toward other services.
                </span>
              </li>
            </ul>
            <p className="text-sm lg:text-base text-[rgba(113,113,130,1)] mt-6">No catch. No fine print.</p>
          </div>

          <Button
            size="lg"
            className="w-full lg:w-auto px-8 py-3"
            onClick={() => (window.location.hash = 'assessments')}
          >
            Start your longevity journey today
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
                        • World Health Organization – Healthy Ageing and Functional Ability{" "}
                        <a href="https://www.who.int/health-topics/ageing#tab=tab_1" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • NHS – How to Stay Healthy as You Age{" "}
                        <a href="https://www.nhs.uk/live-well/healthy-ageing/" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • National Institute on Aging (NIH) – Lifestyle and Healthy Ageing{" "}
                        <a href="https://www.nia.nih.gov/health/lifestyle-and-healthy-aging" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • UK Chief Medical Officers' Physical Activity Guidelines{" "}
                        <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/832868/uk-chief-medical-officers-physical-activity-guidelines.pdf" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • Harvard T.H. Chan School of Public Health – Healthy Lifestyle and Life Expectancy{" "}
                        <a href="https://www.hsph.harvard.edu/news/press-releases/healthy-lifestyle-linked-to-longer-life/" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • British Journal of Sports Medicine – Exercise and Healthy Ageing{" "}
                        <a href="https://bjsm.bmj.com/content/52/13/858" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li>
                        • Global Burden of Disease Study – Impact of Lifestyle Factors on Longevity{" "}
                        <a href="https://www.thelancet.com/gbd" className="text-blue-600 hover:underline">↗</a>
                      </li>
                      <li className="mt-[0px] mr-[0px] mb-[10px] ml-[0px]">
                        • NICE – Maintaining a Healthy Lifestyle into Older Age{" "}
                        <a href="https://www.nice.org.uk/guidance/lifestyle-and-wellbeing" className="text-blue-600 hover:underline">↗</a>
                      </li>
                    </ul>

                    <div className="pt-4 border-t border-muted">
                      <p className="text-xs text-muted-foreground">
                        <strong>Disclaimer:</strong> All information provided is based on current UK and international medical guidelines on ageing and longevity. Individual outcomes may vary, and professional medical advice should always be sought for specific health concerns.
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