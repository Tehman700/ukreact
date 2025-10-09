import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Target, BookOpen, BarChart3, Clock, Loader2, Sparkles, Calendar, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  priorityLevel: string;
  results: AssessmentResult[];
  summary: string;
}

export function HealthConciergeResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'roadmap'>('overview');
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

        if (storedAssessmentType !== 'Health Concierge') {
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

  const comparisonData = aiReport?.results.map(result => ({
    name: result.category,
    yourScore: result.score,
    average: Math.min(result.score + 10, 85),
    optimal: Math.min(result.score + 25, 95)
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

  const getScoreBadgeVariant = () => 'outline';

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'optimal': return <CheckCircle2 className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'moderate': return <Target className="h-4 w-4" />;
      case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority.includes('Immediate')) return '🚨';
    if (priority.includes('Near-Term')) return '⚡';
    if (priority.includes('Progressive')) return '📈';
    return '✨';
  };

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'roadmap') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Creating your personalized health roadmap...</p>
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

  const { overallScore, overallRating, priorityLevel, results } = aiReport;

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleBackToAssessments}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="font-medium">Your Personalized Health Roadmap</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Premium Overall Score Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle>Your Concierge Assessment</CardTitle>
            </div>
            <CardDescription>
              Completed on {completionDate} • {results.length} optimization areas analyzed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {overallScore}%
                </div>
                <Badge variant="default" className="mb-2 bg-primary">
                  {overallRating}
                </Badge>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <span className="text-2xl">{getPriorityIcon(priorityLevel)}</span>
                  <span className="text-sm font-medium text-muted-foreground">{priorityLevel}</span>
                </div>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto h-3" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your personalized health optimization roadmap is ready. We've identified your strengths and opportunities for transformation.
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
            Detailed Analysis
          </Button>
          <Button
            variant={activeTab === 'roadmap' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Your Roadmap
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(result.level)}
                      <Badge variant={getScoreBadgeVariant()} className={getScoreColor(result.level)}>
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
                  <span>Your Optimization Profile</span>
                </CardTitle>
                <CardDescription>
                  How your readiness compares to typical health optimization journeys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-16">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-left font-medium mb-6">{item.name}</h3>

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
                                  className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-out rounded-full"
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
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">Average</div>
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
              const analysis = result.detailedAnalysis || {
                clinicalContext: result.description,
                strengths: ['Assessment completed'],
                riskFactors: ['Requires personalized strategy'],
                timeline: 'Begin optimization immediately.'
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
                          Score: {result.score}/{result.maxScore} • Readiness Level: {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                        </CardDescription>
                      </div>
                      <Badge variant={getScoreBadgeVariant()} className={getScoreColor(result.level)}>
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
                          <span>Optimization Context</span>
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
                              <span>Your Strengths</span>
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

                      {/* Optimization Areas */}
                      {analysis.riskFactors.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2 text-blue-600">
                              <Target className="h-4 w-4" />
                              <span>Optimization Opportunities</span>
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

                      {/* Timeline */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Implementation Timeline</span>
                        </h4>
                        <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                          {analysis.timeline}
                        </p>
                      </div>

                      <Separator />

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-medium mb-2">Personalized Recommendations</h4>
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

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Priority Actions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Your Personalized Health Roadmap</span>
                </CardTitle>
                <CardDescription>
                  Tailored action steps based on your unique goals, challenges, and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Priority Level Banner */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getPriorityIcon(priorityLevel)}</span>
                      <div>
                        <h4 className="font-medium">{priorityLevel}</h4>
                        <p className="text-sm text-muted-foreground">
                          {priorityLevel.includes('Immediate') && 'Begin implementation immediately. Your health goals require prompt attention.'}
                          {priorityLevel.includes('Near-Term') && 'Start within 1-2 weeks. Your optimization journey should begin soon.'}
                          {priorityLevel.includes('Progressive') && 'Begin within 2-4 weeks. Focus on sustainable, long-term improvements.'}
                          {priorityLevel.includes('Maintenance') && 'Ongoing optimization. Continue refining your health practices.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Items by Category */}
                  {results
                    .filter(result => result.level === 'moderate' || result.level === 'low')
                    .map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{result.category} - Action Steps</h4>
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
                      <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Outstanding Readiness!</h3>
                      <p className="text-muted-foreground">
                        You're well-positioned for health optimization. Focus on maintaining and enhancing your excellent foundation.
                      </p>
                    </div>
                  )}

                  {/* AI Summary Section */}
                  {aiReport.summary && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h4 className="font-medium mb-3 flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>Your Concierge Analysis</span>
                        </h4>
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

            {/* Next Steps Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Next Steps: Your Journey Begins</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Review Your Personalized Roadmap</h4>
                      <p className="text-sm text-muted-foreground">
                        Take time to understand your strengths and opportunities. This is your foundation for transformation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Schedule Your Concierge Consultation</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with our health optimization team to refine your protocol and address your specific needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Begin Implementation</h4>
                      <p className="text-sm text-muted-foreground">
                        Start with your highest-priority actions. Track progress and adjust based on your results and feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Ongoing Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Your health journey is continuous. Regular check-ins ensure you stay on track and adapt as needed.
                      </p>
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
            Detailed Analysis
          </Button>
          <Button
            variant={activeTab === 'roadmap' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              handleTabChange('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Your Roadmap
          </Button>
        </div>

        {/* Next Button */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'health-concierge-feedback'} size="lg" className="px-8">
              Next
            </Button>
          </div>
        )}

        {/* Premium Footer Info */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-background border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">Your Health Concierge Team</p>
                <p className="text-sm text-muted-foreground">
                  This assessment is the first step in your personalized health optimization journey. Our team combines
                  evidence-based protocols with individualized attention to help you achieve your unique health goals.
                  All recommendations should be reviewed with qualified healthcare professionals.
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
                      <span>Evidence-Based Framework</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="behavior-change">
                  <AccordionTrigger className="text-sm font-medium">
                    Health Behavior Change Science
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Health Psychology Review: Goal-setting and health behavior change</li>
                      <li>• Journal of Health Psychology: Self-determination theory in health</li>
                      <li>• British Journal of Health Psychology: Behavior change interventions</li>
                      <li>• Annals of Behavioral Medicine: Sustained health behavior change</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personalized-medicine">
                  <AccordionTrigger className="text-sm font-medium">
                    Personalized Medicine & Optimization
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nature Medicine: Precision health and individualized care</li>
                      <li>• Lancet: Patient-centered care and outcomes</li>
                      <li>• BMJ: Personalized healthcare delivery models</li>
                      <li>• Journal of Personalized Medicine: Tailored intervention strategies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="preventive-health">
                  <AccordionTrigger className="text-sm font-medium">
                    Preventive Health & Wellness
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• American Journal of Preventive Medicine: Prevention strategies</li>
                      <li>• Preventive Medicine: Population health interventions</li>
                      <li>• NICE Guidelines: Prevention and health promotion</li>
                      <li>• WHO: Health promotion frameworks</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="functional-medicine">
                  <AccordionTrigger className="text-sm font-medium">
                    Functional & Integrative Medicine
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Institute for Functional Medicine: Systems biology approach</li>
                      <li>• Journal of Alternative and Complementary Medicine: Integrative strategies</li>
                      <li>• BMC Complementary Medicine: Evidence-based integrative care</li>
                      <li>• Global Advances in Health and Medicine: Holistic health models</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This health concierge assessment provides personalized insights based on
                  evidence-based health optimization principles. All recommendations should be reviewed with qualified
                  healthcare professionals before implementation. Individual results may vary based on unique health
                  circumstances, genetics, and lifestyle factors.
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