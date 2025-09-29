import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function FunctionalFitnessAgeSignsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'functional-fitness-age-test-learn-more';
  };

  const signs = [
    {
      title: "Need handrail support when climbing stairs",
      content: "If you find yourself relying on handrails for balance or struggling to climb multiple flights without getting winded, this indicates declining cardiovascular fitness and lower body strength that's accelerating your functional aging."
    },
    {
      title: "Difficulty getting up from low chairs without using your arms",
      content: "Having to push off with your arms to stand from seated positions reveals significant decline in hip and leg strength. This fundamental movement pattern is a key indicator of functional fitness age."
    },
    {
      title: "Balance problems when standing on one foot for 10+ seconds",
      content: "Poor balance and proprioception are early signs of neurological aging and declining muscle coordination. Inability to maintain single-leg balance indicates accelerated functional decline."
    },
    {
      title: "Losing muscle definition despite maintaining weight",
      content: "The 'skinny fat' phenomenon—losing muscle mass while maintaining or gaining fat—indicates age-related muscle wasting (sarcopenia) that significantly impacts functional capabilities and metabolic health."
    },
    {
      title: "Stiffness and reduced range of motion in daily movements",
      content: "Difficulty reaching overhead, touching toes, or rotating your spine freely signals declining flexibility and joint mobility that limits functional movement patterns and accelerates physical aging."
    },
    {
      title: "Taking longer to recover from physical activities",
      content: "Extended soreness after exercise, feeling exhausted for days after moderate activity, or needing more rest between activities indicates declining recovery capacity and cardiovascular efficiency."
    },
    {
      title: "Avoiding physical challenges you used to handle easily",
      content: "Unconsciously avoiding stairs, heavy lifting, or athletic activities that were once routine reveals both physical decline and psychological adaptation to reduced functional capacity."
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
              <Badge variant="outline">Functional Fitness</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Signs Your Body Is Aging Faster Than Your Years
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These subtle physical changes reveal when your functional fitness age exceeds your chronological age. Early recognition enables targeted interventions to reverse physical decline and restore youthful movement patterns.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Your functional fitness age—how well your body moves and performs compared to age-matched peers—is often a more accurate predictor of health outcomes than your chronological age. Many high-achieving professionals unknowingly experience accelerated physical aging due to sedentary lifestyles, chronic stress, and neglecting movement quality. Understanding these warning signs enables targeted interventions to restore youthful physical function and prevent age-related decline.
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
                If you recognize several of these warning signs, your functional fitness age may exceed your chronological age, accelerating overall health decline and limiting your quality of life. The good news is that functional fitness can be systematically improved through targeted movement training, strength development, and mobility work—often reversing years of physical decline in months.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Discover Your True Functional Fitness Age</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These warning signs are important, but what's your actual functional fitness age? Our comprehensive assessment evaluates your complete physical capabilities and provides personalized strategies to restore youthful movement and strength.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Take Your Functional Fitness Age Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based movement analysis • Personalized fitness optimization plan • Turn back the clock on physical aging
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}