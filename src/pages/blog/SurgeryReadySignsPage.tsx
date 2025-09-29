import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useBlogAnalytics } from '../../hooks/useAnalytics';

export function SurgeryReadySignsPage() {
  // Initialize blog analytics
  const { trackEngagement } = useBlogAnalytics('10 Signs You\'re Closer to Surgery-Ready Than You Think');
  
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    trackEngagement('cta_click', 1);
    window.location.hash = 'surgery-readiness-assessment-learn-more';
  };

  const signs = [
    {
      title: "Steady 30s sit-to-stand count and what the number means",
      content: "If you can complete 12+ sit-to-stand repetitions in 30 seconds, you're demonstrating good lower body strength and balance. This functional test predicts post-surgical mobility and independence better than most complex assessments."
    },
    {
      title: "Walking pace as a recovery predictor",
      content: "Walking faster than 1.2 meters per second (about 2.7 mph) indicates strong cardiovascular fitness and muscle function. This pace correlates directly with faster wound healing and shorter hospital stays."
    },
    {
      title: "Why morning stiffness duration matters",
      content: "Morning stiffness lasting less than 30 minutes suggests well-managed inflammation levels. This indicates your body's natural healing processes are functioning optimally, crucial for post-surgical recovery."
    },
    {
      title: "Protein target hit 5+ days/week",
      content: "Consistently consuming 1.2-1.6g protein per kg body weight shows you're supporting muscle maintenance and wound healing. Protein adequacy is one of the strongest predictors of surgical outcomes."
    },
    {
      title: "Alcohol <14 units/week and trending down",
      content: "Keeping alcohol consumption within recommended limits (and reducing it) demonstrates liver health and reduced inflammation. This significantly improves anesthesia tolerance and healing capacity."
    },
    {
      title: "Sleep: 7–8 hrs or improving trend",
      content: "Consistent quality sleep supports immune function, tissue repair, and pain management. Even if you're not perfect, an improving sleep pattern shows your body is preparing for the demands of surgery and recovery."
    },
    {
      title: "Home set-up (stairs, rails, seat heights)",
      content: "Having grab rails, appropriate seat heights, and clear pathways shows forward thinking about post-surgical limitations. This preparation reduces fall risk and enables faster return to independence."
    },
    {
      title: "Medication timing that actually controls pain",
      content: "If your current pain management strategy is working well, you're demonstrating good medication compliance and pain awareness. This translates to better post-operative pain control and faster mobilization."
    },
    {
      title: "Support person identified for week 1",
      content: "Having reliable help arranged for the first week post-surgery indicates strong planning skills and social support. Both are crucial for managing the initial recovery period safely."
    },
    {
      title: "Clear plan for day-of-surgery logistics",
      content: "Knowing your transport arrangements, pre-op requirements, and post-surgery care plan demonstrates readiness and reduces stress. Lower stress levels improve surgical outcomes and recovery speed."
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
              <Badge variant="outline">Surgery Prep</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Signs You're Closer to Surgery-Ready Than You Think
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Many people underestimate their surgical readiness, focusing on what they lack rather than recognizing the positive indicators they've already achieved. These overlooked signs reveal your true preparation level.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Surgery preparation isn't just about medical clearances and pre-op appointments. Your daily habits, physical capabilities, and life organization provide powerful insights into your surgical readiness. These ten indicators suggest you're further along in your preparation than you might realize.
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
                If you recognize yourself in several of these signs, you're likely more prepared for surgery than you realize. However, surgical readiness exists on a spectrum, and even small improvements in these areas can significantly impact your outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Don't You Want to Know Your Exact Readiness Score?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Only 13% of men go into surgery fully informed. These signs are encouraging, but are you truly prepared? What if you could eliminate the guesswork and know exactly where you stand?
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Discover Your Complete Readiness Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Don't leave your recovery to chance • Get the full picture
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}