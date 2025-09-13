// Mock Analytics API for Luther Health Admin Dashboard
// This simulates a real backend API with more realistic data patterns
import { getRealTimeMetricsFromSupabase } from '../utils/analytics';

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
  user_id: string;
  session_id: string;
  timestamp: number;
  url: string;
  user_agent?: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalAssessmentStarts: number;
  totalAssessmentCompletions: number;
  totalPurchases: number;
  totalRevenue: number;
  conversionRate: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; }>;
  topAssessments: Array<{ name: string; starts: number; completions: number; }>;
  revenueByAssessment: Array<{ name: string; revenue: number; sales: number; }>;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
  conversionRate: number;
  revenue: number;
}

export interface ConversionFunnel {
  step: string;
  users: number;
  conversionRate: number;
  dropoffRate: number;
}

// Generate realistic analytics data based on Luther Health patterns
const generateRealisticAnalyticsData = (dateRange: { start: Date; end: Date }): any => {
  const days = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
  
  // Base metrics with realistic ratios for a healthcare e-commerce site
  const baseDaily = {
    pageViews: Math.floor(Math.random() * 200) + 150, // 150-350 daily page views
    sessions: Math.floor(Math.random() * 80) + 60,    // 60-140 daily sessions
    users: Math.floor(Math.random() * 60) + 45,       // 45-105 daily users
  };

  // Calculate totals
  const totalPageViews = baseDaily.pageViews * days;
  const totalSessions = baseDaily.sessions * days;
  const totalUsers = baseDaily.users * days;

  // Assessment metrics (healthcare has higher engagement but lower volume)
  const assessmentStartRate = 0.15; // 15% of sessions start an assessment
  const assessmentCompletionRate = 0.65; // 65% complete once started
  const purchaseRate = 0.25; // 25% of completions lead to purchase

  const totalAssessmentStarts = Math.floor(totalSessions * assessmentStartRate);
  const totalAssessmentCompletions = Math.floor(totalAssessmentStarts * assessmentCompletionRate);
  const totalPurchases = Math.floor(totalAssessmentCompletions * purchaseRate);

  // Revenue calculations
  const averageOrderValue = 85; // Average assessment price
  const totalRevenue = totalPurchases * averageOrderValue;

  // Performance metrics
  const conversionRate = totalSessions > 0 ? (totalPurchases / totalSessions * 100) : 0;
  const averageSessionDuration = Math.floor(Math.random() * 180) + 240; // 4-7 minutes
  const bounceRate = Math.floor(Math.random() * 20) + 35; // 35-55%

  // Top pages data
  const topPages = [
    { page: 'home', views: Math.floor(totalPageViews * 0.25), title: 'Home' },
    { page: 'assessments', views: Math.floor(totalPageViews * 0.18), title: 'Assessments' },
    { page: 'surgery-readiness-assessment-learn-more', views: Math.floor(totalPageViews * 0.12), title: 'Surgery Readiness Assessment' },
    { page: 'biological-age-calculator-learn-more', views: Math.floor(totalPageViews * 0.10), title: 'Biological Age Calculator' },
    { page: 'services', views: Math.floor(totalPageViews * 0.08), title: 'Services' },
    { page: 'about', views: Math.floor(totalPageViews * 0.06), title: 'About' },
    { page: 'contact', views: Math.floor(totalPageViews * 0.05), title: 'Contact' },
    { page: 'blog', views: Math.floor(totalPageViews * 0.04), title: 'Blog' },
  ];

  // Top assessments data
  const topAssessments = [
    { 
      name: 'Surgery Readiness Score', 
      starts: Math.floor(totalAssessmentStarts * 0.35),
      completions: Math.floor(totalAssessmentCompletions * 0.38),
      price: 37.00
    },
    { 
      name: 'Biological Age Calculator', 
      starts: Math.floor(totalAssessmentStarts * 0.28),
      completions: Math.floor(totalAssessmentCompletions * 0.25),
      price: 49.99
    },
    { 
      name: 'Complete Longevity Bundle', 
      starts: Math.floor(totalAssessmentStarts * 0.15),
      completions: Math.floor(totalAssessmentCompletions * 0.20),
      price: 138.00
    },
    { 
      name: 'Completed Surgery Preparation Bundle', 
      starts: Math.floor(totalAssessmentStarts * 0.12),
      completions: Math.floor(totalAssessmentCompletions * 0.10),
      price: 120.00
    },
    { 
      name: 'Cardiometabolic Risk Score', 
      starts: Math.floor(totalAssessmentStarts * 0.10),
      completions: Math.floor(totalAssessmentCompletions * 0.07),
      price: 39.99
    },
  ];

  // Revenue by assessment
  const revenueByAssessment = topAssessments.map(assessment => ({
    name: assessment.name,
    revenue: Math.floor(assessment.completions * purchaseRate * assessment.price),
    sales: Math.floor(assessment.completions * purchaseRate),
  }));

  // Traffic sources
  const trafficSources: TrafficSource[] = [
    {
      source: 'Direct',
      sessions: Math.floor(totalSessions * 0.40),
      users: Math.floor(totalUsers * 0.42),
      conversionRate: 4.2,
      revenue: Math.floor(totalRevenue * 0.45),
    },
    {
      source: 'Google Organic',
      sessions: Math.floor(totalSessions * 0.35),
      users: Math.floor(totalUsers * 0.33),
      conversionRate: 3.8,
      revenue: Math.floor(totalRevenue * 0.30),
    },
    {
      source: 'Social Media',
      sessions: Math.floor(totalSessions * 0.15),
      users: Math.floor(totalUsers * 0.16),
      conversionRate: 2.1,
      revenue: Math.floor(totalRevenue * 0.12),
    },
    {
      source: 'Email',
      sessions: Math.floor(totalSessions * 0.07),
      users: Math.floor(totalUsers * 0.06),
      conversionRate: 5.8,
      revenue: Math.floor(totalRevenue * 0.10),
    },
    {
      source: 'Referral',
      sessions: Math.floor(totalSessions * 0.03),
      users: Math.floor(totalUsers * 0.03),
      conversionRate: 3.2,
      revenue: Math.floor(totalRevenue * 0.03),
    },
  ];

  // Conversion funnel
  const conversionFunnel: ConversionFunnel[] = [
    {
      step: 'Landing Page Visit',
      users: totalUsers,
      conversionRate: 100,
      dropoffRate: 0,
    },
    {
      step: 'Assessment Page View',
      users: Math.floor(totalUsers * 0.45),
      conversionRate: 45,
      dropoffRate: 55,
    },
    {
      step: 'Assessment Started',
      users: Math.floor(totalUsers * 0.25),
      conversionRate: 25,
      dropoffRate: 20,
    },
    {
      step: 'Assessment Completed',
      users: Math.floor(totalUsers * 0.16),
      conversionRate: 16,
      dropoffRate: 9,
    },
    {
      step: 'Added to Basket',
      users: Math.floor(totalUsers * 0.08),
      conversionRate: 8,
      dropoffRate: 8,
    },
    {
      step: 'Purchase Completed',
      users: Math.floor(totalUsers * 0.04),
      conversionRate: 4,
      dropoffRate: 4,
    },
  ];

  // Geographic data
  const geographicData = [
    { country: 'United Kingdom', sessions: Math.floor(totalSessions * 0.70), revenue: Math.floor(totalRevenue * 0.72) },
    { country: 'United States', sessions: Math.floor(totalSessions * 0.12), revenue: Math.floor(totalRevenue * 0.15) },
    { country: 'Canada', sessions: Math.floor(totalSessions * 0.08), revenue: Math.floor(totalRevenue * 0.07) },
    { country: 'Australia', sessions: Math.floor(totalSessions * 0.05), revenue: Math.floor(totalRevenue * 0.04) },
    { country: 'Ireland', sessions: Math.floor(totalSessions * 0.03), revenue: Math.floor(totalRevenue * 0.02) },
    { country: 'Other', sessions: Math.floor(totalSessions * 0.02), revenue: Math.floor(totalRevenue * 0.01) },
  ];

  // Device breakdown
  const deviceData = [
    { device: 'Desktop', sessions: Math.floor(totalSessions * 0.55), conversionRate: 4.8 },
    { device: 'Mobile', sessions: Math.floor(totalSessions * 0.40), conversionRate: 2.9 },
    { device: 'Tablet', sessions: Math.floor(totalSessions * 0.05), conversionRate: 3.2 },
  ];

  // Daily metrics for charts
  const dailyMetrics = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(dateRange.start);
    date.setDate(date.getDate() + i);
    
    // Add some realistic variance
    const variance = (Math.random() - 0.5) * 0.4; // +/- 20% variance
    
    dailyMetrics.push({
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(baseDaily.pageViews * (1 + variance)),
      sessions: Math.floor(baseDaily.sessions * (1 + variance)),
      users: Math.floor(baseDaily.users * (1 + variance)),
      assessmentStarts: Math.floor(baseDaily.sessions * assessmentStartRate * (1 + variance)),
      assessmentCompletions: Math.floor(baseDaily.sessions * assessmentStartRate * assessmentCompletionRate * (1 + variance)),
      purchases: Math.floor(baseDaily.sessions * assessmentStartRate * assessmentCompletionRate * purchaseRate * (1 + variance)),
      revenue: Math.floor(baseDaily.sessions * assessmentStartRate * assessmentCompletionRate * purchaseRate * averageOrderValue * (1 + variance)),
    });
  }

  return {
    summary: {
      totalPageViews,
      totalSessions,
      totalUsers,
      totalAssessmentStarts,
      totalAssessmentCompletions,
      totalPurchases,
      totalRevenue,
      conversionRate: Number(conversionRate.toFixed(2)),
      averageSessionDuration,
      bounceRate,
      averageOrderValue,
    },
    topPages,
    topAssessments,
    revenueByAssessment,
    trafficSources,
    conversionFunnel,
    geographicData,
    deviceData,
    dailyMetrics,
    realTimeMetrics: {
      activeUsers: Math.floor(Math.random() * 15) + 5,
      currentSessions: Math.floor(Math.random() * 25) + 10,
      assessmentsInProgress: Math.floor(Math.random() * 8) + 2,
      recentPurchases: Math.floor(Math.random() * 3) + 1,
    },
  };
};
import { getAnalyticsDataFromSupabase } from '../utils/analytics';

// Mock API endpoints
export const analyticsAPI = {
  // Get dashboard summary data
getDashboardData: async (dateRange: { start: Date; end: Date }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    // First try to get real data from Supabase
    const realData = await getAnalyticsDataFromSupabase(dateRange);

    if (realData && realData.totalPageViews > 0) {
      return {
        success: true,
        data: realData,
      };
    }

    // Fallback to mock data if no real data available
    return {
      success: true,
      data: generateRealisticAnalyticsData(dateRange),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch analytics data',
    };
  }
},

  // Get real-time metrics
  getRealTimeMetrics: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
      try {
        const realTimeData = await getRealTimeMetricsFromSupabase();

        return {
          success: true,
          data: {
            ...realTimeData,
            topActivePages: [
              { page: 'home', activeUsers: Math.floor(Math.random() * 8) + 2 },
              { page: 'assessments', activeUsers: Math.floor(Math.random() * 6) + 1 },
              { page: 'surgery-readiness-assessment-questions', activeUsers: Math.floor(Math.random() * 4) + 1 },
            ],
          },
        };
      } catch (error) {
        return {
          success: false,
          error: 'Failed to fetch real-time metrics',
        };
      }
  },

  // Get conversion funnel data
  getConversionFunnel: async (dateRange: { start: Date; end: Date }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = generateRealisticAnalyticsData(dateRange);
    return {
      success: true,
      data: data.conversionFunnel,
    };
  },

  // Get assessment performance data
  getAssessmentPerformance: async (dateRange: { start: Date; end: Date }) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const data = generateRealisticAnalyticsData(dateRange);
    return {
      success: true,
      data: {
        topAssessments: data.topAssessments,
        revenueByAssessment: data.revenueByAssessment,
      },
    };
  },

  // Get traffic sources
  getTrafficSources: async (dateRange: { start: Date; end: Date }) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const data = generateRealisticAnalyticsData(dateRange);
    return {
      success: true,
      data: data.trafficSources,
    };
  },

  // Store analytics event (mock)
  storeEvent: async (event: Partial<AnalyticsEvent>) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In production, this would store to a real database
//     console.log('Analytics event stored:', event);
    
    return {
      success: true,
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  },
};

// Helper function to generate date ranges
export const getDateRange = (period: 'today' | '7days' | '30days' | '90days') => {
  const end = new Date();
  const start = new Date();
  
  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case '7days':
      start.setDate(start.getDate() - 7);
      break;
    case '30days':
      start.setDate(start.getDate() - 30);
      break;
    case '90days':
      start.setDate(start.getDate() - 90);
      break;
  }
  
  return { start, end };
};