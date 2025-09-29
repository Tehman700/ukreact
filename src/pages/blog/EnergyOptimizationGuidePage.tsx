import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function EnergyOptimizationGuidePage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const signs = [
    {
      title: "Energy crashes at predictable times (2-3 PM, after meals)",
      content: "Consistent energy drops indicate metabolic dysfunction rather than normal fatigue. These patterns often result from blood sugar spikes, adrenal fatigue, or circadian rhythm disruptions that can be identified and corrected with proper assessment."
    },
    {
      title: "Needing caffeine or stimulants to function normally",
      content: "Daily dependence on caffeine suggests your natural energy production systems are compromised. This often indicates issues with sleep quality, adrenal function, or nutrient deficiencies that professional evaluation can identify."
    },
    {
      title: "Waking up tired despite 7-8 hours of sleep",
      content: "Non-restorative sleep indicates sleep quality issues rather than sleep quantity problems. Sleep apnea, hormonal imbalances, or environmental factors may be preventing the deep, restorative sleep phases your body needs for energy renewal."
    },
    {
      title: "Afternoon fatigue that makes concentration difficult",
      content: "Post-lunch energy crashes that affect cognitive function often indicate blood sugar dysregulation or stress hormone imbalances. This pattern suggests your body is struggling to maintain stable energy throughout the day."
    },
    {
      title: "Exercise leaving you exhausted for days rather than energized",
      content: "Poor exercise recovery indicates mitochondrial dysfunction, adrenal exhaustion, or systemic inflammation. Healthy individuals should feel energized within 24-48 hours of moderate exercise, not depleted for days."
    },
    {
      title: "Brain fog or difficulty making decisions when tired",
      content: "Cognitive symptoms with fatigue suggest your brain isn't getting adequate fuel. This often indicates issues with glucose metabolism, neurotransmitter function, or inflammation affecting brain energy production."
    },
    {
      title: "Feeling wired but tired, especially in the evening",
      content: "This paradoxical state indicates dysregulated stress hormones, particularly cortisol rhythm disruption. Your body is simultaneously exhausted but unable to enter restful states, creating a cycle of poor energy and sleep."
    },
    {
      title: "Energy levels varying dramatically from day to day",
      content: "Inconsistent energy suggests underlying health instability rather than normal variation. This pattern often indicates hormonal fluctuations, nutrient deficiencies, or autoimmune activity that requires professional assessment."
    },
    {
      title: "Relying on sugar or carbs for quick energy boosts",
      content: "Carbohydrate cravings for energy indicate blood sugar instability and possible insulin resistance. Your body is seeking quick fuel because it can't efficiently access stored energy, creating dependency cycles."
    },
    {
      title: "Feeling exhausted after social activities or mental tasks",
      content: "Disproportionate fatigue from routine activities suggests your energy reserves are depleted. This often indicates chronic stress, nutritional deficiencies, or underlying health conditions that are taxing your system."
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
              <Badge variant="outline">Energy Optimization</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              10 Signs Your Energy System Needs Professional Assessment
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Chronic fatigue isn't just about being tired—it's often a sign that your body's energy production systems are compromised. These patterns indicate when fatigue has moved beyond normal tiredness into territory that requires comprehensive evaluation and intervention.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Your energy levels reflect the health of multiple interconnected systems—sleep, metabolism, hormones, nutrition, and stress response. When these systems become dysregulated, simple rest isn't enough to restore vitality. Professional energy assessment can identify the root causes of fatigue and create targeted strategies for sustainable energy optimization.
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
                If multiple energy patterns ring true for you, your fatigue likely stems from identifiable and treatable causes rather than inevitable aging or stress. Professional energy assessment can uncover the specific factors draining your vitality and provide targeted strategies for sustainable energy optimization.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Discover What's Really Draining Your Energy</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop accepting fatigue as normal. Our comprehensive Daily Energy Audit identifies the specific factors affecting your energy levels and provides a personalized roadmap for sustainable vitality.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'daily-energy-audit-learn-more'} size="lg" className="px-8">
                Get Your Energy Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Identify energy drains • Optimize daily patterns • Restore natural vitality
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}