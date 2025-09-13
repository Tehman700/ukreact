import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function AgingFasterSignsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'biological-age-calculator-learn-more';
  };

  const signs = [
    {
      title: "Resting heart rate above 80 bpm and climbing",
      content: "A resting heart rate consistently above 80 beats per minute, especially if it's increased over recent years, indicates declining cardiovascular fitness. This metric correlates strongly with biological aging and predicts reduced healthspan."
    },
    {
      title: "Memory lapses becoming daily occurrences",
      content: "Frequent forgetfulness of names, appointments, or common words that never used to be a problem. These cognitive changes before age 65 often signal accelerated brain aging and neuroinflammation."
    },
    {
      title: "Energy crashes despite adequate sleep",
      content: "Waking up tired after 7-8 hours of sleep, needing multiple cups of coffee to function, or experiencing afternoon energy crashes. This pattern suggests mitochondrial dysfunction and cellular aging."
    },
    {
      title: "Losing grip strength and muscle mass",
      content: "Struggling with jars you used to open easily, difficulty carrying groceries, or visible muscle loss. Grip strength is one of the most reliable predictors of biological age and future health outcomes."
    },
    {
      title: "Wounds healing slower than a week",
      content: "Minor cuts, bruises, or scratches taking more than 7-10 days to heal completely. Delayed wound healing indicates compromised cellular repair mechanisms and accelerated aging processes."
    },
    {
      title: "Morning stiffness lasting over 30 minutes",
      content: "Joint stiffness that persists for more than half an hour after waking, reduced flexibility, or difficulty touching your toes. These changes reflect accelerated musculoskeletal aging and inflammation."
    },
    {
      title: "Waist expansion despite stable weight",
      content: "Increasing waist circumference even when overall weight remains stable, especially measurements over 40 inches for men. This visceral fat accumulation is a key marker of metabolic aging and health risk."
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
              <Badge variant="outline">Longevity & Aging</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Warning Signs You're Aging Faster Than You Should
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These overlooked indicators reveal when your biological age is advancing faster than your chronological age. Early recognition is the first step toward slowing the aging process.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            While aging is inevitable, the rate at which we age is not. Some people maintain vitality well into their later years, while others show signs of decline much earlier than expected. Understanding these warning signs can help you take action before accelerated aging becomes irreversible.
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
                If you recognize yourself in several of these signs, your biological age may be advancing faster than your chronological age. However, aging acceleration is often reversible with targeted interventions, and even small improvements can significantly impact your longevity trajectory.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Want to Know Your Exact Biological Age?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These warning signs are concerning, but how fast are you really aging? Our comprehensive biological age assessment reveals your true aging rate and provides personalized strategies to slow it down.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Discover Your Biological Age Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based assessment • Personalized longevity plan • Take control of your aging
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}