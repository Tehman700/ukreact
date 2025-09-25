import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, BarChart3, Target, BookOpen, Activity } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function FunctionalFitnessAgeResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Functional Fitness Age Test";
  const assessmentType = "Comprehensive Movement & Physical Capability Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const functionalFitnessAge = 32;
  const chronologicalAge = 45;
  const fitnessLevel = "Excellent";

  const results: AssessmentResult[] = [
    {
      category: "Movement Quality",
      score: 85,
      maxScore: 100,
      level: "high",
      description: "Excellent movement patterns with good functional range of motion and minimal compensatory patterns.",
      recommendations: [
        "Continue mobility work to maintain current range of motion",
        "Focus on movement quality over quantity in exercise selection",
        "Incorporate dynamic warm-ups to enhance movement preparation"
      ]
    },
    {
      category: "Strength & Power",
      score: 78,
      maxScore: 100,
      level: "high",
      description: "Good overall strength levels with some opportunities for power development and muscular endurance improvement.",
      recommendations: [
        "Add explosive movement training to enhance power output",
        "Progressive overload in compound movements for strength gains",
        "Include unilateral exercises to address strength imbalances"
      ]
    },
    {
      category: "Balance & Coordination",
      score: 90,
      maxScore: 100,
      level: "optimal",
      description: "Outstanding balance and coordination indicating excellent neuromuscular control and proprioception.",
      recommendations: [
        "Maintain current balance training through varied activities",
        "Challenge coordination with complex movement patterns",
        "Continue single-leg and unstable surface exercises"
      ]
    },
    {
      category: "Cardiovascular Fitness",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Strong cardiovascular fitness with good endurance capacity and efficient recovery patterns.",
      recommendations: [
        "Incorporate high-intensity interval training for VO2 max improvement",
        "Maintain aerobic base through steady-state cardio",
        "Monitor heart rate variability for recovery optimization"
      ]
    },
    {
      category: "Flexibility & Mobility",
      score: 75,
      maxScore: 100,
      level: "moderate",
      description: "Adequate flexibility with some restrictions that could benefit from targeted mobility work.",
      recommendations: [
        "Daily mobility routine focusing on hip and shoulder flexibility",
        "Dynamic stretching before activity, static stretching after",
        "Consider soft tissue work like massage or foam rolling"
      ]
    }
  ];

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'optimal': return 'badge-level-optimal';
      case 'high': return 'badge-level-low';
      case 'moderate': return 'badge-level-moderate';
      case 'low': return 'badge-level-high';
      default: return 'badge-level-moderate';
    }
  };

  const getScoreBadgeVariant = (level: string) => {
    return 'outline';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'optimal': return <CheckCircle2 className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  return (
                        <PaymentGate requiredFunnel="functional">

    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleBackToAssessments}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-medium">Back</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Overall Score Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Assessment Complete</CardTitle>
            </div>
            <CardDescription>
              Completed on {completionDate} • {results.length} fitness factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2 text-green-600">{functionalFitnessAge}</div>
                <p className="text-muted-foreground mb-2">Your Functional Fitness Age</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {Math.abs(chronologicalAge - functionalFitnessAge)} years younger
                  </Badge>
                  <span className="text-muted-foreground">Chronological age: {chronologicalAge}</span>
                </div>
              </div>
              <Progress value={82} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your functional fitness assessment reveals excellent physical capability, performing {Math.abs(chronologicalAge - functionalFitnessAge)} years younger than your chronological age.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit mx-auto">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'detailed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('detailed');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Detailed Results
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('recommendations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Fitness Plan
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(result.level)}
                      <Badge variant={getScoreBadgeVariant(result.level)} className={getScoreColor(result.level)}>
                        {result.score}/{result.maxScore}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={(result.score / result.maxScore) * 100} />
                    <p className="text-sm text-muted-foreground">
                      {result.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-8">
            {/* Comparative Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Your Fitness Profile vs Age-Matched Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your physical capabilities compare to typical age-related fitness patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-left font-medium mb-[50px] mt-[0px] mr-[0px] ml-[0px]">{result.category}</h3>
                      
                      <div className="relative max-w-lg mx-auto">
                        {(() => {
                          const rangeStart = 40;
                          const rangeEnd = 100;
                          const rangeSize = rangeEnd - rangeStart;
                          
                          const yourScorePosition = ((result.score - rangeStart) / rangeSize) * 100;
                          const averagePosition = ((60 - rangeStart) / rangeSize) * 100;
                          const optimalPosition = ((90 - rangeStart) / rangeSize) * 100;
                          
                          return (
                            <>
                              <div 
                                className="absolute -top-14 transform -translate-x-1/2 text-center"
                                style={{ left: `${yourScorePosition}%` }}
                              >
                                <div className="text-xs text-muted-foreground mb-1">Your score</div>
                                <div className="text-sm font-medium">{result.score}%</div>
                              </div>

                              <div className="relative h-2 bg-gray-300 rounded-full">
                                <div 
                                  className="absolute left-0 top-0 h-full bg-black transition-all duration-1000 ease-out rounded-full"
                                  style={{ width: `${yourScorePosition}%` }}
                                />
                                
                                <div 
                                  className="absolute top-0 h-full w-0.5 bg-white rounded-full"
                                  style={{ left: `${averagePosition}%` }}
                                />
                                <div 
                                  className="absolute top-0 h-full w-0.5 bg-white rounded-full"
                                  style={{ left: `${optimalPosition}%` }}
                                />
                              </div>

                              <div className="relative mt-3 h-12">
                                {Math.abs(averagePosition - yourScorePosition) > 8 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${averagePosition}%` }}
                                  >
                                    <div className="text-sm font-medium">60%</div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Age Average</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">90%</div>
                                    <div className="text-xs text-muted-foreground">Peak Fitness</div>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Category Analysis */}
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {getLevelIcon(result.level)}
                        <span>{result.category}</span>
                      </CardTitle>
                      <CardDescription>Score: {result.score}/{result.maxScore} • Level: {result.level}</CardDescription>
                    </div>
                    <Badge variant={getScoreBadgeVariant(result.level)} className={getScoreColor(result.level)}>
                      {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Progress value={(result.score / result.maxScore) * 100} className="h-2" />
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Fitness Assessment</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description} Optimizing this area can significantly enhance your functional movement and slow age-related physical decline.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Fitness Strategies</h4>
                      <div className="space-y-2">
                        {result.recommendations.slice(0, 2).map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Functional Fitness Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to optimize movement quality and reverse functional aging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {results.map((result, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Badge variant={getScoreBadgeVariant(result.level)} className={getScoreColor(result.level)}>
                            {result.level}
                          </Badge>
                          <span>{result.category}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-4">
                          {result.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Focus on Lowest Scoring Areas</h4>
                      <p className="text-sm text-muted-foreground">Start with the fitness factors where you scored lowest for maximum age-reversal impact.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Track Movement Quality</h4>
                      <p className="text-sm text-muted-foreground">Monitor functional movements, strength gains, and flexibility improvements regularly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Consider Comprehensive Longevity Support</h4>
                      <p className="text-sm text-muted-foreground">Our Longevity Focus Protocol includes advanced movement optimization and ongoing physical performance support.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom Navigation Tabs */}
        <div className="flex space-x-1 mt-8 mb-6 bg-muted p-1 rounded-lg w-fit mx-auto">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'detailed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('detailed');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Detailed Results
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('recommendations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Fitness Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'functional-fitness-age-test-feedback'} size="lg" className="px-8">
              Next
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">Important Note</p>
                <p className="text-sm text-muted-foreground">
                  This functional fitness assessment provides insights into movement and physical capability patterns but does not diagnose medical conditions. 
                  Consult fitness professionals or physical therapists for comprehensive movement evaluation and personalized exercise programming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sources & References */}
        <Card className="mt-6 bg-background border-muted">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sources-references">
                  <AccordionTrigger className="font-medium hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Sources & References</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
              
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="movement-quality">
                  <AccordionTrigger className="text-sm font-medium">
                    Movement Quality Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Journal of Biomechanics: Functional movement screen validation studies</li>
                      <li>• Physical Therapy: Movement quality and injury prediction</li>
                      <li>• Sports Medicine: Movement assessment in aging populations</li>
                      <li>• Clinical Biomechanics: Age-related movement pattern changes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="strength-power">
                  <AccordionTrigger className="text-sm font-medium">
                    Strength & Power Development
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Journal of Strength and Conditioning: Age-related strength decline</li>
                      <li>• Scandinavian Journal of Medicine & Science: Power training adaptations</li>
                      <li>• European Journal of Applied Physiology: Neuromuscular aging</li>
                      <li>• American College of Sports Medicine: Resistance training guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="balance-coordination">
                  <AccordionTrigger className="text-sm font-medium">
                    Balance & Coordination
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Journal of Gerontology: Balance and fall risk assessment</li>
                      <li>• Gait & Posture: Postural control and aging</li>
                      <li>• Archives of Physical Medicine: Balance training interventions</li>
                      <li>• Clinical Neurophysiology: Proprioception and motor control</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="functional-fitness">
                  <AccordionTrigger className="text-sm font-medium">
                    Functional Fitness Optimization
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Medicine & Science in Sports: Functional fitness testing protocols</li>
                      <li>• Age and Ageing: Physical function and healthy aging</li>
                      <li>• Journal of Applied Physiology: Exercise and aging interventions</li>
                      <li>• International Journal of Behavioral Nutrition: Physical activity guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This functional fitness assessment is based on validated exercise science and movement research. Results are for informational purposes and should not replace professional fitness evaluation. Individual fitness capacity may vary based on genetics, medical history, and lifestyle factors not captured in this assessment.
                </p>
              </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
                    </PaymentGate>

  );
}