import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Heart, BarChart3, Clock, Target, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendations: string[];
}

export function InflammationRiskResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Inflammation Risk Score";
  const assessmentType = "Comprehensive Inflammation Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 32; // Lower scores indicate lower inflammation risk

  const results: AssessmentResult[] = [
    {
      category: "Dietary Inflammation",
      score: 45,
      maxScore: 100,
      level: "moderate",
      description: "Your diet contains moderate inflammatory triggers that could be optimized.",
      recommendations: [
        "Reduce processed food consumption by 50%",
        "Increase omega-3 rich foods (fatty fish, walnuts, flaxseeds)",
        "Add 2-3 servings of anti-inflammatory spices daily (turmeric, ginger)"
      ]
    },
    {
      category: "Lifestyle Factors",
      score: 25,
      maxScore: 100,
      level: "low",
      description: "Your lifestyle choices support low inflammation levels with room for minor improvements.",
      recommendations: [
        "Maintain current exercise routine",
        "Consider adding stress-reduction practices",
        "Optimize sleep consistency"
      ]
    },
    {
      category: "Sleep Quality",
      score: 38,
      maxScore: 100,
      level: "moderate",
      description: "Sleep patterns are moderately impacting your inflammatory status.",
      recommendations: [
        "Establish consistent sleep schedule (same time daily)",
        "Create optimal sleep environment (cool, dark, quiet)",
        "Limit screen exposure 2 hours before bedtime"
      ]
    },
    {
      category: "Stress & Recovery",
      score: 22,
      maxScore: 100,
      level: "low",
      description: "You're managing stress well with good recovery practices.",
      recommendations: [
        "Continue current stress management techniques",
        "Consider meditation or mindfulness practice",
        "Maintain social support connections"
      ]
    }
  ];

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Dietary Inflammation":
        return {
          clinicalContext: "Your dietary assessment reveals moderate inflammatory triggers that can be optimized. Research shows that anti-inflammatory diets can reduce inflammatory markers by 30-40% within 6-8 weeks. The Mediterranean diet pattern is particularly effective for reducing systemic inflammation.",
          evidenceBase: [
            "Studies show processed food reduction can lower C-reactive protein levels by up to 35%",
            "Omega-3 fatty acids have been proven to reduce inflammatory cytokines and improve overall health markers",
            "Anti-inflammatory spices like turmeric contain curcumin, which has powerful anti-inflammatory properties backed by extensive research"
          ],
          riskFactors: ["High processed food intake is linked to increased inflammatory markers and chronic disease risk", "Insufficient omega-3 intake may contribute to inflammatory imbalance and cardiovascular risk"],
          timeline: "Dietary improvements typically show inflammatory marker improvements within 4-6 weeks of consistent implementation",
          benchmarkData: [
            { category: "Optimal Diet", score: 10 },
            { category: "Average Patient", score: 35 },
            { category: "Your Score", score: 45 },
            { category: "High Inflammatory", score: 75 }
          ]
        };
      case "Lifestyle Factors":
        return {
          clinicalContext: "Your lifestyle choices demonstrate good anti-inflammatory practices with minimal optimization needed. Regular physical activity is one of the most powerful anti-inflammatory interventions available, and you're already benefiting from this approach.",
          evidenceBase: [
            "Regular exercise reduces inflammatory markers and improves immune function",
            "Stress-reduction practices have been shown to lower cortisol and inflammatory cytokines",
            "Consistent sleep patterns support healthy inflammatory regulation and recovery processes"
          ],
          riskFactors: ["Sedentary lifestyle is associated with increased inflammatory markers", "Chronic stress can lead to persistent elevation of inflammatory mediators"],
          timeline: "Current lifestyle practices are providing ongoing anti-inflammatory benefits",
          benchmarkData: [
            { category: "Optimal Lifestyle", score: 15 },
            { category: "Your Score", score: 25 },
            { category: "Average Patient", score: 40 },
            { category: "High Risk", score: 70 }
          ]
        };
      case "Sleep Quality":
        return {
          clinicalContext: "Your sleep assessment indicates moderate impact on inflammatory status. Sleep quality directly affects inflammatory regulation, with poor sleep linked to increased inflammatory markers. Optimizing sleep consistency and quality can significantly improve inflammatory balance.",
          evidenceBase: [
            "Sleep deprivation increases inflammatory cytokines including IL-6 and TNF-alpha",
            "Consistent sleep schedules help regulate circadian rhythms and inflammatory processes",
            "Blue light exposure before bedtime disrupts melatonin production and inflammatory recovery"
          ],
          riskFactors: ["Poor sleep quality is associated with increased risk of inflammatory conditions", "Irregular sleep patterns can disrupt natural anti-inflammatory recovery processes"],
          timeline: "Sleep improvements typically show inflammatory benefits within 2-3 weeks of consistent implementation",
          benchmarkData: [
            { category: "Optimal Sleep", score: 15 },
            { category: "Average Patient", score: 30 },
            { category: "Your Score", score: 38 },
            { category: "Poor Sleep", score: 65 }
          ]
        };
      case "Stress & Recovery":
        return {
          clinicalContext: "Your stress management and recovery practices are excellent, contributing to low inflammatory burden. Effective stress management is crucial for inflammatory regulation, as chronic stress can lead to persistent inflammatory activation.",
          evidenceBase: [
            "Effective stress management techniques reduce cortisol and inflammatory markers",
            "Meditation and mindfulness practices have been shown to decrease inflammatory cytokines",
            "Strong social support networks are associated with lower inflammatory markers and better health outcomes"
          ],
          riskFactors: ["Chronic unmanaged stress can lead to persistent inflammatory activation", "Social isolation is associated with increased inflammatory markers"],
          timeline: "Current stress management practices are providing ongoing anti-inflammatory benefits",
          benchmarkData: [
            { category: "Optimal Management", score: 10 },
            { category: "Your Score", score: 22 },
            { category: "Average Patient", score: 45 },
            { category: "High Stress", score: 75 }
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
    { name: "Dietary Inflammation", yourScore: 45, average: 35, optimal: 10 },
    { name: "Lifestyle Factors", yourScore: 25, average: 40, optimal: 15 },
    { name: "Sleep Quality", yourScore: 38, average: 30, optimal: 15 },
    { name: "Stress & Recovery", yourScore: 22, average: 45, optimal: 10 }
  ];

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'low': return 'badge-level-low';
      case 'moderate': return 'badge-level-moderate';
      case 'high': return 'badge-level-high';
      case 'severe': return 'badge-level-severe';
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
    if (score <= 25) return { rating: 'Low Risk', level: 'low' };
    if (score <= 50) return { rating: 'Moderate Risk', level: 'moderate' };
    if (score <= 75) return { rating: 'High Risk', level: 'high' };
    return { rating: 'Very High Risk', level: 'severe' };
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
      <PaymentGate requiredFunnel="inflammation">

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
              Completed on {completionDate} • {results.length} inflammation factors assessed
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
                Your inflammation risk assessment identifies key factors affecting your inflammatory burden.
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
                  <span>Your Inflammation Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your inflammation risk scores compare to average patients and optimal targets
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Inflammation Risk Benchmark</h4>
                          
                          {/* Find your score and benchmarks */}
                          {(() => {
                            const yourScore = analysis.benchmarkData.find(entry => entry.category === 'Your Score')?.score || 0;
                            const averageScore = analysis.benchmarkData.find(entry => entry.category === 'Average Patient')?.score || 60;
                            const optimalScore = analysis.benchmarkData.find(entry => entry.category === 'Optimal Diet' || entry.category === 'Optimal Lifestyle' || entry.category === 'Optimal Sleep' || entry.category === 'Optimal Management')?.score || 15;

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
                <CardTitle>Personalized Anti-Inflammatory Plan</CardTitle>
                <CardDescription>
                  Evidence-based recommendations tailored to your inflammation risk profile
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

            {/* Next Steps - Custom for inflammation */}
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
                      <p className="text-sm text-muted-foreground">Discuss these results with your doctor to develop a comprehensive anti-inflammatory plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Begin Priority Interventions</h4>
                      <p className="text-sm text-muted-foreground">Start with the highest-impact recommendations for your highest risk factors.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">Consider our Chronic Symptom Protocol for ongoing inflammation management and tracking.</p>
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
            Anti-Inflammation Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'inflammation-risk-score-feedback'} size="lg" className="px-8">
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
                  This assessment identifies potential inflammatory factors but does not diagnose medical conditions. 
                  Consult healthcare providers for comprehensive inflammatory marker testing and medical evaluation.
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
                <AccordionItem value="inflammation-diet">
                  <AccordionTrigger className="text-sm font-medium">
                    Anti-Inflammatory Diet & Nutrition
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Dietetic Association: Anti-inflammatory eating guidelines</li>
                      <li>• NICE Guidelines: Dietary interventions for chronic inflammation</li>
                      <li>• Mediterranean Diet Foundation: Anti-inflammatory diet protocols</li>
                      <li>• Journal of Nutrition: Inflammation and dietary patterns research</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lifestyle-inflammation">
                  <AccordionTrigger className="text-sm font-medium">
                    Lifestyle Factors & Inflammatory Markers
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Heart Foundation: Lifestyle and inflammation research</li>
                      <li>• NHS: Physical activity and inflammatory health</li>
                      <li>• Royal College of Physicians: Stress and inflammation connection</li>
                      <li>• European Journal of Preventive Cardiology: Lifestyle inflammation studies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sleep-inflammation">
                  <AccordionTrigger className="text-sm font-medium">
                    Sleep Quality & Inflammatory Response
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Sleep Society: Sleep and inflammation research</li>
                      <li>• NICE Guidelines: Sleep disorders and health impacts</li>
                      <li>• Sleep Medicine Reviews: Inflammation and sleep quality studies</li>
                      <li>• Journal of Clinical Medicine: Sleep deprivation inflammatory markers</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stress-inflammation">
                  <AccordionTrigger className="text-sm font-medium">
                    Stress Management & Inflammatory Control
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Psychological Society: Stress and inflammatory pathways</li>
                      <li>• NHS: Stress management and physical health</li>
                      <li>• Mindfulness-Based Stress Reduction: Anti-inflammatory benefits</li>
                      <li>• Psychoneuroendocrinology: Stress-inflammation research</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="measurement-markers">
                  <AccordionTrigger className="text-sm font-medium">
                    Inflammatory Biomarkers & Assessment
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Society for Immunology: Inflammatory marker guidelines</li>
                      <li>• NICE Guidelines: Laboratory testing for inflammation</li>
                      <li>• Royal College of Pathologists: Inflammatory biomarker interpretation</li>
                      <li>• Clinical Chemistry: Inflammatory marker standardization</li>
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