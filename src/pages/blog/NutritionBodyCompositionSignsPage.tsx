import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function NutritionBodyCompositionSignsPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'nutrition-body-composition-score-learn-more';
  };

  const signs = [
    {
      title: "Struggling to build muscle despite consistent strength training",
      content: "If you're training regularly but seeing minimal muscle growth, inadequate protein intake, poor nutrient timing, or underlying nutritional deficiencies may be limiting muscle protein synthesis and recovery."
    },
    {
      title: "Persistent body fat despite caloric restriction",
      content: "When body fat remains stubbornly high despite reducing calories, metabolic adaptation, poor macronutrient balance, or nutrient deficiencies affecting thyroid and hormonal function may be impacting fat oxidation."
    },
    {
      title: "Energy crashes and cravings throughout the day",
      content: "Frequent energy dips, sugar cravings, and mood swings often indicate blood sugar dysregulation from poor meal timing, inadequate protein, or excessive refined carbohydrates disrupting metabolic stability."
    },
    {
      title: "Poor recovery from workouts and prolonged muscle soreness",
      content: "Extended muscle soreness, poor workout recovery, and declining performance suggest inadequate post-exercise nutrition, insufficient protein, or micronutrient deficiencies affecting tissue repair and inflammation."
    },
    {
      title: "Visible muscle loss or 'skinny fat' appearance",
      content: "Looking soft despite normal weight, losing muscle definition, or experiencing sarcopenia indicates inadequate protein intake, poor resistance training stimulus, or metabolic factors affecting muscle maintenance."
    },
    {
      title: "Digestive issues affecting nutrient absorption",
      content: "Chronic bloating, irregular bowel movements, food intolerances, or digestive discomfort can significantly impair nutrient absorption and utilization, compromising body composition goals regardless of diet quality."
    },
    {
      title: "Plateau in strength gains and athletic performance",
      content: "Stagnant strength progression, declining athletic performance, or inability to increase training intensity often reflects inadequate nutritional support for muscle adaptation and energy systems optimization."
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
              <Badge variant="outline">Nutrition & Body Composition</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Signs Your Nutrition Is Sabotaging Your Body Composition
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These subtle nutritional warning signs reveal when your diet is preventing optimal body composition and metabolic health. Early recognition enables targeted nutritional interventions before they impact your physique goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Achieving optimal body composition isn't just about calories in versus calories out—it's about providing your body with the right nutrients at the right times to support muscle building, fat loss, and metabolic health. Many high-achieving professionals follow what they believe to be healthy diets but unknowingly sabotage their body composition goals through subtle nutritional mistakes. Understanding these warning signs enables targeted interventions for optimal physique development.
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
                If you recognize several of these warning signs, your nutrition may be undermining your body composition goals, preventing you from achieving the physique and performance you're working toward. The good news is that nutrition can be systematically optimized through evidence-based strategies, proper macronutrient balance, and targeted supplementation.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Optimize Your Complete Nutrition Profile</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These warning signs are important, but how optimized is your nutrition really? Our comprehensive assessment evaluates your complete nutritional status and provides personalized strategies to achieve your ideal body composition.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Get Your Nutrition & Body Composition Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based nutrition analysis • Personalized body composition plan • Achieve your physique goals
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}