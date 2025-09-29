import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function AnaesthesiaRisksPage() {
  const handleBack = () => {
    window.location.hash = 'blog';
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  const anaesthesiaRisks = [
    {
      title: "Silent Sleep Apnoea",
      content: "Many patients have undiagnosed sleep apnoea, which dramatically increases the risk of breathing complications during and after anaesthesia. This condition affects 1 in 5 surgical patients but often goes undetected in routine pre-operative assessments."
    },
    {
      title: "Medication Stacking Effects",
      content: "Common medications and supplements can interact dangerously with anaesthetic drugs. Even herbal supplements like St. John's Wort or Ginkgo can cause serious complications. These interactions account for 15% of anaesthetic emergencies."
    },
    {
      title: "Hidden Alcohol Tolerance",
      content: "Regular alcohol consumption changes how your body processes anaesthetic drugs, requiring different dosing strategies. Many patients underreport their drinking, leading to inadequate anaesthesia or dangerous overdosing during surgery."
    },
    {
      title: "Difficult Airway Anatomy",
      content: "Certain physical characteristics can make it difficult to secure your airway during surgery. These factors aren't always obvious during consultations but can lead to life-threatening complications if not identified beforehand."
    },
    {
      title: "Stress-Related Heart Issues",
      content: "The stress of surgery can unmask hidden heart problems that don't show up in routine testing. These stress-induced cardiac events are responsible for some of the most serious anaesthetic complications."
    },
    {
      title: "Allergy Cross-Reactions",
      content: "Food allergies, environmental sensitivities, and previous drug reactions can indicate potential anaesthetic allergies. The immune system can react unpredictably under the stress of surgery, making screening crucial."
    },
    {
      title: "Substance Withdrawal Risks",
      content: "Sudden cessation of substances (including prescription medications, caffeine, or nicotine) during the surgical period can cause dangerous withdrawal effects that interact with anaesthesia."
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
              <Badge variant="outline">Safety Critical</Badge>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6">
              7 Anaesthesia Risks Your Doctor Might Not Screen For
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Standard pre-operative assessments miss critical risk factors that could cause dangerous complications during surgery. Here's what you need to know to ensure your anaesthetic safety.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Anaesthetic complications are rare, but when they occur, they can be life-threatening. Many of these complications are preventable when risk factors are identified and addressed before surgery. Unfortunately, standard pre-operative screenings often miss subtle but significant indicators that could spell the difference between a safe procedure and a medical emergency.
          </p>
        </div>

        {/* Anaesthesia Risks List */}
        <div className="space-y-8 mb-12">
          {anaesthesiaRisks.map((risk, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg">{risk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{risk.content}</p>
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
                These anaesthetic risks are more common than many healthcare providers realize, but they're entirely manageable when identified early. The key is comprehensive screening that goes beyond basic medical history to examine lifestyle factors, medication interactions, and subtle anatomical variations that could impact your anaesthetic safety.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4">Don't Risk Your Anaesthetic Safety</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These hidden risk factors could be present in your medical profile right now. Our Anaesthesia Risk Screener provides comprehensive assessment beyond standard pre-operative checks to ensure your complete safety.
            </p>
            <div className="space-y-4">
              <Button onClick={() => window.location.hash = 'anaesthesia-risk-screener-learn-more'} size="lg" className="px-8">
                Get Your Safety Screening
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Comprehensive screening • Expert analysis • Complete peace of mind
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}