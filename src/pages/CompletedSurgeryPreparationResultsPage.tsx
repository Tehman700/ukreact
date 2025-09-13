import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, Clock, BarChart3, Target, BookOpen, Shield, Heart, Activity, Zap, Apple, Brain, Users, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function CompletedSurgeryPreparationResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Completed Surgery Preparation Bundle";
  const assessmentType = "Comprehensive 5-Assessment Surgical Preparation Bundle";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallReadinessScore = 82;
  const readinessLevel = "Well Prepared";

  const results: AssessmentResult[] = [
    {
      category: "Surgery Readiness Score",
      score: 85,
      maxScore: 100,
      level: "high",
      description: "Excellent overall preparation with strong foundational health, comprehensive pre-operative understanding, and appropriate anxiety management. Your elective procedure timing allows for optimal preparation.",
      recommendations: [
        "Continue current healthy lifestyle practices leading up to surgery",
        "Maintain open communication with surgical team about any concerns",
        "Complete any remaining pre-operative medical clearances and follow all instructions",
        "Use relaxation techniques to manage pre-surgical anxiety effectively"
      ]
    },
    {
      category: "Complication Risk Assessment",
      score: 72,
      maxScore: 100,
      level: "moderate",
      description: "Moderate complication risk profile with several factors requiring attention. Your medical history and lifestyle factors present manageable risks that can be optimized with targeted interventions.",
      recommendations: [
        "Optimize management of existing medical conditions with your healthcare team",
        "Address modifiable risk factors including smoking cessation if applicable",
        "Review all medications with anaesthesia team to minimize drug interactions",
        "Implement infection prevention strategies including optimal diabetes control",
        "Consider nutritional optimization if weight or nutrition status needs improvement"
      ]
    },
    {
      category: "Recovery Speed Prediction",
      score: 88,
      maxScore: 100,
      level: "high",
      description: "Excellent recovery potential supported by strong nutritional status, robust support systems, and optimal home environment. Your motivation and mental health status strongly favor rapid healing.",
      recommendations: [
        "Maintain protein intake of 1.5-2.0g per kg body weight for optimal healing",
        "Ensure adequate hydration with 8-10 glasses of water daily",
        "Coordinate with support team to prepare home environment for recovery",
        "Continue stress management and maintain positive mental health practices",
        "Plan work arrangements to allow adequate recovery time without financial stress"
      ]
    },
    {
      category: "Anaesthesia Risk Profile",
      score: 78,
      maxScore: 100,
      level: "moderate",
      description: "Generally favorable anaesthesia risk profile with some areas requiring attention. Sleep quality and respiratory function assessments suggest manageable risk factors.",
      recommendations: [
        "Address any sleep apnea symptoms with sleep specialist if indicated",
        "Optimize sleep hygiene in weeks leading up to surgery",
        "Discuss previous anaesthesia experiences in detail with anaesthesia team",
        "Continue respiratory health optimization and avoid respiratory irritants",
        "Ensure all substances and medications are disclosed to anaesthesia team"
      ]
    },
    {
      category: "Mobility & Strength Baseline",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Good baseline physical function with adequate strength and mobility. Minor limitations present but overall physical capacity supports successful post-operative rehabilitation.",
      recommendations: [
        "Continue current physical activity level as tolerated before surgery",
        "Practice specific pre-operative conditioning exercises for your surgery type",
        "Address any fall risk factors to ensure safe post-operative mobility",
        "Plan for assistive devices if needed during initial recovery period",
        "Establish baseline mobility measurements to track post-operative progress"
      ]
    },
    {
      category: "Nutritional Optimization",
      score: 85,
      maxScore: 100,
      level: "high",
      description: "Strong nutritional foundation with excellent protein intake and supplement use. Your current nutrition status strongly supports healing and recovery processes.",
      recommendations: [
        "Continue high-quality protein intake from diverse sources",
        "Maintain comprehensive vitamin and mineral supplementation",
        "Ensure optimal hydration status leading up to surgery",
        "Consider adding specific healing nutrients like Vitamin C and zinc if not already included"
      ]
    },
    {
      category: "Psychological Readiness",
      score: 79,
      maxScore: 100,
      level: "moderate",
      description: "Good psychological preparation with manageable anxiety levels and strong motivation. Some stress factors present but within normal range for surgical preparation.",
      recommendations: [
        "Continue practicing stress reduction and anxiety management techniques",
        "Maintain realistic expectations about recovery timeline and challenges",
        "Utilize support system effectively for emotional and practical needs",
        "Consider professional support if anxiety levels become overwhelming"
      ]
    },
    {
      category: "Support System Adequacy",
      score: 90,
      maxScore: 100,
      level: "optimal",
      description: "Excellent support network with comprehensive family, friend, and professional resources. Strong financial and logistical support ensures optimal recovery environment.",
      recommendations: [
        "Coordinate roles and responsibilities among support team members",
        "Ensure backup plans for transportation and care needs",
        "Communicate recovery expectations clearly with all support team members",
        "Utilize professional care services as planned for specialized needs"
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
      case 'Surgery Readiness Score': return <Shield className="h-4 w-4" />;
      case 'Complication Risk Assessment': return <AlertTriangle className="h-4 w-4" />;
      case 'Recovery Speed Prediction': return <Zap className="h-4 w-4" />;
      case 'Anaesthesia Risk Profile': return <Heart className="h-4 w-4" />;
      case 'Mobility & Strength Baseline': return <Activity className="h-4 w-4" />;
      case 'Nutritional Optimization': return <Apple className="h-4 w-4" />;
      case 'Psychological Readiness': return <Brain className="h-4 w-4" />;
      case 'Support System Adequacy': return <Users className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
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
              Completed on {completionDate} • Complete 5-assessment surgical preparation bundle
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2 text-green-600">{overallReadinessScore}%</div>
                <p className="text-muted-foreground mb-2">Overall Surgery Preparation Score</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {readinessLevel}
                  </Badge>
                  <span className="text-muted-foreground">Comprehensive surgical readiness evaluation</span>
                </div>
              </div>
              <Progress value={82} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your comprehensive surgery preparation bundle reveals excellent readiness across all critical surgical factors, positioning you for optimal outcomes.
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
            Preparation Plan
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
            {/* Comprehensive Risk Profile Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Surgical Risk Profile Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis based on your 40-question comprehensive assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Surgical Complexity Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Surgery Type:</span>
                        <span className="font-medium">Major Surgery</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgency Level:</span>
                        <span className="font-medium">Elective</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Previous Surgery History:</span>
                        <span className="font-medium">1-2 Previous</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complication History:</span>
                        <span className="font-medium">No Complications</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Modifiable Risk Factors</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Smoking Status:</span>
                        <span className="font-medium text-green-600">Never Smoked</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Status:</span>
                        <span className="font-medium text-yellow-600">Overweight</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alcohol Use:</span>
                        <span className="font-medium text-green-600">Light Drinking</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Infection Risk:</span>
                        <span className="font-medium text-green-600">Low Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Medical Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Medical History & Comorbidity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Chronic Conditions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Hypertension (controlled)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Type 2 Diabetes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>No heart disease</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Medication Profile</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Medications:</span>
                        <span className="font-medium">3-5 medications</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blood Thinners:</span>
                        <span className="font-medium">Aspirin only</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interaction Risk:</span>
                        <span className="font-medium text-green-600">Low</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Healing Factors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Wound Healing:</span>
                        <span className="font-medium text-green-600">Normal pace</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Family History:</span>
                        <span className="font-medium text-green-600">No complications</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Allergies:</span>
                        <span className="font-medium">Medication allergies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recovery Environment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Recovery Environment & Support Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Nutritional Foundation</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Overall Nutrition:</span>
                        <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Protein Intake:</span>
                        <Badge className="bg-green-100 text-green-800">High</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Supplementation:</span>
                        <Badge className="bg-green-100 text-green-800">Comprehensive</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hydration:</span>
                        <Badge className="bg-green-100 text-green-800">Well hydrated</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Support Network</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Strong family support</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Adequate financial resources</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Reliable transportation</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Employer support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anaesthesia Risk Detailed Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Anaesthesia Risk Factor Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Respiratory Assessment</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Sleep Quality:</span>
                        <span className="font-medium text-green-600">Good sleep</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Apnea Risk:</span>
                        <span className="font-medium text-yellow-600">Minor snoring</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Breathing Issues:</span>
                        <span className="font-medium text-green-600">None reported</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Previous Anaesthesia:</span>
                        <span className="font-medium text-green-600">Good tolerance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Cardiovascular Profile</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Heart Rhythm:</span>
                        <span className="font-medium text-green-600">Regular</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blood Pressure:</span>
                        <span className="font-medium text-green-600">Controlled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Substance Use:</span>
                        <span className="font-medium text-green-600">None</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical Function & Mobility */}
            <Card>
              <CardHeader>
                <CardTitle>Physical Function & Mobility Baseline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Current Activity Level</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Exercise Frequency:</span>
                        <span className="font-medium text-green-600">Moderately active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Strength Level:</span>
                        <span className="font-medium text-green-600">Good strength</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mobility Issues:</span>
                        <span className="font-medium text-yellow-600">Minor joint pain</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Safety Assessment</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Fall Risk:</span>
                        <span className="font-medium text-green-600">Low risk</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home Environment:</span>
                        <span className="font-medium text-green-600">Good setup</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assistive Devices:</span>
                        <span className="font-medium text-green-600">Not needed</span>
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
                  <span>Your Surgical Preparation vs Typical Patient Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your comprehensive preparation compares to typical surgical patient readiness
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
                          const averagePosition = ((65 - rangeStart) / rangeSize) * 100;
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
                                    <div className="text-sm font-medium">65%</div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Typical Patient</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">90%</div>
                                    <div className="text-xs text-muted-foreground">Optimal Preparation</div>
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
                        <span>Surgical Assessment</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description} Optimizing this area can significantly enhance your surgical outcome and recovery experience.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Preparation Strategies</h4>
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
                <CardTitle>Personalized Surgical Preparation Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to optimize all aspects of your surgical preparation and recovery
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
                <CardTitle>Next Steps for Surgical Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium">Focus on Priority Areas</h4>
                        <p className="text-sm text-muted-foreground">Address the surgical preparation factors where you scored lowest for maximum risk reduction.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium">Coordinate with Surgical Team</h4>
                        <p className="text-sm text-muted-foreground">Share these results with your surgeon and anaesthetist for personalized pre-operative optimization.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium">Consider Surgery Conditioning Protocol</h4>
                        <p className="text-sm text-muted-foreground">Our comprehensive 14-day Surgery Conditioning Protocol provides structured preparation for optimal outcomes.</p>
                      </div>
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
            Preparation Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-feedback'} size="lg" className="px-8">
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
                  This comprehensive surgical preparation assessment provides insights into readiness patterns but does not replace medical evaluation. 
                  Consult your surgical team and anaesthetist for comprehensive pre-operative assessment and personalized surgical planning.
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
                <AccordionItem value="surgery-readiness">
                  <AccordionTrigger className="text-sm font-medium">
                    Surgery Readiness Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Journal of Surgery: Pre-operative optimization strategies</li>
                      <li>• Anesthesia & Analgesia: Patient readiness for elective surgery</li>
                      <li>• Surgery: Risk stratification and preparation protocols</li>
                      <li>• Journal of Perioperative Medicine: Evidence-based pre-operative care</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="complication-risk">
                  <AccordionTrigger className="text-sm font-medium">
                    Complication Risk Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Lancet: Surgical risk assessment and prevention strategies</li>
                      <li>• Annals of Surgery: Modifiable risk factors for complications</li>
                      <li>• BMJ: Perioperative risk reduction interventions</li>
                      <li>• European Journal of Anaesthesiology: Risk prediction models</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recovery-prediction">
                  <AccordionTrigger className="text-sm font-medium">
                    Recovery Speed & Anaesthesia Risk
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Journal of Anaesthesia: Recovery prediction factors</li>
                      <li>• Anaesthesia: Risk assessment and safety protocols</li>
                      <li>• Current Opinion in Anaesthesiology: Recovery optimization</li>
                      <li>• Journal of Clinical Anesthesia: Perioperative safety guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mobility-strength">
                  <AccordionTrigger className="text-sm font-medium">
                    Mobility & Strength Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Physical Therapy: Pre-operative physical assessment</li>
                      <li>• Archives of Physical Medicine: Baseline function measurement</li>
                      <li>• Journal of Rehabilitation Medicine: Post-surgical mobility prediction</li>
                      <li>• Clinical Rehabilitation: Strength assessment protocols</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This comprehensive surgical preparation bundle is based on validated surgical and anaesthetic research. Results are for informational purposes and should not replace professional surgical evaluation. Individual surgical risks may vary based on procedure type, medical history, and factors not captured in this assessment.
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