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
 * Surgery Readiness Upsell Page D with Puck Editor Integration
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

// Default Puck data for Surgery Readiness Page D - 6-Week Protocol Focus
const defaultData: Data = {
  content: [
    {
      type: "HeroSection",
      props: {
        id: "hero-1",
        title: "Surgery in 6 weeks? Here's your roadmap.",
        subtitle: "Don't wing it. Follow our proven 6-week preparation protocol to optimize your body, minimize risks, and recover faster.",
        image: "/src/assets/SurgeryHeroVarient1.webp",
        imageAlt: "Patient preparing for surgery with confidence using 6-week protocol",
      },
    },
    {
      type: "TextSection",
      props: {
        id: "timeline-intro-1",
        title: "Your 6-Week Surgery Preparation Timeline",
        content: "Each week builds on the last. Follow this proven protocol to show up at your surgery in the best possible condition. Week 1-2: Assessment & Planning. Week 3-4: Optimization Phase. Week 5-6: Final Preparation.",
        backgroundColor: "white" as const,
      },
    },
    {
      type: "TextSection",
      props: {
        id: "results-1",
        title: "What 6 Weeks of Preparation Can Do",
        content: "Real outcomes from patients who followed our protocol: 37% faster recovery time, 65% fewer complications, 2.3x better mobility scores, and 1.8 fewer hospital days required.",
        backgroundColor: "gray" as const,
      },
    },
    {
      type: "TestimonialSection",
      props: {
        id: "testimonial-1",
        quote: "I had 6 weeks notice for my knee replacement. Following this protocol was the best decision I made. I went in strong, came out stronger, and was walking normally within 4 weeks instead of the 3 months they predicted.",
        author: "Robert H.",
        role: "Knee Replacement Patient", 
        rating: 5,
      },
    },
    {
      type: "FAQSection",
      props: {
        id: "faq-1",
        title: "Common Questions About the 6-Week Protocol",
        faqs: [
          {
            question: "What if I have less than 6 weeks?",
            answer: "The protocol adapts to your timeline. Even 2-3 weeks of focused preparation can significantly improve your outcomes. We'll prioritize the most impactful interventions for your specific timeframe.",
          },
          {
            question: "Is this suitable for all surgery types?",
            answer: "Yes. Whether it's joint replacement, cardiac, abdominal, or cosmetic surgery, the fundamental principles of optimization apply. The assessment personalizes recommendations for your specific procedure.",
          },
          {
            question: "What if I'm already quite healthy?",
            answer: "Even healthy patients benefit from surgical optimization. The assessment often reveals subtle areas for improvement that can make the difference between a good recovery and an excellent one.",
          },
          {
            question: "Do I need to change my current medications?",
            answer: "We'll identify medications that may interfere with surgery or healing, but any changes must be discussed with your prescribing doctor. We provide the information you need for informed discussions.",
          },
        ],
      },
    },
    {
      type: "CTASection",
      props: {
        id: "cta-1",
        title: "Ready to Transform Your Surgery Experience?",
        description: "6 weeks. One assessment. A completely different recovery story.",
        buttonText: "Start Your 6-Week Protocol Now",
      },
    },
  ],
  root: { props: { title: "Surgery Readiness Assessment - Page D (6-Week Protocol)" } },
};

export function SurgeryReadinessUpsellPageDWithPuck({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  const [data, setData] = useState<Data>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);

  const PAGE_NAME = 'surgery-readiness-assessment-6-week-protocol-d';

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

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness-d";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    if (document.getElementById(CS_SCRIPT_ID)) {
      console.log("✅ ContentSquare already loaded on D");
      return;
    }

    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;

    script.onload = () => {
      console.log("✅ ContentSquare loaded successfully on Surgery Readiness page D");
    };

    script.onerror = () => {
      console.error("❌ Failed to load ContentSquare script (D)");
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        console.log("🧹 Removing ContentSquare script (D)");
        existingScript.remove();
      }
    };
  }, []);

  const handleStartAssessment = () => {
    // Track ContentSquare event
    if (window._uxa && typeof window._uxa.push === 'function') {
      window._uxa.push(['trackDynamicVariable', {
        key: 'cta_click',
        value: '6_week_protocol_button_page_d'
      }]);
      console.log('✅ ContentSquare event tracked: 6-Week Protocol button clicked on Page D');
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
      console.log('✅ Page D saved to Supabase successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to save Page D to Supabase:', error);
      // Fallback to localStorage
      localStorage.setItem('puck-surgery-page-d-data', JSON.stringify(pageData));
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
      console.log('🔍 Testing Supabase connection for Page D...');
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        console.warn('⚠️ Supabase connection failed, using fallback data for Page D');
        setData(defaultData);
        return;
      }

      console.log('📥 Loading Page...');
      const publishedData = await PuckDatabase.getPublishedPage(PAGE_NAME);
      
      if (publishedData?.page_data) {
        console.log('✅ Loaded published Page D data from Supabase');
        setData(publishedData.page_data);
        return;
      }


      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-d-data');
      if (savedData) {
        console.log('📦 Loaded fallback Page D data from localStorage');
        setData(JSON.parse(savedData));
        return;
      }

      console.log('🔧 Using default Page D data');
      setData(defaultData);
    } catch (error) {
      console.error('❌ Error loading Page D from Supabase:', error);
      // Fallback to localStorage
      const savedData = localStorage.getItem('puck-surgery-page-d-data');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.warn('Failed to parse localStorage data for Page D:', e);
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
    const editMode = urlParams.get('edit') === 'true' || localStorage.getItem('puck-edit-mode-d') === 'true';
    setIsEditing(editMode);
  }, [hasEditPermission]);

  const toggleEditMode = () => {
    // Check permission before allowing edit mode toggle
    if (!hasEditPermission) {
      console.warn('❌ Edit mode denied for Page D - luther_user_id not found');
      alert('Access denied. You need to be logged in to edit pages.');
      return;
    }

    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    localStorage.setItem('puck-edit-mode-d', newEditMode.toString());
    
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
          <h2 className="text-lg font-semibold">✏️ Editing: Surgery Readiness Page D (6-Week Protocol)</h2>
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