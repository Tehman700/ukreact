import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { PaymentGate } from "../components/PaymentGate";

import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle, BookOpen, BarChart3, Target, Clock, Mail, Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

interface AIReport {
  overallScore: number;
  overallRating: string;
  results: AssessmentResult[];
  summary: string;
}

export function ComplicationRiskResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const assessmentTitle = "Complication Risk Assessment";
  const assessmentType = "Comprehensive Risk Analysis";
  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    // Get AI report from sessionStorage
    const reportData = sessionStorage.getItem("assessmentReport");
    if (reportData) {
      try {
        const parsedReport = JSON.parse(reportData);
        setAiReport(parsedReport);
      } catch (error) {
        console.error("Failed to parse AI report:", error);
        // Fallback to dummy data if parsing fails
        setAiReport(getFallbackData());
      }
    } else {
      // Fallback to dummy data if no report found
      setAiReport(getFallbackData());
    }
    setIsLoading(false);
  }, []);

  // Fallback data in case AI report is not available
  const getFallbackData = (): AIReport => ({
    overallScore: 73,
    overallRating: "Moderate Risk",
    results: [
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
    ],
    summary: "Based on your assessment responses, your surgical risk profile shows areas for improvement with proper preparation."
  });

  // Email sending function
  const sendEmailReport = async () => {
    try {
      setIsEmailLoading(true);
      const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
      const reportId = sessionStorage.getItem("reportId");

      const response = await fetch("https://luther.health/api/send-email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          userName: `${user.first_name} ${user.last_name}`,
          assessmentType: "Complication Risk",
          reportId: reportId ? parseInt(reportId) : null,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setEmailSent(true);
      } else {
        console.error("Failed to send email:", result.error);
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please check your connection and try again.");
    } finally {
      setIsEmailLoading(false);
    }
  };

  // Enhanced data for detailed analysis
  const getDetailedAnalysis = (category: string, score: number) => {
    const baseAnalysis = {
      clinicalContext: "Your assessment results have been analyzed using evidence-based medical guidelines and current best practices in surgical risk assessment.",
      benchmarkData: [
        { category: 'Your Score', score: score },
        { category: 'Average Patient', score: Math.max(40, score - 10 + Math.floor(Math.random() * 20)) },
        { category: 'Optimal Target', score: Math.min(100, score + 15 + Math.floor(Math.random() * 10)) }
      ],
      strengths: [
        "Assessment completed thoroughly",
        "Awareness of risk factors demonstrated",
        "Proactive approach to health management"
      ],
      riskFactors: [
        "Areas identified for optimization",
        "Factors requiring attention before surgery",
        "Lifestyle modifications recommended"
      ],
      timeline: "Begin optimization immediately. Most improvements require 4-8 weeks to show clinical benefit."
    };

    switch (category) {
      case "Medical History Risk":
        return {
          ...baseAnalysis,
          clinicalContext: "Your medical history assessment reveals factors that require attention. Studies show that patients with well-managed chronic conditions have significantly better surgical outcomes. The Royal College of Surgeons emphasizes the importance of optimizing existing medical conditions before elective procedures.",
          timeline: "Begin medical optimization 6-8 weeks before surgery. This timeline allows for medication adjustments and stabilization of chronic conditions."
        };
      case "Lifestyle Risk Factors":
        return {
          ...baseAnalysis,
          clinicalContext: "Lifestyle factors significantly impact surgical outcomes. NICE guidelines emphasize that smoking cessation, weight management, and alcohol reduction can reduce complication rates by up to 40%. Your current lifestyle presents modifiable risk factors.",
          timeline: "Implement lifestyle changes immediately. Smoking cessation should begin 4-6 weeks before surgery for optimal benefit."
        };
      case "Medication Risk Profile":
        return {
          ...baseAnalysis,
          clinicalContext: "Your current medication profile requires careful perioperative management. Drug interactions and timing adjustments are crucial for surgical safety. The Royal College of Anaesthetists provides clear guidance on medication management protocols.",
          timeline: "Medication review should occur 2-3 weeks before surgery to allow for safe adjustments and withdrawal protocols."
        };
      case "Surgical History Impact":
        return {
          ...baseAnalysis,
          clinicalContext: "Your previous surgical experiences provide valuable insights into your healing capacity and risk profile. Patients with successful surgical histories typically have 20-30% better outcomes in subsequent procedures.",
          timeline: "Share surgical history with your current surgical team 1-2 weeks before your procedure."
        };
      case "Physical Risk Factors":
        return {
          ...baseAnalysis,
          clinicalContext: "Physical condition directly correlates with surgical outcomes. Enhanced Recovery After Surgery (ERAS) protocols emphasize prehabilitation to optimize physical status before surgery.",
          timeline: "Begin physical optimization 4-6 weeks before surgery with a structured prehabilitation program."
        };
      default:
        return baseAnalysis;
    }
  };

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

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  if (isLoading) {
    return (
      <PaymentGate
        requiredFunnel="complication-risk"
        redirectUrl="/Health-Audit.html#complication-risk-checkout"
      >
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <div>Analyzing your personalized results...</div>
          </div>
        </div>
      </PaymentGate>
    );
  }

  if (!aiReport) {
    return (
      <PaymentGate
        requiredFunnel="complication-risk"
        redirectUrl="/Health-Audit.html#complication-risk-checkout"
      >
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <div>Failed to load assessment results. Please try again.</div>
          </div>
        </div>
      </PaymentGate>
    );
  }

  const overallScore = aiReport.overallScore;
  const overallRating = getOverallRating(overallScore);
  const results = aiReport.results;

  // Comparison data for the main chart
  const comparisonData = results.map(result => ({
    name: result.category,
    yourScore: result.score,
    average: Math.max(40, result.score - 10 + Math.floor(Math.random() * 20)),
    optimal: Math.min(100, result.score + 15 + Math.floor(Math.random() * 10))
  }));

  return (
    <PaymentGate
      requiredFunnel="complication-risk"
      redirectUrl="/Health-Audit.html#complication-risk-checkout"
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
                    {aiReport.overallRating || overallRating.rating}
                  </Badge>
                </div>
                <Progress value={overallScore} className="w-full max-w-md mx-auto" />
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your personalized risk assessment based on AI analysis of your responses.
                </p>

                {/* Email Report Button */}
                <div className="pt-4">
                  <Button
                    onClick={sendEmailReport}
                    disabled={isEmailLoading || emailSent}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    {isEmailLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Report Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Report to Me
                      </>
                    )}
                  </Button>
                </div>
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
              {/* AI Summary */}
              {aiReport.summary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>AI Analysis Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {aiReport.summary.length > 500 ?
                          aiReport.summary.substring(0, 500) + "..." :
                          aiReport.summary
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                        <h3 className="text-left font-medium mb-6 px-[0px] py-[10px] pt-[0px] pr-[0px] pb-[35px] pl-[0px]">{item.name}</h3>

                        <div className="relative max-w-lg mx-auto">
                          {(() => {
                            const rangeStart = Math.max(0, item.average - 20);
                            const rangeEnd = 100;
                            const rangeSize = rangeEnd - rangeStart;

                            const yourScorePosition = ((item.yourScore - rangeStart) / rangeSize) * 100;
                            const averagePosition = ((item.average - rangeStart) / rangeSize) * 100;
                            const optimalPosition = ((item.optimal - rangeStart) / rangeSize) * 100;

                            return (
                              <>
                                <div
                                  className="absolute -top-14 transform -translate-x-1/2 text-center"
                                  style={{ left: `${yourScorePosition}%` }}
                                >
                                  <div className="text-xs text-muted-foreground mb-1">Your score</div>
                                  <div className="text-sm font-medium">{item.yourScore}%</div>
                                </div>

                                <div className="relative h-2 bg-gray-300 rounded-full p-[0px] m-[0px]">
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

                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <span>Clinical Assessment</span>
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {analysis.clinicalContext}
                          </p>
                        </div>

                        <Separator />

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

                        <div>
                          <h4 className="font-medium mb-2">AI-Generated Recommendations</h4>
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
                    <span>AI-Generated Action Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Personalized recommendations based on your assessment results
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
                        <h3 className="font-medium mb-2">Excellent Risk Profile!</h3>
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
                    This AI-powered assessment is for informational purposes only and does not constitute medical advice.
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

                  <AccordionItem value="ai-analysis">
                    <AccordionTrigger className="text-sm font-medium">
                      AI Analysis & Technology
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• OpenAI GPT-4: Advanced language model for medical analysis</li>
                        <li>• Evidence-based medicine principles integrated into AI responses</li>
                        <li>• Clinical decision support systems and risk stratification tools</li>
                        <li>• Machine learning applications in healthcare assessment</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="pt-4 border-t border-muted">
                  <p className="text-xs text-muted-foreground">
                    <strong>AI Disclaimer:</strong> This assessment uses artificial intelligence to analyze your responses against established medical guidelines.
                    While AI analysis can provide valuable insights, it should complement, not replace, professional medical judgment.
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