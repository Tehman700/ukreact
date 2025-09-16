// Updated analytics API client for React
// Replace your existing analytics.ts with this:

export interface RealAnalyticsData {
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
  revenueMetrics: {
    totalRevenue: number;
    averageOrderValue: number;
    conversionRate: number;
  };
}

export interface PaymentData {
  payments: Array<{
    id: number;
    stripe_session_id: string;
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
  paymentsByStatus: Record<string, number>;
}

export interface FunnelData {
  assessmentType: string;
  started: number;
  completed: number;
  purchased: number;
  completionRate: number;
  conversionRate: number;
}

// Real analytics API client
export const realAnalyticsAPI = {
  // Get dashboard data from your actual database
  getDashboardData: async (dateRange: { start: Date; end: Date }): Promise<{ success: boolean; data?: RealAnalyticsData; error?: string }> => {
    try {
      const response = await fetch(`/api/analytics/dashboard?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch analytics data');
      }

      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      console.error('Analytics API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get payments data
  getPaymentsData: async (dateRange: { start: Date; end: Date }): Promise<{ success: boolean; data?: PaymentData; error?: string }> => {
    try {
      const response = await fetch(`/api/analytics/payments?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch payments data');
      }

      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      console.error('Payments API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get funnel data
  getFunnelData: async (dateRange: { start: Date; end: Date }, assessmentType?: string): Promise<{ success: boolean; data?: FunnelData[]; error?: string }> => {
    try {
      const params = new URLSearchParams({
        startDate: dateRange.start.toISOString(),
        endDate: dateRange.end.toISOString()
      });

      if (assessmentType) {
        params.append('assessmentType', assessmentType);
      }

      const response = await fetch(`/api/analytics/funnel?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch funnel data');
      }

      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      console.error('Funnel API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get user analytics
  getUserAnalytics: async (dateRange: { start: Date; end: Date }) => {
    try {
      const response = await fetch(`/api/analytics/users?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch user analytics');
      }

      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      console.error('User analytics API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Track page view
  trackPageView: async (page: string, userId?: number, sessionId?: string) => {
    try {
      const response = await fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page,
          user_id: userId,
          session_id: sessionId || `session_${Date.now()}`,
          referrer: document.referrer,
          user_agent: navigator.userAgent
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Page view tracking error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Helper function to get date ranges
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

// Format currency
export const formatCurrency = (amount: number, currency: string = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1) => {
  return `${value.toFixed(decimals)}%`;
};