import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Battery,Shield, BarChart3, Clock, Target, BookOpen, Loader2, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';


interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'excellent';
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

export function DailyEnergyResultsPage() {
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

        if (storedAssessmentType !== 'Daily Energy') {
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
          assessmentType: 'Daily Energy',
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
    average: 60,
    optimal: 85
  })) || [];

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'badge-level-optimal';
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
      case 'excellent': return <CheckCircle2 className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'moderate': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getOverallRating = (rating: string) => {
    const levelMap: Record<string, 'excellent' | 'high' | 'moderate' | 'low'> = {
      'Excellent Energy': 'excellent',
      'Good Energy': 'high',
      'Moderate Energy': 'moderate',
      'Low Energy': 'low'
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
            <p className="text-muted-foreground">Analyzing your energy patterns...</p>
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
  const rating = getOverallRating(overallRating);

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
                <CardTitle>Energy Assessment Complete</CardTitle>
              </div>
              <CardDescription>
                Completed on {completionDate} • {results.length} energy factors assessed
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
                  Your energy optimization assessment identifies key factors affecting your daily energy and stamina levels.
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
              Energy Optimization
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
                    <span>Your Energy Profile vs Population Averages</span>
                  </CardTitle>
                  <CardDescription>
                    How your energy optimization scores compare to general population benchmarks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-16">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-left font-medium mb-6 px-[0px] py-[10px] pt-[0px] pr-[0px] pb-[35px] pl-[0px]">{item.name}</h3>

                        <div className="relative max-w-lg mx-auto">
                          {(() => {
                            const rangeStart = Math.max(0, 40);
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
                                      <div className="text-xs text-muted-foreground whitespace-nowrap">Average Energy</div>
                                    </div>
                                  )}
                                  {Math.abs(optimalPosition - yourScorePosition) > 8 && Math.abs(optimalPosition - averagePosition) > 12 && (
                                    <div
                                      className="absolute text-center transform -translate-x-1/2"
                                      style={{ left: `${optimalPosition}%` }}
                                    >
                                      <div className="text-sm font-medium">{item.optimal}%</div>
                                      <div className="text-xs text-muted-foreground">Optimal Energy</div>
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
                  strengths: ['Good energy awareness'],
                  riskFactors: ['Continue optimization efforts'],
                  timeline: 'Benefits seen within 2-4 weeks.'
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
                            Energy Score: {result.score}/{result.maxScore} • Level: {result.level}
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
                            <span>Energy Assessment</span>
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
                                <span>Optimization Opportunities</span>
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
                            <span>Expected Timeline</span>
                          </h4>
                          <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                            {analysis.timeline}
                          </p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-2">Key Optimization Strategies</h4>
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
                    <Battery className="h-5 w-5" />
                    <span>Personalized Energy Optimization Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Evidence-based strategies to maximize your daily energy and stamina
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          {getLevelIcon(result.level)}
                          <h4 className="font-medium">{result.category}</h4>
                        </div>
                        <div className="pl-6 space-y-2">
                          {result.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start space-x-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

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

              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium">Start with High-Impact Changes</h4>
                        <p className="text-sm text-muted-foreground">Focus on the recommendations for your lowest-scoring areas first for maximum energy gains.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium">Track Energy Patterns</h4>
                        <p className="text-sm text-muted-foreground">Monitor your energy levels and sleep quality to measure improvement over time.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium">Consider Comprehensive Support</h4>
                        <p className="text-sm text-muted-foreground">Specialized energy management strategies can provide ongoing support for sustained improvements.</p>
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
              Energy Optimization
            </Button>
          </div>

          {allTabsViewed && (
            <div className="flex justify-center">
              <Button onClick={() => window.location.hash = 'daily-energy-feedback'} size="lg" className="px-8">
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
                    This energy assessment provides insights into your daily patterns but does not diagnose medical conditions.
                    Consult healthcare providers for persistent fatigue or significant energy concerns.
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
                  <AccordionItem value="sleep-energy">
                    <AccordionTrigger className="text-sm font-medium">
                      Sleep Quality & Energy Restoration
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• British Sleep Society: Sleep hygiene and energy recovery guidelines</li>
                        <li>• NICE Guidelines: Sleep disorders and daytime functioning</li>
                        <li>• Sleep Medicine Reviews: Sleep quality and energy level research</li>
                        <li>• Journal of Clinical Sleep Medicine: Energy restoration studies</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="circadian-rhythms">
                    <AccordionTrigger className="text-sm font-medium">
                      Circadian Rhythms & Energy Patterns
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• British Society for Chronobiology: Circadian rhythm research</li>
                        <li>• Nature Reviews Neuroscience: Circadian biology and energy metabolism</li>
                        <li>• Sleep and Biological Rhythms: Energy pattern optimization</li>
                        <li>• Current Biology: Circadian clock and energy homeostasis</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="nutrition-energy">
                    <AccordionTrigger className="text-sm font-medium">
                      Nutrition & Energy Metabolism
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• British Dietetic Association: Nutrition for energy optimization</li>
                        <li>• American Journal of Clinical Nutrition: Energy metabolism research</li>
                        <li>• European Journal of Clinical Nutrition: Diet and energy levels</li>
                        <li>• Nutrients Journal: Micronutrients and energy production</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="stress-energy">
                    <AccordionTrigger className="text-sm font-medium">
                      Stress Management & Energy Conservation
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• British Psychological Society: Stress and energy depletion</li>
                        <li>• Stress and Health Journal: Energy conservation strategies</li>
                        <li>• Psychoneuroendocrinology: Stress hormones and energy metabolism</li>
                        <li>• Mindfulness Research: Energy restoration through stress reduction</li>
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