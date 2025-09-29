import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle, Mail, Clock } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations?: string[]; // Made optional for backwards compatibility
}


interface AIReport {
  overallScore: number;
  overallRating: string;
  results: AssessmentResult[];
  summary: string;
}
export function MobilityStrengthResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));
  const [reportData, setReportData] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(true);

  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const storedReport = sessionStorage.getItem("assessmentReport");
    if (storedReport) {
      try {
        const parsedReport = JSON.parse(storedReport);
        setReportData(parsedReport);
      } catch (error) {
        console.error("Error parsing stored report:", error);
      }
    }
    setLoading(false);
  }, []);

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'optimal': return 'text-green-600 border-green-200 bg-green-50';
      case 'high': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'moderate': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'low': return 'text-red-600 border-red-200 bg-red-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
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

  const getOverallRatingColor = (rating: string) => {
    if (rating.includes('Low Risk')) return 'text-green-600';
    if (rating.includes('Moderate')) return 'text-yellow-600';
    if (rating.includes('Elevated') || rating.includes('High')) return 'text-red-600';
    return 'text-gray-600';
  };

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 2;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {

    return (
                                     <PaymentGate requiredFunnel="mobility">

      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Report Not Found</h2>
          <p className="text-muted-foreground mb-4">Unable to load your assessment results.</p>
          <Button onClick={handleBackToAssessments}>Back to Assessments</Button>
        </div>
      </div>
                          </PaymentGate>

    );
  }

  return (
                       <PaymentGate requiredFunnel="mobility">

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
        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Assessment Complete</CardTitle>
            </div>
            <CardDescription>
              Completed on {completionDate} • AI-powered risk analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold mb-2">{reportData.overallScore}%</div>
                <Badge variant="outline" className={`mb-4 ${getOverallRatingColor(reportData.overallRating)}`}>
                  {reportData.overallRating}
                </Badge>
              </div>
              <Progress value={reportData.overallScore} className="w-full max-w-md mx-auto" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Your personalized anaesthesia risk assessment based on your responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
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
        </div>

        {/* Overview */}
        {activeTab === 'overview' && reportData.results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportData.results.map((result, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(result.level)}
                      <Badge variant="outline" className={getScoreColor(result.level)}>
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

        {/* Detailed */}
        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Summary</CardTitle>
                <CardDescription>
                  Comprehensive analysis of your risk factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {reportData.summary}
                  </div>
                </div>
              </CardContent>
            </Card>

            {reportData.results && reportData.results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      {getLevelIcon(result.level)}
                      <span>{result.category}</span>
                    </CardTitle>
                    <Badge variant="outline" className={getScoreColor(result.level)}>
                      {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(result.score / result.maxScore) * 100} className="h-2" />

                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description}
                      </p>
                    </div>

                    <Separator />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Nav */}
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
        </div>

        {/* Continue Button */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = 'mobility-strength-score-feedback'} size="lg" className="px-8">
              Continue
            </Button>
          </div>
        )}

        {/* Footer */}
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
      </div>
    </div>
    </PaymentGate>

  );
}