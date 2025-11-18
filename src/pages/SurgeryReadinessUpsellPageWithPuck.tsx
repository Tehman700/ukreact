import React, { useEffect, useState } from "react";
import { Render, Puck, Data } from "@measured/puck";
import { Button } from "../components/ui/button";
import { Shield } from "lucide-react";
import { Assessment } from "../App";
import { LogoCarousel } from "../components/LogoCarousel";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import { puckConfig } from "../components/puck/SurgeryPageComponents";
import { testSupabaseConnection } from "../lib/supabase";
import { PuckDatabase } from "../lib/puck-database";

/**
 * Surgery Readiness Upsell Page with Puck Editor Integration
 * 
 * EDIT PERMISSIONS:
 * - Edit mode is only available when 'luther_user_id' exists in localStorage
 * - Without this key, users can only view the published page
 * - This ensures only authenticated Luther Health users can edit content
 * 
 * USAGE:
 * - Regular users: View published content
 * - Authenticated users: Can click "Edit Page" to enter Puck Editor
 * - Edit mode allows drag-and-drop component editing, saving drafts, and publishing
 */

declare global {
  interface Window {
    _uxa?: {
      push: (args: any[]) => void;
    };
  }
}

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: "1",
  name: "Surgery Readiness Score",
  description:
    "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
  price: 37.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  category: "Pre-Surgery",
  features: [
    "Pre-surgical health optimization",
    "Risk assessment protocols",
    "Recovery timeline planning",
  ],
};

interface SurgeryReadinessUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}

// Default Puck data for the page
const defaultData: Data = {
  content: [
    {
      type: "HeroSection",
      props: {
        id: "hero-1",
        title: "The £37 Pre-Op check that could save you weeks of recovery",
        subtitle: "If you've got a surgery date, your biggest risk isn't the operation. It's showing up under-prepared.",
        image: "/assests/surgery-hero.webp",
        imageAlt: "Smiling male patient in hospital gown representing the Surgery Readiness Score",
      },
    },
    {
      type: "TextSection",
      props: {
        id: "what-men-miss-1",
        title: "What most men miss before surgery",
        content: "Hospitals focus on the operation. Smart patients focus on the inputs that drive outcomes: blood pressure control, managing inflammation, medication optimization, and physical readiness. If these are off, you're more likely to have complications and slower recovery.",
        backgroundColor: "white" as const,
      },
    },
    {
      type: "SurgeryTypesSection",
      props: {
        id: "surgery-types-1",
        title: "Surgeries We Support",
        subtitle: "Our comprehensive assessment covers all major surgical procedures",
        surgeryTypes: [
          { label: "Knee Surgery" },
          { label: "Hip Replacement" },
          { label: "Shoulder Surgery" },
          { label: "Hernia Repair" },
          { label: "Cataract Surgery" },
          { label: "Gallbladder Surgery" },
          { label: "Heart Surgery" },
          { label: "Cosmetic Surgery" },
          { label: "Weight Loss Surgery" },
          { label: "Prostate Surgery" },
          { label: "Spinal Surgery" },
          { label: "Knee Arthroscopy" },
        ],
      },
    },
    {
      type: "TextSection", 
      props: {
        id: "solution-1",
        title: "The 10-Minute Solution",
        content: "Our Surgical Readiness Assessment gives you a clear, actionable plan. You'll get: a Readiness Score showing exactly where you stand, a detailed Risk Breakdown covering all key factors, and a Priority Action Plan with 2-3 specific moves that will have the biggest impact on your surgical outcome.",
        backgroundColor: "gray" as const,
      },
    },
    {
      type: "TestimonialSection",
      props: {
        id: "testimonial-1",
        quote: "At 59, I was nervous about my shoulder surgery. This assessment showed me exactly what I needed to work on. I went in confident and recovered faster than expected. The preparation made all the difference.",
        author: "David M.",
        role: "Shoulder Surgery Patient", 
        rating: 5,
      },
    },
    {
      type: "TextSection",
      props: {
        id: "why-works-1",
        title: "Why this works (without turning your life upside down)",
        content: "We focus on high-impact changes, not overwhelming lists. Based on evidence and real patient outcomes, we identify the 20% of actions that drive 80% of your surgical readiness. Simple, measurable changes that compound quickly.",
        backgroundColor: "white" as const,
      },
    },
    {
      type: "FAQSection",
      props: {
        id: "faq-1",
        title: "Frequently Asked Questions",
        faqs: [
          {
            question: "Is this medical advice?",
            answer: "It's an assessment and planning tool designed by clinicians to help you prepare. It does not replace medical advice from your surgeon or GP. Always follow your care team's instructions.",
          },
          {
            question: "How quickly will I see results?",
            answer: "Most patients implement the 2-3 priority moves within days. Many see improvements in sleep, energy, and confidence within 2-3 weeks.",
          },
          {
            question: "Will this delay my surgery?",
            answer: "No. The goal is to optimize your readiness before your scheduled date. If we identify something requiring medical attention, we'll guide you to discuss it with your care team.",
          },
          {
            question: "What if I'm not tech-savvy?",
            answer: "The assessment is simple and straightforward. If you can read email, you can complete this assessment.",
          },
        ],
      },
    },
    {
      type: "CTASection",
      props: {
        id: "cta-1",
        title: "Ready to optimize your surgical outcome?",
        description: "Join thousands who've used our assessment to prepare confidently for surgery. £37 could save you weeks of recovery.",
        buttonText: "Start Your Assessment Now",
      },
    },
  ],
  root: { props: { title: "Surgery Readiness Assessment" } },
};

export function SurgeryReadinessUpsellPageWithPuck({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  const [data, setData] = useState<Data>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);

  const PAGE_NAME = 'surgery-readiness-assessment-learn-more';

  // Helper function to check user edit permissions
  const checkEditPermission = () => {
    const adminAuthenticated = sessionStorage.getItem('adminAuthenticated');
    return adminAuthenticated !== null && adminAuthenticated == 'true';
  };

  // Check for edit permissions on component mount
  useEffect(() => {
    const hasPermission = checkEditPermission();
    setHasEditPermission(hasPermission);
    
    if (hasPermission) {
      console.log('✅ Edit permission granted for user:', sessionStorage.getItem('adminAuthenticated'));
    } else {
      console.log('❌ No edit permission - luther_user_id not found in localStorage');
    }
  }, []);

  // ContentSquare script injection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    if (document.getElementById(CS_SCRIPT_ID)) {
      console.log("✅ ContentSquare already loaded");
      return;
    }

    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;

    script.onload = () => {
      console.log("✅ ContentSquare loaded successfully");
    };

    script.onerror = () => {
      console.error("❌ Failed to load ContentSquare script");
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        console.log("🧹 Removing ContentSquare script");
        existingScript.remove();
      }
    };
  }, []);

  const handleStartAssessment = () => {
    // Track ContentSquare event
    if (window._uxa && typeof window._uxa.push === 'function') {
      window._uxa.push(['trackDynamicVariable', {
        key: 'cta_click',
        value: 'reduce_surgical_risk_button'
      }]);
      console.log('✅ ContentSquare event tracked: CTA button clicked');
    }

    onAddToBasket(surgeryReadinessAssessment);
    onOpenBasket();
  };

  // Save data to Supabase
  const saveToSupabase = async (pageData: Data, isPublished = false) => {
    setIsSaving(true);
    try {
      await PuckDatabase.savePage({
        page_name: PAGE_NAME,
        page_data: pageData,
        is_published: isPublished
      });
      console.log('✅ Page saved to Supabase successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to save to Supabase:', error);
      // Fallback to localStorage
      localStorage.setItem('puck-surgery-page-data', JSON.stringify(pageData));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Load data from Supabase
  const loadFromSupabase = async () => {
    try {
      setIsLoading(true);
      
      // Test connection first
      console.log('🔍 Testing Supabase connection...');
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        console.warn('⚠️ Supabase connection failed, using fallback data');
        setData(defaultData);
        return;
      }

      console.log('📥 Loading page...');
      const publishedData = await PuckDatabase.getPublishedPage(PAGE_NAME);
      
      if (publishedData?.page_data) {
        console.log('✅ Loaded published data from Supabase');
        setData(publishedData.page_data);
        return;
      }


      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-data');
      if (savedData) {
        console.log('📦 Loaded fallback data from localStorage');
        setData(JSON.parse(savedData));
        return;
      }

      console.log('🔧 Using default data');
      setData(defaultData);
    } catch (error) {
      console.error('❌ Error loading from Supabase:', error);
      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-data');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.warn('Failed to parse localStorage data:', e);
          setData(defaultData);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced config with button functionality
  const enhancedConfig = {
    ...puckConfig,
    components: {
      ...puckConfig.components,
      CTASection: {
        ...puckConfig.components.CTASection,
        render: (props: any) => {
          const OriginalComponent = puckConfig.components.CTASection.render;
          return <OriginalComponent {...props} onButtonClick={handleStartAssessment} />;
        },
      },
    },
  };

  // Load saved data from Supabase on component mount
  useEffect(() => {
    loadFromSupabase();
  }, []);

  // Check for edit mode - only allow if user has permission
  useEffect(() => {
    if (!hasEditPermission) {
      setIsEditing(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editMode = urlParams.get('edit') === 'true' || localStorage.getItem('puck-edit-mode') === 'true';
    setIsEditing(editMode);
  }, [hasEditPermission]);

  const toggleEditMode = () => {
    // Check permission before allowing edit mode toggle
    if (!hasEditPermission) {
      console.warn('❌ Edit mode denied - luther_user_id not found');
      alert('Access denied. You need to be logged in to edit pages.');
      return;
    }

    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    localStorage.setItem('puck-edit-mode', newEditMode.toString());
    
    // Update URL
    const url = new URL(window.location.href);
    if (newEditMode) {
      url.searchParams.set('edit', 'true');
    } else {
      url.searchParams.delete('edit');
    }
    window.history.pushState({}, '', url.toString());
  };

  // Show loading state while fetching from Supabase
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ fontSize: '18px', color: '#666' }}>Loading page...</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div style={{ height: "100vh" }}>
        {/* Edit Mode Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">✏️ Editing: Surgery Readiness Page</h2>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={toggleEditMode}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              👁️ Preview
            </Button>
          </div>
        </div>
        
        {/* Puck Editor */}
        <Puck
          config={enhancedConfig}
          data={data}
          onPublish={async (newData) => {
            setData(newData);
            const success = await saveToSupabase(newData, true);
                if (success) {
                  alert('🚀 Page published successfully!');
                } else {
                  alert('⚠️ Failed to publish Page. Check your internet connection.');
            }
            console.log('📤 Published Page data:', newData);
          }}

        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Mode Toggle Button - Only show if user has permission */}
      {hasEditPermission && (
        <div className="fixed top-4 right-4 z-50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleEditMode}
            className="bg-white/90 backdrop-blur-sm shadow-lg border hover:bg-gray-50"
          >
            ✏️ Edit Page
          </Button>
        </div>
      )}

      {/* Render the page using Puck */}
      <Render config={enhancedConfig} data={data} />


    </div>
  );
}

// Export both versions for flexibility
