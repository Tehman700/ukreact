import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function InflammationTriggerGuidePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const signs = [
    {
      title: "Joint stiffness worse in the morning and lasting 30+ minutes",
      content: "Morning stiffness that takes more than 30 minutes to resolve indicates systemic inflammation. This classic sign suggests your inflammatory pathways are active during overnight recovery periods, often triggered by diet, stress, or underlying conditions."
    },
    {
      title: "Energy crashes 2-3 hours after meals, especially carb-heavy ones",
      content: "Post-meal fatigue followed by energy crashes indicates blood sugar spikes that trigger inflammatory responses. Your body's inability to handle glucose efficiently creates oxidative stress and inflammatory cascades that drain your energy."
    },
    {
      title: "Digestive symptoms (bloating, gas, discomfort) 4+ times per week",
      content: "Regular digestive issues signal gut inflammation, which affects 70% of your immune system. Chronic gut inflammation triggers systemic inflammatory responses that can manifest as joint pain, fatigue, and cognitive issues."
    },
    {
      title: "Sleep disrupted by aches, pains, or restlessness 3+ nights weekly",
      content: "Pain and restlessness that interrupt sleep indicate elevated inflammatory markers like C-reactive protein and interleukin-6. Poor sleep then creates more inflammation, establishing a cycle that compounds your symptoms."
    },
    {
      title: "Skin issues like eczema, rashes, or slow-healing minor cuts",
      content: "Skin problems reflect systemic inflammation since skin is often the first place inflammatory processes become visible. Slow healing indicates your inflammatory burden is overwhelming your body's repair mechanisms."
    },
    {
      title: "Mood changes, irritability, or brain fog on certain days",
      content: "Cognitive and mood symptoms often result from neuroinflammation triggered by inflammatory foods, stress, or poor sleep. The brain is highly sensitive to inflammatory cytokines that can cross the blood-brain barrier."
    },
    {
      title: "Seasonal allergies or respiratory symptoms getting progressively worse",
      content: "Worsening allergies indicate an overactive immune system in inflammatory overdrive. This hypervigilance often results from chronic inflammatory triggers that keep your immune system in a constant state of alert."
    },
    {
      title: "Weight gain around the midsection despite stable eating habits",
      content: "Visceral fat accumulation is both a cause and consequence of inflammation. Inflammatory hormones like cortisol promote belly fat storage, while visceral fat tissue produces inflammatory chemicals, creating a self-perpetuating cycle."
    },
    {
      title: "Recovery from exercise taking longer than it used to",
      content: "Delayed exercise recovery indicates elevated inflammatory markers that slow tissue repair and muscle recovery. What once took 24 hours now takes 48-72 hours, suggesting your inflammatory pathways are overwhelmed."
    },
    {
      title: "Multiple small health issues rather than one major problem",
      content: "Chronic inflammation rarely presents as one obvious symptom. Instead, it manifests as a collection of seemingly unrelated issues – joint aches, digestive problems, fatigue, mood changes – that all share common inflammatory pathways."
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
              <Badge variant="outline">Inflammation Assessment</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Hidden Inflammation Triggers Sabotaging Your Health
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Chronic inflammation often flies under the radar, dismissed as "normal aging" or stress. These subtle signs reveal when inflammation has moved from protective to destructive, and why professional assessment can uncover the triggers keeping you stuck in inflammatory cycles.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Inflammation is meant to be a short-term protective response, but modern life has turned it into a chronic condition for millions. Unlike acute inflammation from injury, chronic inflammation simmers quietly, slowly damaging tissues and disrupting normal body functions. Recognizing these patterns is the first step toward breaking free from inflammatory cycles.
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
                If several of these signs resonate with you, chronic inflammation may be the common thread connecting your symptoms. The good news is that inflammation is highly responsive to lifestyle changes, but first you need to identify your specific triggers and patterns through comprehensive assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Discover Your Personal Inflammation Risk Profile</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop playing guessing games with your health. Our evidence-based Inflammation Risk Score identifies your specific triggers and provides a personalized roadmap for reducing inflammatory burden.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'inflammation-risk-score-learn-more'} size="lg" className="px-8">
                Get Your Inflammation Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Identify triggers • Reduce inflammatory burden • Optimize your health
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}