import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Battery, BarChart3, Clock, Target, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'excellent';
  description: string;
  recommendations: string[];
}

export function DailyEnergyResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Daily Energy Audit";
  const assessmentType = "Comprehensive Energy & Stamina Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 68; // Higher scores indicate better energy management

  const results: AssessmentResult[] = [
    {
      category: "Sleep Quality & Recovery",
      score: 72,
      maxScore: 100,
      level: "high",
      description: "Your sleep patterns are generally good but have room for optimization to maximize energy restoration.",
      recommendations: [
        "Maintain consistent sleep and wake times, even on weekends",
        "Create a wind-down routine 1 hour before bedtime",
        "Consider optimizing your sleep environment (temperature, darkness, quiet)"
      ]
    },
    {
      category: "Energy Pattern Stability",
      score: 58,
      maxScore: 100,
      level: "moderate",
      description: "You experience some energy fluctuations throughout the day that could be better managed.",
      recommendations: [
        "Implement regular meal timing to stabilize blood sugar",
        "Take brief walking breaks every 2 hours during work",
        "Consider strategic light exposure in the morning"
      ]
    },
    {
      category: "Stress & Recovery Balance",
      score: 45,
      maxScore: 100,
      level: "moderate",
      description: "Stress levels are impacting your energy reserves and recovery capacity.",
      recommendations: [
        "Practice daily stress management techniques (meditation, deep breathing)",
        "Schedule regular breaks and recovery periods",
        "Consider stress-reduction activities like yoga or nature walks"
      ]
    },
    {
      category: "Nutritional Energy Support",
      score: 75,
      maxScore: 100,
      level: "high",
      description: "Your nutrition patterns generally support stable energy, with minor optimization opportunities.",
      recommendations: [
        "Include protein with each meal to maintain stable blood sugar",
        "Stay consistently hydrated throughout the day",
        "Consider timing carbohydrates around physical activity"
      ]
    }
  ];

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'badge-level-optimal';
      case 'high': return 'badge-level-low';
      case 'moderate': return 'badge-level-moderate';
      case 'low': return 'badge-level-high';
      default: return 'badge-level-moderate';
    }
  };

  const getScoreBadgeVariant = (level: string) => {
    // Using outline variant for all badges since color is handled by CSS classes
    return 'outline';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'excellent': return <CheckCircle2 className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getOverallRating = (score: number) => {
    if (score >= 85) return { rating: 'Excellent Energy', level: 'excellent' };
    if (score >= 70) return { rating: 'Good Energy', level: 'high' };
    if (score >= 55) return { rating: 'Moderate Energy', level: 'moderate' };
    return { rating: 'Low Energy', level: 'low' };
  };

  const overallRating = getOverallRating(overallScore);

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  return (
                  <PaymentGate requiredFunnel="energy">

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
              Completed on {completionDate} • {results.length} energy factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{overallScore}%</div>
                <Badge variant={getScoreBadgeVariant(overallRating.level)} className="mb-4">
                  {overallRating.rating}
                </Badge>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your energy optimization assessment identifies key factors affecting your daily energy and stamina levels.
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
            Energy Optimization
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
                      <Badge variant={getScoreBadgeVariant(result.level)}>
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
                  <span>Your Energy Profile vs Population Averages</span>
                </CardTitle>
                <CardDescription>
                  How your energy optimization scores compare to general population benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-4">
                      {/* Category Title */}
                      <h3 className="text-left font-medium mb-6 px-[0px] py-[10px] pt-[0px] pr-[0px] pb-[35px] pl-[0px]">{result.category}</h3>
                      
                      {/* Chart */}
                      <div className="relative max-w-lg mx-auto">
                        {(() => {
                          // Calculate dynamic range
                          const rangeStart = Math.max(0, 60 - 20); // Average around 60
                          const rangeEnd = 100;
                          const rangeSize = rangeEnd - rangeStart;
                          
                          // Convert actual percentages to display percentages within our range
                          const yourScorePosition = ((result.score - rangeStart) / rangeSize) * 100;
                          const averagePosition = ((60 - rangeStart) / rangeSize) * 100; // Average population
                          const optimalPosition = ((85 - rangeStart) / rangeSize) * 100; // Optimal energy level
                          
                          return (
                            <>
                              {/* Your Score Label Above */}
                              <div 
                                className="absolute -top-14 transform -translate-x-1/2 text-center"
                                style={{ left: `${yourScorePosition}%` }}
                              >
                                <div className="text-xs text-muted-foreground mb-1">Your score</div>
                                <div className="text-sm font-medium">{result.score}%</div>
                              </div>

                              {/* Main bar */}
                              <div className="relative h-2 bg-gray-300 rounded-full p-[0px] m-[0px]">
                                {/* Your score fill */}
                                <div 
                                  className="absolute left-0 top-0 h-full bg-black transition-all duration-1000 ease-out rounded-full"
                                  style={{ width: `${yourScorePosition}%` }}
                                />
                                
                                {/* Benchmark markers - white lines on the bar */}
                                <div 
                                  className="absolute top-0 h-full w-0.5 bg-white rounded-full"
                                  style={{ left: `${averagePosition}%` }}
                                />
                                <div 
                                  className="absolute top-0 h-full w-0.5 bg-white rounded-full"
                                  style={{ left: `${optimalPosition}%` }}
                                />
                              </div>

                              {/* Labels */}
                              <div className="relative mt-3 h-12">
                                {/* Always show labels unless they would really overlap */}
                                {Math.abs(averagePosition - yourScorePosition) > 8 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${averagePosition}%` }}
                                  >
                                    <div className="text-sm font-medium">60%</div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Average Energy</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">85%</div>
                                    <div className="text-xs text-muted-foreground">Optimal Energy</div>
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
                    
                    {/* Clinical Context */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Energy Assessment</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description} Understanding and optimizing this area can lead to significant improvements in your overall daily energy and performance levels.
                      </p>
                    </div>

                    {/* Recommendations Preview */}
                    <div>
                      <h4 className="font-medium mb-2">Key Optimization Strategies</h4>
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
                <CardTitle>Personalized Energy Optimization Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to maximize your daily energy and stamina
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
                      <h4 className="font-medium">Start with High-Impact Changes</h4>
                      <p className="text-sm text-muted-foreground">Focus on the recommendations for your lowest-scoring areas first for maximum energy gains.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Track Energy Patterns</h4>
                      <p className="text-sm text-muted-foreground">Monitor your energy levels and sleep quality to measure improvement over time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Consider Comprehensive Support</h4>
                      <p className="text-sm text-muted-foreground">Our Chronic Symptom Protocol includes specialized energy management strategies and ongoing support.</p>
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
            Energy Optimization
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'daily-energy-audit-feedback'} size="lg" className="px-8">
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
                  This energy assessment provides insights into your daily patterns but does not diagnose medical conditions. 
                  Consult healthcare providers for persistent fatigue or significant energy concerns.
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
                <AccordionItem value="sleep-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Sleep Quality & Energy Restoration
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Sleep Society: Sleep hygiene and energy recovery guidelines</li>
                      <li>• NICE Guidelines: Sleep disorders and daytime functioning</li>
                      <li>• Sleep Medicine Reviews: Sleep quality and energy level research</li>
                      <li>• Journal of Clinical Sleep Medicine: Energy restoration studies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="circadian-rhythms">
                  <AccordionTrigger className="text-sm font-medium">
                    Circadian Rhythms & Energy Patterns
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Society for Chronobiology: Circadian rhythm research</li>
                      <li>• Nature Reviews Neuroscience: Circadian biology and energy metabolism</li>
                      <li>• Sleep and Biological Rhythms: Energy pattern optimization</li>
                      <li>• Current Biology: Circadian clock and energy homeostasis</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="nutrition-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Nutrition & Energy Metabolism
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Dietetic Association: Nutrition for energy optimization</li>
                      <li>• American Journal of Clinical Nutrition: Energy metabolism research</li>
                      <li>• European Journal of Clinical Nutrition: Diet and energy levels</li>
                      <li>• Nutrients Journal: Micronutrients and energy production</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exercise-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Physical Activity & Energy Balance
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Association of Sport and Exercise Medicine: Energy and exercise</li>
                      <li>• NHS: Physical activity guidelines for energy management</li>
                      <li>• Sports Medicine: Exercise and fatigue research</li>
                      <li>• Journal of Applied Physiology: Energy expenditure studies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stress-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Stress Management & Energy Conservation
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Psychological Society: Stress and energy depletion</li>
                      <li>• Stress and Health Journal: Energy conservation strategies</li>
                      <li>• Psychoneuroendocrinology: Stress hormones and energy metabolism</li>
                      <li>• Mindfulness Research: Energy restoration through stress reduction</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> All information provided is based on current UK medical guidelines and evidence-based medicine. 
                  Individual circumstances may vary, and professional medical advice should always be sought for specific health concerns.
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