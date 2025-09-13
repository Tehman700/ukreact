import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Clock, Target, Users, Home } from 'lucide-react';
import { AssessmentConfiguration } from '../data/assessmentResults';

interface AssessmentResultsTemplateProps {
  configuration: AssessmentConfiguration;
  nextPageHash: string;
}

export function AssessmentResultsTemplate({ configuration, nextPageHash }: AssessmentResultsTemplateProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations' | 'timeline'>('overview');
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['overview']));

  const completionDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  // Calculate overall score from categories
  const overallScore = Math.round(
    configuration.categories.reduce((sum, cat) => sum + (cat.score / cat.maxScore) * 100, 0) / configuration.categories.length
  );

  const overallRating = configuration.overallScoreInterpretation(overallScore);
  const IconComponent = configuration.icon;

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'immediate': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high': return <Target className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'low': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleBackToAssessments = () => {
    window.location.hash = 'assessments';
  };

  const handleTabChange = (tab: 'overview' | 'detailed' | 'recommendations' | 'timeline') => {
    setActiveTab(tab);
    setViewedTabs(prev => new Set([...prev, tab]));
  };

  const requiredTabs = configuration.uniqueFeatures.hasTimelineView ? 4 : 3;
  const allTabsViewed = viewedTabs.size === requiredTabs;

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
        <Card className={`mb-8 ${configuration.accentColor}`}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <IconComponent className={`h-6 w-6 ${configuration.primaryColor}`} />
              <CardTitle>Assessment Complete</CardTitle>
            </div>
            <CardDescription>
              Completed on {completionDate} • {configuration.categories.length} categories assessed
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
                {overallRating.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-muted p-1 rounded-lg w-fit">
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
            Action Plan
          </Button>
          {configuration.uniqueFeatures.hasTimelineView && (
            <Button
              variant={activeTab === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('timeline')}
            >
              Timeline
            </Button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configuration.categories.map((result, index) => (
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
            {configuration.categories.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        {getLevelIcon(result.level)}
                        <span>{result.category}</span>
                        {result.priority && (
                          <div className="flex items-center space-x-1 ml-2">
                            {getPriorityIcon(result.priority)}
                            <span className="text-sm text-muted-foreground capitalize">
                              {result.priority} priority
                            </span>
                          </div>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Score: {result.score}/{result.maxScore}
                        {result.timeline && ` • Timeline: ${result.timeline}`}
                      </CardDescription>
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
                    
                    {result.riskFactors && result.riskFactors.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2 text-orange-600">Identified Risk Factors:</h4>
                          <ul className="space-y-1">
                            {result.riskFactors.map((risk, riskIndex) => (
                              <li key={riskIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <AlertCircle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    
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
            {/* Immediate Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>Immediate Actions</span>
                </CardTitle>
                <CardDescription>
                  Start these actions right away to maximize your outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {configuration.nextSteps.immediate.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Short-term Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <span>Short-term Goals (2-8 weeks)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {configuration.nextSteps.shortTerm.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Long-term Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Long-term Strategy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {configuration.nextSteps.longTerm.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  <span>Expected Outcomes</span>
                </CardTitle>
                <CardDescription>
                  Following these recommendations should lead to:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {configuration.successMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'timeline' && configuration.uniqueFeatures.hasTimelineView && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Your Preparation Timeline</span>
                </CardTitle>
                <CardDescription>
                  Recommended actions organized by timing before your procedure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Group categories by timeline */}
                  {Array.from(new Set(configuration.categories.map(cat => cat.timeline))).map((timeline, timeIndex) => (
                    <div key={timeIndex} className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <h3 className="font-medium">{timeline}</h3>
                      </div>
                      <div className="ml-6 space-y-3">
                        {configuration.categories
                          .filter(cat => cat.timeline === timeline)
                          .map((cat, catIndex) => (
                            <Card key={catIndex} className="border-l-4 border-l-primary">
                              <CardContent className="pt-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium">{cat.category}</h4>
                                  {cat.priority && getPriorityIcon(cat.priority)}
                                </div>
                                <ul className="space-y-1">
                                  {cat.recommendations.slice(0, 2).map((rec, recIndex) => (
                                    <li key={recIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mt-8 mb-6 bg-muted p-1 rounded-lg w-fit">
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
            Action Plan
          </Button>
          {configuration.uniqueFeatures.hasTimelineView && (
            <Button
              variant={activeTab === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('timeline')}
            >
              Timeline
            </Button>
          )}
        </div>

        {/* Next Button - Only shown when all tabs have been viewed */}
        {allTabsViewed && (
          <div className="flex justify-center">
            <Button onClick={() => window.location.hash = nextPageHash} size="lg" className="px-8">
              Next
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="font-medium">Important Disclaimers</p>
                <p className="text-sm text-muted-foreground">
                  {configuration.disclaimers.main}
                </p>
                {configuration.disclaimers.additional && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {configuration.disclaimers.additional.map((disclaimer, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="mt-1">•</span>
                        <span>{disclaimer}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}