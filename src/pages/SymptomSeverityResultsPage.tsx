import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Thermometer, BarChart3, Clock, Target, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
// Using custom CSS charts instead of Recharts for better reliability
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendations: string[];
}

export function SymptomSeverityResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Symptom Severity Index";
  const assessmentType = "Comprehensive Symptom Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 42; // Higher scores indicate more severe symptoms

  const results: AssessmentResult[] = [
    {
      category: "Pain Assessment",
      score: 35,
      maxScore: 100,
      level: "moderate",
      description: "Your pain levels are moderate and may benefit from targeted management strategies.",
      recommendations: [
        "Consider anti-inflammatory diet modifications",
        "Explore gentle movement therapies like yoga or tai chi",
        "Discuss pain management options with your healthcare provider"
      ]
    },
    {
      category: "Fatigue Impact",
      score: 52,
      maxScore: 100,
      level: "high",
      description: "Fatigue is significantly impacting your daily activities and quality of life.",
      recommendations: [
        "Prioritize sleep hygiene and aim for 7-9 hours nightly",
        "Consider energy conservation techniques",
        "Evaluate for underlying causes like sleep disorders or thyroid issues"
      ]
    },
    {
      category: "Digestive Symptoms",
      score: 28,
      maxScore: 100,
      level: "low",
      description: "Your digestive symptoms are relatively mild but worth monitoring.",
      recommendations: [
        "Keep a food diary to identify potential triggers",
        "Increase fiber intake gradually",
        "Stay hydrated and consider probiotic foods"
      ]
    },
    {
      category: "Joint & Mobility",
      score: 45,
      maxScore: 100,
      level: "moderate",
      description: "Joint stiffness and mobility issues are moderately affecting your daily function.",
      recommendations: [
        "Incorporate gentle stretching into morning routine",
        "Consider low-impact exercises like swimming",
        "Evaluate ergonomics in work and home environments"
      ]
    }
  ];

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Pain Assessment":
        return {
          clinicalContext: "Your pain assessment reveals moderate levels that may significantly impact quality of life. Evidence shows that multimodal pain management approaches, combining lifestyle modifications with appropriate medical interventions, provide the best outcomes for chronic pain management.",
          evidenceBase: [
            "Clinical studies demonstrate that anti-inflammatory diets can reduce pain severity by 20-30%",
            "Gentle movement therapies like yoga and tai chi are proven to reduce chronic pain and improve function",
            "NICE guidelines recommend comprehensive pain management approaches for optimal outcomes"
          ],
          riskFactors: ["Untreated chronic pain may lead to increased disability and reduced quality of life", "Pain-related sleep disruption can worsen symptom severity over time"],
          timeline: "Improvement typically seen within 4-8 weeks of implementing consistent pain management strategies",
          benchmarkData: [
            { category: "Minimal Pain", score: 15 },
            { category: "Your Score", score: 35 },
            { category: "Average Patient", score: 45 },
            { category: "Severe Pain", score: 75 }
          ]
        };
      case "Fatigue Impact":
        return {
          clinicalContext: "Your fatigue levels indicate significant impact on daily functioning. Research shows that fatigue often has multiple contributing factors including sleep quality, stress levels, nutrition, and underlying medical conditions. Comprehensive evaluation is important for effective management.",
          evidenceBase: [
            "Studies show that sleep hygiene improvements can reduce fatigue by 40-50% within 2-4 weeks",
            "Energy conservation techniques are proven to improve functional capacity in patients with chronic fatigue",
            "Medical evaluation for underlying causes like thyroid disorders or sleep apnea is essential for comprehensive care"
          ],
          riskFactors: ["Persistent fatigue may indicate underlying medical conditions requiring evaluation", "Untreated fatigue can lead to increased risk of accidents and reduced work performance"],
          timeline: "Initial improvements in energy levels typically seen within 2-3 weeks of implementing sleep and energy management strategies",
          benchmarkData: [
            { category: "High Energy", score: 20 },
            { category: "Average Patient", score: 35 },
            { category: "Your Score", score: 52 },
            { category: "Severe Fatigue", score: 80 }
          ]
        };
      case "Digestive Symptoms":
        return {
          clinicalContext: "Your digestive symptoms are currently mild but monitoring is important as digestive health significantly impacts overall wellbeing. Early intervention with dietary modifications and lifestyle changes can prevent symptom progression and improve quality of life.",
          evidenceBase: [
            "Food diary tracking helps identify triggers in 70-80% of patients with digestive symptoms",
            "Gradual fiber increase is proven to improve digestive function while minimizing side effects",
            "Adequate hydration and probiotic foods support healthy gut microbiome and digestive function"
          ],
          riskFactors: ["Unaddressed digestive symptoms may worsen over time without intervention", "Poor digestive health can impact nutrient absorption and overall health"],
          timeline: "Digestive improvements typically seen within 2-4 weeks of implementing dietary modifications",
          benchmarkData: [
            { category: "Optimal Digestion", score: 10 },
            { category: "Your Score", score: 28 },
            { category: "Average Patient", score: 40 },
            { category: "Severe Symptoms", score: 70 }
          ]
        };
      case "Joint & Mobility":
        return {
          clinicalContext: "Your joint and mobility assessment shows moderate limitations that could benefit from targeted interventions. Research demonstrates that early intervention with appropriate exercises and ergonomic modifications can significantly improve function and prevent further deterioration.",
          evidenceBase: [
            "Morning stretching routines are proven to reduce joint stiffness and improve mobility throughout the day",
            "Low-impact exercises like swimming provide joint benefits while minimizing stress on affected areas",
            "Ergonomic workplace and home modifications can reduce joint stress and prevent symptom progression"
          ],
          riskFactors: ["Progressive joint stiffness may lead to increased disability if not addressed", "Poor ergonomics can accelerate joint deterioration and increase pain levels"],
          timeline: "Mobility improvements typically seen within 3-6 weeks of consistent gentle exercise and stretching",
          benchmarkData: [
            { category: "Excellent Mobility", score: 15 },
            { category: "Average Patient", score: 35 },
            { category: "Your Score", score: 45 },
            { category: "Severe Limitation", score: 75 }
          ]
        };
      default:
        return {
          clinicalContext: "",
          evidenceBase: [],
          riskFactors: [],
          timeline: "",
          benchmarkData: []
        };
    }
  };

  // Comparison data for charts
  const comparisonData = [
    { name: "Pain Assessment", yourScore: 35, average: 45, optimal: 15 },
    { name: "Fatigue Impact", yourScore: 52, average: 35, optimal: 20 },
    { name: "Digestive Symptoms", yourScore: 28, average: 40, optimal: 10 },
    { name: "Joint & Mobility", yourScore: 45, average: 35, optimal: 15 }
  ];

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'low': return 'badge-level-low';
      case 'moderate': return 'badge-level-moderate';
      case 'high': return 'badge-level-high';
      case 'severe': return 'badge-level-severe';
      case 'optimal': return 'badge-level-optimal';
      default: return 'badge-level-moderate';
    }
  };

  const getScoreBadgeVariant = (level: string) => {
    // Using outline variant for all badges since color is handled by CSS classes
    return 'outline';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle2 className="h-4 w-4" />;
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'severe': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getOverallRating = (score: number) => {
    if (score <= 25) return { rating: 'Mild Symptoms', level: 'low' };
    if (score <= 50) return { rating: 'Moderate Symptoms', level: 'moderate' };
    if (score <= 75) return { rating: 'High Symptoms', level: 'high' };
    return { rating: 'Severe Symptoms', level: 'severe' };
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
                  <PaymentGate requiredFunnel="symptom">

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
              Completed on {completionDate} • {results.length} symptom categories assessed
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
                Your symptom severity assessment identifies key areas requiring attention and management.
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
                  <span>Your Symptom Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your symptom scores compare to average patients and optimal targets
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
                        <CardDescription>Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Symptom Severity Benchmark</h4>
                          
                          {/* Find your score and benchmarks */}
                          {(() => {
                            const yourScore = analysis.benchmarkData.find(entry => entry.category === 'Your Score')?.score || 0;
                            const averageScore = analysis.benchmarkData.find(entry => entry.category === 'Average Patient')?.score || 60;
                            const optimalScore = analysis.benchmarkData.find(entry => entry.category === 'Minimal Pain' || entry.category === 'High Energy' || entry.category === 'Optimal Digestion' || entry.category === 'Excellent Mobility')?.score || 15;

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
                                          {Math.abs(averagePosition - yourScorePosition) > 10 && (
                                            <div 
                                              className="absolute text-center transform -translate-x-1/2"
                                              style={{ left: `${averagePosition}%` }}
                                            >
                                              <div className="text-xs font-medium">{averageScore}%</div>
                                              <div className="text-xs text-muted-foreground">Average</div>
                                            </div>
                                          )}
                                          {Math.abs(optimalPosition - yourScorePosition) > 10 && Math.abs(optimalPosition - averagePosition) > 15 && (
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

                      {/* Evidence Base */}
                      {analysis.evidenceBase.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Evidence Base</span>
                          </h4>
                          <ul className="space-y-2">
                            {analysis.evidenceBase.map((evidence, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{evidence}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Timeline */}
                      {analysis.timeline && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Expected Timeline</span>
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {analysis.timeline}
                          </p>
                        </div>
                      )}
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
                <CardTitle>Personalized Management Plan</CardTitle>
                <CardDescription>
                  Evidence-based recommendations tailored to your symptom profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {results.map((result, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Badge variant={getScoreBadgeVariant(result.level)} className={getScoreColor(result.level)}>
                            {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
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

            {/* Next Steps - Custom for chronic symptoms */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Share with Healthcare Provider</h4>
                      <p className="text-sm text-muted-foreground">Discuss these results with your doctor to develop a comprehensive symptom management plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Begin Priority Interventions</h4>
                      <p className="text-sm text-muted-foreground">Start with the highest-impact recommendations for your most severe symptoms.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">Consider our Chronic Symptom Protocol for ongoing management and progress tracking.</p>
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
            Management Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'symptom-severity-index-feedback'} size="lg" className="px-8">
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
                  This assessment provides insight into your symptom patterns but does not replace professional medical evaluation. 
                  Always consult healthcare providers for persistent or worsening symptoms.
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
                <AccordionItem value="symptom-assessment">
                  <AccordionTrigger className="text-sm font-medium">
                    Symptom Assessment & Management
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guidelines: Chronic pain management and assessment protocols</li>
                      <li>• British Pain Society: Symptom severity scoring systems</li>
                      <li>• Royal College of General Practitioners: Chronic symptom evaluation</li>
                      <li>• NHS: Patient reported outcome measures (PROMs)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pain-management">
                  <AccordionTrigger className="text-sm font-medium">
                    Pain Assessment & Quality of Life
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• International Association for the Study of Pain: Pain assessment guidelines</li>
                      <li>• NICE Guideline CG173: Neuropathic pain assessment and management</li>
                      <li>• British Journal of Pain: Validated pain assessment tools</li>
                      <li>• Faculty of Pain Medicine: Chronic pain impact evaluation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fatigue-energy">
                  <AccordionTrigger className="text-sm font-medium">
                    Fatigue & Energy Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Royal College of Physicians: Chronic fatigue syndrome guidelines</li>
                      <li>• NICE Guideline NG206: Myalgic encephalomyelitis (2021)</li>
                      <li>• British Association for Chronic Fatigue Syndrome: Assessment protocols</li>
                      <li>• Journal of Chronic Fatigue Syndrome: Fatigue severity scales</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="digestive-symptoms">
                  <AccordionTrigger className="text-sm font-medium">
                    Digestive Symptom Evaluation
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Society of Gastroenterology: Functional gut disorder assessment</li>
                      <li>• NICE Guidelines: Irritable bowel syndrome diagnosis and management</li>
                      <li>• Rome Foundation: International diagnostic criteria for functional GI disorders</li>
                      <li>• Gut Journal: Symptom severity assessment in digestive conditions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="joint-mobility">
                  <AccordionTrigger className="text-sm font-medium">
                    Joint Health & Mobility Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Society for Rheumatology: Joint assessment guidelines</li>
                      <li>• NICE Guidelines: Osteoarthritis care and management</li>
                      <li>• Arthritis Research UK: Joint health assessment tools</li>
                      <li>• Rheumatology Journal: Validated joint function measures</li>
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