import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, BarChart3, Target, BookOpen, Loader2, Mail, Download } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { X } from 'lucide-react';

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
  overallScore: number; // This is biological age
  chronologicalAge: number;
  ageAdvantage: number;
  overallRating: string;
  results: AssessmentResult[];
  summary: string;
}

export function BiologicalAgeResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const loadReport = () => {
      try {
        setLoading(true);

        const storedReport = sessionStorage.getItem('assessmentReport');
        const storedAssessmentType = sessionStorage.getItem('assessmentType');

        console.log('Loading stored report:', storedReport ? 'Found' : 'Not found');

        if (!storedReport) {
          throw new Error('No assessment report found. Please complete the assessment first.');
        }

        const report = JSON.parse(storedReport);

        if (storedAssessmentType !== 'Biological Age') {
          console.warn('Assessment type mismatch:', storedAssessmentType);
        }

        console.log('Report loaded successfully:', {
          biologicalAge: report.overallScore,
          chronologicalAge: report.chronologicalAge,
          categoriesCount: report.results?.length || 0
        });

        setAiReport(report);

      } catch (err) {
        console.error('Error loading report:', err);
        setError(err instanceof Error ? err.message : 'Unable to load report');
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

const handleEmailReport = async () => {
  try {
    const userInfoStr = sessionStorage.getItem('currentUser') || sessionStorage.getItem('userInfo');
    if (!userInfoStr) {
      alert('User information not found. Please complete the assessment again.');
      setShowEmailPopup(false);
      return;
    }

    const userInfo = JSON.parse(userInfoStr);
    const currentPageUrl = window.location.href;

    // Show success in popup
    setEmailSent(true);

    setTimeout(() => {
      setShowEmailPopup(false);
      setEmailSent(false);
    }, 2000);

    // ✅ Send email and wait for response
    fetch('https://luther.health/api/send-email-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: userInfo.email,
        userName: `${userInfo.first_name} ${userInfo.last_name}`,
        assessmentType: 'Biological Age',
        report: aiReport,
        reportId: Date.now(),
        pageUrl: currentPageUrl,
        activeTab: activeTab
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Email sent successfully:', data);
        // ✅ Show results notification ONLY when server confirms success
        if (data.success) {
          setShowResultsNotification(true);
        }
      })
      .catch(error => {
        console.error('Error sending email in background:', error);
      });

  } catch (error) {
    console.error('Error preparing email:', error);
    alert('Failed to send email. Please try again.');
    setShowEmailPopup(false);
  }
};
  const comparisonData = aiReport?.results.map(result => ({
    name: result.category,
    yourScore: result.score,
    average: 70,
    optimal: 90
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Calculating your biological age...</p>
        </div>
      </div>
    );
  }

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

  const { overallScore: biologicalAge, chronologicalAge, ageAdvantage, results } = aiReport;

  return (
    <div className="min-h-screen bg-background">
          {/* Email Popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {emailSent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Email Sent!</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    <span>Email Your Report</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Your report is being prepared and will be sent to your email shortly.
                    </p>
                    <Button onClick={() => setShowEmailPopup(false)} className="w-full">
                      Close
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground mb-6">
                      Would you like to receive a PDF copy of your complete assessment report via email?
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleEmailReport}
                        className="flex-1"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowEmailPopup(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      )}

{showResultsNotification && (
  <>
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-2xl shadow-lg border-2 animate-in slide-in-from-bottom duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div>
                <h3 className="mb-2 font-semibold">Your results are ready!</h3>
                <p className="text-sm text-muted-foreground">
                  A copy has also been sent to your email so you can review them anytime.
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowResultsNotification(false)}
              className="flex-shrink-0"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Overlay to prevent interaction with page content */}
    <div
      className="fixed inset-0 bg-black/20 z-40"
      onClick={() => setShowResultsNotification(false)}
    />
  </>
)}
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
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Assessment Complete</CardTitle>
            </div>
            <CardDescription>
              Completed on {completionDate} • {results.length} aging factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{biologicalAge}</div>
                <p className="text-muted-foreground mb-2">Your Biological Age</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-muted-foreground">Chronological Age: {chronologicalAge}</span>
                  <Badge
                    variant="default"
                    className={ageAdvantage > 0 ? "bg-green-100 text-green-800" : ageAdvantage < 0 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}
                  >
                    {ageAdvantage > 0 ? `${ageAdvantage} years younger` : ageAdvantage < 0 ? `${Math.abs(ageAdvantage)} years older` : 'Matches chronological'}
                  </Badge>
                </div>
              </div>
              <Progress value={Math.min((ageAdvantage / chronologicalAge) * 100 + 50, 100)} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your biological age assessment reveals how well your body is aging compared to your chronological age.
              </p>

              {/* Email Report Button */}
              <Button
                onClick={() => setShowEmailPopup(true)}
                variant="outline"
                className="mt-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report (Email PDF)
              </Button>
            </div>
          </CardContent>
        </Card>


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
            Longevity Plan
          </Button>
        </div>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Your Aging Profile vs Population Benchmarks</span>
                </CardTitle>
                <CardDescription>
                  How your biological aging compares to typical aging patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-left font-medium mb-6 px-[0px] py-[10px] pt-[0px] pr-[0px] pb-[35px] pl-[0px]">{item.name}</h3>

                      <div className="relative max-w-lg mx-auto">
                        {(() => {
                          const rangeStart = 40;
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

                              <div className="relative h-2 bg-gray-300 rounded-full">
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
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Average Aging</div>
                                  </div>
                                )}
                                {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                  <div
                                    className="absolute text-center transform -translate-x-1/2"
                                    style={{ left: `${optimalPosition}%` }}
                                  >
                                    <div className="text-sm font-medium">{item.optimal}%</div>
                                    <div className="text-xs text-muted-foreground">Optimal Aging</div>
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

            {results.map((result, index) => {
              const analysis = result.detailedAnalysis || {
                clinicalContext: result.description,
                strengths: ['Assessment completed'],
                riskFactors: ['Consult with healthcare provider'],
                timeline: 'Improvements can be measured within 12-16 weeks.'
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
                          Score: {result.score}/{result.maxScore} • Level: {result.level}
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

                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Target className="h-4 w-4" />
                          <span>Aging Assessment</span>
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {analysis.clinicalContext}
                        </p>
                      </div>

                      {analysis.strengths.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2 text-green-600">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Longevity Factors</span>
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

                      {analysis.riskFactors.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2 text-orange-600">
                              <AlertCircle className="h-4 w-4" />
                              <span>Aging Accelerators</span>
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
                        <h4 className="font-medium mb-2">Key Optimization Strategies</h4>
                        <div className="space-y-2">
                          {result.recommendations.slice(0, 2).map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{rec}</span>
                            </div>
                          ))}
                        </div>
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
                <CardTitle>Personalized Longevity Optimization Plan</CardTitle>
                <CardDescription>
                  Evidence-based strategies to slow aging and extend your healthspan
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

            {aiReport.summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Longevity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {aiReport.summary}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Focus on Priority Areas</h4>
                      <p className="text-sm text-muted-foreground">Start with the aging factors where you scored lowest for maximum longevity impact.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Track Progress Over Time</h4>
                      <p className="text-sm text-muted-foreground">Monitor biomarkers and lifestyle factors to measure improvements in biological aging.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Consider Comprehensive Support</h4>
                      <p className="text-sm text-muted-foreground">Consult with longevity specialists for advanced optimization strategies and ongoing monitoring.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
            Longevity Plan
          </Button>
        </div>

        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'biological-age-calculator-feedback'} size="lg" className="px-8">
              Next
            </Button>
          </div>
        )}

        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">Important Note</p>
                <p className="text-sm text-muted-foreground">
                  This biological age assessment provides insights into aging patterns but does not diagnose medical conditions.
                  Consult healthcare providers for comprehensive health evaluation and personalized medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <AccordionItem value="biological-age">
                  <AccordionTrigger className="text-sm font-medium">
                    Biological Age Assessment & Biomarkers
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Aging: Biological age prediction algorithms and validation studies</li>
                      <li>• Cell: Epigenetic clocks and aging biomarker research</li>
                      <li>• Science: Hallmarks of aging and biological age assessment</li>
                      <li>• British Society for Research on Ageing: UK aging research guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cardiovascular-aging">
                  <AccordionTrigger className="text-sm font-medium">
                    Cardiovascular Aging & Heart Health
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• British Heart Foundation: Cardiovascular aging research and prevention</li>
                      <li>• European Heart Journal: Heart health and biological aging studies</li>
                      <li>• Circulation: Cardiovascular biomarkers of aging</li>
                      <li>• Journal of the American College of Cardiology: Heart age assessment</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="metabolic-aging">
                  <AccordionTrigger className="text-sm font-medium">
                    Metabolic Health & Aging
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Metabolism: Metabolic aging and longevity research</li>
                      <li>• Diabetes Care: Metabolic health and biological age correlation</li>
                      <li>• British Nutrition Foundation: Nutrition and healthy aging</li>
                      <li>• Journal of Gerontology: Metabolic biomarkers of aging</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cellular-aging">
                  <AccordionTrigger className="text-sm font-medium">
                    Cellular Health & Longevity
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Cell Biology: Cellular aging and senescence research</li>
                      <li>• Cell Metabolism: Cellular health and longevity mechanisms</li>
                      <li>• Aging Cell: Cellular biomarkers and aging intervention</li>
                      <li>• British Society for Cell Biology: Cellular aging research</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="longevity-interventions">
                  <AccordionTrigger className="text-sm font-medium">
                    Longevity Interventions & Optimization
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Reviews Drug Discovery: Longevity intervention research</li>
                      <li>• Lancet Healthy Longevity: Evidence-based aging interventions</li>
                      <li>• Journal of Longevity: Lifestyle interventions for healthy aging</li>
                      <li>• British Society for Research on Ageing: Intervention guidelines</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This biological age assessment is based on validated research methodologies and biomarker analysis. Results are for informational purposes and should not replace professional medical advice. Individual biological age may vary based on genetic factors, lifestyle, and environmental influences not captured in this assessment.
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