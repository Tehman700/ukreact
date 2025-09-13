import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Pill, BarChart3, Clock, Target, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
// Using custom CSS charts instead of Recharts for better reliability

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendations: string[];
}

export function MedicationBurdenResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Medication Burden Calculator";
  const assessmentType = "Comprehensive Medication Safety Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 58; // Higher scores indicate higher medication burden

  const results: AssessmentResult[] = [
    {
      category: "Polypharmacy Risk",
      score: 65,
      maxScore: 100,
      level: "high",
      description: "You are taking multiple medications which increases the risk of drug interactions and side effects.",
      recommendations: [
        "Request a comprehensive medication review with your pharmacist",
        "Ask your doctor about potentially discontinuing unnecessary medications",
        "Use a single pharmacy for all prescriptions to enable interaction checking"
      ]
    },
    {
      category: "Drug Interaction Risk",
      score: 52,
      maxScore: 100,
      level: "moderate",
      description: "Moderate risk of drug interactions based on your current medication profile.",
      recommendations: [
        "Maintain an updated medication list including supplements and over-the-counter drugs",
        "Use interaction checking tools or apps before adding new medications",
        "Inform all healthcare providers about your complete medication list"
      ]
    },
    {
      category: "Side Effect Burden",
      score: 45,
      maxScore: 100,
      level: "moderate",
      description: "You experience some medication-related side effects that may impact your quality of life.",
      recommendations: [
        "Discuss bothersome side effects with your healthcare provider",
        "Consider timing adjustments or alternative formulations",
        "Monitor and document side effects to share with your doctor"
      ]
    },
    {
      category: "Medication Management",
      score: 38,
      maxScore: 100,
      level: "low",
      description: "Your medication management skills are good with occasional missed doses.",
      recommendations: [
        "Continue using your current organization system",
        "Consider backup reminders for complex medication schedules",
        "Review and update your system as medications change"
      ]
    }
  ];

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Polypharmacy Risk":
        return {
          clinicalContext: "Your assessment indicates significant polypharmacy risk requiring attention. Research shows that patients taking 5 or more medications have exponentially increased risks of adverse drug events. The Royal Pharmaceutical Society emphasizes regular medication reviews to optimize therapy and reduce unnecessary polypharmacy.",
          evidenceBase: [
            "Studies show medication reviews can reduce inappropriate prescribing by 40-60%",
            "Pharmacist-led medication reviews significantly reduce adverse drug events and hospital admissions",
            "Single pharmacy dispensing enables comprehensive interaction checking and monitoring"
          ],
          riskFactors: ["Taking multiple medications increases exponential risk of drug interactions", "Polypharmacy is associated with increased falls risk, cognitive impairment, and hospitalization"],
          timeline: "Medication review benefits are typically seen immediately, with reduced side effects within 2-4 weeks",
          benchmarkData: [
            { category: "Minimal Medications", score: 20 },
            { category: "Average Patient", score: 45 },
            { category: "Your Score", score: 65 },
            { category: "High Polypharmacy", score: 85 }
          ]
        };
      case "Drug Interaction Risk":
        return {
          clinicalContext: "Your medication profile presents moderate interaction risks that require ongoing monitoring. Drug interactions are responsible for significant morbidity and healthcare costs. Comprehensive interaction screening and professional oversight are essential for safe medication use.",
          evidenceBase: [
            "Complete medication lists including OTC drugs and supplements prevent 60% of interaction-related problems",
            "Electronic interaction checking systems reduce clinically significant drug interactions",
            "Healthcare provider communication about medication changes prevents adverse outcomes"
          ],
          riskFactors: ["Unreported supplements and OTC medications increase interaction risk", "Multiple prescribers without communication can lead to dangerous combinations"],
          timeline: "Interaction prevention strategies provide immediate safety benefits",
          benchmarkData: [
            { category: "Minimal Risk", score: 25 },
            { category: "Average Patient", score: 40 },
            { category: "Your Score", score: 52 },
            { category: "High Risk", score: 75 }
          ]
        };
      case "Side Effect Burden":
        return {
          clinicalContext: "Your side effect burden assessment reveals moderate impact on quality of life. Research demonstrates that proactive side effect management and medication optimization can significantly improve patient outcomes and adherence to necessary therapies.",
          evidenceBase: [
            "Proactive side effect discussion improves medication adherence by 30-40%",
            "Timing adjustments and formulation changes can reduce side effects while maintaining efficacy",
            "Side effect monitoring and documentation enables evidence-based medication optimization"
          ],
          riskFactors: ["Untreated side effects often lead to medication non-adherence and treatment failure", "Accumulating side effects can significantly impact quality of life and function"],
          timeline: "Side effect improvements typically seen within 1-2 weeks of medication adjustments",
          benchmarkData: [
            { category: "Minimal Side Effects", score: 15 },
            { category: "Average Patient", score: 35 },
            { category: "Your Score", score: 45 },
            { category: "Severe Burden", score: 75 }
          ]
        };
      case "Medication Management":
        return {
          clinicalContext: "Your medication management skills are good with room for minor improvements. Effective medication management is crucial for treatment success and safety. Research shows that organized systems and adherence tools significantly improve outcomes.",
          evidenceBase: [
            "Organized medication systems improve adherence rates by 20-30%",
            "Backup reminder systems reduce missed doses and improve therapeutic outcomes",
            "Regular system updates maintain effectiveness as medication regimens change"
          ],
          riskFactors: ["Poor medication adherence can lead to treatment failure and disease progression", "Complex regimens without organization systems increase error risk"],
          timeline: "Medication management improvements provide immediate benefits in adherence and safety",
          benchmarkData: [
            { category: "Excellent Management", score: 10 },
            { category: "Good Management", score: 25 },
            { category: "Your Score", score: 38 },
            { category: "Poor Management", score: 70 }
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
    { name: "Polypharmacy Risk", yourScore: 65, average: 45, optimal: 20 },
    { name: "Drug Interaction Risk", yourScore: 52, average: 40, optimal: 25 },
    { name: "Side Effect Burden", yourScore: 45, average: 35, optimal: 15 },
    { name: "Medication Management", yourScore: 38, average: 50, optimal: 10 }
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
    if (score <= 25) return { rating: 'Low Burden', level: 'low' };
    if (score <= 50) return { rating: 'Moderate Burden', level: 'moderate' };
    if (score <= 75) return { rating: 'High Burden', level: 'high' };
    return { rating: 'Severe Burden', level: 'severe' };
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
              Completed on {completionDate} • {results.length} medication factors assessed
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
                Your medication burden assessment identifies key factors affecting medication safety and management.
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
                  <span>Your Medication Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your medication burden scores compare to average patients and optimal targets
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
                        <CardDescription>Burden Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th</CardDescription>
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Medication Burden Benchmark</h4>
                          
                          {/* Find your score and benchmarks */}
                          {(() => {
                            const yourScore = analysis.benchmarkData.find(entry => entry.category === 'Your Score')?.score || 0;
                            const averageScore = analysis.benchmarkData.find(entry => entry.category === 'Average Patient')?.score || 60;
                            const optimalScore = analysis.benchmarkData.find(entry => entry.category === 'Minimal Medications' || entry.category === 'Minimal Risk' || entry.category === 'Minimal Side Effects' || entry.category === 'Excellent Management')?.score || 15;

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
                <CardTitle>Personalized Medication Safety Plan</CardTitle>
                <CardDescription>
                  Evidence-based recommendations tailored to your medication profile
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

            {/* Next Steps - Custom for medication burden */}
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
                      <p className="text-sm text-muted-foreground">Discuss these results with your doctor and pharmacist to optimize your medication regimen safely.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Schedule Medication Review</h4>
                      <p className="text-sm text-muted-foreground">Request a comprehensive medication review with your pharmacist to identify optimization opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">Consider our Chronic Symptom Protocol for ongoing medication burden monitoring and optimization.</p>
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
            Optimization Plan
          </Button>
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'medication-burden-calculator-feedback'} size="lg" className="px-8">
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
                  This assessment identifies potential medication burden factors but does not replace professional pharmaceutical review. 
                  Always consult healthcare providers before making any changes to prescribed medications.
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
                <AccordionItem value="polypharmacy-assessment">
                  <AccordionTrigger className="text-sm font-medium">
                    Polypharmacy Assessment & Management
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Royal Pharmaceutical Society: Polypharmacy guidance and assessment tools</li>
                      <li>• NICE Guidelines: Medicines optimization for polypharmacy</li>
                      <li>• British National Formulary: Drug interaction screening protocols</li>
                      <li>• NHS England: Structured medication reviews framework</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="drug-interactions">
                  <AccordionTrigger className="text-sm font-medium">
                    Drug Interactions & Safety Screening
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Medicines and Healthcare products Regulatory Agency (MHRA): Interaction guidelines</li>
                      <li>• British Pharmacological Society: Drug interaction mechanisms</li>
                      <li>• Clinical Pharmacology & Therapeutics: Interaction risk assessment</li>
                      <li>• Royal College of General Practitioners: Prescribing safety protocols</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medication-burden">
                  <AccordionTrigger className="text-sm font-medium">
                    Medication Burden & Quality of Life
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Geriatrics Society: Medication burden in older adults</li>
                      <li>• Pharmacy Practice Research: Patient-reported medication burden</li>
                      <li>• International Journal of Clinical Pharmacy: Burden assessment tools</li>
                      <li>• Age and Ageing Journal: Medication complexity impact studies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medication-review">
                  <AccordionTrigger className="text-sm font-medium">
                    Structured Medication Reviews
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NHS Community Pharmacy: Medication review service standards</li>
                      <li>• Royal Pharmaceutical Society: Professional medication review guidelines</li>
                      <li>• NICE Quality Standard QS120: Medicines optimization (2016)</li>
                      <li>• Primary Care Pharmacy Association: Review protocols and frameworks</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="adherence-optimization">
                  <AccordionTrigger className="text-sm font-medium">
                    Medication Adherence & Optimization
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Patient Safety Agency: Medication adherence improvement strategies</li>
                      <li>• British Medical Journal: Adherence enhancement interventions</li>
                      <li>• Cochrane Reviews: Medication adherence systematic reviews</li>
                      <li>• Journal of Clinical Pharmacy and Therapeutics: Optimization approaches</li>
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