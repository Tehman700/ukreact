import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Download, Calendar, Share2, AlertCircle, CheckCircle2, TrendingUp, User, Clock, FileText } from 'lucide-react';

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
}

interface QuizResultsPageProps {
  assessmentTitle?: string;
  assessmentType?: string;
  completionDate?: string;
  overallScore?: number;
  results?: AssessmentResult[];
}

export function QuizResultsPage({ 
  assessmentTitle = "Surgery Readiness Score",
  assessmentType = "Comprehensive Health Assessment",
  completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }),
  overallScore = 78,
  results = [
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
    }
  ]
}: QuizResultsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview'])); // Track which tabs have been viewed

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'optimal': return 'text-green-600';
      case 'high': return 'text-blue-600';
      case 'moderate': return 'text-orange-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreBadgeVariant = (level: string) => {
    switch (level) {
      case 'optimal': return 'default';
      case 'high': return 'secondary';
      case 'moderate': return 'outline';
      case 'low': return 'destructive';
      default: return 'outline';
    }
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

  const handleTakeAgain = () => {
    window.location.hash = 'quiz';
  };

  const handleBookConsultation = () => {
    window.location.hash = 'contact';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const allTabsViewed = viewedTabs.size === 3;

  const handleNext = () => {
    // Navigate to the upsell page
    window.location.hash = 'recovery-challenge';
  };

  return (
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
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'detailed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('detailed')}
          >
            Detailed Results
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('recommendations')}
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
          <div className="space-y-6">
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {getLevelIcon(result.level)}
                        <span>{result.category}</span>
                      </CardTitle>
                      <CardDescription>Score: {result.score}/{result.maxScore}</CardDescription>
                    </div>
                    <Badge variant={getScoreBadgeVariant(result.level)} className={getScoreColor(result.level)}>
                      {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(result.score / result.maxScore) * 100} className="h-2" />
                    <p className="text-muted-foreground">
                      {result.description}
                    </p>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Key Recommendations:</h4>
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
            ))}
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

        {/* Bottom Navigation Tabs - Same as top */}
        <div className="flex space-x-1 mt-8 mb-6 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'detailed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('detailed')}
          >
            Detailed Results
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('recommendations')}
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
      </div>
    </div>
  );
}