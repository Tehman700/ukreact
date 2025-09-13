import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Clock, Users, Star } from 'lucide-react';

export function HealthConciergeInformationPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Free Health Guidance
          </Badge>
          <h1 className="text-4xl mb-4">Your Personal Health Concierge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized health guidance in just 5 minutes. Tell us about your situation and we'll point you toward the right next steps.
          </p>
        </div>

        {/* What You'll Get */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl mb-6 text-center">What you'll discover:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="mb-2">Personalized Next Steps</h3>
                  <p className="text-muted-foreground">
                    Clear, actionable recommendations tailored to your specific health goals and concerns.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="mb-2">Expert Resource Library</h3>
                  <p className="text-muted-foreground">
                    Access to our curated collection of reputable health resources and tools.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="mb-2">Relevant Services</h3>
                  <p className="text-muted-foreground">
                    Recommendations for Luther Health assessments and protocols that match your needs.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="mb-2">Priority Assessment</h3>
                  <p className="text-muted-foreground">
                    Understand which health areas to focus on first for maximum impact.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl mb-6 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="mb-2">Answer Questions</h3>
                <p className="text-muted-foreground text-sm">
                  5 minutes of questions about your health goals, concerns, and current situation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="mb-2">Get Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Our system analyzes your responses to understand your unique health profile.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="mb-2">Receive Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Get personalized recommendations, resources, and next steps for your health journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <Card className="mb-8 bg-muted">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Privacy Notice:</strong> Your responses are kept confidential and used solely to provide personalized health guidance. 
              We never share your information with third parties.
            </p>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => window.location.hash = 'health-concierge-questions'}
          >
            Start Your Free Health Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Takes 5 minutes • Completely free • No obligation
          </p>
        </div>
      </div>
    </div>
  );
}