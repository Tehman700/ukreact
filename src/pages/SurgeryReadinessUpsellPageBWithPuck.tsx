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
 * Surgery Readiness Upsell Page B with Puck Editor Integration
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

// Default Puck data for Surgery Readiness Page B
const defaultData: Data = {
  content: [
    {
      type: "HeroSection",
      props: {
        id: "hero-1",
        title: "Reduce your surgical risks. Today.",
        subtitle: "Most surgical complications are predictable and preventable. We show you exactly what to fix before it's too late.",
        image: "/src/assets/SurgeryHeroVarient1.webp",
        imageAlt: "Smiling male patient in hospital gown representing the Surgery Readiness Score",
      },
    },
    {
      type: "TextSection",
      props: {
        id: "luther-difference-1",
        title: "The Luther Health Difference",
        content: "Most surgical preparation is reactive. We're proactive. We provide comprehensive pre-surgical risk assessment, personalized optimization plans, nutrition & fitness guidance, medication reviews, instant results, and specialist follow-up availability.",
        backgroundColor: "white" as const,
      },
    },
    {
      type: "TestimonialSection",
      props: {
        id: "testimonial-1",
        quote: "I'm 67 and was terrified about my hip replacement. This assessment showed me I had low protein and poor fitness—things my surgeon never mentioned. I spent 6 weeks preparing properly. Recovery was faster than expected and I was walking without a stick in 3 weeks.",
        author: "Michael R.",
        role: "Hip Replacement Patient", 
        rating: 5,
      },
    },
    {
      type: "TextSection",
      props: {
        id: "preparation-matters-1",
        title: "See What's Possible When You Prepare Properly",
        content: "A picture speaks louder than words — here's a glimpse of the difference proper preparation can make before surgery. Proper preparation leads to faster recovery, lower risks, increased confidence, and maintained independence.",
        backgroundColor: "gray" as const,
      },
    },
    {
      type: "FAQSection",
      props: {
        id: "faq-1",
        title: "Frequently Asked Questions",
        faqs: [
          {
            question: "Who is this assessment for?",
            answer: "Men over 60 preparing for surgery, those with health issues like diabetes or high blood pressure, anyone worried about healing slow or facing complications, men who want to stay strong and independent after surgery, and anyone who wants a simple plan to improve their outcome.",
          },
          {
            question: "Who is this NOT for?",
            answer: "Anyone not planning surgery soon, those expecting the doctor to handle everything, people unwilling to make changes, or anyone okay with risking a long or painful recovery.",
          },
          {
            question: "How will it help you?",
            answer: "This assessment gives you control. You'll get a clear picture of your current readiness, insight into what's putting you at risk, steps to take before surgery to lower that risk, and a simple plan to heal faster and recover stronger.",
          },
          {
            question: "What do I get?",
            answer: "A short, easy assessment (under 10 minutes), instant results with no waiting, a clear custom action plan, and the option to get expert help if you want it.",
          },
          {
            question: "Why does this matter?",
            answer: "Most people show up for surgery unprepared, leading to longer hospital stays, extended pain, reduced mobility, and increased dependence. This assessment helps you recover faster, lower your risk, feel more confident, and stay independent.",
          },
          {
            question: "How long does it take?",
            answer: "Less than 10 minutes. No fluff. No medical jargon. Just real answers.",
          },
        ],
      },
    },
    {
      type: "CTASection",
      props: {
        id: "cta-1",
        title: "Don't Walk Into Surgery Blind. Know Your Risks. Fix Them Now.",
        description: "If you're over 60 and have health issues, don't leave your recovery to chance. This quick assessment could save you weeks of pain and problems.",
        buttonText: "Reduce my surgical risk now (only £37)",
      },
    },
  ],
  root: { props: { title: "Surgery Readiness Assessment - Page B" } },
};

export function SurgeryReadinessUpsellPageBWithPuck({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  const [data, setData] = useState<Data>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);

  const PAGE_NAME = 'surgery-readiness-assessment-learn-more-b';

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
      console.log('✅ Edit permission granted for user:', sessionStorage.getItem('luther_user_id'));
    } else {
      console.log('❌ No edit permission - luther_user_id not found in localStorage');
    }
  }, []);

  // ContentSquare script injection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-b";
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
        value: 'reduce_surgical_risk_button_page_b'
      }]);
      console.log('✅ ContentSquare event tracked: CTA button clicked on Page B');
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
      console.log('✅ Page B saved to Supabase successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to save Page B to Supabase:', error);
      // Fallback to localStorage
      localStorage.setItem('puck-surgery-page-b-data', JSON.stringify(pageData));
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
      console.log('🔍 Testing Supabase connection for Page B...');
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        console.warn('⚠️ Supabase connection failed, using fallback data for Page B');
        setData(defaultData);
        return;
      }

      console.log('📥 Loading Page...');
      const publishedData = await PuckDatabase.getPublishedPage(PAGE_NAME);
      
      if (publishedData?.page_data) {
        console.log('✅ Loaded published Page B data from Supabase');
        setData(publishedData.page_data);
        return;
      }



      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-b-data');
      if (savedData) {
        console.log('📦 Loaded fallback Page B data from localStorage');
        setData(JSON.parse(savedData));
        return;
      }

      console.log('🔧 Using default Page B data');
      setData(defaultData);
    } catch (error) {
      console.error('❌ Error loading Page B from Supabase:', error);
      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-b-data');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.warn('Failed to parse localStorage data for Page B:', e);
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
    const editMode = urlParams.get('edit') === 'true' || localStorage.getItem('puck-edit-mode-b') === 'true';
    setIsEditing(editMode);
  }, [hasEditPermission]);

  const toggleEditMode = () => {
    // Check permission before allowing edit mode toggle
    if (!hasEditPermission) {
      console.warn('❌ Edit mode denied for Page B - luther_user_id not found');
      alert('Access denied. You need to be logged in to edit pages.');
      return;
    }

    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    localStorage.setItem('puck-edit-mode-b', newEditMode.toString());
    
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
        <p style={{ fontSize: '18px', color: '#666' }}>Loading Page...</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div style={{ height: "100vh" }}>
        {/* Edit Mode Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">✏️ Editing: Surgery Readiness Page B</h2>
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
            console.log('📤 Published Page B data:', newData);
          }}
          onChange={(newData) => {
            setData(newData);
            // Auto-save draft changes every 30 seconds
            const autoSave = setTimeout(async () => {
              await saveToSupabase(newData, true);
            }, 30000);
            return () => clearTimeout(autoSave);
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