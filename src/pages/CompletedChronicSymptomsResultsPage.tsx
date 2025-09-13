import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, Clock, BarChart3, Target, BookOpen, Shield, Heart, Activity, Zap, Apple, Brain, Users, Thermometer, Pill, Battery, Stethoscope, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function CompletedChronicSymptomsResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Completed Chronic Symptoms Bundle";
  const assessmentType = "Comprehensive 5-Assessment Chronic Symptom Management Bundle";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallSymptomScore = 69;
  const symptomLevel = "Moderate Management";

  const results: AssessmentResult[] = [
    {
      category: "Symptom Severity Index",
      score: 68,
      maxScore: 100,
      level: "moderate",
      description: "Moderate symptom burden with regular daily impact and manageable but persistent pain and fatigue patterns requiring ongoing attention and optimization strategies.",
      recommendations: [
        "Implement structured symptom tracking to identify patterns and triggers",
        "Consider pain management techniques including heat therapy and gentle movement",
        "Explore stress reduction strategies to minimize symptom flare-ups",
        "Discuss current treatment effectiveness with your healthcare provider"
      ]
    },
    {
      category: "Inflammation Risk Assessment",
      score: 74,
      maxScore: 100,
      level: "moderate",
      description: "Moderate inflammation risk with several modifiable lifestyle factors. Diet and stress management improvements could significantly reduce inflammatory burden.",
      recommendations: [
        "Adopt anti-inflammatory dietary patterns with omega-3 rich foods",
        "Reduce consumption of processed foods and added sugars",
        "Implement stress management techniques such as meditation or yoga",
        "Optimize sleep quality to reduce inflammatory markers",
        "Consider elimination diet to identify food triggers"
      ]
    },
    {
      category: "Medication Burden Analysis",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Well-managed medication regimen with good adherence and minimal side effects. Current medication strategy appears optimal with room for minor refinements.",
      recommendations: [
        "Continue current medication adherence practices",
        "Regular medication reviews with healthcare provider to optimize effectiveness",
        "Monitor for any new side effects or interactions",
        "Consider medication timing optimization for better symptom control",
        "Explore opportunities to simplify regimen where medically appropriate"
      ]
    },
    {
      category: "Daily Energy Profile",
      score: 58,
      maxScore: 100,
      level: "low",
      description: "Significant energy challenges with pronounced fatigue patterns affecting daily function. Multiple factors contributing to energy depletion require comprehensive intervention.",
      recommendations: [
        "Establish consistent sleep schedule with 7-9 hours nightly",
        "Implement energy pacing strategies throughout the day",
        "Consider B-vitamin and iron level assessment",
        "Reduce caffeine dependence gradually with alternative energy strategies",
        "Plan high-energy activities during your optimal energy windows",
        "Explore underlying causes of fatigue with healthcare provider"
      ]
    },
    {
      category: "Lifestyle Impact Assessment",
      score: 63,
      maxScore: 100,
      level: "moderate",
      description: "Moderate lifestyle limitations with notable impact on work, social, and physical activities. Adaptive strategies could significantly improve quality of life.",
      recommendations: [
        "Develop workplace accommodations to reduce symptom impact",
        "Create modified exercise routine appropriate for current limitations",
        "Build support network for challenging days and flare-ups",
        "Plan social activities around energy levels and symptom patterns",
        "Explore assistive devices or modifications to maintain independence"
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
      case 'Symptom Severity Index': return <Thermometer className="h-4 w-4" />;
      case 'Inflammation Risk Assessment': return <Heart className="h-4 w-4" />;
      case 'Medication Burden Analysis': return <Pill className="h-4 w-4" />;
      case 'Daily Energy Profile': return <Battery className="h-4 w-4" />;
      case 'Lifestyle Impact Assessment': return <Users className="h-4 w-4" />;
      default: return <Stethoscope className="h-4 w-4" />;
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
              Completed on {completionDate} • Complete 5-assessment chronic symptom management bundle
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2 text-orange-600">{overallSymptomScore}%</div>
                <p className="text-muted-foreground mb-2">Overall Symptom Management Score</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="default" className="bg-orange-100 text-orange-800">
                    {symptomLevel}
                  </Badge>
                  <span className="text-muted-foreground">Comprehensive chronic symptom evaluation</span>
                </div>
              </div>
              <Progress value={69} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your comprehensive chronic symptoms bundle reveals moderate management opportunities across all critical symptom domains, with clear paths for optimization.
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
            Management Plan
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
            {/* Comprehensive Symptom Profile Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Chronic Symptom Profile Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis based on your 50-question comprehensive assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Symptom Severity Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Primary Symptoms:</span>
                        <span className="font-medium">Chronic pain, fatigue</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pain Intensity:</span>
                        <span className="font-medium text-yellow-600">Moderate (4-6/10)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Symptom Frequency:</span>
                        <span className="font-medium">Daily</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Flare Pattern:</span>
                        <span className="font-medium">Weekly episodes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Modifiable Risk Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Diet Quality:</span>
                        <span className="font-medium text-yellow-600">Mixed diet</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stress Level:</span>
                        <span className="font-medium text-yellow-600">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Quality:</span>
                        <span className="font-medium text-yellow-600">Fair</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exercise Status:</span>
                        <span className="font-medium text-green-600">Regular moderate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Medical Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Medication & Energy Pattern Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Medication Profile</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Good adherence</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>3-5 medications</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Minimal side effects</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Energy Patterns</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Morning Energy:</span>
                        <span className="font-medium text-red-600">Low</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Afternoon Crashes:</span>
                        <span className="font-medium text-red-600">Frequent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Duration:</span>
                        <span className="font-medium text-yellow-600">5-6 hours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Healing Factors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Symptom Recovery:</span>
                        <span className="font-medium text-yellow-600">Moderate pace</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support System:</span>
                        <span className="font-medium text-green-600">Good support</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stress Impact:</span>
                        <span className="font-medium text-yellow-600">Moderate effect</span>
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
                  <span>Your Symptom Management vs Typical Patient Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your comprehensive symptom management compares to typical chronic symptom patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-left font-medium mb-[50px] mt-[0px] mr-[0px] ml-[0px]">{result.category}</h3>
                      
                      <div className="relative max-w-lg mx-auto">
                        {(() => {
                          const rangeStart = 30;
                          const rangeEnd = 90;
                          const rangeSize = rangeEnd - rangeStart;
                          
                          const yourScorePosition = ((result.score - rangeStart) / rangeSize) * 100;
                          const averagePosition = ((55 - rangeStart) / rangeSize) * 100;
                          const optimalPosition = ((80 - rangeStart) / rangeSize) * 100;
                          
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
                                    <div className="text-sm font-medium">55%</div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Typical Patient</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">80%</div>
                                    <div className="text-xs text-muted-foreground">Optimal Management</div>
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
                        <span>Symptom Assessment</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description} Optimizing this area can significantly enhance your symptom management and quality of life.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Management Strategies</h4>
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
                <CardTitle>Personalized Symptom Management Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to optimize all aspects of your chronic symptom management and quality of life
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
                <CardTitle>Next Steps for Symptom Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Focus on Priority Areas</h4>
                    <p className="text-sm text-muted-foreground">Address the symptom management factors where you scored lowest for maximum quality of life improvement.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Coordinate with Healthcare Team</h4>
                    <p className="text-sm text-muted-foreground">Share these results with your healthcare providers for personalized chronic symptom management optimization.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Consider Chronic Symptom Protocol</h4>
                    <p className="text-sm text-muted-foreground">Our comprehensive 21-day Chronic Symptom Protocol provides structured management for optimal outcomes.</p>
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
            Management Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-feedback'} size="lg" className="px-8">
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
                  This comprehensive chronic symptom assessment provides insights into management patterns but does not replace medical evaluation. 
                  Consult your healthcare team for comprehensive symptom assessment and personalized treatment planning.
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
                <AccordionItem value="symptom-severity">
                  <AccordionTrigger className="text-sm font-medium">
                    Symptom Severity Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Pain Medicine: Chronic pain assessment and management protocols</li>
                      <li>• Journal of Pain Research: Symptom severity measurement tools</li>
                      <li>• Clinical Journal of Pain: Pain intensity and quality of life correlations</li>
                      <li>• European Journal of Pain: Chronic symptom burden assessment</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inflammation-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Inflammation & Energy Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Reviews Immunology: Inflammation and chronic disease</li>
                      <li>• Journal of Clinical Medicine: Anti-inflammatory interventions</li>
                      <li>• Sleep Medicine Reviews: Energy patterns and fatigue assessment</li>
                      <li>• Fatigue: Biomedicine, Health & Behavior: Energy optimization strategies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medication-lifestyle">
                  <AccordionTrigger className="text-sm font-medium">
                    Medication & Lifestyle Impact
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Clinical Therapeutics: Medication burden assessment</li>
                      <li>• Quality of Life Research: Chronic illness impact measurement</li>
                      <li>• Journal of Occupational Rehabilitation: Work limitation assessment</li>
                      <li>• Social Science & Medicine: Social impact of chronic conditions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This comprehensive chronic symptom bundle is based on validated pain and symptom management research. Results are for informational purposes and should not replace professional medical evaluation. Individual symptom patterns may vary based on condition type, medical history, and factors not captured in this assessment.
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
  );
}