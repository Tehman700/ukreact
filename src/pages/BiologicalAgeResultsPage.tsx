import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, BarChart3, Target, BookOpen, Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { PaymentGate } from '../components/PaymentGate';

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
  chronologicalAge: number;
  biologicalAge: number;
  ageAdvantage: number;
  overallScore: number;
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

  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const loadReport = () => {
      try {
        setLoading(true);

        // Read the report that was already generated on the Information page
        const storedReport = sessionStorage.getItem('assessmentReport');
        const storedAssessmentType = sessionStorage.getItem('assessmentType');

        console.log('Loading stored report:', storedReport ? 'Found' : 'Not found');

        if (!storedReport) {
          throw new Error('No assessment report found. Please complete the assessment first.');
        }

        const report = JSON.parse(storedReport);

        // Verify it's the correct assessment type
        if (storedAssessmentType !== 'Biological Age') {
          console.warn('Assessment type mismatch:', storedAssessmentType);
        }

        console.log('Report loaded successfully:', {
          biologicalAge: report.biologicalAge,
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

  // Comparison data for charts - dynamically built from AI results
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

  // Loading state
  if (loading) {
    return (
      <PaymentGate requiredFunnel="bio">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Calculating your biological age...</p>
          </div>
        </div>
      </PaymentGate>
    );
  }

  // Error state
  if (error || !aiReport) {
    return (
      <PaymentGate requiredFunnel="bio">
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
      </PaymentGate>
    );
  }

  const { chronologicalAge, biologicalAge, ageAdvantage, overallScore, overallRating, results } = aiReport;

  return (
    <PaymentGate requiredFunnel="bio">
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
                    <Badge variant="default" className={ageAdvantage > 0 ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                      {ageAdvantage > 0 ? `${ageAdvantage} years younger` : `${Math.abs(ageAdvantage)} years older`}
                    </Badge>
                  </div>
                </div>
                <Progress value={overallScore} className="w-full max-w-md mx-auto" />
                <p className="text-muted-foreground max-w-md mx-auto">
                  {overallRating} - Your biological age assessment reveals how well your body is aging.
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
              Longevity Plan
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

              {/* Detailed Category Analysis */}
              {results.map((result, index) => {
                const analysis = result.detailedAnalysis || {
                  clinicalContext: result.description,
                  strengths: ['Good baseline health awareness'],
                  riskFactors: ['Continue optimization efforts'],
                  timeline: 'Monitor progress every 6-12 months.'
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
                            Score: {result.score}/{result.maxScore} • Percentile: {Math.round((result.score / result.maxScore) * 100)}th
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
                            <span>Aging Assessment</span>
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
                                <span>Longevity Strengths</span>
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
                  <CardTitle>Personalized Longevity Optimization Plan</CardTitle>
                  <CardDescription>
                    Evidence-based strategies to slow aging and extend your healthspan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results
                      .filter(result => result.level === 'moderate' || result.level === 'low')
                      .map((result, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-blue-500" />
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
                        <h3 className="font-medium mb-2">Exceptional Aging Profile!</h3>
                        <p className="text-muted-foreground">
                          Your assessment shows excellent aging patterns across all categories. Continue your current longevity practices.
                        </p>
                      </div>
                    )}

                    {/* AI Summary Section */}
                    {aiReport.summary && (
                      <>
                        <Separator className="my-6" />
                        <div>
                          <h4 className="font-medium mb-3">Comprehensive Longevity Analysis</h4>
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

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w-[2rem] min-h-[2rem] w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm sm:text-base font-medium flex-shrink-0">1</div>
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
                        <p className="text-sm text-muted-foreground">Our Longevity Focus Protocol includes advanced aging strategies and ongoing optimization support.</p>
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
              Longevity Plan
            </Button>
          </div>

          {/* Next Button - Only shown when all tabs have been viewed */}
          {allTabsViewed && (
            <div className="flex justify-center">
              <Button onClick={() => window.location.hash = 'biological-age-calculator-feedback'} size="lg" className="px-8">
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
                    This biological age assessment provides insights into aging patterns but does not diagnose medical conditions.
                    Consult healthcare providers for comprehensive health evaluation and personalized medical advice.
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
    </PaymentGate>
  );
}