import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Heart, Shield, BookOpen, BarChart3, Target, Clock } from 'lucide-react';
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

export function AnaesthesiaRiskResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Anaesthesia Risk Assessment";
  const assessmentType = "Safety Screening Analysis";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 76;

  const results: AssessmentResult[] = [
    {
      category: "Airway Management Risk",
      score: 88,
      maxScore: 100,
      level: "optimal",
      description: "Your airway assessment indicates low risk for intubation difficulties.",
      recommendations: [
        "Standard airway management protocols appropriate",
        "Continue good dental hygiene before surgery",
        "No special precautions needed for breathing tube insertion"
      ]
    },
    {
      category: "Sleep Apnoea Risk",
      score: 65,
      maxScore: 100,
      level: "moderate",
      description: "Some indicators suggest potential sleep-related breathing issues that may affect anaesthesia.",
      recommendations: [
        "Consider sleep study evaluation before surgery",
        "Discuss CPAP availability for post-operative period",
        "Plan extended monitoring after anaesthesia"
      ]
    },
    {
      category: "Medication Interactions",
      score: 72,
      maxScore: 100,
      level: "moderate",
      description: "Current medications require careful management during anaesthesia.",
      recommendations: [
        "Review blood thinner timing with anaesthetist",
        "Adjust diabetes medications on surgery day",
        "Consider interaction with anaesthetic drugs"
      ]
    },
    {
      category: "Substance Use Impact",
      score: 70,
      maxScore: 100,
      level: "moderate",
      description: "Substance use history may affect anaesthetic drug requirements and recovery.",
      recommendations: [
        "Stop smoking at least 48 hours before surgery",
        "Abstain from alcohol 24 hours before procedure",
        "Discuss substance use openly with anaesthesia team"
      ]
    },
    {
      category: "Previous Anaesthesia History",
      score: 85,
      maxScore: 100,
      level: "optimal",
      description: "Your previous anaesthesia experiences suggest good tolerance and low complication risk.",
      recommendations: [
        "Request same anaesthetic approach if possible",
        "Continue pre-operative fasting guidelines",
        "Expect similar recovery experience"
      ]
    },
    {
      category: "Allergy & Reaction Risk",
      score: 80,
      maxScore: 100,
      level: "high",
      description: "Known allergies require precautionary measures but are manageable.",
      recommendations: [
        "Ensure allergy information is prominently documented",
        "Consider pre-medication with antihistamines",
        "Have emergency allergy treatments readily available"
      ]
    }
  ];

  const getSafetyRating = (score: number) => {
    if (score >= 85) return { rating: 'Very Safe', level: 'optimal' };
    if (score >= 70) return { rating: 'Safe with Precautions', level: 'high' };
    if (score >= 55) return { rating: 'Moderate Risk', level: 'moderate' };
    return { rating: 'Higher Risk', level: 'low' };
  };

  const safetyRating = getSafetyRating(overallScore);

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Airway Management Risk":
        return {
          clinicalContext: "Airway assessment is crucial for safe anaesthesia delivery. Studies show that difficult intubation occurs in 1-3% of cases, but proper assessment can predict 80-90% of these situations. Your assessment indicates favourable anatomy for standard airway management.",
          benchmarkData: [
            { category: 'Your Score', score: 88 },
            { category: 'Average Patient', score: 75 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Good neck mobility and mouth opening",
            "No previous airway difficulties",
            "Optimal dental condition"
          ],
          riskFactors: [],
          timeline: "Standard airway assessment completed. No additional preparation required."
        };
      case "Sleep Apnoea Risk":
        return {
          clinicalContext: "Obstructive sleep apnoea affects 10-15% of adults and significantly increases anaesthetic complications. Patients with OSA have 2-3 times higher risk of perioperative complications. Early identification allows for appropriate perioperative management.",
          benchmarkData: [
            { category: 'Your Score', score: 65 },
            { category: 'Average Patient', score: 70 },
            { category: 'Optimal Target', score: 90 }
          ],
          strengths: [
            "Awareness of sleep issues",
            "No severe daytime sleepiness"
          ],
          riskFactors: [
            "Snoring reported by partner",
            "Some morning headaches",
            "Occasional daytime fatigue"
          ],
          timeline: "Consider sleep study 2-4 weeks before surgery if elective. Inform anaesthesia team of sleep concerns."
        };
      case "Medication Interactions":
        return {
          clinicalContext: "Drug interactions with anaesthetic agents can significantly impact patient safety. Certain medications affect anaesthetic requirements, cardiovascular stability, and bleeding risk. Proper medication review prevents 70% of drug-related perioperative complications.",
          benchmarkData: [
            { category: 'Your Score', score: 72 },
            { category: 'Average Patient', score: 78 },
            { category: 'Optimal Target', score: 92 }
          ],
          strengths: [
            "Good medication compliance",
            "Clear medication documentation",
            "Regular pharmacy reviews"
          ],
          riskFactors: [
            "Multiple medications requiring adjustment",
            "Blood thinning medications",
            "Diabetes medication timing critical"
          ],
          timeline: "Medication review should occur 1-2 weeks before surgery to allow for safe adjustments."
        };
      case "Substance Use Impact":
        return {
          clinicalContext: "Alcohol and substance use significantly affects anaesthetic requirements and recovery. Chronic alcohol use can increase anaesthetic drug requirements by 30-50%. Smoking increases airway reactivity and respiratory complications by 40-60%.",
          benchmarkData: [
            { category: 'Your Score', score: 70 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 88 }
          ],
          strengths: [
            "Willing to modify habits for surgery",
            "Understands risks involved"
          ],
          riskFactors: [
            "Current smoking status",
            "Regular alcohol consumption",
            "May require adjusted anaesthetic doses"
          ],
          timeline: "Begin substance modification immediately. Smoking cessation 48-72 hours minimum, alcohol cessation 24-48 hours before surgery."
        };
      case "Previous Anaesthesia History":
        return {
          clinicalContext: "Previous anaesthesia experiences are strong predictors of future outcomes. Patients with uncomplicated previous anaesthetics have 90% likelihood of similar outcomes. This information guides anaesthetic planning and risk assessment.",
          benchmarkData: [
            { category: 'Your Score', score: 85 },
            { category: 'Average Patient', score: 72 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "No previous anaesthesia complications",
            "Good tolerance to anaesthetic agents",
            "Smooth recovery experiences"
          ],
          riskFactors: [
            "One episode of mild post-operative nausea"
          ],
          timeline: "Share anaesthesia history with team 1 week before surgery. Request similar anaesthetic approach."
        };
      case "Allergy & Reaction Risk":
        return {
          clinicalContext: "Perioperative allergic reactions occur in 1:10,000-1:20,000 anaesthetics. Most reactions are mild, but severe anaphylaxis can be life-threatening. Proper identification and preparation prevents 95% of serious allergic complications.",
          benchmarkData: [
            { category: 'Your Score', score: 80 },
            { category: 'Average Patient', score: 85 },
            { category: 'Optimal Target', score: 95 }
          ],
          strengths: [
            "Known allergies well documented",
            "Previous surgery without allergic reactions",
            "Appropriate allergy precautions taken"
          ],
          riskFactors: [
            "Multiple drug allergies",
            "Family history of anaesthesia reactions"
          ],
          timeline: "Allergy documentation must be completed 24-48 hours before surgery. Emergency protocols reviewed."
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
      name: "Airway Management Risk",
      yourScore: 88,
      average: 75,
      optimal: 95
    },
    {
      name: "Sleep Apnoea Risk", 
      yourScore: 65,
      average: 70,
      optimal: 90
    },
    {
      name: "Medication Interactions",
      yourScore: 72,
      average: 78,
      optimal: 92
    },
    {
      name: "Substance Use Impact",
      yourScore: 70,
      average: 72,
      optimal: 88
    },
    {
      name: "Previous Anaesthesia History",
      yourScore: 85,
      average: 72,
      optimal: 95
    },
    {
      name: "Allergy & Reaction Risk",
      yourScore: 80,
      average: 85,
      optimal: 95
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
      case 'high': return <Shield className="h-4 w-4" />;
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
            <PaymentGate requiredFunnel="anesthesia">

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
              Completed on {completionDate} • {results.length} safety factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{overallScore}%</div>
                <Badge variant={getScoreBadgeVariant(safetyRating.level)} className="mb-4">
                  {safetyRating.rating}
                </Badge>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your anaesthesia safety assessment identifies key factors for your anaesthesia team to consider.
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
            Safety Measures
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
                  <span>Your Safety Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your anaesthesia safety scores compare to average patients and optimal targets
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
                        <CardDescription>Safety Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Safety Assessment Benchmark</h4>
                          
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
                              <span>Safety Considerations</span>
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
                          <span>Safety Timeline</span>
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
                  <Shield className="h-5 w-5" />
                  <span>Anaesthesia Safety Action Plan</span>
                </CardTitle>
                <CardDescription>
                  Important safety measures based on your screening results
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
                          <h4 className="font-medium">{result.category} - Safety Measures</h4>
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
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Excellent Safety Profile!</h3>
                      <p className="text-muted-foreground">
                        Your assessment shows optimal safety factors for anaesthesia. Standard protocols will be appropriate.
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
            Safety Measures
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'anaesthesia-risk-screener-feedback'} size="lg" className="px-8">
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
                  This screening helps identify potential risks but does not replace professional anaesthesia assessment. 
                  Always discuss these results with your anaesthesia team before surgery.
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
                <AccordionItem value="anaesthesia-safety">
                  <AccordionTrigger className="text-sm font-medium">
                    Anaesthesia Safety & Risk Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Royal College of Anaesthetists: Safety guidelines (2022)</li>
                      <li>• NICE Guideline NG180: Perioperative care in adults (2020)</li>
                      <li>• Association of Anaesthetists: Risk assessment protocols</li>
                      <li>• WHO Surgical Safety Checklist: Anaesthesia considerations</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sleep-apnoea">
                  <AccordionTrigger className="text-sm font-medium">
                    Sleep Apnoea & Anaesthesia Risks
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Thoracic Society: Sleep apnoea and surgery guidelines</li>
                      <li>• NICE Guideline NG202: Obstructive sleep apnoea (2021)</li>
                      <li>• Association of Anaesthetists: OSA management recommendations</li>
                      <li>• European Respiratory Society: Perioperative sleep apnoea</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="drug-interactions">
                  <AccordionTrigger className="text-sm font-medium">
                    Drug Interactions & Medication Safety
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British National Formulary: Anaesthetic drug interactions</li>
                      <li>• Medicines and Healthcare products Regulatory Agency (MHRA)</li>
                      <li>• Royal Pharmaceutical Society: Perioperative prescribing</li>
                      <li>• NICE Guideline CG92: Venous thromboembolism prevention</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="alcohol-substances">
                  <AccordionTrigger className="text-sm font-medium">
                    Alcohol & Substance Use Impact
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Royal College of Surgeons: Alcohol and surgery guidance</li>
                      <li>• NICE Guideline CG100: Alcohol-use disorders (2010)</li>
                      <li>• Association of Anaesthetists: Substance use screening</li>
                      <li>• British Liver Trust: Liver function and anaesthesia</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cardiac-respiratory">
                  <AccordionTrigger className="text-sm font-medium">
                    Cardiac & Respiratory Considerations
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Cardiovascular Society: Perioperative care guidelines</li>
                      <li>• NICE Guideline CG180: Atrial fibrillation management</li>
                      <li>• British Thoracic Society: COPD and anaesthesia</li>
                      <li>• European Society of Cardiology: Preoperative evaluation</li>
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