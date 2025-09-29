import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function SymptomSeverityGuidePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const signs = [
    {
      title: "Pain patterns that disrupt your sleep 3+ nights per week",
      content: "When pain consistently interferes with sleep, it indicates a severity level that requires targeted intervention. Sleep disruption amplifies pain perception and slows healing, creating a cycle that professional assessment can help break."
    },
    {
      title: "Fatigue that doesn't improve with rest",
      content: "Persistent fatigue despite adequate sleep suggests underlying inflammation or metabolic dysfunction. This type of exhaustion often has treatable causes that are missed without proper symptom tracking and analysis."
    },
    {
      title: "Digestive symptoms occurring 4+ times per week",
      content: "Regular digestive issues indicate potential food sensitivities, stress responses, or underlying conditions. Frequent symptoms suggest your body is sending clear signals that need professional interpretation."
    },
    {
      title: "Morning stiffness lasting longer than 45 minutes",
      content: "Extended morning stiffness often indicates inflammatory processes that could benefit from targeted treatment. This symptom provides valuable information about inflammatory burden and joint health."
    },
    {
      title: "Energy crashes at predictable times daily",
      content: "Consistent energy drops reveal patterns linked to blood sugar, stress hormones, or activity levels. Understanding these patterns is crucial for developing effective management strategies."
    },
    {
      title: "Symptoms affecting work performance or social activities",
      content: "When symptoms begin impacting your professional or personal life, they've crossed into a severity level that warrants comprehensive assessment and intervention planning."
    },
    {
      title: "Pain levels varying dramatically day-to-day",
      content: "Significant daily variation in pain levels often indicates modifiable triggers or patterns. Professional assessment can identify these variables and help develop consistent management approaches."
    },
    {
      title: "Multiple symptoms occurring simultaneously",
      content: "When several symptoms cluster together, they may share common underlying causes. Comprehensive assessment reveals connections between symptoms that might not be obvious."
    },
    {
      title: "Relying on over-the-counter medications daily",
      content: "Daily medication use for symptom control suggests a severity level that could benefit from professional evaluation and potentially more effective treatment approaches."
    },
    {
      title: "Avoiding activities you previously enjoyed",
      content: "Activity avoidance indicates symptoms are significantly impacting quality of life. This behavioral change signals the need for comprehensive assessment and targeted intervention strategies."
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
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Badge variant="outline">Symptom Assessment</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Signs Your Symptoms Need Professional Assessment
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Many people dismiss chronic symptoms as "just part of life," missing opportunities for significant improvement. These warning signs indicate when symptoms have crossed into territory that warrants comprehensive professional evaluation.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Living with chronic symptoms doesn't have to mean accepting diminished quality of life. Professional symptom assessment can reveal patterns, triggers, and treatment opportunities that self-monitoring often misses. These ten indicators suggest your symptoms have reached a level where professional evaluation could significantly improve your outcomes.
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
                If you recognize yourself in several of these signs, your symptoms have likely reached a level where professional assessment could provide significant insights and improvement opportunities. Even addressing one or two symptom patterns can create a cascade of positive changes in your overall health and quality of life.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Ready to Understand Your Complete Symptom Profile?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop guessing about your symptoms. Our comprehensive Symptom Severity Index uses validated clinical tools to reveal patterns, triggers, and opportunities for improvement that you might be missing.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'symptom-severity-index-learn-more'} size="lg" className="px-8">
                Get Your Symptom Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based insights • Professional-grade assessment • Actionable recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}