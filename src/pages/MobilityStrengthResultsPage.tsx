import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Activity, Target, BookOpen, BarChart3, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
// Using custom CSS charts instead of Recharts for better reliability
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function MobilityStrengthResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Mobility & Strength Assessment";
  const assessmentType = "Physical Baseline Evaluation";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 79;

  const results: AssessmentResult[] = [
    {
      category: "Cardiovascular Endurance",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Your walking ability and endurance indicate good cardiovascular fitness for recovery.",
      recommendations: [
        "Maintain current walking routine before surgery",
        "Gradually increase distance as tolerated",
        "Focus on consistent daily activity rather than intensity"
      ]
    },
    {
      category: "Lower Body Strength",
      score: 88,
      maxScore: 100,
      level: "optimal",
      description: "Excellent lower body strength provides a strong foundation for post-surgical mobility.",
      recommendations: [
        "Continue current strength-building activities",
        "Practice chair exercises to maintain strength",
        "Focus on maintaining muscle mass before surgery"
      ]
    },
    {
      category: "Balance & Stability",
      score: 75,
      maxScore: 100,
      level: "moderate",
      description: "Your balance is adequate but could benefit from improvement to reduce fall risk.",
      recommendations: [
        "Practice single-leg stands daily (hold onto chair)",
        "Consider tai chi or yoga classes",
        "Ensure home safety with grab bars and good lighting"
      ]
    },
    {
      category: "Functional Strength",
      score: 80,
      maxScore: 100,
      level: "high",
      description: "Good grip strength and functional capacity support independent recovery.",
      recommendations: [
        "Maintain grip strength with stress ball exercises",
        "Practice activities of daily living",
        "Keep hands and wrists flexible with gentle stretching"
      ]
    },
    {
      category: "Independence Level",
      score: 85,
      maxScore: 100,
      level: "optimal",
      description: "High level of independence in daily activities suggests excellent recovery potential.",
      recommendations: [
        "Maintain current activity levels",
        "Plan for temporary assistance during recovery",
        "Focus on activities you can continue post-surgery"
      ]
    },
    {
      category: "Pain Management",
      score: 70,
      maxScore: 100,
      level: "moderate",
      description: "Current pain or stiffness may impact recovery but is manageable with proper planning.",
      recommendations: [
        "Develop pain management strategies with healthcare provider",
        "Learn gentle stretching and mobility exercises",
        "Consider physical therapy consultation before surgery"
      ]
    },
    {
      category: "Activity Baseline",
      score: 78,
      maxScore: 100,
      level: "high",
      description: "Your regular activity level provides a good foundation for post-surgical rehabilitation.",
      recommendations: [
        "Maintain current exercise routine until surgery",
        "Plan modified activities for immediate post-op period",
        "Set realistic activity goals for recovery phases"
      ]
    }
  ];

  const getRecoveryPrediction = (score: number) => {
    if (score >= 85) return { milestone: 'Independent mobility in 2-3 weeks', level: 'optimal' };
    if (score >= 70) return { milestone: 'Independent mobility in 3-4 weeks', level: 'high' };
    if (score >= 55) return { milestone: 'Independent mobility in 4-6 weeks', level: 'moderate' };
    return { milestone: 'Independent mobility in 6-8 weeks', level: 'low' };
  };

  const mobilityPrediction = getRecoveryPrediction(overallScore);

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Cardiovascular Endurance":
        return {
          clinicalContext: "Cardiovascular fitness is strongly predictive of surgical outcomes and recovery speed. Studies show that patients with good pre-operative fitness have 30-40% shorter recovery times and significantly lower complication rates.",
          benchmarkData: [
            { category: 'Your Score', score: 82 },
            { category: 'Average Patient', score: 68 },
            { category: 'Optimal Target', score: 90 }
          ],
          strengths: [
            "Good walking endurance capacity",
            "Stable heart rate during activity",
            "No significant breathlessness"
          ],
          riskFactors: [
            "Could improve with consistent training"
          ],
          timeline: "Maintain current activity levels. Consider gradual increase in walking duration 4-6 weeks before surgery."
        };
      case "Lower Body Strength":
        return {
          clinicalContext: "Lower body strength is crucial for post-surgical mobility and independence. Strong leg muscles reduce fall risk by 40% and enable earlier mobilization after surgery. Your excellent baseline predicts successful early mobilization.",
          benchmarkData: [
            { category: 'Your Score', score: 88 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Excellent chair rise ability",
            "Good stair climbing capacity",
            "Strong quadriceps and glutes"
          ],
          riskFactors: [],
          timeline: "Continue current strength activities. Maintain muscle mass until surgery with resistance exercises."
        };
      case "Balance & Stability":
        return {
          clinicalContext: "Balance and stability are critical for safe mobility and fall prevention. Poor balance increases post-operative fall risk by 300%. Your moderate score indicates room for improvement that could significantly enhance recovery safety.",
          benchmarkData: [
            { category: 'Your Score', score: 75 },
            { category: 'Average Patient', score: 70 },
            { category: 'Optimal Target', score: 88 }
          ],
          strengths: [
            "Adequate static balance",
            "Good spatial awareness"
          ],
          riskFactors: [
            "Slightly reduced dynamic balance",
            "Some unsteadiness with position changes",
            "May benefit from balance training"
          ],
          timeline: "Begin balance training 4-6 weeks before surgery. Focus on single-leg stands and proprioception exercises."
        };
      case "Functional Strength":
        return {
          clinicalContext: "Functional strength affects ability to perform daily activities independently. Good grip strength correlates with overall muscle mass and is predictive of recovery outcomes. Your score indicates good functional reserve.",
          benchmarkData: [
            { category: 'Your Score', score: 80 },
            { category: 'Average Patient', score: 75 },
            { category: 'Optimal Target', score: 90 }
          ],
          strengths: [
            "Good grip strength",
            "Adequate lifting capacity",
            "Good fine motor control"
          ],
          riskFactors: [
            "Could improve upper body strength"
          ],
          timeline: "Maintain current strength with regular activities. Focus on grip strength exercises 2-3 weeks before surgery."
        };
      case "Independence Level":
        return {
          clinicalContext: "Pre-operative independence level strongly predicts post-operative outcomes. Patients with high baseline independence have 50% better recovery outcomes and shorter hospital stays. Your excellent score is very positive.",
          benchmarkData: [
            { category: 'Your Score', score: 85 },
            { category: 'Average Patient', score: 78 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Complete independence in daily activities",
            "Good self-care abilities",
            "Excellent problem-solving skills"
          ],
          riskFactors: [],
          timeline: "Maintain current independence. Plan temporary support during recovery but expect quick return to baseline."
        };
      case "Pain Management":
        return {
          clinicalContext: "Existing pain can affect surgical recovery and rehabilitation progress. However, well-managed pain with appropriate strategies does not significantly impair outcomes. Your moderate score indicates manageable issues.",
          benchmarkData: [
            { category: 'Your Score', score: 70 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 85 }
          ],
          strengths: [
            "Good pain awareness",
            "Effective coping strategies"
          ],
          riskFactors: [
            "Some baseline discomfort",
            "May need enhanced pain management",
            "Could affect early mobilization"
          ],
          timeline: "Optimize pain management 3-4 weeks before surgery. Consult healthcare provider about perioperative pain control."
        };
      case "Activity Baseline":
        return {
          clinicalContext: "Your current activity level provides an excellent foundation for recovery. Active patients have 40% faster recovery times and better long-term outcomes. Maintaining activity until surgery is crucial for optimal results.",
          benchmarkData: [
            { category: 'Your Score', score: 78 },
            { category: 'Average Patient', score: 65 },
            { category: 'Optimal Target', score: 88 }
          ],
          strengths: [
            "Regular activity participation",
            "Good exercise tolerance",
            "Positive attitude toward activity"
          ],
          riskFactors: [
            "Activity may need modification post-surgery"
          ],
          timeline: "Continue current activities until surgery. Plan modified exercise program for immediate post-operative period."
        };
      default:
        return {
          clinicalContext: "Standard assessment completed.",
          benchmarkData: [],
          strengths: [],
          riskFactors: [],
          timeline: ""
        };
    }
  };

  // Comparison data for the main chart
  const comparisonData = [
    {
      name: "Cardiovascular Endurance",
      yourScore: 82,
      average: 68,
      optimal: 90
    },
    {
      name: "Lower Body Strength", 
      yourScore: 88,
      average: 72,
      optimal: 95
    },
    {
      name: "Balance & Stability",
      yourScore: 75,
      average: 70,
      optimal: 88
    },
    {
      name: "Functional Strength",
      yourScore: 80,
      average: 75,
      optimal: 90
    },
    {
      name: "Independence Level",
      yourScore: 85,
      average: 78,
      optimal: 95
    },
    {
      name: "Pain Management",
      yourScore: 70,
      average: 72,
      optimal: 85
    },
    {
      name: "Activity Baseline",
      yourScore: 78,
      average: 65,
      optimal: 88
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
    // Using outline variant for all badges since color is handled by CSS classes
    return 'outline';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'optimal': return <CheckCircle2 className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'moderate': return <Target className="h-4 w-4" />;
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
                  <PaymentGate requiredFunnel="mobility">

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
              Completed on {completionDate} • {results.length} mobility factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{overallScore}%</div>
                <Badge variant="default" className="mb-4">
                  Strong Baseline
                </Badge>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Predicted recovery milestone: {mobilityPrediction.milestone}
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
            Training Plan
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
                  <span>Your Mobility Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your mobility and strength scores compare to average patients and optimal targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-4">
                      {/* Category Title */}
                      <h3 className="text-left font-medium mb-6 px-[0px] py-[10px] pt-[0px] pr-[0px] pb-[35px] pl-[0px]">{item.name}</h3>
                      

                      {/* Chart */}
                      <div className="relative max-w-lg mx-auto">
                        {(() => {
                          // Calculate dynamic range: start 20 points below average, end at 100
                          const rangeStart = Math.max(0, item.average - 20);
                          const rangeEnd = 100;
                          const rangeSize = rangeEnd - rangeStart;
                          
                          // Convert actual percentages to display percentages within our range
                          const yourScorePosition = ((item.yourScore - rangeStart) / rangeSize) * 100;
                          const averagePosition = ((item.average - rangeStart) / rangeSize) * 100;
                          const optimalPosition = ((item.optimal - rangeStart) / rangeSize) * 100;
                          
                          return (
                            <>
                              {/* Your Score Label Above */}
                              <div 
                                className="absolute -top-14 transform -translate-x-1/2 text-center"
                                style={{ left: `${yourScorePosition}%` }}
                              >
                                <div className="text-xs text-muted-foreground mb-1">Your score</div>
                                <div className="text-sm font-medium">{item.yourScore}%</div>
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
                                    <div className="text-sm font-medium">{item.average}%</div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Average Patient</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div 
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">{item.optimal}%</div>
                                    <div className="text-xs text-muted-foreground">Optimal</div>
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
            {results.map((result, index) => {
              const analysis = getDetailedAnalysis(result.category, result.score);
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          {getLevelIcon(result.level)}
                          <span>{result.category}</span>
                        </CardTitle>
                        <CardDescription>Baseline Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <span>Clinical Assessment</span>
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {analysis.clinicalContext}
                        </p>
                      </div>

                      {/* Benchmark Chart */}
                      {analysis.benchmarkData.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Mobility Assessment Benchmark</h4>
                          
                          {/* Find your score and benchmarks */}
                          {(() => {
                            const yourScore = analysis.benchmarkData.find(entry => entry.category === 'Your Score')?.score || 0;
                            const averageScore = analysis.benchmarkData.find(entry => entry.category === 'Average Patient')?.score || 60;
                            const optimalScore = analysis.benchmarkData.find(entry => entry.category === 'Optimal Target')?.score || 85;

                            return (
                              <div className="space-y-3">
                                {/* Score Display */}
                                <div className="text-center mb-6">

                                </div>

                                {/* Chart */}
                                <div className="relative max-w-sm mx-auto">
                                  {(() => {
                                    // Calculate dynamic range: start 20 points below average, end at 100
                                    const rangeStart = Math.max(0, averageScore - 20);
                                    const rangeEnd = 100;
                                    const rangeSize = rangeEnd - rangeStart;
                                    
                                    // Convert actual percentages to display percentages within our range
                                    const yourScorePosition = ((yourScore - rangeStart) / rangeSize) * 100;
                                    const averagePosition = ((averageScore - rangeStart) / rangeSize) * 100;
                                    const optimalPosition = ((optimalScore - rangeStart) / rangeSize) * 100;
                                    
                                    return (
                                      <>
                                        {/* Your Score Label Above */}
                                        <div 
                                          className="absolute -top-12 transform -translate-x-1/2 text-center"
                                          style={{ left: `${yourScorePosition}%` }}
                                        >
                                          <div className="text-xs text-muted-foreground mb-1">Your score</div>
                                          <div className="text-xs font-medium">{yourScore}%</div>
                                        </div>

                                        {/* Main bar */}
                                        <div className="relative h-1.5 bg-gray-300 rounded-full">
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
                                        <div className="relative mt-2 h-10">
                                          {/* Ensure minimum spacing between labels */}
                                          {Math.abs(averagePosition - yourScorePosition) > 15 && (
                                            <div 
                                              className="absolute text-center transform -translate-x-1/2"
                                              style={{ left: `${averagePosition}%` }}
                                            >
                                              <div className="text-xs font-medium">{averageScore}%</div>
                                              <div className="text-xs text-muted-foreground whitespace-nowrap">Average</div>
                                            </div>
                                          )}
                                          {Math.abs(optimalPosition - yourScorePosition) > 15 && Math.abs(optimalPosition - averagePosition) > 15 && (
                                            <div 
                                              className="absolute text-center transform -translate-x-1/2"
                                              style={{ left: `${optimalPosition}%` }}
                                            >
                                              <div className="text-xs font-medium">{optimalScore}%</div>
                                              <div className="text-xs text-muted-foreground">Optimal</div>
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Strengths */}
                      {analysis.strengths.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2 text-green-600">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Current Strengths</span>
                            </h4>
                            <ul className="space-y-1">
                              {analysis.strengths.map((strength, strengthIndex) => (
                                <li key={strengthIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                                  <span className="text-green-500 mt-1">✓</span>
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {/* Risk Factors */}
                      {analysis.riskFactors.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2 text-orange-600">
                              <AlertCircle className="h-4 w-4" />
                              <span>Training Opportunities</span>
                            </h4>
                            <ul className="space-y-1">
                              {analysis.riskFactors.map((risk, riskIndex) => (
                                <li key={riskIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                                  <span className="text-orange-500 mt-1">⚠</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      <Separator />

                      {/* Timeline */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Training Timeline</span>
                        </h4>
                        <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                          {analysis.timeline}
                        </p>
                      </div>

                      <Separator />

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-medium mb-2">Evidence-Based Recommendations</h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Pre-Surgery Training Plan</span>
                </CardTitle>
                <CardDescription>
                  Targeted exercises to optimize your baseline before surgery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results
                    .filter(result => result.level === 'moderate' || result.level === 'low')
                    .map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium">{result.category} - Training Focus</h4>
                        </div>
                        <div className="pl-6 space-y-2">
                          {result.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  
                  {results.every(result => result.level === 'high' || result.level === 'optimal') && (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Excellent Baseline!</h3>
                      <p className="text-muted-foreground">
                        Your assessment shows excellent mobility and strength across all categories. Maintain your current activity levels for optimal recovery.
                      </p>
                    </div>
                  )}
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
            Training Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'mobility-strength-score-feedback'} size="lg" className="px-8">
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
                  This baseline assessment helps track your recovery progress. Individual results may vary based on surgery type and healing response. 
                  Always follow your physiotherapist's specific exercise recommendations.
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
                <AccordionItem value="mobility-assessment">
                  <AccordionTrigger className="text-sm font-medium">
                    Mobility Assessment & Measurement
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Chartered Society of Physiotherapy: Mobility assessment guidelines</li>
                      <li>• NICE Guideline NG183: Rehabilitation after traumatic injury (2022)</li>
                      <li>• British Association of Sport and Exercise Medicine: Functional assessment</li>
                      <li>• Royal College of Physicians: Physical activity standards</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="strength-testing">
                  <AccordionTrigger className="text-sm font-medium">
                    Strength Testing & Benchmarks
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• European College of Sport Science: Strength testing protocols</li>
                      <li>• NHS: Strength and conditioning guidelines</li>
                      <li>• British Journal of Sports Medicine: Functional strength assessment</li>
                      <li>• Institute of Sport, Exercise and Health: Performance benchmarks</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recovery-tracking">
                  <AccordionTrigger className="text-sm font-medium">
                    Recovery Progress Tracking
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Physiotherapy Research International: Recovery monitoring</li>
                      <li>• Journal of Rehabilitation Medicine: Progress assessment tools</li>
                      <li>• British Association of Chartered Physiotherapists: Outcome measures</li>
                      <li>• Care Quality Commission: Rehabilitation standards</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="surgical-rehabilitation">
                  <AccordionTrigger className="text-sm font-medium">
                    Post-Surgical Rehabilitation
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Royal College of Surgeons: Post-operative mobility guidelines</li>
                      <li>• Enhanced Recovery After Surgery (ERAS): Mobilization protocols</li>
                      <li>• British Orthopaedic Association: Rehabilitation pathways</li>
                      <li>• NICE Quality Standard QS174: Perioperative care (2018)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="functional-outcomes">
                  <AccordionTrigger className="text-sm font-medium">
                    Functional Outcome Measures
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• International Classification of Functioning (ICF): WHO framework</li>
                      <li>• Cochrane Reviews: Rehabilitation outcome measures</li>
                      <li>• British Journal of Occupational Therapy: Functional assessment</li>
                      <li>• NHS Patient Reported Experience Measures (PREMs)</li>
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