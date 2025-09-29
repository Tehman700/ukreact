import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function MobilityBaselinePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const mobilityFactors = [
    {
      title: "Pre-Surgery Strength Reserve",
      content: "Your baseline strength before surgery directly predicts how quickly you'll regain independence afterward. Patients with higher pre-operative strength scores return to normal activities 3-4 weeks faster than those with poor baseline measurements."
    },
    {
      title: "Balance Confidence Score",
      content: "Balance isn't just physical - it's psychological too. Patients who feel confident in their balance before surgery show better mobility outcomes and lower fall risk during recovery. This confidence can be measured and improved before surgery."
    },
    {
      title: "Functional Movement Patterns",
      content: "How you move matters more than how much you can lift. Poor movement patterns before surgery often become worse after surgery, leading to compensatory injuries and prolonged recovery. Identifying these patterns early allows for correction."
    },
    {
      title: "Walking Endurance Threshold",
      content: "Your pre-surgery walking distance is one of the strongest predictors of recovery speed. Patients who can walk over 0.5 miles before surgery typically achieve independent mobility 50% faster than those with limited walking endurance."
    },
    {
      title: "Grip Strength as Health Indicator",
      content: "Grip strength correlates with overall body strength and health status. It's also one of the easiest metrics to maintain during recovery. Establishing your baseline grip strength provides a simple way to track overall recovery progress."
    },
    {
      title: "Pain-Movement Relationship",
      content: "Understanding how current pain affects your movement helps predict post-surgical challenges. Patients who can move well despite some pain tend to have better surgery outcomes than those who avoid movement due to minor discomfort."
    },
    {
      title: "Activity Tolerance Patterns",
      content: "Your daily activity patterns reveal your true functional capacity. This baseline determines realistic recovery goals and helps identify activities you can maintain during healing to preserve overall fitness and mood."
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
              <Badge variant="outline">Recovery Planning</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              Why Your Mobility Baseline Determines Surgery Success
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Most patients focus on the surgery itself, but your pre-operative mobility baseline is often more predictive of your final outcome than the surgical technique used.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Your mobility before surgery sets the foundation for everything that follows. Physical therapists and rehabilitation specialists know that patients with better baseline mobility consistently achieve superior outcomes, regardless of their surgical complexity. Yet most patients never properly assess their pre-operative baseline, missing crucial opportunities for optimization.
          </p>
        </div>

        {/* Mobility Factors List */}
        <div className="space-y-8 mb-12">
          {mobilityFactors.map((factor, index) => (
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
                Your mobility baseline isn't just about where you are now - it's about setting realistic expectations and creating targeted improvement strategies before surgery. Patients who establish and optimize their baseline before surgery consistently achieve better outcomes and faster recovery times than those who wait until after surgery to address mobility issues.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Establish Your Mobility Baseline Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't leave your recovery to chance. Our Mobility & Strength Score establishes your precise baseline and provides targeted strategies to optimize your pre-surgical conditioning and post-operative outcomes.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'mobility-strength-score-learn-more'} size="lg" className="px-8">
                Get Your Baseline Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Precise measurements • Recovery predictions • Optimization strategies
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}