import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function MedicationSafetyGuidePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const signs = [
    {
      title: "Taking 5 or more prescription medications daily",
      content: "Polypharmacy significantly increases risks of drug interactions, side effects, and medication errors. Each additional medication exponentially increases the complexity of managing your health and the potential for adverse events."
    },
    {
      title: "New symptoms that started after beginning a medication",
      content: "Many medication side effects are mistaken for new health problems, leading to additional prescriptions. This 'prescribing cascade' can create a cycle where side effects are treated with more medications rather than addressing the original cause."
    },
    {
      title: "Taking medications from different doctors who may not communicate",
      content: "Fragmented care increases the risk of dangerous drug interactions and duplicate prescriptions. Without coordination, specialists may prescribe medications that conflict with treatments from other providers."
    },
    {
      title: "Using over-the-counter medications or supplements daily",
      content: "Regular OTC medication use often goes unreported to healthcare providers, creating hidden interaction risks. Many people don't realize that 'natural' supplements can significantly interact with prescription medications."
    },
    {
      title: "Experiencing persistent fatigue, brain fog, or digestive issues",
      content: "These common complaints can result from medication burden rather than underlying health conditions. Multiple medications can overwhelm liver detoxification pathways and affect cognitive function."
    },
    {
      title: "Difficulty managing medication schedules or frequent missed doses",
      content: "Complex medication regimens often lead to poor adherence, which can be more dangerous than not taking the medication at all. Inconsistent dosing can cause rebound effects and treatment failures."
    },
    {
      title: "Medications prescribed for side effects of other medications",
      content: "This prescribing cascade is common but dangerous. When medications are added to treat side effects rather than addressing root causes, the medication burden compounds without improving overall health."
    },
    {
      title: "Taking the same medication dose for years without review",
      content: "Medication needs change as you age and your health status evolves. Doses that were appropriate years ago may now be too high or too low, creating unnecessary risks or reduced effectiveness."
    },
    {
      title: "Unexplained mood changes, memory problems, or balance issues",
      content: "These symptoms often indicate medication-related cognitive impairment or central nervous system effects. Older adults are particularly susceptible to these medication-induced changes that are frequently attributed to 'normal aging.'"
    },
    {
      title: "Emergency department visits or hospitalizations in the past year",
      content: "Medication-related problems account for a significant percentage of emergency visits and hospital admissions. Multiple medications increase the likelihood of adverse drug events that require emergency care."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="outline">Medication Safety</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Warning Signs Your Medication Burden Is Too High
            </h1>
            
            <p className="text-lg text-muted-foreground">
              More medications doesn't always mean better health. These warning signs indicate when your medication regimen may be creating more problems than it's solving, and why professional medication review could dramatically improve your quality of life.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Medication burden refers to the total impact of all medications on your daily life, health, and wellbeing. While medications can be life-saving, complex regimens often create their own health problems. Understanding when your medication burden has become excessive is crucial for maintaining both safety and quality of life.
          </p>
        </div>

        {/* Signs List */}
        <div className="space-y-8 mb-12">
          {signs.map((sign, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg">{sign.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{sign.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Takeaway */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="mb-2">Key Takeaway</h3>
              <p className="text-muted-foreground">
                If you recognize several of these warning signs, your medication burden may be negatively impacting your health and quality of life. Professional medication review can identify opportunities to simplify your regimen, reduce risks, and improve overall outcomes while maintaining effective treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Get Your Comprehensive Medication Burden Analysis</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take control of your medication regimen. Our Medication Burden Calculator provides a comprehensive analysis of your current medications, identifies potential risks, and suggests optimization opportunities.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'medication-burden-calculator-learn-more'} size="lg" className="px-8">
                Calculate Your Medication Burden
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Risk assessment • Interaction screening • Optimization strategies
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}