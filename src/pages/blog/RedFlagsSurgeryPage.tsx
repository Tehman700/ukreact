import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, AlertTriangle, Clock } from 'lucide-react';

export function RedFlagsSurgeryPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const redFlags = [
    {
      title: "Breathlessness at rest/chest pain → urgent care",
      content: "Shortness of breath without exertion or chest pain could indicate serious cardiovascular issues. These symptoms require immediate medical evaluation and may necessitate postponing surgery until fully investigated and stabilized.",
      urgency: "Immediate"
    },
    {
      title: "Uncontrolled BP or glucose",
      content: "Blood pressure consistently above 140/90 or blood glucose levels that fluctuate wildly increase surgical complications dramatically. Both conditions must be optimized before any elective procedure.",
      urgency: "High"
    },
    {
      title: "Signs of infection (wound, dental, urinary)",
      content: "Any active infection, from a dental abscess to a urinary tract infection, can seed your surgical site and cause life-threatening complications. All infections must be completely resolved before surgery.",
      urgency: "High"
    },
    {
      title: "Unexplained weight loss or fever",
      content: "Unintentional weight loss of more than 5% in 6 months or recurrent fevers may indicate underlying conditions that compromise healing and increase surgical risk. Investigation is essential.",
      urgency: "High"
    },
    {
      title: "New calf swelling or sudden severe headache",
      content: "These symptoms could indicate blood clots or cardiovascular events. Both conditions dramatically increase the risk of surgical complications and require immediate medical attention.",
      urgency: "Immediate"
    },
    {
      title: "Progressive neuro symptoms",
      content: "New or worsening neurological symptoms like weakness, numbness, or coordination problems could indicate serious underlying conditions that affect surgical safety and anesthesia tolerance.",
      urgency: "High"
    },
    {
      title: "High alcohol/nicotine load with no taper plan",
      content: "Heavy alcohol or nicotine use without a reduction plan increases infection risk, impairs wound healing, and can cause dangerous withdrawal symptoms during hospitalization. A supervised taper is essential.",
      urgency: "Moderate"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Immediate': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-orange-500 text-white';
      case 'Moderate': return 'bg-yellow-500 text-white';
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
              <Badge variant="outline">Safety</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Red Flags to Sort Before Surgery (So Recovery Isn't Derailed)
            </h1>
            
            <p className="text-lg text-muted-foreground">
              These critical warning signs must be addressed before any surgical procedure. Ignoring them doesn't just compromise your surgery—it can be life-threatening.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Warning Box */}
        <Card className="mb-12 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-destructive mb-2">Important Medical Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  If you're experiencing any of these symptoms, particularly those marked as "Immediate," seek medical attention right away. This article is for educational purposes only and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Surgery preparation goes beyond optimizing your health—it requires identifying and addressing serious warning signs that could derail your entire procedure. These red flags represent genuine threats to surgical safety that no amount of positive preparation can overcome.
          </p>
          <p className="text-lg leading-relaxed">
            The good news? Most of these issues are manageable when caught early and addressed properly. The key is recognizing them and taking action before they become surgical contraindications.
          </p>
        </div>



        {/* Red Flags List */}
        <div className="space-y-6 mb-12">
          {redFlags.map((flag, index) => (
            <Card key={index} className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <h3 className="text-lg">{flag.title}</h3>
                  </div>
                  <Badge className={getUrgencyColor(flag.urgency)}>
                    {flag.urgency}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-11">{flag.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What to Do Section */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="mb-4">What to Do If You Have Red Flags</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>Immediate urgency:</strong> Seek emergency medical care right away</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>High urgency:</strong> Contact your surgeon and primary care doctor within 24-48 hours</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>Moderate urgency:</strong> Discuss with your healthcare team at your next appointment</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p><strong>Always:</strong> Be honest with your surgical team about any symptoms or concerns</p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="mb-2">Remember</h3>
              <p className="text-muted-foreground">
                Postponing surgery to address these issues isn't a setback—it's responsible healthcare. A delayed surgery with optimal safety is always better than proceeding with elevated risks. Your surgical team wants you to succeed, and that means ensuring you're in the best possible condition before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Ensure Your Surgery Is as Safe as Possible</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our Red-Flag Safety Gate assessment systematically evaluates potential risk factors and provides clear guidance on what needs attention before your surgery. Don't leave your safety to chance.
            </p>
            <div className="space-y-4">
              <Button onClick={handleTakeAssessment} size="lg" className="px-8">
                Get Your Safety Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Clear action items • Peace of mind
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}