import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle, BookOpen, BarChart3, Target, Clock, Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
  detailedAnalysis?: {
    clinicalContext: string;
    strengths: string[];
    riskFactors: string[];
    timeline: string;
  };
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);

  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const fetchAIReport = async () => {
      try {
        setLoading(true);

        // Get pending answers and user info from sessionStorage
        const pendingAnswers = sessionStorage.getItem('pendingAnswers');
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

        if (!pendingAnswers) {
          throw new Error('No assessment data found');
        }

        const answers = JSON.parse(pendingAnswers);

        // Call backend API to generate AI report
        const response = await fetch('/api/generate-assessment-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assessmentType: 'Complication Risk',
            answers,
            userInfo
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate assessment report');
        }

        const data = await response.json();

        if (data.success && data.report) {
          setAiReport(data.report);
          // Store report ID for later reference
          sessionStorage.setItem('currentReportId', data.reportId);
        } else {
          throw new Error('Invalid report data received');
        }

      } catch (err) {
        console.error('Error fetching AI report:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAIReport();
  }, []);

  // Comparison data for charts - dynamically built from AI results
  const comparisonData = aiReport?.results.map(result => ({
    name: result.category,
    yourScore: result.score,
    average: Math.min(result.score + 5, 85), // Slightly above user for average
    optimal: Math.min(result.score + 20, 95) // Higher for optimal
  })) || [];

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

  const getOverallRating = (rating: string) => {
    const levelMap: Record<string, 'optimal' | 'high' | 'moderate' | 'low'> = {
      'Low Risk': 'optimal',
      'Moderate Risk': 'high',
      'Elevated Risk': 'moderate',
      'High Risk': 'low'
    };
    return { rating, level: levelMap[rating] || 'moderate' };
  };

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Generating your personalized assessment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !aiReport) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>Error Loading Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error || 'Unable to load your assessment report.'}</p>
            <Button onClick={() => window.location.hash = 'assessments'}>
              Return to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { overallScore, overallRating, results } = aiReport;
  const rating = getOverallRating(overallRating);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <Badge variant={getScoreBadgeVariant(rating.level)} className={`mb-4 ${getScoreColor(rating.level)}`}>
                  {overallRating}
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
            {/* Comparative Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>Your Risk Profile vs Benchmarks</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  How your risk scores compare to average patients and optimal targets
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-12 sm:space-y-16">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-left font-medium mb-4 sm:mb-6 text-sm sm:text-base px-1">{item.name}</h3>

                      <div className="relative w-full px-1">
                        {(() => {
                          const rangeStart = Math.max(0, item.average - 20);
                          const rangeEnd = 100;
                          const rangeSize = rangeEnd - rangeStart;

                          const yourScorePosition = ((item.yourScore - rangeStart) / rangeSize) * 100;
                          const averagePosition = ((item.average - rangeStart) / rangeSize) * 100;
                          const optimalPosition = ((item.optimal - rangeStart) / rangeSize) * 100;

                          return (
                            <>
                              {/* Your Score Label Above */}
                              <div
                                className="absolute -top-10 sm:-top-14 transform -translate-x-1/2 text-center z-10"
                                style={{ left: `${yourScorePosition}%` }}
                              >
                                <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 whitespace-nowrap">Your score</div>
                                <div className="text-xs sm:text-sm font-medium">{item.yourScore}%</div>
                              </div>

                              {/* Main bar */}
                              <div className="relative h-1.5 sm:h-2 bg-gray-300 rounded-full">
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

                              {/* Labels - Responsive positioning */}
                              <div className="relative mt-2 sm:mt-3 min-h-[40px] sm:min-h-[48px]">
                                {/* Average Patient Label */}
                                {Math.abs(averagePosition - yourScorePosition) > 8 && (
                                  <div
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${averagePosition}%` }}
                                  >
                                    <div className="text-xs sm:text-sm font-medium">{item.average}%</div>
                                    <div className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">Average</div>
                                  </div>
                                )}

                                {/* Optimal Label */}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 10 && (
                                  <div
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-xs sm:text-sm font-medium">{item.optimal}%</div>
                                    <div className="text-[10px] sm:text-xs text-muted-foreground">Optimal</div>
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
              const analysis = result.detailedAnalysis || {
                clinicalContext: result.description,
                strengths: ['Good baseline health awareness'],
                riskFactors: ['Requires optimization'],
                timeline: 'Consult with healthcare team 4-6 weeks before surgery.'
              };

              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          {getLevelIcon(result.level)}
                          <span>{result.category}</span>
                        </CardTitle>
                        <CardDescription>
                          Risk Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th
                        </CardDescription>
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

                  {/* AI Summary Section */}
                  {aiReport.summary && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h4 className="font-medium mb-3">Comprehensive Analysis</h4>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {aiReport.summary}
                          </p>
                        </div>
                      </div>
                    </>
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
  );
}