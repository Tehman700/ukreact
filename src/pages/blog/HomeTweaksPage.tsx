import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, Home, Clock, CheckCircle2 } from 'lucide-react';

export function HomeTweaksPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const tweaks = [
    {
      title: "Clear snag hazards (rugs/cables)",
      content: "Remove or secure loose rugs, electrical cords, and low furniture that could cause trips. Use double-sided tape for rugs or remove them entirely during recovery. Route cables along walls and secure them with clips.",
      cost: "Free-£20",
      difficulty: "Easy"
    },
    {
      title: "Night lights along the route to the loo",
      content: "Install motion-activated LED lights from bedroom to bathroom. Pain medication can cause dizziness and impair night vision. Clear visibility prevents falls during vulnerable nighttime trips.",
      cost: "£15-40",
      difficulty: "Easy"
    },
    {
      title: "Non-slip bath/shower + grab rails",
      content: "Add textured strips or mats to shower floors and install grab rails at entry points and inside the shower. Post-surgery balance and strength are compromised, making these safety features essential.",
      cost: "£30-150",
      difficulty: "Moderate"
    },
    {
      title: "Chair height and armrests for safe sit-stand",
      content: "Ensure chairs are 18-20 inches high with sturdy armrests. Add firm cushions to raise seat height if needed. Your post-surgery leg strength will be reduced, making proper chair height crucial for independence.",
      cost: "£20-80",
      difficulty: "Easy"
    },
    {
      title: "Shoe audit: firm heel, non-slip sole",
      content: "Replace worn shoes with supportive footwear featuring non-slip soles and firm heel counters. Avoid slippers, flip-flops, or any loose-fitting footwear that could cause falls during recovery.",
      cost: "£40-120",
      difficulty: "Easy"
    },
    {
      title: "Stairs strategy: rails + step cadence",
      content: "Install rails on both sides if possible. Practice a steady rhythm: 'up with the good, down with the bad.' Mark step edges with contrasting tape if visibility is poor. Consider a stair lift for longer-term mobility issues.",
      cost: "£10-50",
      difficulty: "Easy-Moderate"
    },
    {
      title: "Tray or caddy for essentials at waist height",
      content: "Keep medications, water, tissues, and phone within easy reach without bending or stretching. A rolling cart or bedside organizer prevents the need to navigate around the house frequently.",
      cost: "£25-60",
      difficulty: "Easy"
    },
    {
      title: "Set up a 'recovery station' (ice, meds, logbook)",
      content: "Create a dedicated space with ice packs, pain medication, wound care supplies, and a recovery tracking notebook. Having everything organized in one place reduces stress and ensures consistent care routines.",
      cost: "£15-40",
      difficulty: "Easy"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
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
          
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="outline">Recovery</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              8 Home Tweaks That Prevent Falls and Speed Recovery
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Simple, affordable modifications that transform your home into a recovery-optimized environment. These practical changes can prevent complications and accelerate your return to normal activities.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Your home environment plays a crucial role in recovery success. Research shows that fall-related complications extend hospital stays and delay healing by weeks or even months. The good news? Most home hazards can be eliminated with simple, inexpensive modifications.
          </p>
          <p className="text-lg leading-relaxed">
            These eight tweaks address the most common fall risks and recovery obstacles. Most can be completed in under an hour and cost less than £100 total—a small investment for safer, faster healing.
          </p>
        </div>

        {/* Quick Stats */}
        <Card className="mb-12 bg-muted/30">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">1 in 3</div>
                <p className="text-sm text-muted-foreground">Post-surgical patients experience a fall at home</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">80%</div>
                <p className="text-sm text-muted-foreground">Of falls happen in familiar environments</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">2-6 weeks</div>
                <p className="text-sm text-muted-foreground">Additional recovery time after fall-related complications</p>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Tweaks List */}
        <div className="space-y-6 mb-12">
          {tweaks.map((tweak, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <h3 className="text-lg">{tweak.title}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getDifficultyColor(tweak.difficulty)}>
                      {tweak.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {tweak.cost}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-11">{tweak.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Implementation Timeline */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="mb-4">When to Implement These Changes</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>4-6 weeks before surgery:</strong> Major installations (grab rails, lighting)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>2-3 weeks before:</strong> Clear hazards, adjust furniture heights</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>1 week before:</strong> Set up recovery station, test all modifications</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>Day before surgery:</strong> Final check, charge night lights, stock supplies</p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="mb-2">The Bottom Line</h3>
              <p className="text-muted-foreground">
                Home preparation isn't just about convenience—it's about safety and recovery speed. Patients who prepare their homes properly experience 40% fewer complications and return to normal activities an average of 10 days earlier than those who don't.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Create Your Complete Recovery Environment</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These home tweaks are just the beginning. Our comprehensive assessment evaluates your specific living situation, mobility needs, and recovery timeline to create a personalized home safety and recovery optimization plan.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Get Your Personalized Home Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Equipment recommendations • Recovery timeline
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}