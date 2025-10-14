import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2,Shield,TrendingUp, Clock, BarChart3, Target, BookOpen, Zap, Loader2, Mail } from 'lucide-react';
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

export function ResilienceIndexResultsPage() {
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

        if (storedAssessmentType !== 'Resilience Index') {
          console.warn('Assessment type mismatch:', storedAssessmentType);
        }

        console.log('Report loaded successfully:', {
          overallScore: report.overallScore,
          categoriesCount: report.results?.length || 0
        });

        setAiReport(report);

        // Check if page is being accessed by Puppeteer (look for common indicators)
        const isPuppeteer =
          navigator.webdriver ||
          window.navigator.userAgent.includes('HeadlessChrome') ||
          window.navigator.userAgent.includes('Puppeteer') ||
          // Check for URL parameter that Puppeteer can add
          new URLSearchParams(window.location.search).get('puppeteer') === 'true';

        // Only show email popup if NOT in Puppeteer
        if (!isPuppeteer) {
          setShowEmailPopup(true);
        }

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
    // Show sent state
    setEmailSent(true);

    // Close popup after 2 seconds
    setTimeout(() => {
      setShowEmailPopup(false);
      setEmailSent(false);
    }, 2000);

    try {
      const userInfoStr = sessionStorage.getItem('currentUser') || sessionStorage.getItem('userInfo');
      if (!userInfoStr) {
        console.error('User information not found');
        return;
      }

      const userInfo = JSON.parse(userInfoStr);
      const currentPageUrl = window.location.href;

      // Send email in background
      fetch('https://luther.health/api/send-email-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userInfo.email,
          userName: `${userInfo.first_name} ${userInfo.last_name}`,
          assessmentType: 'Resilience Index',
          report: aiReport,
          reportId: Date.now(),
          pageUrl: currentPageUrl,
          activeTab: activeTab
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Email sent successfully:', data);
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });

    } catch (error) {
      console.error('Error preparing email:', error);
    }
  };

  const handleSkipEmail = () => {
    setShowEmailPopup(false);
  };

  const comparisonData = aiReport?.results.map(result => ({
    name: result.category,
    yourScore: result.score,
    average: 65,
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

  const getResilienceLevelColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 55) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getResilienceLevelText = (rating: string) => {
    return rating || 'High Resilience';
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
            <p className="text-muted-foreground">Analyzing your resilience profile...</p>
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

  return (
      <div className="min-h-screen bg-background">
            {/* Email Popup - Shows immediately on page load */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {emailSent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Sent!</span>
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
              <div>
                <p className="text-muted-foreground mb-6">
                  {emailSent
                    ? 'Your report will be sent to your email shortly.'
                    : 'Would you like a copy of your personalised report emailed to you?'
                  }
                </p>
                {!emailSent && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleEmailReport}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Yes, Email Me
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSkipEmail}
                      className="flex-1"
                    >
                      No Thanks
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
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
                Completed on {completionDate} • {results.length} resilience factors assessed
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold mb-2 text-green-600">{overallScore}%</div>
                  <p className="text-muted-foreground mb-2">Overall Resilience Index</p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <Badge variant="default" className={getResilienceLevelColor(overallScore)}>
                      {getResilienceLevelText(overallRating)}
                    </Badge>
                    <span className="text-muted-foreground">
                      {overallScore >= 85 ? 'Exceptional mental fortitude' :
                       overallScore >= 70 ? 'Strong mental fortitude' :
                       overallScore >= 55 ? 'Developing resilience' : 'Building resilience capacity'}
                    </span>
                  </div>
                </div>
                <Progress value={overallScore} className="w-full max-w-md mx-auto" />
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your resilience assessment reveals your capacity to adapt, recover, and thrive under pressure.
                </p>
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
              Resilience Plan
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
                    <span>Your Resilience Profile vs Population Benchmarks</span>
                  </CardTitle>
                  <CardDescription>
                    How your mental and emotional resilience compares to typical resilience patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-16">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-left font-medium mb-6">{item.name}</h3>

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
                                      <div className="text-xs text-muted-foreground whitespace-nowrap">Population Average</div>
                                    </div>
                                  )}
                                  {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                    <div
                                      className="absolute text-center transform -translate-x-1/2"
                                      style={{ left: `${optimalPosition}%` }}
                                    >
                                      <div className="text-sm font-medium">{item.optimal}%</div>
                                      <div className="text-xs text-muted-foreground">Peak Resilience</div>
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
                  riskFactors: ['Consult with mental performance specialist'],
                  timeline: 'Improvements typically occur within 8-12 weeks of consistent practice.'
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
                            <span>Resilience Assessment</span>
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
                              <h4 className="font-medium mb-2 flex items-center space-x-2 text-blue-600">
                                <Zap className="h-4 w-4" />
                                <span>Development Opportunities</span>
                              </h4>
                              <ul className="space-y-1">
                                {analysis.riskFactors.map((risk, riskIndex) => (
                                  <li key={riskIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">→</span>
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
                            <span>Development Timeline</span>
                          </h4>
                          <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                            {analysis.timeline}
                          </p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-2">Key Resilience Strategies</h4>
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
                  <CardTitle>Personalized Resilience Building Plan</CardTitle>
                  <CardDescription>
                    Evidence-based strategies to strengthen mental toughness and adaptive capacity
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
                    <CardTitle>Comprehensive Analysis</CardTitle>
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
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium">Focus on Growth Areas</h4>
                        <p className="text-sm text-muted-foreground">Start with the resilience factors where you scored lowest for maximum impact.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium">Practice Stress Inoculation</h4>
                        <p className="text-sm text-muted-foreground">Regularly expose yourself to controlled stress to build adaptive capacity.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium">Track Progress Over Time</h4>
                        <p className="text-sm text-muted-foreground">Monitor resilience indicators and retake assessments to measure growth.</p>
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
              Resilience Plan
            </Button>
          </div>

          {allTabsViewed && (
            <div className="flex justify-center">
              <Button onClick={() => window.location.hash = 'resilience-index-feedback'} size="lg" className="px-8">
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
                    This resilience assessment provides insights into mental and emotional resilience patterns but does not diagnose psychological conditions.
                    Consult mental health professionals for comprehensive psychological evaluation and personalized support.
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
                        <AccordionItem value="stress-response">
                          <AccordionTrigger className="text-sm font-medium">
                            Stress Response & Adaptation
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• Journal of Applied Psychology: Stress inoculation and resilience training</li>
                              <li>• Nature Neuroscience: Neuroplasticity and stress adaptation mechanisms</li>
                              <li>• British Journal of Psychology: Cognitive resilience assessment methods</li>
                              <li>• Clinical Psychology Review: Stress management and mental toughness</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="recovery-capacity">
                          <AccordionTrigger className="text-sm font-medium">
                            Recovery Capacity & Bounce-Back
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• Psychological Science: Recovery patterns from adversity</li>
                              <li>• Journal of Personality: Individual differences in resilience</li>
                              <li>• Applied Psychology Health: Mental recovery and adaptation</li>
                              <li>• Resilience Research: Post-traumatic growth and recovery mechanisms</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="adaptability">
                          <AccordionTrigger className="text-sm font-medium">
                            Adaptability & Change Management
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• Journal of Organizational Behavior: Adaptability and performance</li>
                              <li>• Cognitive Science: Flexibility and problem-solving capacity</li>
                              <li>• Applied Psychology: Change adaptation strategies</li>
                              <li>• Harvard Business Review: Adaptive capacity in high performers</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="resilience-strategies">
                          <AccordionTrigger className="text-sm font-medium">
                            Resilience Building Strategies
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• Journal of Positive Psychology: Evidence-based resilience interventions</li>
                              <li>• Clinical Psychology Science: Mental toughness training protocols</li>
                              <li>• British Medical Journal: Psychological resilience and health outcomes</li>
                              <li>• Lancet Psychiatry: Resilience interventions and mental health</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="pt-4 border-t border-muted">
                        <p className="text-xs text-muted-foreground">
                          <strong>Disclaimer:</strong> This resilience assessment is based on validated psychological research and resilience measurement tools. Results are for informational purposes and should not replace professional psychological consultation. Individual resilience capacity may vary based on personal history, current circumstances, and environmental factors not captured in this assessment.
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