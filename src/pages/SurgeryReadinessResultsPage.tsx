import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Shield, BarChart3, Clock, Target, BookOpen } from 'lucide-react';
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

export function SurgeryReadinessResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const assessmentTitle = "Surgery Readiness Score";
  const assessmentType = "Comprehensive Health Assessment";
  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const overallScore = 78;

  const results: AssessmentResult[] = [
    {
      category: "Physical Readiness",
      score: 82,
      maxScore: 100,
      level: "high",
      description: "Your physical condition shows good preparation for surgical procedures.",
      recommendations: [
        "Continue current exercise routine",
        "Maintain protein intake at 1.2g per kg body weight",
        "Consider adding flexibility training"
      ]
    },
    {
      category: "Metabolic Health",
      score: 75,
      maxScore: 100,
      level: "moderate",
      description: "Your metabolic markers indicate room for optimization before surgery.",
      recommendations: [
        "Focus on blood sugar stabilization",
        "Consider intermittent fasting protocol",
        "Increase omega-3 fatty acid intake"
      ]
    },
    {
      category: "Recovery Potential",
      score: 88,
      maxScore: 100,
      level: "optimal",
      description: "Excellent indicators for post-surgical healing and recovery.",
      recommendations: [
        "Maintain current sleep schedule",
        "Continue stress management practices",
        "Ensure adequate vitamin D levels"
      ]
    },
    {
      category: "Risk Factors",
      score: 65,
      maxScore: 100,
      level: "moderate",
      description: "Some risk factors identified that should be addressed pre-surgery.",
      recommendations: [
        "Schedule pre-operative consultation",
        "Review current medications with physician",
        "Consider smoking cessation program if applicable"
      ]
    },
    {
      category: "Preparation Status",
      score: 70,
      maxScore: 100,
      level: "moderate",
      description: "Your current preparation efforts are on track but could be enhanced.",
      recommendations: [
        "Implement structured pre-operative exercise program",
        "Create detailed recovery timeline and support plan",
        "Address any remaining lifestyle optimization areas"
      ]
    }
  ];

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    switch (category) {
      case "Physical Readiness":
        return {
          clinicalContext: "Based on your responses regarding exercise frequency, strength levels, and cardiovascular fitness, your physical readiness score of 82/100 indicates good baseline fitness. NHS guidelines recommend 150 minutes of moderate exercise weekly, which supports better surgical outcomes.",
          evidenceBase: [
            "Systematic reviews show physically active patients have reduced postoperative complications",
            "ERAS (Enhanced Recovery After Surgery) protocols demonstrate that preoperative fitness optimization can reduce hospital stay",
            "NHS guidance confirms that regular physical activity improves surgical recovery outcomes"
          ],
          riskFactors: ["Sedentary lifestyle is associated with increased venous thromboembolism risk", "Poor cardiovascular fitness may increase perioperative respiratory complications"],
          timeline: "4-8 weeks of targeted conditioning can improve surgical outcomes by up to 35%",
          benchmarkData: [
            { category: "Elite Athletes", score: 95 },
            { category: "Your Score", score: 82 },
            { category: "Average Patient", score: 65 },
            { category: "High Risk", score: 40 }
          ]
        };
      case "Metabolic Health":
        return {
          clinicalContext: "Your metabolic health assessment indicates areas for potential optimization. Blood glucose control and metabolic stability are important factors in surgical outcomes, particularly for wound healing and infection prevention.",
          evidenceBase: [
            "Diabetes UK and NICE guidelines emphasize optimal glycemic control before elective surgery",
            "Studies show improved metabolic control is associated with better surgical outcomes",
            "Perioperative medicine guidelines recommend metabolic optimization as part of preoperative care"
          ],
          riskFactors: ["Uncontrolled diabetes increases surgical site infection risk", "Poor metabolic control may affect wound healing"],
          timeline: "6-12 weeks metabolic optimization shows peak benefit for elective procedures",
          benchmarkData: [
            { category: "Optimal Control", score: 90 },
            { category: "Your Score", score: 75 },
            { category: "Average Patient", score: 70 },
            { category: "High Risk", score: 45 }
          ]
        };
      case "Recovery Potential":
        return {
          clinicalContext: "Your recovery potential score of 88/100 reflects positive indicators for postoperative recovery, including sleep patterns, stress management, and nutritional factors that support healing.",
          evidenceBase: [
            "Research demonstrates that adequate sleep (7-9 hours) supports immune function and healing",
            "Stress management techniques are associated with improved surgical recovery outcomes",
            "Adequate vitamin D levels support bone health and immune function during recovery"
          ],
          riskFactors: ["Sleep deprivation may affect immune function and healing", "Chronic stress can impact cortisol levels and wound healing processes"],
          timeline: "Current optimization status predicts 20-30% faster than average recovery",
          benchmarkData: [
            { category: "Your Score", score: 88 },
            { category: "Optimal Recovery", score: 95 },
            { category: "Average Patient", score: 65 },
            { category: "Delayed Recovery", score: 40 }
          ]
        };
      case "Risk Factors":
        return {
          clinicalContext: "Your risk assessment identifies modifiable factors that may influence surgical outcomes. Addressing these factors through lifestyle changes and medical optimization can help improve your surgical experience.",
          evidenceBase: [
            "NICE guidelines strongly recommend smoking cessation at least 4 weeks before surgery",
            "Medication review and optimization is standard practice in preoperative assessment",
            "Royal College of Surgeons emphasizes the importance of preoperative risk factor modification"
          ],
          riskFactors: ["Smoking significantly increases surgical complications and wound healing problems", "Uncontrolled hypertension increases cardiovascular risks during surgery"],
          timeline: "Risk factor modification most effective 6-8 weeks before surgery",
          benchmarkData: [
            { category: "Minimal Risk", score: 90 },
            { category: "Low Risk", score: 80 },
            { category: "Your Score", score: 65 },
            { category: "High Risk", score: 35 }
          ]
        };
      case "Preparation Status":
        return {
          clinicalContext: "Your preparation efforts show a good foundation with opportunities for further enhancement. Structured preoperative preparation is an evidence-based approach that can improve surgical experiences and outcomes.",
          evidenceBase: [
            "Enhanced Recovery After Surgery (ERAS) protocols are proven to reduce length of stay and improve outcomes",
            "Structured preoperative preparation programs are associated with reduced readmission rates",
            "NHS and NICE guidelines emphasize the importance of comprehensive preoperative preparation and patient education"
          ],
          riskFactors: ["Inadequate preparation may be associated with increased anxiety and poorer outcomes", "Limited surgical knowledge can contribute to higher preoperative anxiety"],
          timeline: "Peak benefit achieved with 4-6 week structured preparation programme",
          benchmarkData: [
            { category: "Fully Prepared", score: 95 },
            { category: "Well Prepared", score: 85 },
            { category: "Your Score", score: 70 },
            { category: "Unprepared", score: 40 }
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
    { name: "Physical Readiness", yourScore: 82, average: 65, optimal: 90 },
    { name: "Metabolic Health", yourScore: 75, average: 70, optimal: 85 },
    { name: "Recovery Potential", yourScore: 88, average: 65, optimal: 90 },
    { name: "Risk Factors", yourScore: 65, average: 70, optimal: 85 },
    { name: "Preparation Status", yourScore: 70, average: 60, optimal: 90 }
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
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getOverallRating = (score: number) => {
    if (score >= 85) return { rating: 'Excellent', level: 'optimal' };
    if (score >= 70) return { rating: 'Good', level: 'high' };
    if (score >= 55) return { rating: 'Fair', level: 'moderate' };
    return { rating: 'Needs Improvement', level: 'low' };
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
          <PaymentGate requiredFunnel="surgery-readiness">

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
              Completed on {completionDate} • {results.length} categories assessed
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
                Your overall assessment score indicates your current health status and readiness level.
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
                  <span>Your Performance vs Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your scores compare to average patients and optimal targets
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
                          <h4 className="text-center font-medium mb-4 pt-[0px] pr-[0px] pb-[30px] pl-[0px]">Performance Benchmark</h4>
                          
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

                      <Separator />

                      {/* Evidence Base */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Clinical Evidence</span>
                        </h4>
                        <ul className="space-y-2">
                          {analysis.evidenceBase.map((evidence, evidenceIndex) => (
                            <li key={evidenceIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <span className="text-green-600 mt-1 font-medium">✓</span>
                              <span>{evidence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

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
                  <span>Personalized Action Plan</span>
                </CardTitle>
                <CardDescription>
                  Based on your assessment results, here are your priority areas for improvement
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
                      <h3 className="font-medium mb-2">Excellent Results!</h3>
                      <p className="text-muted-foreground">
                        Your assessment shows optimal levels across all categories. Continue your current health practices.
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
            <Button onClick={() => window.location.hash = 'surgery-readiness-assessment-feedback'} size="lg" className="px-8">
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
                <AccordionItem value="physical-activity">
                  <AccordionTrigger className="text-sm font-medium">
                    Physical Activity & Surgery
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NHS Physical Activity Guidelines (2019). Available at: nhs.uk/live-well/exercise</li>
                      <li>• NICE Guideline NG180: Perioperative care in adults (2020)</li>
                      <li>• Enhanced Recovery After Surgery (ERAS) Society Guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="metabolic-health">
                  <AccordionTrigger className="text-sm font-medium">
                    Metabolic Health & Surgical Outcomes
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline CG15: Type 1 diabetes in adults (2022)</li>
                      <li>• Diabetes UK: Surgery and diabetes guidance</li>
                      <li>• Royal College of Surgeons: Perioperative management of diabetes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sleep-stress">
                  <AccordionTrigger className="text-sm font-medium">
                    Sleep, Stress & Recovery
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Sleep Foundation: Sleep and Surgery Recovery Guidelines</li>
                      <li>• British Association for Psychopharmacology: Perioperative anxiety management</li>
                      <li>• NHS: Vitamin D recommendations and surgical outcomes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="risk-modification">
                  <AccordionTrigger className="text-sm font-medium">
                    Risk Factor Modification
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Guideline PH48: Smoking cessation in secondary care (2013)</li>
                      <li>• Royal College of Surgeons: Smoking and surgery guidance</li>
                      <li>• British Hypertension Society: Perioperative blood pressure management</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="preoperative-prep">
                  <AccordionTrigger className="text-sm font-medium">
                    Preoperative Preparation
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• NICE Quality Standard QS174: Perioperative care (2018)</li>
                      <li>• Royal College of Anaesthetists: Preoperative assessment guidelines</li>
                      <li>• ERAS Society: Enhanced Recovery After Surgery protocols</li>
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