import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, Zap, BookOpen, BarChart3, Target } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
// Using custom CSS charts instead of Recharts for better reliability

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function RecoverySpeedResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Recovery Speed Prediction";
  const assessmentType = "Personalized Recovery Timeline";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 82;

  const results: AssessmentResult[] = [
    {
      category: "Nutritional Foundation",
      score: 85,
      maxScore: 100,
      level: "optimal",
      description: "Your nutrition habits provide an excellent foundation for healing and tissue repair.",
      recommendations: [
        "Maintain current protein intake (1.2-1.6g per kg)",
        "Increase vitamin C and zinc for wound healing",
        "Stay hydrated with 8-10 glasses of water daily"
      ]
    },
    {
      category: "Mental Readiness",
      score: 78,
      maxScore: 100,
      level: "high",
      description: "Your mental preparation will support a positive recovery experience.",
      recommendations: [
        "Practice visualization techniques daily",
        "Learn progressive muscle relaxation",
        "Consider pre-surgery counseling session"
      ]
    },
    {
      category: "Support System Strength",
      score: 90,
      maxScore: 100,
      level: "optimal",
      description: "Your strong support network will significantly accelerate your recovery.",
      recommendations: [
        "Communicate recovery timeline with supporters",
        "Assign specific roles to different helpers",
        "Plan backup support for extended recovery"
      ]
    },
    {
      category: "Home Environment Readiness",
      score: 75,
      maxScore: 100,
      level: "moderate",
      description: "Your home preparation is on track but could be optimized further.",
      recommendations: [
        "Install additional safety equipment in bathroom",
        "Prepare 2 weeks of easy-to-prepare meals",
        "Set up recovery station with essentials nearby"
      ]
    },
    {
      category: "Sleep Quality Impact",
      score: 80,
      maxScore: 100,
      level: "high",
      description: "Your sleep quality will support healing, though optimization is possible.",
      recommendations: [
        "Establish consistent pre-surgery sleep schedule",
        "Create optimal sleep environment (cool, dark, quiet)",
        "Practice good sleep hygiene habits"
      ]
    },
    {
      category: "Physical Baseline",
      score: 85,
      maxScore: 100,
      level: "optimal",
      description: "Your current fitness level provides an excellent recovery foundation.",
      recommendations: [
        "Continue pre-operative conditioning exercises",
        "Focus on flexibility and mobility work",
        "Plan graduated return to activity post-surgery"
      ]
    }
  ];

  const getOverallRating = (score: number) => {
    if (score >= 85) return { rating: 'Fast Recovery', level: 'optimal' };
    if (score >= 70) return { rating: 'Good Recovery', level: 'high' };
    if (score >= 55) return { rating: 'Average Recovery', level: 'moderate' };
    return { rating: 'Slower Recovery', level: 'low' };
  };

  const overallRating = getOverallRating(overallScore);

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Nutritional Foundation":
        return {
          clinicalContext: "Nutrition plays a crucial role in surgical recovery. Studies show that patients with optimal nutrition status recover 30-40% faster than those with poor nutritional foundations. Your current nutrition profile supports effective healing.",
          benchmarkData: [
            { category: 'Your Score', score: 85 },
            { category: 'Average Patient', score: 70 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Adequate protein intake for tissue repair",
            "Good hydration habits",
            "Balanced micronutrient profile"
          ],
          riskFactors: [
            "Could benefit from increased vitamin C",
            "Zinc levels may need optimization"
          ],
          timeline: "Continue current nutrition plan and enhance with targeted supplementation 2-3 weeks before surgery."
        };
      case "Mental Readiness":
        return {
          clinicalContext: "Psychological preparation significantly impacts recovery outcomes. Research indicates that mentally prepared patients experience 25% shorter recovery times and better pain management outcomes.",
          benchmarkData: [
            { category: 'Your Score', score: 78 },
            { category: 'Average Patient', score: 65 },
            { category: 'Optimal Target', score: 90 }
          ],
          strengths: [
            "Positive outlook towards surgery",
            "Good stress management techniques",
            "Realistic recovery expectations"
          ],
          riskFactors: [
            "Mild anxiety about surgical outcome",
            "Limited meditation/relaxation practice"
          ],
          timeline: "Begin enhanced mental preparation techniques 3-4 weeks before surgery for optimal benefit."
        };
      case "Support Systems":
        return {
          clinicalContext: "Strong support systems are proven to accelerate recovery. Patients with robust support networks experience 20-30% faster healing and reduced complications.",
          benchmarkData: [
            { category: 'Your Score', score: 88 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Strong family support network",
            "Adequate help for daily activities",
            "Good communication with healthcare team"
          ],
          riskFactors: [
            "Limited backup support options"
          ],
          timeline: "Confirm support arrangements 1-2 weeks before surgery and establish backup plans."
        };
      case "Sleep Quality":
        return {
          clinicalContext: "Quality sleep is essential for healing and recovery. Poor sleep quality can extend recovery time by 40-50%. Your sleep patterns support optimal healing processes.",
          benchmarkData: [
            { category: 'Your Score', score: 72 },
            { category: 'Average Patient', score: 68 },
            { category: 'Optimal Target', score: 85 }
          ],
          strengths: [
            "Regular sleep schedule",
            "Good sleep hygiene awareness",
            "Adequate sleep duration"
          ],
          riskFactors: [
            "Occasional sleep interruptions",
            "Pre-surgical anxiety affecting sleep"
          ],
          timeline: "Optimize sleep quality 4-6 weeks before surgery with enhanced sleep hygiene protocols."
        };
      case "Physical Baseline":
        return {
          clinicalContext: "Physical fitness before surgery is a strong predictor of recovery speed. Enhanced Recovery After Surgery (ERAS) protocols emphasize prehabilitation for optimal outcomes.",
          benchmarkData: [
            { category: 'Your Score', score: 85 },
            { category: 'Average Patient', score: 65 },
            { category: 'Optimal Target', score: 92 }
          ],
          strengths: [
            "Good cardiovascular fitness",
            "Adequate muscle strength",
            "Excellent mobility baseline"
          ],
          riskFactors: [
            "Could improve core stability",
            "Flexibility needs enhancement"
          ],
          timeline: "Continue current fitness routine and add targeted conditioning 4-6 weeks before surgery."
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
      name: "Nutritional Foundation",
      yourScore: 85,
      average: 70,
      optimal: 95
    },
    {
      name: "Mental Readiness", 
      yourScore: 78,
      average: 65,
      optimal: 90
    },
    {
      name: "Support Systems",
      yourScore: 88,
      average: 72,
      optimal: 95
    },
    {
      name: "Sleep Quality",
      yourScore: 72,
      average: 68,
      optimal: 85
    },
    {
      name: "Physical Baseline",
      yourScore: 85,
      average: 65,
      optimal: 92
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
      case 'moderate': return <Clock className="h-4 w-4" />;
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
              Completed on {completionDate} • {results.length} recovery factors analyzed
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
                Your recovery speed assessment identifies factors that will influence your healing timeline.
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
            Speed Boosters
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
                  <span>Your Recovery Factors vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your recovery factors compare to average patients and optimal targets
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
                        <CardDescription>Recovery Factor Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Recovery Factor Benchmark</h4>
                          
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
                              <span>Optimization Areas</span>
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
                          <span>Optimization Timeline</span>
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
                  <Zap className="h-5 w-5" />
                  <span>Recovery Speed Optimization Plan</span>
                </CardTitle>
                <CardDescription>
                  Targeted strategies to accelerate your recovery based on your assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results
                    .filter(result => result.level === 'moderate' || result.level === 'low')
                    .map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium">{result.category} - Speed Boosters</h4>
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
                      <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Fast Recovery Profile!</h3>
                      <p className="text-muted-foreground">
                        Your assessment shows excellent recovery factors across all categories. Continue your current practices for optimal healing.
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
            Speed Boosters
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'recovery-speed-predictor-feedback'} size="lg" className="px-8">
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
                  This prediction is based on general factors and may vary based on surgical complexity and individual healing responses. 
                  Always follow your surgeon's specific recovery guidelines.
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
                <AccordionItem value="wound-healing">
                  <AccordionTrigger className="text-sm font-medium">
                    Wound Healing & Recovery Science
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline NG125: Surgical site infections prevention (2019)</li>
                      <li>• Journal of Wound Care: Factors affecting healing rates</li>
                      <li>• European Wound Management Association: Healing optimization</li>
                      <li>• British Journal of Surgery: Recovery timeline predictors</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="nutrition-healing">
                  <AccordionTrigger className="text-sm font-medium">
                    Nutrition & Surgical Recovery
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Dietetic Association: Perioperative nutrition guidelines</li>
                      <li>• NICE Guideline CG32: Nutrition support for adults (2017)</li>
                      <li>• Enhanced Recovery After Surgery (ERAS): Nutritional protocols</li>
                      <li>• Clinical Nutrition: Protein requirements for healing</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="psychological-factors">
                  <AccordionTrigger className="text-sm font-medium">
                    Psychological Factors & Recovery
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Psychological Society: Surgery and mental health</li>
                      <li>• NHS: Psychological preparation for surgery</li>
                      <li>• Health Psychology: Mindset and recovery outcomes</li>
                      <li>• Royal College of Psychiatrists: Perioperative psychology</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support-systems">
                  <AccordionTrigger className="text-sm font-medium">
                    Social Support & Recovery Environment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Care Quality Commission: Home recovery environment standards</li>
                      <li>• Age UK: Support during recovery guidelines</li>
                      <li>• British Geriatrics Society: Social factors in healing</li>
                      <li>• NHS Discharge Planning: Community support protocols</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="physical-optimization">
                  <AccordionTrigger className="text-sm font-medium">
                    Physical Optimization & Rehabilitation
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Chartered Society of Physiotherapy: Recovery exercise protocols</li>
                      <li>• British Association of Sport and Exercise Medicine</li>
                      <li>• NICE Guideline NG183: Rehabilitation after traumatic injury</li>
                      <li>• Royal College of Physicians: Physical activity in recovery</li>
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
  );
}