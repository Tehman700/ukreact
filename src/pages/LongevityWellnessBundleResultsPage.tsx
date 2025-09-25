import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, Heart, Activity, Zap, Apple, Brain, BarChart3, Target, BookOpen, Users, Calendar } from 'lucide-react';
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

export function LongevityWellnessBundleResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "The Complete Longevity Bundle";
  const assessmentType = "Comprehensive 5-Assessment Longevity Optimization Bundle";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallLongevityScore = 78;
  const longevityLevel = "Well Optimized";

  const results: AssessmentResult[] = [
    {
      category: "Biological Age Analysis",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Excellent biological markers indicating slower than average aging process. Your cellular health, energy levels, and recovery patterns suggest optimal longevity potential with current lifestyle practices.",
      recommendations: [
        "Continue current anti-aging lifestyle practices and healthy habits",
        "Consider advanced biomarker testing for deeper insights into cellular health",
        "Maintain consistent sleep schedule and stress management techniques",
        "Focus on maintaining muscle mass and metabolic health as you age"
      ]
    },
    {
      category: "Cardiometabolic Health Assessment",
      score: 76,
      maxScore: 100,
      level: "high",
      description: "Strong cardiovascular and metabolic health with low disease risk. Blood pressure, cholesterol, and blood sugar indicators show good optimization with room for minor improvements.",
      recommendations: [
        "Maintain regular cardiovascular exercise routine",
        "Continue heart-healthy diet with emphasis on omega-3 fatty acids",
        "Monitor blood pressure and cholesterol levels annually",
        "Consider Mediterranean-style eating pattern for optimal heart health"
      ]
    },
    {
      category: "Resilience Index",
      score: 74,
      maxScore: 100,
      level: "moderate",
      description: "Good mental and physical resilience with effective stress management capabilities. Some areas for improvement in adaptability and social support systems.",
      recommendations: [
        "Develop additional stress management techniques like meditation or yoga",
        "Strengthen social connections and support networks",
        "Practice resilience-building activities and mindfulness",
        "Consider working with a mental health professional for optimization"
      ]
    },
    {
      category: "Nutrition & Body Composition",
      score: 80,
      maxScore: 100,
      level: "high",
      description: "Excellent nutritional habits and healthy body composition supporting longevity goals. Well-balanced approach to nutrition with high-quality food choices.",
      recommendations: [
        "Continue current balanced nutrition approach",
        "Consider periodic nutritional assessments to optimize micronutrient levels",
        "Maintain adequate protein intake to preserve muscle mass",
        "Stay hydrated and limit processed food consumption"
      ]
    },
    {
      category: "Functional Fitness Age",
      score: 75,
      maxScore: 100,
      level: "high",
      description: "Strong functional fitness capabilities with good strength, flexibility, and endurance. Your physical capacity suggests a younger functional age than chronological age.",
      recommendations: [
        "Continue regular strength training to maintain muscle mass",
        "Incorporate flexibility and mobility work into routine",
        "Add balance and coordination exercises to prevent falls",
        "Gradually increase exercise intensity to maintain cardiovascular fitness"
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Biological Age Analysis': return <Clock className="h-4 w-4" />;
      case 'Cardiometabolic Health Assessment': return <Heart className="h-4 w-4" />;
      case 'Resilience Index': return <Zap className="h-4 w-4" />;
      case 'Nutrition & Body Composition': return <Apple className="h-4 w-4" />;
      case 'Functional Fitness Age': return <Activity className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
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
            <PaymentGate requiredFunnel="longevity">

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
              Completed on {completionDate} • Complete 5-assessment longevity optimization bundle
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2 text-blue-600">{overallLongevityScore}%</div>
                <p className="text-muted-foreground mb-2">Overall Longevity Optimization Score</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {longevityLevel}
                  </Badge>
                  <span className="text-muted-foreground">Comprehensive longevity evaluation</span>
                </div>
              </div>
              <Progress value={78} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your comprehensive longevity bundle reveals excellent optimization potential across all critical longevity domains, positioning you for healthy aging.
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
            Optimization Plan
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      {getCategoryIcon(result.category)}
                      <span>{result.category}</span>
                    </CardTitle>
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
            {/* Comprehensive Longevity Profile Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Longevity Optimization Profile Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis based on your 60-question comprehensive assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Aging & Longevity Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Biological Age:</span>
                        <span className="font-medium text-green-600">5 years younger</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cellular Health:</span>
                        <span className="font-medium text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recovery Patterns:</span>
                        <span className="font-medium text-green-600">Optimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Energy Levels:</span>
                        <span className="font-medium text-green-600">High</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Modifiable Optimization Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Cardiovascular Health:</span>
                        <span className="font-medium text-green-600">Strong</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Metabolic Function:</span>
                        <span className="font-medium text-green-600">Optimized</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stress Resilience:</span>
                        <span className="font-medium text-yellow-600">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Physical Capacity:</span>
                        <span className="font-medium text-green-600">Above average</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Health Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrition & Lifestyle Pattern Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Nutritional Foundation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>High-quality diet</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Optimal protein intake</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Good hydration</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Fitness Patterns</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Strength Training:</span>
                        <span className="font-medium text-green-600">Regular</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cardiovascular Fitness:</span>
                        <span className="font-medium text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Flexibility/Mobility:</span>
                        <span className="font-medium text-yellow-600">Good</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Longevity Factors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sleep Quality:</span>
                        <span className="font-medium text-green-600">Optimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stress Management:</span>
                        <span className="font-medium text-green-600">Good practices</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Connections:</span>
                        <span className="font-medium text-yellow-600">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparative Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Your Longevity Optimization vs Typical Age-Matched Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your comprehensive longevity optimization compares to typical age-matched individuals
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
                          const optimalPosition = ((85 - rangeStart) / rangeSize) * 100;
                          
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
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Typical Individual</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">85%</div>
                                    <div className="text-xs text-muted-foreground">Optimal Longevity</div>
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
                        {getCategoryIcon(result.category)}
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
                        <span>Longevity Assessment</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description} Optimizing this area can significantly enhance your longevity potential and healthy aging trajectory.
                      </p>
                    </div>

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
                <CardTitle>Personalized Longevity Optimization Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to optimize all aspects of your longevity potential and healthy aging trajectory
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
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(result.category)}
                            <span>{result.category}</span>
                          </div>
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
                <CardTitle>Next Steps for Longevity Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Focus on Priority Areas</h4>
                    <p className="text-sm text-muted-foreground">Address the longevity optimization factors where you scored lowest for maximum healthspan extension.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Coordinate with Healthcare Team</h4>
                    <p className="text-sm text-muted-foreground">Share these results with your healthcare providers for personalized longevity and anti-aging optimization.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Consider Longevity Focus Protocol</h4>
                    <p className="text-sm text-muted-foreground">Our comprehensive 30-day Longevity Focus Protocol provides structured optimization for optimal aging outcomes.</p>
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
            Optimization Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'longevity-wellness-bundle-feedback'} size="lg" className="px-8">
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
                  This comprehensive longevity optimization assessment provides insights into aging patterns but does not replace medical evaluation. 
                  Consult your healthcare team for comprehensive longevity assessment and personalized anti-aging planning.
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
                <AccordionItem value="biological-age">
                  <AccordionTrigger className="text-sm font-medium">
                    Biological Age & Longevity Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Aging: Biological age measurement and validation studies</li>
                      <li>• Science: Cellular aging and biomarker research</li>
                      <li>• Aging Cell: Longevity interventions and outcomes</li>
                      <li>• Journal of Gerontology: Age acceleration and health span</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cardiometabolic-resilience">
                  <AccordionTrigger className="text-sm font-medium">
                    Cardiometabolic Health & Resilience
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Circulation: Cardiovascular health and longevity research</li>
                      <li>• Diabetes Care: Metabolic health optimization strategies</li>
                      <li>• Psychological Science: Resilience and stress adaptation</li>
                      <li>• Psychoneuroendocrinology: Mind-body longevity connections</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="nutrition-fitness">
                  <AccordionTrigger className="text-sm font-medium">
                    Nutrition & Functional Fitness
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• American Journal of Clinical Nutrition: Longevity nutrition patterns</li>
                      <li>• Journal of Aging Research: Body composition and aging</li>
                      <li>• Sports Medicine: Functional fitness and aging</li>
                      <li>• Exercise and Sport Sciences Reviews: Physical capacity assessment</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This comprehensive longevity optimization bundle is based on validated aging and longevity research. Results are for informational purposes and should not replace professional medical evaluation. Individual aging patterns may vary based on genetics, medical history, and factors not captured in this assessment.
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