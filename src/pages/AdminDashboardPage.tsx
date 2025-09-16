// Updated AdminDashboardPage.tsx with real data integration
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
  Download, RefreshCw, LogOut, AlertTriangle, DollarSign, ShoppingCart,
  Bell, CheckCircle, XCircle, AlertCircle, Info, TestTube, Calendar
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Cell, Area, AreaChart, Pie, RechartsTooltipNameType
} from 'recharts';
import { realAnalyticsAPI, getDateRange, formatCurrency, formatPercentage } from '../api/analytics';

interface DashboardData {
  summary: {
    totalUsers: number;
    totalAssessments: number;
    totalPurchases: number;
    totalRevenue: number;
    conversionRate: number;
    avgOrderValue: number;
    avgSessionDuration: number;
  };
  dailyMetrics: Array<{
    date: string;
    users: number;
    assessments: number;
    purchases: number;
    revenue: number;
  }>;
  assessmentPerformance: Array<{
    name: string;
    total_starts: number;
    unique_users: number;
  }>;
  payments: Array<{
    id: number;
    customer_email: string;
    amount_total: number;
    currency: string;
    status: string;
    product_name: string;
    created: string;
    first_name?: string;
    last_name?: string;
  }>;
  revenueByProduct: Array<{
    name: string;
    revenue: number;
    count: number;
  }>;
  funnelData: Array<{
    assessmentType: string;
    started: number;
    completed: number;
    purchased: number;
    completionRate: number;
    conversionRate: number;
  }>;
  userAnalytics?: {
    ageRangeDistribution: Array<{
      age_range: string;
      count: number;
      purchasers: number;
    }>;
    topUsers: Array<{
      email: string;
      first_name: string;
      last_name: string;
      assessments_taken: number;
      purchases_made: number;
      total_spent: number;
    }>;
  };
}

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30days');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const dateRange = getDateRange(timeRange as any);

      // Fetch all data in parallel
      const [dashboardResult, paymentsResult, funnelResult, userResult] = await Promise.all([
        realAnalyticsAPI.getDashboardData(dateRange),
        realAnalyticsAPI.getPaymentsData(dateRange),
        realAnalyticsAPI.getFunnelData(dateRange),
        realAnalyticsAPI.getUserAnalytics(dateRange)
      ]);

      if (!dashboardResult.success) {
        throw new Error(dashboardResult.error || 'Failed to load dashboard data');
      }

      // Combine all the data
      const combinedData: DashboardData = {
        ...dashboardResult.data,
        payments: paymentsResult.data?.payments || [],
        revenueByProduct: paymentsResult.data?.revenueByProduct || [],
        funnelData: funnelResult.data || [],
        userAnalytics: userResult.success ? userResult.data : undefined
      };

      setData(combinedData);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Dashboard data error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      window.location.hash = 'admin-login';
      return;
    }

    loadDashboardData();
  }, [timeRange]);

  const handleRefresh = () => {
    loadDashboardData();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading real analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-red-600">Data Loading Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { summary } = data;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Real Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Luther Health Live Data - Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Registered users in selected period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments Started</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalAssessments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total assessments initiated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                From {summary.totalPurchases} purchases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(summary.conversionRate)}</div>
              <p className="text-xs text-muted-foreground">
                Avg Order: {formatCurrency(summary.avgOrderValue)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Metrics Trend</CardTitle>
                <CardDescription>Users, assessments, purchases, and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.dailyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
                    <Line type="monotone" dataKey="assessments" stroke="#82ca9d" name="Assessments" />
                    <Line type="monotone" dataKey="purchases" stroke="#ffc658" name="Purchases" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Performance</CardTitle>
                  <CardDescription>Most popular assessments by starts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.assessmentPerformance.slice(0, 5).map((assessment, index) => (
                      <div key={assessment.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{assessment.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {assessment.total_starts} starts
                            </span>
                          </div>
                          <Progress
                            value={assessment.total_starts / Math.max(...data.assessmentPerformance.map(a => a.total_starts)) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Product</CardTitle>
                  <CardDescription>Top selling assessments and bundles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.revenueByProduct.slice(0, 5).map((product) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{product.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(product.revenue)}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {product.count} sales
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(summary.totalRevenue)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    From {summary.totalPurchases} successful payments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatCurrency(summary.avgOrderValue)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Per successful transaction
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {formatPercentage(summary.conversionRate)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Users to customers ratio
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.dailyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Funnel Tab */}
          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Conversion Funnel</CardTitle>
                <CardDescription>From start to purchase by assessment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.funnelData.map((funnel) => (
                    <div key={funnel.assessmentType} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-4">{funnel.assessmentType}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{funnel.started}</div>
                          <div className="text-sm text-muted-foreground">Started</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{funnel.completed}</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                          <div className="text-xs text-green-600">
                            {formatPercentage(funnel.completionRate)} rate
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{funnel.purchased}</div>
                          <div className="text-sm text-muted-foreground">Purchased</div>
                          <div className="text-xs text-purple-600">
                            {formatPercentage(funnel.conversionRate)} rate
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            {formatPercentage((funnel.purchased / funnel.started) * 100)}
                          </div>
                          <div className="text-sm text-muted-foreground">Overall Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Latest transactions from Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.payments.slice(0, 20).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">
                          {payment.first_name} {payment.last_name} ({payment.customer_email})
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.product_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(payment.created).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(payment.amount_total / 100, payment.currency)}
                        </div>
                        <Badge variant={payment.status === 'complete_payment_intent' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
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