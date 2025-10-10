import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, CreditCard, Minus, Plus, Trash2, Star, ArrowRight, ChevronRight, Check, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { globalAssessments, Assessment, BasketItem } from '../App';
import { useBasketAnalytics } from '../hooks/useAnalytics';
import { loadStripe } from "@stripe/stripe-js";


interface ShoppingBasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: BasketItem[];
  onRemoveItem: (assessmentId: string) => void;
  onUpgradeToBundle: (bundleId: string) => void;
  totalPrice: number;
}


// Bundle suggestion logic
const getBundleSuggestion = (items: BasketItem[]) => {
  const itemIds = items.map(item => item.assessment.id);

  // Longevity Bundle (id: '23') - suggest if user has any longevity assessments
  const longevityAssessments = ['2', '17', '18', '19', '20']; // Biological Age, Cardiometabolic, Resilience, Nutrition, Functional Fitness
  const hasLongevityAssessments = itemIds.some(id => longevityAssessments.includes(id));

  // Surgery Bundle (id: '21') - suggest if user has any surgery assessments
  const surgeryAssessments = ['1', '6', '7', '8', '9']; // Surgery Readiness, Complication Risk, Recovery Speed, Anaesthesia Risk, Mobility
  const hasSurgeryAssessments = itemIds.some(id => surgeryAssessments.includes(id));

  // Chronic Symptoms Bundle (id: '22') - suggest if user has any chronic symptom assessments
  const chronicAssessments = ['10', '11', '12', '13', '14']; // Symptom Severity, Inflammation, Medication, Energy, Lifestyle
  const hasChronicAssessments = itemIds.some(id => chronicAssessments.includes(id));

  // Don't suggest if user already has a bundle
  const hasBundles = itemIds.some(id => ['21', '22', '23'].includes(id));
  if (hasBundles) return null;

  // Priority order: Longevity > Surgery > Chronic Symptoms
  if (hasLongevityAssessments) {
    const bundle = globalAssessments.find(a => a.id === '23');
    return bundle ? {
      bundle,
      includedAssessments: longevityAssessments.map(id => globalAssessments.find(a => a.id === id)).filter(Boolean) as any[],
      categoryName: 'longevity'
    } : null;
  }

  if (hasSurgeryAssessments) {
    const bundle = globalAssessments.find(a => a.id === '21');
    return bundle ? {
      bundle,
      includedAssessments: surgeryAssessments.map(id => globalAssessments.find(a => a.id === id)).filter(Boolean) as any[],
      categoryName: 'surgery'
    } : null;
  }

  if (hasChronicAssessments) {
    const bundle = globalAssessments.find(a => a.id === '22');
    return bundle ? {
      bundle,
      includedAssessments: chronicAssessments.map(id => globalAssessments.find(a => a.id === id)).filter(Boolean) as any[],
      categoryName: 'chronic'
    } : null;
  }

  return null;
};

export function ShoppingBasket({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpgradeToBundle,
  totalPrice
}: ShoppingBasketProps) {
  // Initialize basket analytics
  const { trackItemRemoved, trackUpgrade, trackCheckoutStarted } = useBasketAnalytics();

  // Debug logging for props
  React.useEffect(() => {
    console.log('ShoppingBasket props changed:', {
      isOpen,
      itemsLength: items.length,
      totalPrice,
      onUpgradeToBundle: typeof onUpgradeToBundle,
      onUpgradeToBundleExists: !!onUpgradeToBundle
    });
  }, [isOpen, items.length, totalPrice, onUpgradeToBundle]);

  const bundleSuggestion = getBundleSuggestion(items);
  const basketItemIds = items.map(item => item.assessment.id);

  const calculateSavings = () => {
    if (!bundleSuggestion) return 0;
    const individualTotal = bundleSuggestion.includedAssessments.reduce((sum, assessment) => {
      return assessment ? sum + assessment.price : sum;
    }, 0);
    return individualTotal - bundleSuggestion.bundle.price;
  };

  const handleUpgrade = () => {
    console.log('handleUpgrade called');
    console.log('bundleSuggestion:', bundleSuggestion);
    console.log('onUpgradeToBundle type:', typeof onUpgradeToBundle);

    if (!bundleSuggestion) {
      console.error('No bundle suggestion available');
      alert('No bundle suggestion available. Please try again.');
      return;
    }

    // Create a safety wrapper to ensure the function exists
    const safeUpgradeFunction = onUpgradeToBundle;

    if (!safeUpgradeFunction || typeof safeUpgradeFunction !== 'function') {
      console.error('onUpgradeToBundle is not a valid function:', {
        hasFunction: !!safeUpgradeFunction,
        functionType: typeof safeUpgradeFunction,
        originalFunction: !!onUpgradeToBundle,
        originalType: typeof onUpgradeToBundle
      });
      alert('Upgrade function is not available. Please refresh the page and try again.');
      return;
    }

    try {
      console.log('Calling safeUpgradeFunction with bundle ID:', bundleSuggestion.bundle.id);

      // Track the upgrade action with current basket items
      const currentAssessmentIds = items.map(item => item.assessment.id);
      trackUpgrade(currentAssessmentIds, bundleSuggestion.bundle.id, bundleSuggestion.bundle.name, calculateSavings());

      safeUpgradeFunction(bundleSuggestion.bundle.id);
      console.log('Successfully called upgrade function');
    } catch (error) {
      console.error('Error calling onUpgradeToBundle:', error);
      alert('There was an error upgrading to the bundle. Please try again.');
    }
  };



// THIS IS THE NEW PAYMENT METHOD BUTTON THAT I CREATED
const makePayment = async (funnelType = "complication-risk") => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const checkoutItems = items.map(item => ({
    item_id: item.assessment.id,
    item_name: item.assessment.name,
    category: "health_assessment",
    price: item.assessment.price,
    quantity: item.quantity,
  }));

  const response = await fetch("https://luther.health/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products: checkoutItems,
      funnel_type: funnelType  // Add this parameter
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error("Checkout session error:", data.error);
    alert("Payment failed: " + data.error);
    return;
  }

  // Save session ID for later quiz gating
  sessionStorage.setItem("stripe_session_id", data.sessionId);
  // Also save which funnel was purchased for reference
  sessionStorage.setItem("purchased_funnel", funnelType);

  // Redirect user to Stripe Checkout
  const result = await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  if (result?.error) {
    console.error("Stripe redirect error:", result.error);
  }
};







  const handleRemoveItem = (assessmentId: string) => {
    const removedItem = items.find(item => item.assessment.id === assessmentId);
    if (removedItem) {
      trackItemRemoved(removedItem.assessment.id, removedItem.assessment.name);
    }
    onRemoveItem(assessmentId);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="px-4 sm:px-[20px] py-[14px]">
          <SheetTitle className="flex items-center gap-2 text-sm sm:text-base">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            Shopping Basket ({items.length})
          </SheetTitle>
          <SheetDescription className="text-left text-xs sm:text-sm">
            Review your selected health assessments and proceed to checkout when ready.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col px-4 sm:px-[20px] py-[0px] overflow-hidden">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <p className="font-medium">Your basket is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add some assessments to get started
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                {items.map((item) => (
                  <Card key={item.assessment.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm leading-tight">
                              {item.assessment.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => handleRemoveItem(item.assessment.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.assessment.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Qty: 1
                            </p>
                            <p className="text-sm font-medium">
                              £{item.assessment.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Bundle Suggestion - Above checkout */}
              {bundleSuggestion && (
                <div className="mb-4">
                  <Card className="bg-white border border-border shadow-lg">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            {bundleSuggestion.bundle.name}
                          </h4>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {bundleSuggestion.bundle.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-xs font-medium">Includes:</p>
                          <div className="space-y-1">
                            {bundleSuggestion.includedAssessments.slice(0, 5).map((assessment) => (
                              <div key={assessment.id} className="text-xs text-muted-foreground flex items-center">
                                <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                                <span className={basketItemIds.includes(assessment.id) ? 'font-medium text-foreground' : ''}>
                                  {assessment.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground font-medium">
                            Save £{calculateSavings().toFixed(2)} vs buying separately
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Button
                            onClick={handleUpgrade}
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={!onUpgradeToBundle || typeof onUpgradeToBundle !== 'function'}
                          >
                            {(!onUpgradeToBundle || typeof onUpgradeToBundle !== 'function') ? 'Loading...' : 'Upgrade'}
                          </Button>
                          <p className="text-sm font-medium">
                            £{bundleSuggestion.bundle.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Separator className="mb-4" />

              {/* Total and Checkout */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">£{totalPrice.toFixed(2)}</p>
                </div>

<Button
  onClick={() => {
    // Track checkout started
    trackCheckoutStarted(totalPrice, items.map(i => i.assessment.id));

    // Get the first item to determine funnel type
    const firstItem = items[0]?.assessment;

    // Map assessment IDs to funnel types (must match server's funnelRouteMap)
    const funnelMap: Record<string, string> = {
      "6": "complication-risk",      // Complication Risk Checker
      "7": "recovery-speed",          // Recovery Speed Predictor
      "1": "surgery-readiness",       // Surgery Readiness
      "8": "anesthesia",              // Anaesthesia Risk
      "9": "mobility",                // Mobility Recovery
      "10": "symptom",                // Symptom Severity
      "11": "inflammation",           // Inflammation
      "12": "medication",             // Medication
      "13": "energy",                 // Energy
      "14": "lifestyle",              // Lifestyle
      "2": "bio",                     // Biological Age
      "17": "card",                   // Cardiometabolic
      "18": "res",                    // Resilience
      "19": "nutrition",              // Nutrition
      "20": "functional",             // Functional Fitness
      "21": "surgery",                // Surgery Bundle
      "22": "chronic",                // Chronic Symptoms Bundle
      "23": "longevity",              // Longevity Bundle
      "15": "chronic-symptom-protocol" // 21 Day Chronic Symptom Management Challenge
    };

    const funnelType = funnelMap[firstItem?.id] || "complication-risk";

    console.log(`🛒 Checkout initiated for funnel: ${funnelType}`);
    console.log(`📦 Items in basket:`, items.map(i => i.assessment.name));

    makePayment(funnelType);
  }}
  className="w-full"
  size="lg"
>
  <CreditCard className="w-4 h-4 mr-2" />
  Checkout - £{totalPrice.toFixed(2)}
</Button>
                <p className="text-xs text-muted-foreground text-center">
                  Powered by Stripe
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}