import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Play, Trash2, BarChart3, Users, TrendingUp, CheckCircle, 
  XCircle, AlertTriangle, Info, TestTube, Activity, Eye 
} from 'lucide-react';
import { runAnalyticsTests, getLocalAnalyticsSummary, clearLocalAnalyticsData, analyticsHealthCheck } from '../utils/analyticsTest';
import { useAnalytics } from '../hooks/useAnalytics';


export function AnalyticsTestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [analyticsSummary, setAnalyticsSummary] = useState<any>(null);
  const [healthCheck, setHealthCheck] = useState<any>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  
  const analytics = useAnalytics();

  useEffect(() => {
    // Load initial data
    loadAnalyticsSummary();
    runHealthCheck();
  }, []);

  const loadAnalyticsSummary = () => {
    const summary = getLocalAnalyticsSummary();
    setAnalyticsSummary(summary);
  };

  const runHealthCheck = () => {
    const checks = analyticsHealthCheck();
    setHealthCheck(checks);
  };

  const runTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runAnalyticsTests();
      setTestResults(results);
      loadAnalyticsSummary(); // Refresh summary after tests
    } catch (error) {
      setTestResults({ success: false, error: error.message });
    }
    setIsRunningTests(false);
  };

  const clearData = () => {
    const success = clearLocalAnalyticsData();
    if (success) {
      loadAnalyticsSummary();
      setTestResults(null);
    }
  };

  // Test individual analytics functions
  const testPageView = () => {
    analytics.trackPage('analytics_test_page', 'Testing');
    loadAnalyticsSummary();
  };

  const testAssessmentStart = () => {
    analytics.trackAssessmentStart('test_assessment_123', 'Test Assessment', 49.99);
    loadAnalyticsSummary();
  };

  const testAddToBasket = () => {
    analytics.trackAddToBasket('test_assessment_456', 'Another Test Assessment', 99.99);
    loadAnalyticsSummary();
  };

  const testLeadGeneration = () => {
    analytics.trackLeadGenerated('test_blog_post', 'cta_click', 37.00);
    loadAnalyticsSummary();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Analytics Testing Console</h1>
              <p className="text-muted-foreground">Test and verify analytics tracking for Luther Health</p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.hash = 'admin-dashboard'}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tests">Run Tests</TabsTrigger>
            <TabsTrigger value="summary">Data Summary</TabsTrigger>
            <TabsTrigger value="health">Health Check</TabsTrigger>
            <TabsTrigger value="individual">Individual Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Analytics Test Suite
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Run comprehensive tests to verify all analytics tracking functions are working correctly.
                </p>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={runTests} 
                    disabled={isRunningTests}
                    className="flex-1 max-w-xs"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
                  </Button>
                  
                  <Button 
                    onClick={clearData} 
                    variant="outline"
                    className="flex-1 max-w-xs"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Test Data
                  </Button>
                </div>

                {testResults && (
                  <Alert className={testResults.success ? '' : 'border-destructive'}>
                    <div className="flex items-center gap-2">
                      {testResults.success ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-red-600" />
                      }
                      <AlertDescription>
                        {testResults.success ? (
                          <div>
                            <strong>Tests Completed Successfully!</strong>
                            <br />
                            Ran {testResults.testsRun} tests, tracked {testResults.eventsTracked} events.
                            <br />
                            Local storage has {testResults.localStorageEvents} total events.
                          </div>
                        ) : (
                          <div>
                            <strong>Test Failed:</strong> {testResults.error}
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analytics Data Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsSummary ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{analyticsSummary.totalEvents}</div>
                        <p className="text-sm text-muted-foreground">Total Events</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">
                          {Object.keys(analyticsSummary.eventsByType).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Event Types</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">
                          {Object.keys(analyticsSummary.eventsByCategory).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Categories</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-4">Events by Type</h4>
                        <div className="space-y-2">
                          {Object.entries(analyticsSummary.eventsByType).map(([type, count]) => (
                            <div key={type} className="flex justify-between items-center">
                              <span className="text-sm">{type.replace('_', ' ')}</span>
                              <Badge variant="outline">{count}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Events by Category</h4>
                        <div className="space-y-2">
                          {Object.entries(analyticsSummary.eventsByCategory).map(([category, count]) => (
                            <div key={category} className="flex justify-between items-center">
                              <span className="text-sm">{category}</span>
                              <Badge variant="outline">{count}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Recent Events</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {analyticsSummary.recentEvents.map((event: any, index: number) => (
                          <div key={index} className="p-3 bg-muted/30 rounded text-xs">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-medium">{event.event_name}</span>
                                <span className="text-muted-foreground ml-2">({event.event_category})</span>
                              </div>
                              <span className="text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {event.event_label && (
                              <p className="text-muted-foreground mt-1">{event.event_label}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No analytics data available. Run some tests to generate data.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Analytics Health Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthCheck ? (
                  <div className="space-y-4">
                    {Object.entries(healthCheck).map(([check, status]) => (
                      <div key={check} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div className="flex items-center gap-3">
                          {status ? 
                            <CheckCircle className="w-5 h-5 text-green-600" /> : 
                            <XCircle className="w-5 h-5 text-red-600" />
                          }
                          <span className="font-medium">
                            {check.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        </div>
                        <Badge variant={status ? 'default' : 'destructive'}>
                          {typeof status === 'boolean' ? (status ? 'OK' : 'Failed') : status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Button onClick={runHealthCheck}>Run Health Check</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Individual Function Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Test individual analytics functions to verify they're working correctly.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={testPageView} variant="outline" className="justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Test Page View
                  </Button>
                  
                  <Button onClick={testAssessmentStart} variant="outline" className="justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Test Assessment Start
                  </Button>
                  
                  <Button onClick={testAddToBasket} variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Test Add to Basket
                  </Button>
                  
                  <Button onClick={testLeadGeneration} variant="outline" className="justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Test Lead Generation
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Button onClick={loadAnalyticsSummary} size="sm">
                    <Activity className="w-4 h-4 mr-2" />
                    Refresh Summary
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Session Info */}
            <Card>
              <CardHeader>
                <CardTitle>Current Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>User ID:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{analytics.userId}</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Session ID:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{analytics.sessionId}</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Page:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      {window.location.hash.replace('#', '') || 'home'}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}