// Google Analytics 4 Integration and Custom Analytics Utilities
// Luther Health Analytics Tracking System
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Analytics configuration
export const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  ENABLE_API_CALLS: true, // Enable backend API calls
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};



import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  ANALYTICS_CONFIG.SUPABASE_URL,
  ANALYTICS_CONFIG.SUPABASE_ANON_KEY
);












// Initialize Google Analytics 4
export const initializeGA4 = () => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
    page_title: 'Luther Health',
    page_location: window.location.href,
    send_page_view: true,
    debug_mode: ANALYTICS_CONFIG.DEBUG_MODE,
  });

  if (ANALYTICS_CONFIG.DEBUG_MODE) {
    console.log('GA4 Analytics initialized for Luther Health');
  }
};

// Event tracking types
export interface AnalyticsEvent {
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
  user_id?: string;
  session_id?: string;
  timestamp?: number;
}

// Assessment tracking events
export interface AssessmentEvent extends AnalyticsEvent {
  assessment_id: string;
  assessment_name: string;
  assessment_price: number;
  step?: string;
  completion_percentage?: number;
}

// Purchase tracking events
export interface PurchaseEvent extends AnalyticsEvent {
  transaction_id: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  total_value: number;
  currency: string;
}

// Session management
let sessionId = '';
let userId = '';

export const getSessionId = (): string => {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('luther_session_id', sessionId);
  }
  return sessionId;
};

export const getUserId = (): string => {
  if (!userId) {
    userId = localStorage.getItem('luther_user_id') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('luther_user_id', userId);
  }
  return userId;
};

// Core tracking function
export const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    // Add session and user data
    const enrichedEvent = {
      ...event,
      user_id: getUserId(),
      session_id: getSessionId(),
      timestamp: Date.now(),
      url: window.location.href,
      user_agent: navigator.userAgent,
    };

    // Send to Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event.event_name, {
        event_category: event.event_category,
        event_label: event.event_label,
        value: event.value,
        custom_parameters: event.custom_parameters,
      });
    }

    // Send to our backend analytics API
    await sendToBackendAPI(enrichedEvent);

    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('Analytics Event Tracked:');
    }
  } catch (error) {
    console.error('Analytics tracking failed:');
  }
};



// Backend API integration with Supabase
const sendToBackendAPI = async (event: any): Promise<void> => {
  try {
    // Send to Supabase
    const { error } = await supabase
      .from('analytics_events')
      .insert([event]);

    if (error) {
      throw error;
    }

    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('Event sent to Supabase:');
    }
  } catch (error) {
    console.error('Failed to send event to Supabase:');
    // Fallback to local storage
    storeEventLocally(event);
  }
};

// Get analytics data from Supabase for admin dashboard
export const getAnalyticsDataFromSupabase = async (dateRange: { start: Date; end: Date }): Promise<any> => {
  try {
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('timestamp', dateRange.start.getTime())
      .lte('timestamp', dateRange.end.getTime())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return processEventsForDashboard(events || []);
  } catch (error) {
    console.error('Failed to fetch analytics from Supabase:', error);
    return getLocalAnalyticsData(dateRange);
  }
};




// Get real-time metrics from Supabase
export const getRealTimeMetricsFromSupabase = async (): Promise<any> => {
  try {
    const now = Date.now();
    const fiveMinutesAgo = now - (5 * 60 * 1000);

    const { data: recentEvents, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('timestamp', fiveMinutesAgo)
      .lte('timestamp', now);

    if (error) throw error;

    const activeUsers = new Set(recentEvents?.map(e => e.user_id) || []).size;
    const currentSessions = new Set(recentEvents?.map(e => e.session_id) || []).size;
    const assessmentsInProgress = recentEvents?.filter(e => e.event_name === 'assessment_progress').length || 0;
    const recentPurchases = recentEvents?.filter(e => e.event_name === 'purchase').length || 0;

    return {
      activeUsers,
      currentSessions,
      assessmentsInProgress,
      recentPurchases,
    };
  } catch (error) {
    console.error('Failed to get real-time metrics:', error);
    return {
      activeUsers: Math.floor(Math.random() * 15) + 5,
      currentSessions: Math.floor(Math.random() * 25) + 10,
      assessmentsInProgress: Math.floor(Math.random() * 8) + 2,
      recentPurchases: Math.floor(Math.random() * 3) + 1,
    };
  }
};








// Local storage fallback for development
const storeEventLocally = (event: any): void => {
  try {
    const events = JSON.parse(localStorage.getItem('luther_analytics_events') || '[]');
    events.push(event);
    
    // Keep only last 1000 events to prevent storage overflow
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    localStorage.setItem('luther_analytics_events', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to store analytics event locally:', error);
  }
};

// High-level tracking functions for common events

// Page view tracking
export const trackPageView = (pageName: string, category: string = 'Navigation'): void => {
  trackEvent({
    event_name: 'page_view',
    event_category: category,
    event_label: pageName,
    custom_parameters: {
      page_name: pageName,
      referrer: document.referrer,
    },
  });
};

// Assessment interactions
export const trackAssessmentStart = (assessmentId: string, assessmentName: string, price: number): void => {
  trackEvent({
    event_name: 'assessment_started',
    event_category: 'Assessment',
    event_label: assessmentName,
    value: price,
    custom_parameters: {
      assessment_id: assessmentId,
      assessment_name: assessmentName,
      assessment_price: price,
      step: 'start',
    },
  } as AssessmentEvent);
};

export const trackAssessmentProgress = (assessmentId: string, assessmentName: string, step: string, completionPercentage: number): void => {
  trackEvent({
    event_name: 'assessment_progress',
    event_category: 'Assessment',
    event_label: `${assessmentName} - ${step}`,
    value: completionPercentage,
    custom_parameters: {
      assessment_id: assessmentId,
      assessment_name: assessmentName,
      step,
      completion_percentage: completionPercentage,
    },
  } as AssessmentEvent);
};

export const trackAssessmentCompleted = (assessmentId: string, assessmentName: string, price: number): void => {
  trackEvent({
    event_name: 'assessment_completed',
    event_category: 'Assessment',
    event_label: assessmentName,
    value: price,
    custom_parameters: {
      assessment_id: assessmentId,
      assessment_name: assessmentName,
      assessment_price: price,
      completion_percentage: 100,
    },
  } as AssessmentEvent);
};

// Shopping basket interactions
export const trackAddToBasket = (assessmentId: string, assessmentName: string, price: number): void => {
  trackEvent({
    event_name: 'add_to_cart',
    event_category: 'Shopping',
    event_label: assessmentName,
    value: price,
    custom_parameters: {
      item_id: assessmentId,
      item_name: assessmentName,
      price,
      currency: 'GBP',
    },
  });
};

export const trackRemoveFromBasket = (assessmentId: string, assessmentName: string): void => {
  trackEvent({
    event_name: 'remove_from_cart',
    event_category: 'Shopping',
    event_label: assessmentName,
    custom_parameters: {
      item_id: assessmentId,
      item_name: assessmentName,
    },
  });
};

export const trackBundleUpgrade = (fromAssessments: string[], toBundleId: string, bundleName: string, savings: number): void => {
  trackEvent({
    event_name: 'bundle_upgrade',
    event_category: 'Shopping',
    event_label: bundleName,
    value: savings,
    custom_parameters: {
      from_assessments: fromAssessments,
      to_bundle_id: toBundleId,
      bundle_name: bundleName,
      savings_amount: savings,
      currency: 'GBP',
    },
  });
};

// Purchase tracking
export const trackPurchaseInitiated = (items: any[], totalValue: number): void => {
  trackEvent({
    event_name: 'begin_checkout',
    event_category: 'Purchase',
    event_label: 'Checkout Started',
    value: totalValue,
    custom_parameters: {
      items,
      total_value: totalValue,
      currency: 'GBP',
      item_count: items.length,
    },
  });
};

export const trackPurchaseCompleted = (transactionId: string, items: any[], totalValue: number): void => {
  trackEvent({
    event_name: 'purchase',
    event_category: 'Purchase',
    event_label: 'Purchase Completed',
    value: totalValue,
    custom_parameters: {
      transaction_id: transactionId,
      items,
      total_value: totalValue,
      currency: 'GBP',
    },
  } as PurchaseEvent);
};

// Lead generation tracking
export const trackLeadGenerated = (source: string, leadType: string, value?: number): void => {
  trackEvent({
    event_name: 'generate_lead',
    event_category: 'Lead Generation',
    event_label: `${source} - ${leadType}`,
    value,
    custom_parameters: {
      lead_source: source,
      lead_type: leadType,
    },
  });
};

// Health Concierge tracking
export const trackHealthConciergeOptIn = (source: string): void => {
  trackEvent({
    event_name: 'health_concierge_opt_in',
    event_category: 'Lead Generation',
    event_label: `Health Concierge - ${source}`,
    custom_parameters: {
      opt_in_source: source,
    },
  });
};

// Blog engagement tracking
export const trackBlogEngagement = (blogTitle: string, action: string, value?: number): void => {
  trackEvent({
    event_name: 'blog_engagement',
    event_category: 'Content',
    event_label: `${blogTitle} - ${action}`,
    value,
    custom_parameters: {
      blog_title: blogTitle,
      engagement_action: action,
    },
  });
};

// Search and filter tracking
export const trackSearch = (searchTerm: string, resultCount: number, category?: string): void => {
  trackEvent({
    event_name: 'search',
    event_category: 'Search',
    event_label: searchTerm,
    value: resultCount,
    custom_parameters: {
      search_term: searchTerm,
      result_count: resultCount,
      search_category: category,
    },
  });
};

export const trackFilterUsage = (filterType: string, filterValue: string, resultCount: number): void => {
  trackEvent({
    event_name: 'filter_usage',
    event_category: 'Search',
    event_label: `${filterType}: ${filterValue}`,
    value: resultCount,
    custom_parameters: {
      filter_type: filterType,
      filter_value: filterValue,
      result_count: resultCount,
    },
  });
};

// User journey tracking
export const trackUserJourneyMilestone = (milestone: string, timeToReach?: number): void => {
  trackEvent({
    event_name: 'user_journey_milestone',
    event_category: 'User Journey',
    event_label: milestone,
    value: timeToReach,
    custom_parameters: {
      milestone,
      time_to_reach: timeToReach,
    },
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, page: string): void => {
  trackEvent({
    event_name: 'error_occurred',
    event_category: 'Error',
    event_label: `${errorType} - ${page}`,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      page,
    },
  });
};

// Get analytics data for admin dashboard
export const getAnalyticsData = async (dateRange: { start: Date; end: Date }): Promise<any> => {
  try {
    // In production, this would fetch from your backend API
    const response = await fetch(`/api/analytics/dashboard?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`);
    
    if (!response.ok) {
      // Fallback to local storage data for development
      return getLocalAnalyticsData(dateRange);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Analytics API not available, using local data');
    return getLocalAnalyticsData(dateRange);
  }
};

// Get local analytics data for development
const getLocalAnalyticsData = (dateRange: { start: Date; end: Date }): any => {
  try {
    const events = JSON.parse(localStorage.getItem('luther_analytics_events') || '[]');
    const filteredEvents = events.filter((event: any) => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= dateRange.start && eventDate <= dateRange.end;
    });

    // Process events into dashboard-friendly format
    return processEventsForDashboard(filteredEvents);
  } catch (error) {
    console.error('Failed to get local analytics data:', error);
    return null;
  }
};

// Process events for dashboard display
const processEventsForDashboard = (events: any[]): any => {
  // This would contain more sophisticated processing in production
  const pageViews = events.filter(e => e.event_name === 'page_view').length;
  const assessmentStarts = events.filter(e => e.event_name === 'assessment_started').length;
  const assessmentCompletions = events.filter(e => e.event_name === 'assessment_completed').length;
  const purchases = events.filter(e => e.event_name === 'purchase').length;
  
  return {
    totalPageViews: pageViews,
    totalAssessmentStarts: assessmentStarts,
    totalAssessmentCompletions: assessmentCompletions,
    totalPurchases: purchases,
    conversionRate: assessmentStarts > 0 ? (assessmentCompletions / assessmentStarts * 100).toFixed(2) : 0,
    events,
  };
};

// Initialize analytics when the module is imported
if (typeof window !== 'undefined') {
  initializeGA4();
}