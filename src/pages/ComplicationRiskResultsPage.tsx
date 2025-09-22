import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle, BookOpen, BarChart3, Target, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { PaymentGate } from '../components/PaymentGate';

// Using custom CSS charts instead of Recharts for better reliability



interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

export function ComplicationRiskResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Complication Risk Assessment";
  const assessmentType = "Comprehensive Risk Analysis";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 73;

  const results: AssessmentResult[] = [
    {
      category: "Medical History Risk",
      score: 68,
      maxScore: 100,
      level: "moderate",
      description: "Your medical history indicates some factors that may increase surgical complications.",
      recommendations: [
        "Optimize diabetes control before surgery",
        "Review blood pressure management with your doctor",
        "Consider pre-operative cardiology consultation"
      ]
    },
    {
      category: "Lifestyle Risk Factors",
      score: 75,
      maxScore: 100,
      level: "moderate",
      description: "Several lifestyle factors could impact your surgical outcome.",
      recommendations: [
        "Implement smoking cessation program immediately",
        "Reduce alcohol consumption to <7 units per week",
        "Begin gentle exercise program 4 weeks before surgery"
      ]
    },
    {
      category: "Medication Risk Profile",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Your current medications present manageable risks with proper planning.",
      recommendations: [
        "Review blood thinner timing with surgeon",
        "Discuss herbal supplement discontinuation",
        "Plan post-operative pain management strategy"
      ]
    },
    {
      category: "Surgical History Impact",
      score: 85,
      maxScore: 100,
      level: "optimal",
      description: "Your previous surgical experiences suggest good healing capacity.",
      recommendations: [
        "Apply lessons learned from previous recovery",
        "Maintain proven pre-operative strategies",
        "Ensure same support systems are in place"
      ]
    },
    {
      category: "Physical Risk Factors",
      score: 65,
      maxScore: 100,
      level: "moderate",
      description: "Weight and fitness levels may impact surgical outcomes.",
      recommendations: [
        "Consider weight optimization before elective surgery",
        "Focus on protein intake (1.2g per kg body weight)",
        "Improve cardiovascular fitness with walking program"
      ]
    }
  ];

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Medical History Risk":
        return {
          clinicalContext: "Your medical history assessment reveals moderate risk factors that require attention. Studies show that patients with well-managed chronic conditions have significantly better surgical outcomes. The Royal College of Surgeons emphasizes the importance of optimizing existing medical conditions before elective procedures.",
          benchmarkData: [
            { category: 'Your Score', score: 68 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 85 }
          ],
          strengths: [
            "No major cardiac complications in medical history",
            "Good medication compliance track record",
            "Regular monitoring of chronic conditions"
          ],
          riskFactors: [
            "Diabetes management requires optimization",
            "Blood pressure control needs improvement",
            "Family history of surgical complications"
          ],
          timeline: "Begin medical optimization 6-8 weeks before surgery. This timeline allows for medication adjustments and stabilization of chronic conditions."
        };
      case "Lifestyle Risk Factors":
        return {
          clinicalContext: "Lifestyle factors significantly impact surgical outcomes. NICE guidelines emphasize that smoking cessation, weight management, and alcohol reduction can reduce complication rates by up to 40%. Your current lifestyle presents modifiable risk factors.",
          benchmarkData: [
            { category: 'Your Score', score: 75 },
            { category: 'Average Patient', score: 65 },
            { category: 'Optimal Target', score: 90 }
          ],
          strengths: [
            "Moderate regular exercise routine",
            "Good hydration habits",
            "Awareness of risk factors"
          ],
          riskFactors: [
            "Current smoking status increases infection risk",
            "Alcohol consumption above recommended levels",
            "BMI in overweight category"
          ],
          timeline: "Implement lifestyle changes immediately. Smoking cessation should begin 4-6 weeks before surgery for optimal benefit."
        };
      case "Medication Risk Profile":
        return {
          clinicalContext: "Your current medication profile requires careful perioperative management. Drug interactions and timing adjustments are crucial for surgical safety. The Royal College of Anaesthetists provides clear guidance on medication management protocols.",
          benchmarkData: [
            { category: 'Your Score', score: 82 },
            { category: 'Average Patient', score: 76 },
            { category: 'Optimal Target', score: 92 }
          ],
          strengths: [
            "Good medication adherence",
            "Regular pharmacy reviews",
            "Clear medication documentation"
          ],
          riskFactors: [
            "Blood thinning medications require timing adjustment",
            "Herbal supplements may interact with anaesthesia",
            "Multiple medications increase complexity"
          ],
          timeline: "Medication review should occur 2-3 weeks before surgery to allow for safe adjustments and withdrawal protocols."
        };
      case "Surgical History Impact":
        return {
          clinicalContext: "Your previous surgical experiences provide valuable insights into your healing capacity and risk profile. Patients with successful surgical histories typically have 20-30% better outcomes in subsequent procedures.",
          benchmarkData: [
            { category: 'Your Score', score: 85 },
            { category: 'Average Patient', score: 70 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Previous surgeries healed well",
            "No adverse reactions to anaesthesia",
            "Good post-operative compliance"
          ],
          riskFactors: [
            "Scar tissue may complicate certain procedures",
            "Previous infection requires monitoring"
          ],
          timeline: "Share surgical history with your current surgical team 1-2 weeks before your procedure."
        };
      case "Physical Risk Factors":
        return {
          clinicalContext: "Physical condition directly correlates with surgical outcomes. Enhanced Recovery After Surgery (ERAS) protocols emphasize prehabilitation to optimize physical status before surgery.",
          benchmarkData: [
            { category: 'Your Score', score: 65 },
            { category: 'Average Patient', score: 70 },
            { category: 'Optimal Target', score: 85 }
          ],
          strengths: [
            "Good baseline fitness level",
            "No major mobility restrictions",
            "Adequate protein intake"
          ],
          riskFactors: [
            "Weight optimization would reduce complications",
            "Limited cardiovascular fitness",
            "Muscle mass below optimal"
          ],
          timeline: "Begin physical optimization 4-6 weeks before surgery with a structured prehabilitation program."
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
      name: "Medical History Risk",
      yourScore: 68,
      average: 72,
      optimal: 85
    },
    {
      name: "Lifestyle Risk Factors", 
      yourScore: 75,
      average: 65,
      optimal: 90
    },
    {
      name: "Medication Risk Profile",
      yourScore: 82,
      average: 76,
      optimal: 92
    },
    {
      name: "Surgical History Impact",
      yourScore: 85,
      average: 70,
      optimal: 95
    },
    {
      name: "Physical Risk Factors",
      yourScore: 65,
      average: 70,
      optimal: 85
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
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getOverallRating = (score: number) => {
    if (score >= 85) return { rating: 'Low Risk', level: 'optimal' };
    if (score >= 70) return { rating: 'Moderate Risk', level: 'high' };
    if (score >= 55) return { rating: 'Elevated Risk', level: 'moderate' };
    return { rating: 'High Risk', level: 'low' };
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
<PaymentGate
  assessmentType="Complication Risk Checker"
  requiredProduct="Complication Risk Checker"  // ← Changed this
  fallbackRoute="complication-risk-checker-upsell"
>
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
              Completed on {completionDate} • {results.length} risk categories assessed
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
                Your complication risk assessment identifies key areas to address before surgery.
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
            Recommendations
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
                  <span>Your Risk Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your risk scores compare to average patients and optimal targets
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
                        <CardDescription>Risk Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Risk Assessment Benchmark</h4>
                          
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
                              <span>Key Risk Factors</span>
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
                  <TrendingUp className="h-5 w-5" />
                  <span>Risk Reduction Action Plan</span>
                </CardTitle>
                <CardDescription>
                  Based on your assessment results, here are your priority areas for risk reduction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results
                    .filter(result => result.level === 'moderate' || result.level === 'low')
                    .map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <h4 className="font-medium">{result.category} - Priority Actions</h4>
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
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Low Risk Profile!</h3>
                      <p className="text-muted-foreground">
                        Your assessment shows manageable risk levels across all categories. Continue your current health practices.
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
            Recommendations
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'complication-risk-checker-feedback'} size="lg" className="px-8">
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
                  This assessment is for informational purposes only and does not constitute medical advice. 
                  Please consult with a qualified healthcare professional before making any health-related decisions.
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
                <AccordionItem value="complication-risk">
                  <AccordionTrigger className="text-sm font-medium">
                    Surgical Complication Risk Factors
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline NG180: Perioperative care in adults (2020)</li>
                      <li>• Royal College of Surgeons: Surgical Risk Assessment Guidelines</li>
                      <li>• WHO Surgical Safety Checklist and Risk Reduction Protocols</li>
                      <li>• American College of Surgeons National Surgical Quality Improvement Program</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medical-history">
                  <AccordionTrigger className="text-sm font-medium">
                    Medical History & Comorbidities
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline CG15: Type 1 diabetes in adults (2022)</li>
                      <li>• British Hypertension Society: Perioperative blood pressure management</li>
                      <li>• NICE Guideline CG180: Atrial fibrillation management (2021)</li>
                      <li>• British Thoracic Society: COPD and surgical risk guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lifestyle-factors">
                  <AccordionTrigger className="text-sm font-medium">
                    Lifestyle Risk Factors
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline PH48: Smoking cessation in secondary care (2013)</li>
                      <li>• Royal College of Surgeons: Alcohol and surgery guidance</li>
                      <li>• NICE Guideline CG189: Obesity identification and management</li>
                      <li>• British Association for Nutrition and Lifestyle Medicine</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medication-interactions">
                  <AccordionTrigger className="text-sm font-medium">
                    Medication & Drug Interactions
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline CG92: Venous thromboembolism prevention (2018)</li>
                      <li>• British National Formulary: Perioperative prescribing</li>
                      <li>• Royal College of Anaesthetists: Drug interaction guidelines</li>
                      <li>• Medicines and Healthcare products Regulatory Agency (MHRA) guidance</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="risk-reduction">
                  <AccordionTrigger className="text-sm font-medium">
                    Risk Reduction & Prevention
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Enhanced Recovery After Surgery (ERAS) Society Guidelines</li>
                      <li>• NICE Quality Standard QS174: Perioperative care (2018)</li>
                      <li>• Royal College of Surgeons: Preoperative optimization protocols</li>
                      <li>• British Association of Day Surgery: Risk mitigation strategies</li>
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