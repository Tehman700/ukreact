import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function LifestyleImpactGuidePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const signs = [
    {
      title: "Declining work performance or frequent sick days",
      content: "When health issues begin affecting your professional capabilities or attendance, they've crossed into significant lifestyle impact territory. This often indicates that symptoms are no longer manageable with basic self-care approaches."
    },
    {
      title: "Avoiding social activities you previously enjoyed",
      content: "Social withdrawal due to health concerns signals substantial lifestyle limitation. Whether from fatigue, pain, or unpredictable symptoms, this avoidance behavior indicates that your condition is controlling your life choices rather than the reverse."
    },
    {
      title: "Canceling plans frequently due to symptoms",
      content: "Regular plan cancellations create social isolation and reinforce the cycle of limitation. This pattern suggests your symptoms are unpredictable enough to significantly impact reliability and social connections."
    },
    {
      title: "Modifying your living space significantly for health reasons",
      content: "Home modifications like moving to a single-story, installing grab bars, or avoiding stairs indicate substantial functional limitations. These adaptations suggest your symptoms are affecting basic daily activities and mobility."
    },
    {
      title: "Giving up hobbies, sports, or physical activities",
      content: "Activity abandonment represents loss of identity and joy, not just physical limitation. When health issues force you to stop doing things that define you, the psychological impact compounds the physical challenges."
    },
    {
      title: "Partner or family commenting on your activity limitations",
      content: "When loved ones notice and comment on your reduced capabilities, the impact has become apparent to others. This external validation often indicates limitations you might be minimizing or adapting to unconsciously."
    },
    {
      title: "Planning activities around symptom patterns or 'good days'",
      content: "When your schedule revolves around managing symptoms rather than pursuing goals, your condition has become the primary organizing principle of your life. This level of accommodation suggests professional intervention could restore control."
    },
    {
      title: "Reduced travel or reluctance to go places without familiar amenities",
      content: "Travel limitations indicate significant lifestyle restriction and loss of spontaneity. Whether due to medication needs, dietary restrictions, or symptom unpredictability, this suggests substantial impact on life enjoyment."
    },
    {
      title: "Sleep disruption affecting daily functioning for weeks or months",
      content: "Chronic sleep issues that impair daily function create cascading lifestyle impacts. Poor sleep affects work performance, mood regulation, social interactions, and decision-making capacity, amplifying other health challenges."
    },
    {
      title: "Feeling like you're managing symptoms more than living life",
      content: "When symptom management becomes your primary daily focus, you've lost the balance between health maintenance and life enjoyment. This shift in priorities indicates the need for more effective strategies to reclaim control."
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
              <Badge variant="outline">Lifestyle Impact</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Signs Your Health Is Controlling Your Life (Not the Other Way Around)
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Health challenges become lifestyle limiters when they start dictating your choices rather than being managed within your chosen lifestyle. These signs indicate when symptoms have moved from manageable inconvenience to life-controlling force.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            The difference between living with health challenges and being controlled by them lies in who's making the decisions—you or your symptoms. When health issues begin determining your work performance, social activities, and life choices, it's time to reassess your management strategies and seek comprehensive support.
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
                If several of these lifestyle impacts resonate with you, your health challenges have likely progressed beyond what basic self-management can address. Professional assessment can help you develop strategies to regain control over your life choices while effectively managing your health conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Reclaim Control Over Your Life and Health</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              You deserve to live life on your terms, not your symptoms' terms. Our Lifestyle Limiter Score assessment identifies exactly how your health challenges are affecting your life and provides strategies to restore balance and control.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'lifestyle-limiter-score-learn-more'} size="lg" className="px-8">
                Assess Your Lifestyle Impact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Identify limitations • Develop strategies • Reclaim your life
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}