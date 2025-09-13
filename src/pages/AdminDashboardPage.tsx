import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Users, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Target, 
  Download, RefreshCw, LogOut, AlertTriangle, TrendingDown as DeclineIcon, 
  Bell, CheckCircle, XCircle, AlertCircle, Info, HelpCircle, TestTube
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Cell, Area, AreaChart, Pie
} from 'recharts';
import { analyticsAPI, getDateRange } from '../api/analytics';

interface AnalyticsData {
  summary: {
    totalUsers: number;
    totalAssessmentStarts: number;
    totalPurchases: number;
    conversionRate: number;
    averageSessionDuration: number;
  };
  dailyTraffic: Array<{
    date: string;
    visitors: number;
    assessments: number;
    conversions: number;
    revenue: number;
  }>;
  assessmentPerformance: Array<{
    name: string;
    visitors: number;
    started: number;
    completed: number;
    conversionRate: string;
    avgTime: number;
    revenue: number;
    avgOrderValue: number;
  }>;
  funnelData: Array<{
    step: string;
    visitors: number;
    rate: number;
  }>;
  deviceData: Array<{
    name: string;
    value: number;
    visitors: number;
    color: string;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
    trend: string;
  }>;
  questionDropoffData: Array<{
    question: string;
    step: number;
    started: number;
    completed: number;
    dropoffRate: number;
    avgTime: number;
  }>;
  revenueMetrics: {
    totalRevenue: number;
    monthlyGrowth: number;
    averageOrderValue: number;
    conversionValue: number;
    revenuePerVisitor: number;
    bundleRevenue: number;
    individualRevenue: number;
  };
  monthlyRevenue: Array<{
    month: string;
    surgery: number;
    longevity: number;
    symptoms: number;
    bundles: number;
  }>;
  funnelComparison: Array<{
    name: string;
    homepage: number;
    assessment: number;
    learn: number;
    questions: number;
    completed: number;
    results: number;
    review: number;
    revenue: number;
    avgOrderValue: number;
  }>;
  alerts: Array<{
    id: number;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
    timestamp: string;
    status: 'active' | 'resolved';
    metric: string;
    threshold: string;
    current: string;
  }>;
}

// Generate comprehensive mock data
const generateMockData = (): AnalyticsData => {
  const assessments = [
    'Surgery Readiness Score',
    'Biological Age Calculator', 
    'Cardiometabolic Risk Score',
    'Health Concierge',
    'Complete Surgery Bundle',
    'Complete Chronic Symptoms Bundle',
    'Complete Longevity Bundle',
    'Complication Risk Checker',
    'Recovery Speed Predictor',
    'Symptom Severity Index'
  ];

  // Generate daily traffic data for last 30 days
  const dailyTraffic = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 500) + 200,
      assessments: Math.floor(Math.random() * 150) + 50,
      conversions: Math.floor(Math.random() * 30) + 10,
      revenue: Math.floor(Math.random() * 2000) + 500
    };
  });

  const assessmentPerformance = assessments.map(name => ({
    name,
    visitors: Math.floor(Math.random() * 1000) + 500,
    started: Math.floor(Math.random() * 400) + 200,
    completed: Math.floor(Math.random() * 150) + 50,
    conversionRate: (Math.random() * 20 + 5).toFixed(1),
    avgTime: Math.floor(Math.random() * 300) + 120,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    avgOrderValue: Math.floor(Math.random() * 100) + 30
  }));

  const questionDropoffData = [
    { question: 'Personal Information', step: 1, started: 1000, completed: 980, dropoffRate: 2.0, avgTime: 45 },
    { question: 'Current Health Status', step: 2, started: 980, completed: 920, dropoffRate: 6.1, avgTime: 78 },
    { question: 'Medication History', step: 3, started: 920, completed: 850, dropoffRate: 7.6, avgTime: 105 },
    { question: 'Lifestyle Factors', step: 4, started: 850, completed: 780, dropoffRate: 8.2, avgTime: 92 },
    { question: 'Surgery Details', step: 5, started: 780, completed: 720, dropoffRate: 7.7, avgTime: 68 },
    { question: 'Risk Assessment', step: 6, started: 720, completed: 680, dropoffRate: 5.6, avgTime: 125 }
  ];

  const revenueMetrics = {
    totalRevenue: 47850,
    monthlyGrowth: 12.5,
    averageOrderValue: 42.30,
    conversionValue: 8.7,
    revenuePerVisitor: 4.85,
    bundleRevenue: 26370,
    individualRevenue: 21480
  };

  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (11 - i));
    return {
      month: month.toLocaleDateString('en-US', { month: 'short' }),
      surgery: Math.floor(Math.random() * 8000) + 3000,
      longevity: Math.floor(Math.random() * 6000) + 2000,
      symptoms: Math.floor(Math.random() * 5000) + 1500,
      bundles: Math.floor(Math.random() * 10000) + 4000
    };
  });

  const funnelComparison = [
    {
      name: 'Surgery Readiness',
      homepage: 100,
      assessment: 35,
      learn: 28,
      questions: 21,
      completed: 16.8,
      results: 15.96,
      review: 9.58,
      revenue: 4200,
      avgOrderValue: 37
    },
    {
      name: 'Biological Age',
      homepage: 100,
      assessment: 42,
      learn: 38,
      questions: 32,
      completed: 28.5,
      results: 27.2,
      review: 18.4,
      revenue: 6800,
      avgOrderValue: 49.99
    },
    {
      name: 'Chronic Symptoms',
      homepage: 100,
      assessment: 28,
      learn: 22,
      questions: 18,
      completed: 14.2,
      results: 13.8,
      review: 8.9,
      revenue: 3950,
      avgOrderValue: 43
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'critical' as const,
      title: 'Surgery Readiness conversion rate dropped 15%',
      description: 'Conversion rate fell from 18.2% to 15.5% over the last 48 hours',
      timestamp: '2 hours ago',
      status: 'active' as const,
      metric: 'conversion_rate',
      threshold: '15%',
      current: '15.5%'
    },
    {
      id: 2,
      type: 'warning' as const,
      title: 'Question 3 drop-off rate increased',
      description: 'Medication History question showing 12% drop-off (up from 7.6%)',
      timestamp: '4 hours ago',
      status: 'active' as const,
      metric: 'question_dropoff',
      threshold: '10%',
      current: '12%'
    },
    {
      id: 3,
      type: 'info' as const,
      title: 'Mobile traffic increased 25%',
      description: 'Mobile conversion rate holding steady at 14.7%',
      timestamp: '6 hours ago',
      status: 'resolved' as const,
      metric: 'mobile_traffic',
      threshold: '20%',
      current: '25%'
    },
    {
      id: 4,
      type: 'success' as const,
      title: 'Bundle revenue target exceeded',
      description: 'Monthly bundle revenue reached £26,370 (target: £25,000)',
      timestamp: '1 day ago',
      status: 'resolved' as const,
      metric: 'bundle_revenue',
      threshold: '£25,000',
      current: '£26,370'
    }
  ];

  const funnelData = [
    { step: 'Homepage Visit', visitors: 10000, rate: 100 },
    { step: 'Assessment Page', visitors: 3500, rate: 35 },
    { step: 'Learn More', visitors: 2800, rate: 28 },
    { step: 'Questions Started', visitors: 2100, rate: 21 },
    { step: 'Questions Completed', visitors: 1680, rate: 16.8 },
    { step: 'Results Viewed', visitors: 1596, rate: 15.96 },
    { step: 'Review Completed', visitors: 958, rate: 9.58 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, visitors: 4500, color: '#8884d8' },
    { name: 'Mobile', value: 40, visitors: 4000, color: '#82ca9d' },
    { name: 'Tablet', value: 15, visitors: 1500, color: '#ffc658' }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 3500, percentage: 35, trend: '+12%' },
    { source: 'Direct', visitors: 2800, percentage: 28, trend: '+8%' },
    { source: 'Social Media', visitors: 1500, percentage: 15, trend: '+25%' },
    { source: 'Referral', visitors: 1200, percentage: 12, trend: '-5%' },
    { source: 'Email Marketing', visitors: 1000, percentage: 10, trend: '+15%' }
  ];

  return {
    summary: {
      totalUsers: 12450,
      totalAssessmentStarts: 3890,
      totalPurchases: 234,
      conversionRate: 16.2,
      averageSessionDuration: 185
    },
    dailyTraffic,
    assessmentPerformance,
    funnelData,
    deviceData,
    trafficSources,
    questionDropoffData,
    revenueMetrics,
    monthlyRevenue,
    funnelComparison,
    alerts
  };
};

export function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      window.location.hash = 'admin-login';
      return;
    }
    // Load mock data directly
    setData(generateMockData());
  }, [timeRange]);

  const handleRefresh = () => {
    // Regenerate mock data on refresh
    setData(generateMockData());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminUser');
    window.location.hash = 'admin-login';
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  const { summary } = data;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Luther Health Traffic & Performance Analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.hash = 'analytics-test'}>
                <TestTube className="w-4 h-4 mr-2" />
                Test Analytics
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.5%
                </span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments Started</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalAssessmentStarts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +8.3%
                </span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 inline-flex items-center">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  -2.1%
                </span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDuration(summary.averageSessionDuration)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +18.2%
                </span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnels">Funnels</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Daily visitors, assessments started, and conversions over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data?.dailyTraffic || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="assessments" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="conversions" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(data?.trafficSources || []).map((source) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{source.source}</span>
                            <span className="text-sm text-muted-foreground">{source.visitors.toLocaleString()}</span>
                          </div>
                          <Progress value={source.percentage} className="h-2" />
                        </div>
                        <Badge variant={source.trend.startsWith('+') ? 'default' : 'destructive'} className="ml-4">
                          {source.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Visitor device distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={data?.deviceData || []}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {(data?.deviceData || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Funnels Tab */}
          <TabsContent value="funnels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Funnel Analysis</CardTitle>
                <CardDescription>Step-by-step conversion rates through the assessment flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.funnelData || []).map((step, index) => {
                    const dropOff = index > 0 ? 
                      (((data?.funnelData?.[index - 1]?.visitors || 0) - step.visitors) / (data?.funnelData?.[index - 1]?.visitors || 1) * 100).toFixed(1) : 
                      0;
                    return (
                      <div key={step.step} className="flex items-center space-x-4">
                        <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{step.step}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-muted-foreground">
                                {step.visitors.toLocaleString()} users ({step.rate}%)
                              </span>
                              {index > 0 && (
                                <Badge variant="outline" className="text-red-600">
                                  -{dropOff}% drop-off
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Progress value={step.rate} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Concierge Performance</CardTitle>
                <CardDescription>20-second opt-in popup and questionnaire completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">23.8%</div>
                    <p className="text-sm text-muted-foreground">Opt-in Rate</p>
                    <p className="text-xs text-green-600 mt-1">+5.2% vs last month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">78.4%</div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <p className="text-xs text-green-600 mt-1">+12.1% vs last month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">3m 45s</div>
                    <p className="text-sm text-muted-foreground">Avg. Time to Complete</p>
                    <p className="text-xs text-red-600 mt-1">+23s vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium">Question-Level Analytics</h3>
                <p className="text-sm text-muted-foreground">Analyze user behavior at each question step</p>
              </div>
              <Select defaultValue="surgery-readiness">
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surgery-readiness">Surgery Readiness Score</SelectItem>
                  <SelectItem value="biological-age">Biological Age Calculator</SelectItem>
                  <SelectItem value="chronic-symptoms">Chronic Symptoms Bundle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Drop-off</CardTitle>
                  <DeclineIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">8.2%</div>
                  <p className="text-xs text-muted-foreground">Lifestyle Factors (Q4)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Question Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1m 52s</div>
                  <p className="text-xs text-muted-foreground">Per question completion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Question Completion</CardTitle>
                  <Target className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <p className="text-xs text-muted-foreground">Overall completion rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Question Drop-off Analysis</CardTitle>
                <CardDescription>Detailed breakdown of user behavior at each question step</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.questionDropoffData || []).map((question) => (
                    <div key={question.question} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                        question.dropoffRate > 8 ? 'bg-red-500' : 
                        question.dropoffRate > 6 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        {question.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{question.question}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              {question.started.toLocaleString()} started • {question.completed.toLocaleString()} completed
                            </span>
                            <Badge variant={question.dropoffRate > 8 ? 'destructive' : question.dropoffRate > 6 ? 'secondary' : 'default'}>
                              {question.dropoffRate}% drop-off
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress value={(question.completed / question.started) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Completion Rate: {((question.completed / question.started) * 100).toFixed(1)}%</span>
                            <span>Time vs Avg: {question.avgTime > 90 ? '+' : ''}{((question.avgTime - 90) / 90 * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Optimization Recommendations</CardTitle>
                <CardDescription>AI-powered suggestions to improve question performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Question 3 (Medication History)</strong> shows high drop-off (7.6%) and long completion time (105s). 
                      Consider simplifying the medication input field or adding helpful examples.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Question 4 (Lifestyle Factors)</strong> has the highest drop-off rate (8.2%). 
                      This complex question might benefit from being split into 2-3 shorter questions.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Question 6 (Risk Assessment)</strong> takes longest to complete (125s). 
                      Consider adding progress indicators or breaking into sub-sections.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Revenue Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total Revenue</span>
                        <span className="font-medium">£{data?.revenueMetrics?.totalRevenue?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg. Order Value</span>
                        <span className="font-medium">£{data?.revenueMetrics?.averageOrderValue?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Value</span>
                        <span className="font-medium">{data?.revenueMetrics?.conversionValue || 0}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Revenue Per Visitor</span>
                        <span className="font-medium">£{data?.revenueMetrics?.revenuePerVisitor?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Revenue Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Bundles</span>
                        <span className="font-medium">£{data?.revenueMetrics?.bundleRevenue?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Individual Assessments</span>
                        <span className="font-medium">£{data?.revenueMetrics?.individualRevenue?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue by Assessment</CardTitle>
                <CardDescription>Revenue trends across different assessment types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.monthlyRevenue || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="surgery" name="Surgery" fill="#8884d8" />
                    <Bar dataKey="longevity" name="Longevity" fill="#82ca9d" />
                    <Bar dataKey="symptoms" name="Symptoms" fill="#ffc658" />
                    <Bar dataKey="bundles" name="Bundles" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Funnel Comparison</CardTitle>
                <CardDescription>Conversion rates across different assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.funnelComparison || []).map((funnel) => (
                    <div key={funnel.name} className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{funnel.name}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              {funnel.assessment}% started ({funnel.completed}% completed)
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {funnel.questions}% questions ({funnel.results}% results)
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {funnel.review}% review (£{funnel.revenue.toLocaleString()} revenue)
                            </span>
                          </div>
                        </div>
                        <Progress value={funnel.completed} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {(data?.alerts || []).filter(alert => alert.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {(data?.alerts || []).filter(alert => alert.type === 'critical').length}
                  </div>
                  <p className="text-xs text-muted-foreground">High priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {(data?.alerts || []).filter(alert => alert.type === 'warning').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Medium priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {(data?.alerts || []).filter(alert => alert.status === 'resolved').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Issues fixed</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Current alerts affecting performance</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Manage Alerts
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(data?.alerts || []).map((alert) => {
                    const getAlertIcon = (type: string) => {
                      switch (type) {
                        case 'critical': return <XCircle className="w-4 h-4 text-red-600" />;
                        case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
                        case 'info': return <Info className="w-4 h-4 text-blue-500" />;
                        case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
                        default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
                      }
                    };

                    const getAlertBorder = (type: string) => {
                      switch (type) {
                        case 'critical': return 'border-l-red-500';
                        case 'warning': return 'border-l-yellow-500';
                        case 'info': return 'border-l-blue-500';
                        case 'success': return 'border-l-green-500';
                        default: return 'border-l-gray-500';
                      }
                    };

                    return (
                      <Alert key={alert.id} className={`border-l-4 ${getAlertBorder(alert.type)}`}>
                        <div className="flex items-start space-x-3">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{alert.title}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                                  {alert.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                              </div>
                            </div>
                            <AlertDescription className="mt-1">
                              {alert.description}
                            </AlertDescription>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span>Threshold: {alert.threshold}</span>
                              <span>Current: {alert.current}</span>
                              <span>Metric: {alert.metric}</span>
                            </div>
                          </div>
                        </div>
                      </Alert>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Detailed breakdown of each assessment's performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Assessment</th>
                        <th className="text-right p-2">Visitors</th>
                        <th className="text-right p-2">Started</th>
                        <th className="text-right p-2">Completed</th>
                        <th className="text-right p-2">Conversion</th>
                        <th className="text-right p-2">Revenue</th>
                        <th className="text-right p-2">AOV</th>
                        <th className="text-right p-2">Avg. Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data?.assessmentPerformance || []).map((assessment) => (
                        <tr key={assessment.name} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{assessment.name}</td>
                          <td className="p-2 text-right">{assessment.visitors.toLocaleString()}</td>
                          <td className="p-2 text-right">{assessment.started.toLocaleString()}</td>
                          <td className="p-2 text-right">{assessment.completed.toLocaleString()}</td>
                          <td className="p-2 text-right">
                            <Badge variant={parseFloat(assessment.conversionRate) > 15 ? 'default' : 'secondary'}>
                              {assessment.conversionRate}%
                            </Badge>
                          </td>
                          <td className="p-2 text-right">£{assessment.revenue.toLocaleString()}</td>
                          <td className="p-2 text-right">£{assessment.avgOrderValue}</td>
                          <td className="p-2 text-right">{Math.floor(assessment.avgTime / 60)}m {assessment.avgTime % 60}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bundle vs Individual Assessment Preference</CardTitle>
                <CardDescription>User preference for bundle packages vs individual assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Selection Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Individual Assessments</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span>Bundle Assessments</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Revenue Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Individual Revenue</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span>Bundle Revenue</span>
                        <span className="font-medium">55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Behavior Patterns</CardTitle>
                  <CardDescription>How users interact with your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Single Assessment Users</span>
                      <div className="text-right">
                        <div className="font-medium">78%</div>
                        <div className="text-sm text-muted-foreground">4,892 users</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Multiple Assessment Users</span>
                      <div className="text-right">
                        <div className="font-medium">22%</div>
                        <div className="text-sm text-muted-foreground">1,379 users</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Returning Users</span>
                      <div className="text-right">
                        <div className="font-medium">34%</div>
                        <div className="text-sm text-muted-foreground">2,132 users</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top User Journeys</CardTitle>
                  <CardDescription>Most common user paths through the site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Homepage → Surgery Readiness → Questions</div>
                      <div className="text-sm text-muted-foreground">1,234 users (24%)</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Blog → Assessment Selection → Start</div>
                      <div className="text-sm text-muted-foreground">892 users (17%)</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Health Concierge → Results → Assessment</div>
                      <div className="text-sm text-muted-foreground">743 users (14%)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Responsiveness Impact</CardTitle>
                <CardDescription>Performance differences between mobile and desktop users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Desktop</div>
                    <div className="text-2xl font-bold text-primary">18.2%</div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Mobile</div>
                    <div className="text-2xl font-bold text-primary">14.7%</div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-xs text-green-600 mt-1">+3.2% since mobile optimizations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Tablet</div>
                    <div className="text-2xl font-bold text-primary">16.4%</div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog to Assessment Conversion</CardTitle>
                <CardDescription>Which blog posts drive the most assessment starts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: '10 Surgery Ready Signs', views: 2345, conversions: 234, rate: '9.98%' },
                    { title: '7 Aging Faster Signs', views: 1876, conversions: 167, rate: '8.91%' },
                    { title: 'Red Flags Before Surgery', views: 1654, conversions: 142, rate: '8.58%' },
                    { title: 'Morning Stiffness Solutions', views: 1432, conversions: 98, rate: '6.84%' },
                    { title: 'Recovery Speed Secrets', views: 1298, conversions: 87, rate: '6.70%' }
                  ].map((post) => (
                    <div key={post.title} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">{post.views} views</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{post.conversions} conversions</div>
                        <Badge variant="outline">{post.rate}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>Load times and engagement metrics for key pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Page</th>
                        <th className="text-right p-2">Avg. Load Time</th>
                        <th className="text-right p-2">Bounce Rate</th>
                        <th className="text-right p-2">Time on Page</th>
                        <th className="text-right p-2">Exit Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { page: 'Homepage', loadTime: '1.2s', bounceRate: '34%', timeOnPage: '2m 45s', exitRate: '28%' },
                        { page: 'Assessments', loadTime: '0.9s', bounceRate: '29%', timeOnPage: '3m 12s', exitRate: '22%' },
                        { page: 'Assessment Questions', loadTime: '0.8s', bounceRate: '15%', timeOnPage: '5m 34s', exitRate: '12%' },
                        { page: 'Results Pages', loadTime: '1.1s', bounceRate: '8%', timeOnPage: '4m 23s', exitRate: '35%' },
                        { page: 'Blog Posts', loadTime: '1.4s', bounceRate: '42%', timeOnPage: '2m 18s', exitRate: '38%' }
                      ].map((row) => (
                        <tr key={row.page} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{row.page}</td>
                          <td className="p-2 text-right">{row.loadTime}</td>
                          <td className="p-2 text-right">{row.bounceRate}</td>
                          <td className="p-2 text-right">{row.timeOnPage}</td>
                          <td className="p-2 text-right">{row.exitRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-time Tab */}
          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Right Now</CardTitle>
                  <CardDescription>Users currently active on your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">127</div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Popular Pages</CardTitle>
                  <CardDescription>Most viewed pages right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Homepage</span>
                      <span className="text-sm font-medium">43 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Surgery Readiness</span>
                      <span className="text-sm font-medium">28 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Health Concierge</span>
                      <span className="text-sm font-medium">19 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Assessments</span>
                      <span className="text-sm font-medium">15 users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Assessments</CardTitle>
                  <CardDescription>Assessments being taken now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Surgery Readiness</span>
                      <span className="text-sm font-medium">12 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Biological Age</span>
                      <span className="text-sm font-medium">8 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Health Concierge</span>
                      <span className="text-sm font-medium">6 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Complete Surgery Bundle</span>
                      <span className="text-sm font-medium">4 active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Events</CardTitle>
                <CardDescription>Live activity feed from your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {[
                    { time: '2 seconds ago', event: 'User completed Surgery Readiness Assessment', location: 'London, UK' },
                    { time: '15 seconds ago', event: 'New user started Health Concierge questions', location: 'Manchester, UK' },
                    { time: '23 seconds ago', event: 'User viewed Biological Age results', location: 'Birmingham, UK' },
                    { time: '1 minute ago', event: 'Blog post "10 Surgery Ready Signs" viewed', location: 'Edinburgh, UK' },
                    { time: '1 minute ago', event: 'User added Complete Longevity Bundle to basket', location: 'Cardiff, UK' },
                    { time: '2 minutes ago', event: 'User completed Cardiometabolic Risk Assessment', location: 'Liverpool, UK' },
                    { time: '3 minutes ago', event: 'New visitor from Google search landed on homepage', location: 'Leeds, UK' },
                    { time: '4 minutes ago', event: 'User shared Resilience Index results', location: 'Glasgow, UK' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm">{event.event}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}