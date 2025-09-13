import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function CardiometabolicRiskSignsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'cardiometabolic-risk-score-learn-more';
  };

  const signs = [
    {
      title: "Waist measurement exceeding 40 inches (men) or 35 inches (women)",
      content: "Excess abdominal fat significantly increases cardiovascular disease and diabetes risk. Visceral fat produces inflammatory compounds that directly damage blood vessels and interfere with insulin function, making this one of the most critical warning signs."
    },
    {
      title: "Blood pressure readings consistently above 130/80 mmHg",
      content: "Even mildly elevated blood pressure puts strain on your cardiovascular system and increases stroke risk by up to 40%. High blood pressure is often called the 'silent killer' because symptoms may not appear until serious damage has occurred."
    },
    {
      title: "Frequent energy crashes 2-3 hours after meals",
      content: "Post-meal fatigue, brain fog, or sudden energy drops indicate blood sugar instability and potential insulin resistance. These episodes signal your body is struggling to efficiently process glucose, a precursor to type 2 diabetes."
    },
    {
      title: "Family history of heart disease or diabetes before age 60",
      content: "Genetic predisposition significantly amplifies your cardiometabolic risk. If parents or siblings developed these conditions early, your risk increases by 2-5 times, making prevention strategies absolutely critical for your health trajectory."
    },
    {
      title: "HDL cholesterol below 40 mg/dL (men) or 50 mg/dL (women)",
      content: "Low 'good' cholesterol is often more dangerous than high 'bad' cholesterol. HDL protects against atherosclerosis by removing plaque from arteries. Low levels triple your risk of cardiovascular events regardless of other factors."
    },
    {
      title: "Difficulty losing weight despite diet and exercise efforts",
      content: "Stubborn weight retention, especially around the midsection, often indicates metabolic dysfunction and insulin resistance. When traditional approaches fail, underlying hormonal imbalances may be sabotaging your health and weight management efforts."
    },
    {
      title: "Chronic inflammation markers like joint pain or skin issues",
      content: "Persistent inflammation is the common pathway for both cardiovascular disease and diabetes. Joint stiffness, skin problems, or slow wound healing often reflect systemic inflammation that's silently damaging your cardiovascular and metabolic health."
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
              <Badge variant="outline">Cardiovascular Health</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Critical Warning Signs of Hidden Cardiometabolic Risk
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These overlooked indicators reveal when your cardiovascular and metabolic health is at risk. Early detection and intervention can prevent heart disease, stroke, and diabetes.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Cardiovascular disease and diabetes don't develop overnight. Your body provides warning signs years before serious complications arise. High-achieving professionals often ignore these subtle indicators until a major health event forces them to pay attention. Recognition of these signs enables proactive intervention that can dramatically alter your health trajectory.
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
                If you recognize multiple warning signs, your cardiometabolic risk may be significantly elevated even if you feel healthy. The good news is that cardiovascular and metabolic health can be dramatically improved with targeted lifestyle interventions, especially when implemented early.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Get Your Complete Cardiometabolic Risk Assessment</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These warning signs are important, but what's your actual cardiovascular and metabolic risk level? Our comprehensive assessment evaluates your complete risk profile and provides a personalized prevention strategy.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Assess Your Cardiometabolic Risk Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based risk analysis • Personalized prevention plan • Take control of your health
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}