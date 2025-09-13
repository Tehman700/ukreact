import { useCallback, useEffect, useRef } from 'react';
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
  getUserId,
  getSessionId,
} from '../utils/analytics';
export interface UseAnalyticsReturn {
  // Page tracking
  trackPage: (pageName: string, category?: string) => void;
  
  // Assessment tracking
  trackAssessmentStart: (assessmentId: string, assessmentName: string, price: number) => void;
  trackAssessmentProgress: (assessmentId: string, assessmentName: string, step: string, completionPercentage: number) => void;
  trackAssessmentCompleted: (assessmentId: string, assessmentName: string, price: number) => void;
  
  // Shopping tracking
  trackAddToBasket: (assessmentId: string, assessmentName: string, price: number) => void;
  trackRemoveFromBasket: (assessmentId: string, assessmentName: string) => void;
  trackBundleUpgrade: (fromAssessments: string[], toBundleId: string, bundleName: string, savings: number) => void;
  
  // Purchase tracking
  trackPurchaseInitiated: (items: any[], totalValue: number) => void;
  trackPurchaseCompleted: (transactionId: string, items: any[], totalValue: number) => void;
  
  // Lead generation tracking
  trackLeadGenerated: (source: string, leadType: string, value?: number) => void;
  trackHealthConciergeOptIn: (source: string) => void;
  
  // Content tracking
  trackBlogEngagement: (blogTitle: string, action: string, value?: number) => void;
  
  // Search and filter tracking
  trackSearch: (searchTerm: string, resultCount: number, category?: string) => void;
  trackFilterUsage: (filterType: string, filterValue: string, resultCount: number) => void;
  
  // User journey tracking
  trackUserJourneyMilestone: (milestone: string, timeToReach?: number) => void;
  
  // Error tracking
  trackError: (errorType: string, errorMessage: string, page: string) => void;
  
  // Session info
  userId: string;
  sessionId: string;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const pageStartTime = useRef<number>(Date.now());
  const userId = getUserId();
  const sessionId = getSessionId();

  // Auto-track page views when component mounts
  const trackPageViewAuto = useCallback((pageName: string, category?: string) => {
    pageStartTime.current = Date.now();
    trackPageView(pageName, category);
  }, []);

  // Auto-track time on page when component unmounts
  useEffect(() => {
    return () => {
      const timeOnPage = Date.now() - pageStartTime.current;
      if (timeOnPage > 5000) { // Only track if user spent more than 5 seconds
        trackUserJourneyMilestone('page_time', timeOnPage);
      }
    };
  }, []);

  return {
    // Page tracking
    trackPage: trackPageViewAuto,
    
    // Assessment tracking
    trackAssessmentStart: useCallback((assessmentId: string, assessmentName: string, price: number) => {
      trackAssessmentStart(assessmentId, assessmentName, price);
    }, []),
    
    trackAssessmentProgress: useCallback((assessmentId: string, assessmentName: string, step: string, completionPercentage: number) => {
      trackAssessmentProgress(assessmentId, assessmentName, step, completionPercentage);
    }, []),
    
    trackAssessmentCompleted: useCallback((assessmentId: string, assessmentName: string, price: number) => {
      trackAssessmentCompleted(assessmentId, assessmentName, price);
    }, []),
    
    // Shopping tracking
    trackAddToBasket: useCallback((assessmentId: string, assessmentName: string, price: number) => {
      trackAddToBasket(assessmentId, assessmentName, price);
    }, []),
    
    trackRemoveFromBasket: useCallback((assessmentId: string, assessmentName: string) => {
      trackRemoveFromBasket(assessmentId, assessmentName);
    }, []),
    
    trackBundleUpgrade: useCallback((fromAssessments: string[], toBundleId: string, bundleName: string, savings: number) => {
      trackBundleUpgrade(fromAssessments, toBundleId, bundleName, savings);
    }, []),
    
    // Purchase tracking
    trackPurchaseInitiated: useCallback((items: any[], totalValue: number) => {
      trackPurchaseInitiated(items, totalValue);
    }, []),
    
    trackPurchaseCompleted: useCallback((transactionId: string, items: any[], totalValue: number) => {
      trackPurchaseCompleted(transactionId, items, totalValue);
    }, []),
    
    // Lead generation tracking
    trackLeadGenerated: useCallback((source: string, leadType: string, value?: number) => {
      trackLeadGenerated(source, leadType, value);
    }, []),
    
    trackHealthConciergeOptIn: useCallback((source: string) => {
      trackHealthConciergeOptIn(source);
    }, []),
    
    // Content tracking
    trackBlogEngagement: useCallback((blogTitle: string, action: string, value?: number) => {
      trackBlogEngagement(blogTitle, action, value);
    }, []),
    
    // Search and filter tracking
    trackSearch: useCallback((searchTerm: string, resultCount: number, category?: string) => {
      trackSearch(searchTerm, resultCount, category);
    }, []),
    
    trackFilterUsage: useCallback((filterType: string, filterValue: string, resultCount: number) => {
      trackFilterUsage(filterType, filterValue, resultCount);
    }, []),
    
    // User journey tracking
    trackUserJourneyMilestone: useCallback((milestone: string, timeToReach?: number) => {
      trackUserJourneyMilestone(milestone, timeToReach);
    }, []),
    
    // Error tracking
    trackError: useCallback((errorType: string, errorMessage: string, page: string) => {
      trackError(errorType, errorMessage, page);
    }, []),
    
    // Session info
    userId,
    sessionId,
  };
};

// Specialized hooks for specific use cases

// Hook for assessment flows
export const useAssessmentAnalytics = (assessmentId: string, assessmentName: string, price: number) => {
  const analytics = useAnalytics();
  const hasStartedRef = useRef(false);
  
  const startAssessment = useCallback(() => {
    if (!hasStartedRef.current) {
      analytics.trackAssessmentStart(assessmentId, assessmentName, price);
      hasStartedRef.current = true;
    }
  }, [analytics, assessmentId, assessmentName, price]);
  
  const trackProgress = useCallback((step: string, completionPercentage: number) => {
    analytics.trackAssessmentProgress(assessmentId, assessmentName, step, completionPercentage);
  }, [analytics, assessmentId, assessmentName]);
  
  const completeAssessment = useCallback(() => {
    analytics.trackAssessmentCompleted(assessmentId, assessmentName, price);
  }, [analytics, assessmentId, assessmentName, price]);
  
  return {
    startAssessment,
    trackProgress,
    completeAssessment,
    ...analytics,
  };
};

// Hook for shopping basket tracking
export const useBasketAnalytics = () => {
  const analytics = useAnalytics();
  
  const trackItemAdded = useCallback((assessmentId: string, assessmentName: string, price: number) => {
    analytics.trackAddToBasket(assessmentId, assessmentName, price);
  }, [analytics]);
  
  const trackItemRemoved = useCallback((assessmentId: string, assessmentName: string) => {
    analytics.trackRemoveFromBasket(assessmentId, assessmentName);
  }, [analytics]);
  
  const trackUpgrade = useCallback((fromAssessments: string[], toBundleId: string, bundleName: string, savings: number) => {
    analytics.trackBundleUpgrade(fromAssessments, toBundleId, bundleName, savings);
  }, [analytics]);
  
  const trackCheckoutStarted = useCallback((items: any[], totalValue: number) => {
    analytics.trackPurchaseInitiated(items, totalValue);
    analytics.trackUserJourneyMilestone('checkout_started');
  }, [analytics]);
  
  return {
    trackItemAdded,
    trackItemRemoved,
    trackUpgrade,
    trackCheckoutStarted,
    ...analytics,
  };
};

// Hook for blog content tracking
export const useBlogAnalytics = (blogTitle: string) => {
  const analytics = useAnalytics();
  const readStartTime = useRef<number>(Date.now());
  const scrollPercentage = useRef<number>(0);
  
  useEffect(() => {
    // Track blog view
    analytics.trackBlogEngagement(blogTitle, 'view');
    
    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollPercentage = Math.round((scrollTop + windowHeight) / documentHeight * 100);
      
      // Track milestone scroll percentages
      if (currentScrollPercentage >= 25 && scrollPercentage.current < 25) {
        analytics.trackBlogEngagement(blogTitle, 'scroll_25');
        scrollPercentage.current = 25;
      } else if (currentScrollPercentage >= 50 && scrollPercentage.current < 50) {
        analytics.trackBlogEngagement(blogTitle, 'scroll_50');
        scrollPercentage.current = 50;
      } else if (currentScrollPercentage >= 75 && scrollPercentage.current < 75) {
        analytics.trackBlogEngagement(blogTitle, 'scroll_75');
        scrollPercentage.current = 75;
      } else if (currentScrollPercentage >= 90 && scrollPercentage.current < 90) {
        analytics.trackBlogEngagement(blogTitle, 'scroll_complete');
        scrollPercentage.current = 90;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [analytics, blogTitle]);
  
  const trackEngagement = useCallback((action: string, value?: number) => {
    analytics.trackBlogEngagement(blogTitle, action, value);
  }, [analytics, blogTitle]);
  
  const trackReadTime = useCallback(() => {
    const readTime = Date.now() - readStartTime.current;
    analytics.trackBlogEngagement(blogTitle, 'read_time', readTime);
  }, [analytics, blogTitle]);
  
  return {
    trackEngagement,
    trackReadTime,
    ...analytics,
  };
};

// Hook for search and filter tracking
export const useSearchAnalytics = () => {
  const analytics = useAnalytics();
  
  const trackSearchQuery = useCallback((searchTerm: string, resultCount: number, category?: string) => {
    analytics.trackSearch(searchTerm, resultCount, category);
  }, [analytics]);
  
  const trackFilterApplied = useCallback((filterType: string, filterValue: string, resultCount: number) => {
    analytics.trackFilterUsage(filterType, filterValue, resultCount);
  }, [analytics]);
  
  return {
    trackSearchQuery,
    trackFilterApplied,
    ...analytics,
  };
};