import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, Sun, Clock, AlertTriangle, Timer } from 'lucide-react';

export function MorningStiffnessPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const strategies = [
    {
      title: "Heat before movement",
      content: "Apply a heating pad or take a warm shower before attempting any movement. Heat increases blood flow and tissue elasticity, making initial movements less painful and more effective.",
      time: "5-10 min",
      difficulty: "Easy"
    },
    {
      title: "Bedside ankle pumps & knee hugs",
      content: "Before standing, pump your ankles 20 times and gently hug each knee to your chest. This activates circulation and loosens hip flexors while still lying down.",
      time: "2 min",
      difficulty: "Easy"
    },
    {
      title: "Cat-camel x10",
      content: "On hands and knees, arch and round your spine slowly 10 times. This mobilizes the entire spinal column and activates core muscles that support movement throughout the day.",
      time: "1 min",
      difficulty: "Easy"
    },
    {
      title: "Hip flexor doorway stretch",
      content: "Step one foot forward in a doorway and lean forward, stretching the back leg's hip flexor. Hold for 30 seconds each side. This counters prolonged sitting and sleeping positions.",
      time: "1 min",
      difficulty: "Easy"
    },
    {
      title: "Glute activation (mini-band)",
      content: "Use a resistance band around your knees for side steps or clamshells. Activating dormant glutes improves hip stability and reduces compensatory stiffness in other areas.",
      time: "2 min",
      difficulty: "Easy"
    },
    {
      title: "Short hallway walk, not coffee first",
      content: "Take a gentle 2-3 minute walk before sitting down for coffee. Movement before caffeine helps establish better circulation patterns and prevents the blood pressure spike that can worsen stiffness.",
      time: "3 min",
      difficulty: "Easy"
    },
    {
      title: "Anti-inflammatory breakfast template",
      content: "Include protein, omega-3s, and antioxidants: berries with Greek yogurt, or eggs with spinach. Avoiding sugar and processed foods prevents inflammatory spikes that worsen stiffness.",
      time: "5 min prep",
      difficulty: "Easy"
    },
    {
      title: "Hydrate early",
      content: "Drink 16-20 oz of water immediately upon waking. Overnight dehydration thickens joint fluid and increases stiffness. Proper hydration improves tissue mobility within 30 minutes.",
      time: "30 sec",
      difficulty: "Easy"
    },
    {
      title: "Gentle thoracic opener on a towel roll",
      content: "Lie on your back with a rolled towel under your shoulder blades for 2-3 minutes. This counters forward head posture from sleeping and opens up restricted chest and upper back muscles.",
      time: "3 min",
      difficulty: "Easy"
    },
    {
      title: "Microdose movement every hour (timer tip)",
      content: "Set hourly reminders for 30-second movement breaks: shoulder rolls, neck rotations, or marching in place. Frequent small movements prevent stiffness from accumulating throughout the day.",
      time: "30 sec/hour",
      difficulty: "Easy"
    },
    {
      title: "Pain pacing: 24-hr flare plan",
      content: "If morning stiffness is severe, have a predetermined plan: modified movements, heat application, and activity adjustment. Knowing your strategy reduces anxiety and prevents overexertion.",
      time: "Planning",
      difficulty: "Moderate"
    },
    {
      title: "Shower → mobility stack",
      content: "Use shower time for gentle range-of-motion exercises. The warm water and steam create an ideal environment for safe stretching and movement while you're already warmed up.",
      time: "5 min",
      difficulty: "Easy"
    },
    {
      title: "When stiffness = red flag",
      content: "Morning stiffness lasting >2 hours, fever with stiffness, or sudden onset of severe stiffness may indicate infection or inflammatory conditions requiring medical attention.",
      time: "Immediate",
      difficulty: "Assessment"
    }
  ];

  const getTimeColor = (time: string) => {
    if (time.includes('sec')) return 'bg-green-100 text-green-800';
    if (time.includes('1-3') || time === '1 min' || time === '2 min') return 'bg-green-100 text-green-800';
    if (time.includes('5') || time === '3 min') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

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
              <Badge variant="outline">Mobility</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              13 Ways to Tame Morning Stiffness in Under 10 Minutes
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Evidence-based strategies to reduce morning stiffness and start your day with better mobility. These quick techniques address the underlying causes of AM stiffness and provide lasting relief.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Morning stiffness affects up to 90% of people with joint conditions and significantly impacts daily function. The key isn't just managing symptoms—it's understanding why stiffness occurs and targeting the root causes with strategic interventions.
          </p>
          <p className="text-lg leading-relaxed">
            These 13 techniques work synergistically to address circulation, tissue hydration, neural activation, and inflammatory factors. Most take less than 5 minutes and can be combined into a personalized routine.
          </p>
        </div>

        {/* Why Morning Stiffness Happens */}
        <Card className="mb-12 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              Why Morning Stiffness Happens
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Overnight dehydration:</strong> Joint fluid thickens</p>
                <p><strong>Inflammatory cycles:</strong> Peak inflammation at 6-8 AM</p>
                <p><strong>Muscle dormancy:</strong> 8+ hours of inactivity</p>
              </div>
              <div className="space-y-2">
                <p><strong>Circulation reduction:</strong> Decreased blood flow</p>
                <p><strong>Tissue adhesions:</strong> Fascia becomes sticky</p>
                <p><strong>Neural inhibition:</strong> Reduced muscle activation</p>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Strategies List */}
        <div className="space-y-4 mb-12">
          {strategies.map((strategy, index) => (
            <Card key={index} className={index === 12 ? "border-l-4 border-l-destructive" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <h3 className="text-lg">{strategy.title}</h3>
                  </div>
                  <div className="flex space-x-2">
                    {index === 12 && <Badge variant="destructive">Warning</Badge>}
                    <Badge className={getTimeColor(strategy.time)}>
                      <Timer className="h-3 w-3 mr-1" />
                      {strategy.time}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-11">{strategy.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Routine */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="mb-4">Sample 8-Minute Morning Routine</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Hydrate (16 oz water)</span>
                <span className="text-muted-foreground">30 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Bedside ankle pumps & knee hugs</span>
                <span className="text-muted-foreground">2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Heat application while preparing</span>
                <span className="text-muted-foreground">5 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Cat-camel + hip flexor stretch</span>
                <span className="text-muted-foreground">2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Glute activation with band</span>
                <span className="text-muted-foreground">2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Short walk + anti-inflammatory breakfast</span>
                <span className="text-muted-foreground">5 minutes</span>
              </div>
              <div className="border-t pt-2 mt-2 font-medium">
                <div className="flex justify-between">
                  <span>Total Time</span>
                  <span>8 minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Red Flag Warning */}
        <Card className="mb-12 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-destructive mb-2">When to Seek Medical Attention</h3>
                <p className="text-sm text-muted-foreground">
                  Morning stiffness lasting more than 2 hours, accompanied by fever, or sudden onset of severe stiffness may indicate serious conditions like infection or inflammatory arthritis. Contact your healthcare provider immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Takeaway */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Sun className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="mb-2">The Science Behind Success</h3>
              <p className="text-muted-foreground">
                These strategies work because they address the physiological causes of morning stiffness: improving circulation, maintaining tissue hydration, activating dormant muscles, and managing inflammatory cycles. Consistency is key—even 5 minutes daily can produce significant improvements within 2-3 weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Optimize Your Morning Mobility</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              While these strategies help most people, your specific stiffness pattern may require targeted interventions. Our comprehensive mobility assessment identifies the root causes of your morning stiffness and creates a personalized improvement plan.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Get Your Personalized Mobility Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Custom exercise prescription • Progress tracking
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}