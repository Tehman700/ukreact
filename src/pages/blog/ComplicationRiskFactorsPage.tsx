import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function ComplicationRiskFactorsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const riskFactors = [
    {
      title: "Undiagnosed Sleep Apnoea",
      content: "Many patients don't realize they have sleep apnoea, which dramatically increases anaesthesia complications and post-operative breathing issues. This affects 1 in 5 surgical patients and is often missed in routine pre-operative assessments."
    },
    {
      title: "Hidden Cardiovascular Stress",
      content: "Silent heart conditions that only show under surgical stress often go undetected in routine check-ups but can cause serious complications. Found in 15% of 'healthy' patients, these conditions require specific screening to identify."
    },
    {
      title: "Medication Interactions",
      content: "Common supplements and over-the-counter medications can interact dangerously with anaesthesia and pain medications. This causes 12% of surgical delays and can lead to serious complications that are entirely preventable."
    },
    {
      title: "Chronic Stress Impact",
      content: "Prolonged stress weakens immune function and slows healing. Many high-achievers underestimate how stress affects surgical outcomes, with chronic stress doubling infection risk and significantly extending recovery time."
    },
    {
      title: "Inadequate Support System",
      content: "Lack of proper post-operative care at home leads to complications that could be prevented with better planning and support. This contributes to 30% of readmissions and significantly impacts recovery quality."
    },
    {
      title: "Nutritional Deficiencies",
      content: "Even well-nourished individuals often have hidden deficiencies in key nutrients needed for optimal healing and recovery. This affects 40% of surgical patients and can dramatically slow wound healing and tissue repair."
    },
    {
      title: "Poor Timing Decisions",
      content: "Scheduling surgery during high-stress periods, seasonal illness peaks, or when support isn't available increases complication rates. These timing issues are preventable in 60% of cases with proper planning."
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
              <Badge variant="outline">Risk Prevention</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Hidden Risk Factors That Could Complicate Your Surgery
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Most surgical complications are preventable when you know what to look for. Here are the hidden risks that even experienced surgeons might miss during routine consultations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            While surgeons focus on the technical aspects of your procedure, many risk factors go unassessed in standard consultations. These hidden variables significantly impact surgical outcomes, yet they're often overlooked until complications arise. Understanding these risks empowers you to address them proactively.
          </p>
        </div>

        {/* Risk Factors List */}
        <div className="space-y-8 mb-12">
          {riskFactors.map((factor, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg">{factor.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{factor.content}</p>
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
                These risk factors are more common than most people realize, but they're entirely preventable when identified early. The key is comprehensive assessment that goes beyond standard medical clearance to examine lifestyle, medication, and environmental factors that impact surgical outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Don't Leave Your Surgery to Chance</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These hidden risks could be lurking in your health profile right now. Our Complication Risk Checker analyzes your specific situation to identify potential issues before they become problems.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'complication-risk-checker-learn-more'} size="lg" className="px-8">
                Get Your Personal Risk Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Identify hidden risks • Get prevention strategies • Avoid complications
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}