import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function RecoverySpeedSecretsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const recoverySecrets = [
    {
      title: "Pre-Surgery Protein Loading",
      content: "Most patients don't realize that building protein reserves 2-3 weeks before surgery can cut recovery time in half. Your body needs these reserves to rebuild tissue effectively. Studies show this reduces healing time by 40% compared to standard preparation."
    },
    {
      title: "Mental Rehearsal Technique",
      content: "Olympic athletes use visualization, and it works for surgery too. Patients who mentally rehearse their recovery process show significantly faster healing rates. This psychological preparation speeds recovery by 30% and reduces pain perception."
    },
    {
      title: "The Support System Sweet Spot",
      content: "Too little help slows recovery, but too much help can actually delay healing by making you dependent. There's an optimal balance that most people miss. The right level of support optimizes recovery timeline while maintaining independence."
    },
    {
      title: "Sleep Architecture Optimization",
      content: "It's not just about getting 8 hours - the quality and timing of your sleep phases determines how fast your body can repair itself post-surgery. Optimizing sleep architecture improves healing by 50% through enhanced growth hormone release."
    },
    {
      title: "Micro-Movement Protocol",
      content: "Specific gentle movements in the first 24-48 hours can dramatically speed recovery, but the timing and type must be precise to avoid setbacks. When done correctly, this prevents 70% of complications and accelerates tissue healing."
    },
    {
      title: "Nutrition Timing Windows",
      content: "What you eat is important, but when you eat it is crucial. There are specific nutrient timing windows post-surgery that can accelerate healing. Missing these windows can extend recovery by weeks."
    },
    {
      title: "The Recovery Environment Formula",
      content: "Your physical environment impacts healing speed more than most realize. Temperature, lighting, air quality, and noise levels all affect recovery rates. Optimizing these factors can reduce recovery time by 25%."
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
              <Badge variant="outline">Recovery Optimization</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Recovery Speed Secrets That Cut Healing Time in Half
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Most patients follow basic recovery advice and accept slow healing as normal. These evidence-based strategies can dramatically accelerate your recovery when applied correctly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Recovery doesn't have to take as long as you think. While most patients follow standard post-operative instructions, there are advanced strategies based on sports medicine and rehabilitation science that can significantly accelerate healing. These techniques are used by elite athletes and informed patients to minimize downtime and optimize outcomes.
          </p>
        </div>

        {/* Recovery Secrets List */}
        <div className="space-y-8 mb-12">
          {recoverySecrets.map((secret, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg">{secret.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{secret.content}</p>
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
                These recovery acceleration strategies are based on cutting-edge research in rehabilitation medicine and sports science. The key is implementing them systematically and at the right timing. When combined properly, they can reduce your total recovery time by 40-50% while improving your final outcome.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Get Your Personalized Recovery Timeline</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These strategies work, but your specific situation determines which ones will have the biggest impact. Our Recovery Speed Predictor analyzes your unique factors to create a personalized acceleration plan.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'recovery-speed-predictor-learn-more'} size="lg" className="px-8">
                Discover Your Recovery Timeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Custom recovery plan • Evidence-based strategies • Faster healing
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}