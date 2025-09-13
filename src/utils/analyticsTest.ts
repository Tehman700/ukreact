// Analytics Testing Utility for Luther Health
// Use this to test analytics events during development

import {
  trackPageView,
  trackAssessmentStart,
  trackAssessmentProgress,
  trackAssessmentCompleted,
  trackAddToBasket,
  trackRemoveFromBasket,
  trackBundleUpgrade,
  trackPurchaseInitiated,
  trackPurchaseCompleted,
  trackLeadGenerated,
  trackHealthConciergeOptIn,
  trackBlogEngagement,
  trackSearch,
  trackFilterUsage,
  trackUserJourneyMilestone,
  trackError,
  getAnalyticsData,
} from './analytics';

// Test all analytics functions
export const runAnalyticsTests = async () => {
  console.group('🔍 Luther Health Analytics Test Suite');

  try {
    console.log('📊 Testing page view tracking...');
    trackPageView('test_page', 'Test');

    console.log('🏥 Testing assessment tracking...');
    trackAssessmentStart('test_assessment', 'Test Assessment', 99.99);
    trackAssessmentProgress('test_assessment', 'Test Assessment', 'question_1', 20);
    trackAssessmentProgress('test_assessment', 'Test Assessment', 'question_3', 60);
    trackAssessmentCompleted('test_assessment', 'Test Assessment', 99.99);

    console.log('🛒 Testing shopping basket tracking...');
    trackAddToBasket('test_assessment', 'Test Assessment', 99.99);
    trackBundleUpgrade(['test_assessment'], 'test_bundle', 'Test Bundle', 50.00);
    trackRemoveFromBasket('test_assessment', 'Test Assessment');

    console.log('💳 Testing purchase tracking...');
    const testItems = [
      { item_id: 'test_assessment', item_name: 'Test Assessment', category: 'test', price: 99.99, quantity: 1 }
    ];
    trackPurchaseInitiated(testItems, 99.99);
    trackPurchaseCompleted('test_transaction_123', testItems, 99.99);

    console.log('🎯 Testing lead generation tracking...');
    trackLeadGenerated('blog_post', 'surgery_readiness', 37.00);
    trackHealthConciergeOptIn('popup');

    console.log('📝 Testing blog engagement tracking...');
    trackBlogEngagement('Test Blog Post', 'view');
    trackBlogEngagement('Test Blog Post', 'scroll_50');
    trackBlogEngagement('Test Blog Post', 'cta_click', 1);

    console.log('🔍 Testing search and filter tracking...');
    trackSearch('surgery readiness', 5, 'assessments');
    trackFilterUsage('category', 'surgery-preparation', 5);

    console.log('🚀 Testing user journey tracking...');
    trackUserJourneyMilestone('first_assessment_completion', 15000);

    console.log('❌ Testing error tracking...');
    trackError('test_error', 'This is a test error for analytics', 'test_page');

    // Test analytics data retrieval
    console.log('📈 Testing analytics data retrieval...');
    const dateRange = {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      end: new Date()
    };

    const analyticsData = await getAnalyticsData(dateRange);
    console.log('Analytics data retrieved:', analyticsData);

    console.log('✅ All analytics tests completed successfully!');

    // Return summary
    return {
      success: true,
      testsRun: 15,
      eventsTracked: 14,
      dataRetrieved: !!analyticsData,
      localStorageEvents: JSON.parse(localStorage.getItem('luther_analytics_events') || '[]').length,
    };

  } catch (error) {
    console.error('❌ Analytics test failed:', error);
    return {
      success: false,
      error: error.message,
    };
  } finally {
    console.groupEnd();
  }
};

// Get current analytics summary from local storage
export const getLocalAnalyticsSummary = () => {
  try {
    const events = JSON.parse(localStorage.getItem('luther_analytics_events') || '[]');

    const summary = {
      totalEvents: events.length,
      eventsByType: {},
      eventsByCategory: {},
      recentEvents: events.slice(-10).reverse(),
      timeRange: {
        first: events.length > 0 ? new Date(events[0].timestamp).toISOString() : null,
        last: events.length > 0 ? new Date(events[events.length - 1].timestamp).toISOString() : null,
      },
    };

    // Group events by type and category
    events.forEach((event: any) => {
      // By event name
      if (summary.eventsByType[event.event_name]) {
        summary.eventsByType[event.event_name]++;
      } else {
        summary.eventsByType[event.event_name] = 1;
      }

      // By category
      if (summary.eventsByCategory[event.event_category]) {
        summary.eventsByCategory[event.event_category]++;
      } else {
        summary.eventsByCategory[event.event_category] = 1;
      }
    });

    return summary;
  } catch (error) {
    console.error('Failed to get local analytics summary:', error);
    return null;
  }
};

// Clear all local analytics data
export const clearLocalAnalyticsData = () => {
  try {
    localStorage.removeItem('luther_analytics_events');
    console.log('✅ Local analytics data cleared');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear local analytics data:', error);
    return false;
  }
};

// Analytics health check
export const analyticsHealthCheck = () => {
  const checks = {
    googleAnalyticsLoaded: typeof window.gtag === 'function',
    localStorageAvailable: !!localStorage,
    sessionStorageAvailable: !!sessionStorage,
    userIdSet: !!localStorage.getItem('luther_user_id'),
    sessionIdSet: !!sessionStorage.getItem('luther_session_id'),
    eventsStored: JSON.parse(localStorage.getItem('luther_analytics_events') || '[]').length,
  };

  console.group('🔧 Analytics Health Check');
  Object.entries(checks).forEach(([check, status]) => {
    console.log(`${status ? '✅' : '❌'} ${check}:`, status);
  });
  console.groupEnd();

  return checks;
};

// Add analytics testing to the global window object for easy access in console
if (typeof window !== 'undefined') {
  (window as any).lutherAnalyticsTest = {
    runTests: runAnalyticsTests,
    getSummary: getLocalAnalyticsSummary,
    clearData: clearLocalAnalyticsData,
    healthCheck: analyticsHealthCheck,
  };

  console.log('🎯 Luther Health Analytics Test Suite loaded. Use window.lutherAnalyticsTest to test analytics.');
}