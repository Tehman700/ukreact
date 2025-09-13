import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ExternalLink, Phone, BookOpen, Zap, Shield, Heart, Activity, Calendar, ArrowRight } from 'lucide-react';

export function HealthConciergeResultsPage() {
  // Get responses from localStorage (in a real app, this would come from your state management)
  const responses = JSON.parse(localStorage.getItem('healthConciergeResponses') || '{}');
  
  const primaryGoal = responses['primary-goal'] || '';
  const urgencyLevel = responses['urgency-level'] || '';
  const challenges = responses['current-challenges'] || [];
  const previousAttempts = responses['previous-attempts'] || '';
  const investmentLevel = responses['investment-level'] || '';
  const preferredApproach = responses['preferred-approach'] || '';

  // Determine personalized recommendations based on responses
  const getPersonalizedRecommendations = () => {
    const recommendations = {
      summary: '',
      freeResources: [],
      lutherHealthProducts: [],
      nextSteps: [],
      showClinicianCall: false
    };

    // Generate summary based on primary goal
    if (primaryGoal === 'surgery-prep') {
      recommendations.summary = "Based on your responses, you're focused on preparing for upcoming surgery. The key to successful surgical outcomes lies in optimizing your physical and mental readiness beforehand.";
      recommendations.lutherHealthProducts = [
        { id: '1', name: 'Surgery Readiness Score', price: 37, description: 'Comprehensive assessment of your surgical preparation' },
        { id: '21', name: 'Complete Surgery Preparation Bundle', price: 120, description: 'Full surgical optimization assessment suite' }
      ];
    } else if (primaryGoal === 'chronic-symptoms') {
      recommendations.summary = "You're dealing with chronic symptoms that are impacting your daily life. Managing these effectively requires understanding their root causes and triggers.";
      recommendations.lutherHealthProducts = [
        { id: '10', name: 'Symptom Severity Index', price: 43, description: 'Comprehensive symptom tracking and analysis' },
        { id: '22', name: 'Complete Chronic Symptoms Bundle', price: 125, description: 'Full chronic symptom management assessment' }
      ];
    } else if (primaryGoal === 'aging-optimization') {
      recommendations.summary = "You're proactively focused on healthy aging and longevity optimization. This forward-thinking approach can significantly impact your healthspan.";
      recommendations.lutherHealthProducts = [
        { id: '2', name: 'Biological Age Calculator', price: 49, description: 'Discover your true biological age' },
        { id: '23', name: 'Complete Longevity Bundle', price: 138, description: 'Comprehensive longevity optimization assessment' }
      ];
    } else {
      recommendations.summary = "You're looking to optimize your overall health and well-being. A systematic approach to understanding your current status is the best starting point.";
      recommendations.lutherHealthProducts = [
        { id: '18', name: 'Resilience Index', price: 49, description: 'Assess your mental and physical resilience' },
        { id: '13', name: 'Daily Energy Audit', price: 42, description: 'Understand your energy patterns and optimization potential' }
      ];
    }

    // Add free resources
    recommendations.freeResources = [
      {
        title: 'NHS Health Resources',
        description: 'Comprehensive health information and self-assessment tools',
        url: 'https://www.nhs.uk/live-well/',
        icon: <ExternalLink className="w-4 h-4" />
      },
      {
        title: 'Luther Health Blog',
        description: 'Expert articles on health optimization and evidence-based wellness',
        url: '#blog',
        icon: <BookOpen className="w-4 h-4" />
      },
      {
        title: 'British Heart Foundation',
        description: 'Heart health resources and lifestyle guidance',
        url: 'https://www.bhf.org.uk/',
        icon: <Heart className="w-4 h-4" />
      }
    ];

    // Determine if clinician call should be offered
    if (investmentLevel === 'premium') {
      recommendations.showClinicianCall = true;
      recommendations.nextSteps = [
        'Book a consultation with one of our clinicians to discuss a personalized protocol',
        'Complete a comprehensive assessment to identify priority areas',
        'Consider our premium care packages for ongoing support'
      ];
    } else if (investmentLevel === 'significant') {
      recommendations.nextSteps = [
        'Start with a comprehensive assessment bundle to get full insights',
        'Consider our structured protocols for systematic improvement',
        'Upgrade to clinician support when ready for the next level'
      ];
    } else if (investmentLevel === 'moderate') {
      recommendations.nextSteps = [
        'Begin with a single targeted assessment in your area of focus',
        'Use our free resources to build healthy habits',
        'Consider bundled assessments as you progress'
      ];
    } else {
      recommendations.nextSteps = [
        'Start with our free blog resources and NHS guidance',
        'Focus on basic lifestyle improvements (sleep, nutrition, movement)',
        'Consider a single assessment when ready to dive deeper'
      ];
    }

    return recommendations;
  };

  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Your Personalized Results
          </Badge>
          <h1 className="text-4xl mb-4">Your Health Guidance Report</h1>
          <p className="text-xl text-muted-foreground">
            Based on your responses, here's your personalized health roadmap
          </p>
        </div>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Your Health Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {recommendations.summary}
            </p>
          </CardContent>
        </Card>

        {/* Free Resources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recommended Free Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.freeResources.map((resource, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <Button variant="outline" size="sm" onClick={() => window.open(resource.url.startsWith('#') ? window.location.origin + '/' + resource.url : resource.url, resource.url.startsWith('#') ? '_self' : '_blank')}>
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Visit Resource
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Luther Health Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recommended Luther Health Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm mb-4">
              Based on your goals and investment level, these assessments would provide the most value:
            </p>
            {recommendations.lutherHealthProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="mb-1">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg mb-2">£{product.price}</div>
                  <Button size="sm" onClick={() => window.location.hash = 'assessments'}>
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Clinician Call CTA (if applicable) */}
        {recommendations.showClinicianCall && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Phone className="w-5 h-5" />
                Premium Care Option
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4">
                Based on your investment level, you may benefit from direct consultation with one of our experienced clinicians. 
                This includes personalized protocol development and ongoing support.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                Book Clinician Consultation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  
                  <p className="text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => window.location.hash = 'assessments'}>
            <Shield className="w-4 h-4 mr-2" />
            Browse All Assessments
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.hash = 'contact'}>
            <Phone className="w-4 h-4 mr-2" />
            Contact Our Team
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Want to explore other areas? <a href="#assessments" className="text-primary hover:underline">View all our health assessments</a>
          </p>
        </div>
      </div>
    </div>
  );
}