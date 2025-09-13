import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function ResilienceSignsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'resilience-index-learn-more';
  };

  const signs = [
    {
      title: "Bouncing back from setbacks takes weeks or months",
      content: "Extended recovery periods from failures, rejections, or disappointments indicate reduced resilience. Resilient individuals typically process setbacks within days and use them as learning opportunities rather than dwelling on negative emotions."
    },
    {
      title: "Feeling overwhelmed by routine workplace pressures",
      content: "If standard work deadlines, meetings, or responsibilities consistently feel overwhelming rather than manageable challenges, this suggests diminished stress tolerance and adaptive capacity that resilient people maintain."
    },
    {
      title: "Avoiding challenges or new experiences due to fear of failure",
      content: "Resilient individuals embrace challenges as growth opportunities. Consistently avoiding difficult situations, new roles, or challenging projects indicates low confidence in your ability to handle adversity."
    },
    {
      title: "Physical symptoms from stress (headaches, sleep disruption, fatigue)",
      content: "When stress consistently manifests in physical symptoms like chronic headaches, insomnia, digestive issues, or persistent fatigue, it indicates your stress response system is overwhelmed rather than adaptive."
    },
    {
      title: "Difficulty making decisions when facing uncertainty",
      content: "Resilient people can make decisions despite incomplete information. If uncertainty consistently paralyzes your decision-making or causes excessive anxiety, this indicates reduced tolerance for ambiguity."
    },
    {
      title: "Relying heavily on others for emotional support during minor stresses",
      content: "While social support is healthy, needing constant reassurance or validation for everyday challenges suggests reduced self-efficacy and internal coping resources that characterize resilience."
    },
    {
      title: "Negative emotions persisting for days after minor disappointments",
      content: "Resilient individuals experience disappointment but recover emotional equilibrium relatively quickly. Extended negative emotional states from minor setbacks indicate reduced emotional regulation capacity."
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
              <Badge variant="outline">Mental Resilience</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Warning Signs Your Mental Resilience Is Declining
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These overlooked indicators reveal when your ability to handle stress and bounce back from challenges is compromised. Early recognition enables targeted resilience building before it impacts performance.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Mental resilience isn't just about handling major crises—it's your day-to-day capacity to adapt, recover, and thrive under pressure. High-achieving professionals often overlook subtle signs that their resilience is eroding until stress significantly impacts their performance and wellbeing. Understanding these warning signs enables proactive resilience building before challenges become overwhelming.
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
                If you recognize several of these warning signs, your mental resilience may be compromised, affecting your ability to perform at your peak. The good news is that resilience can be systematically built through targeted training, stress inoculation, and evidence-based mental toughness strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Discover Your Complete Resilience Profile</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These warning signs are important, but how resilient are you really? Our comprehensive assessment evaluates your complete resilience capacity and provides personalized strategies to build unshakeable mental toughness.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Assess Your Resilience Index Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based resilience analysis • Personalized mental toughness plan • Build unbreakable confidence
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}