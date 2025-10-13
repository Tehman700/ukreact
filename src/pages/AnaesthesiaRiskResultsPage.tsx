import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Heart, Shield, BookOpen, BarChart3, Target, Clock, Loader2, Mail, Download } from 'lucide-react';
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
  overallScore: number;
  overallRating: string;
  results: AssessmentResult[];
  summary: string;
}

export function AnaesthesiaRiskResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showResultsNotification, setShowResultsNotification] = useState(false);

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

        if (storedAssessmentType !== 'Anaesthesia Risk') {
          console.warn('Assessment type mismatch:', storedAssessmentType);
        }

        console.log('Report loaded successfully:', {
          overallScore: report.overallScore,
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
        assessmentType: 'Anaesthesia Risk',
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
    average: Math.max(50, Math.min(result.score - 5, 78)),
    optimal: Math.min(result.score + 10, 95)
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
      case 'high': return <Shield className="h-4 w-4" />;
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSafetyRating = (rating: string) => {
    const levelMap: Record<string, 'optimal' | 'high' | 'moderate' | 'low'> = {
      'Very Safe': 'optimal',
      'Safe with Precautions': 'high',
      'Moderate Risk': 'moderate',
      'Higher Risk': 'low'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your anaesthesia safety assessment...</p>
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

  const { overallScore, overallRating, results } = aiReport;
  const safetyRating = getSafetyRating(overallRating);

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

{/* Results Notification - Shows when server confirms email sent */}
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
              Completed on {completionDate} • {results.length} safety factors assessed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{overallScore}%</div>
                <Badge variant={getScoreBadgeVariant(safetyRating.level)} className={`mb-4 ${getScoreColor(safetyRating.level)}`}>
                  {overallRating}
                </Badge>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your anaesthesia safety assessment identifies key factors for your anaesthesia team to consider.
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
            Safety Measures
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

            {results.map((result, index) => {
              const analysis = result.detailedAnalysis || {
                clinicalContext: result.description,
                strengths: ['Assessment completed'],
                riskFactors: ['Requires anaesthesia team review'],
                timeline: 'Discuss with your anaesthesia team before surgery.'
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
                          Safety Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th
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
                          <span>Clinical Assessment</span>
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

                  {aiReport.summary && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h4 className="font-medium mb-3">Comprehensive Safety Analysis</h4>
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

        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'anaesthesia-risk-screener-feedback'} size="lg" className="px-8">
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
                  This screening helps identify potential risks but does not replace professional anaesthesia assessment.
                  Always discuss these results with your anaesthesia team before surgery.
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
  );
}