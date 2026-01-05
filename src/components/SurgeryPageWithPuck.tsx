import React, { useEffect, useState, lazy, Suspense } from "react";
import { Render, Data } from "@measured/puck";
import { Button } from "./ui/button";
import { puckConfig } from "./puck/SurgeryPageComponents";
import { testSupabaseConnection } from "../lib/supabase";
import { PuckDatabase } from "../lib/puck-database";
import { Assessment } from "../App";
import { useSearchAnalytics, useAnalytics } from '../hooks/useAnalytics';
import { PageLoader } from '../components/PageLoader';

// Lazy load Puck editor for better performance
const Puck = lazy(() => import("@measured/puck").then(m => ({ default: m.Puck })));

// Dynamically load Puck styles only when needed
const loadPuckStyles = () => {
    import("@measured/puck/dist/index.css");
    import("../puck-basic.css");
};

/**
 * Common Surgery Page with Puck Editor Integration
 *
 * EDIT PERMISSIONS:
 * - Edit mode is only available when 'adminAuthenticated' exists in sessionStorage
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

interface SurgeryPageWithPuckProps {
  pageName: string;
  pageTitle: string;
  defaultData: Data;
  assessment?: Assessment; // Make optional since we'll use Puck data
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
  onAssessmentUpdate?: (assessment: Assessment) => void; // Notify when assessment data changes
}

export function SurgeryPageWithPuck({
  pageName,
  pageTitle,
  defaultData,
  assessment: fallbackAssessment,
  onAddToBasket,
  onOpenBasket,
  onAssessmentUpdate,
}: SurgeryPageWithPuckProps) {
  const [data, setData] = useState<Data>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);

  // Helper function to check user edit permissions
  const checkEditPermission = () => {
    const adminAuthenticated = sessionStorage.getItem("adminAuthenticated");
    return adminAuthenticated !== null && adminAuthenticated === "true";
  };

  // Check for edit permissions on component mount
  useEffect(() => {
    const hasPermission = checkEditPermission();
    setHasEditPermission(hasPermission);
  }, []);

  // ContentSquare script injection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const CS_SCRIPT_ID = "contentsquare-surgery-readiness";
    const CS_SRC = "https://t.contentsquare.net/uxa/e1e286c6ac3ab.js";

    if (document.getElementById(CS_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = CS_SCRIPT_ID;
    script.src = CS_SRC;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(CS_SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const assessment: Assessment = React.useMemo(() => {
   
    const rootProps = data?.root?.props || {};
    
    const finalAssessment: Assessment = {
      id: fallbackAssessment?.id || "1",
      name: (rootProps.assessmentName as string) || fallbackAssessment?.name || "Surgery Readiness Score",
      description: (rootProps.assessmentDescription as string) || fallbackAssessment?.description || "Comprehensive pre-surgical evaluation",
      price: typeof rootProps.assessmentPrice === 'number' ? rootProps.assessmentPrice : (fallbackAssessment?.price || 37.0),
      image: '/surgery-hero.webp',
      icon: fallbackAssessment?.icon || null,
      features: fallbackAssessment?.features || [],
      hidden: fallbackAssessment?.hidden,
    };
    
    return finalAssessment;
  }, [data, fallbackAssessment]);

   const { trackAssessmentStart, trackAddToBasket } = useAnalytics();

  useEffect(() => {
    if (onAssessmentUpdate && assessment) {
      onAssessmentUpdate(assessment);
    }
  }, [assessment, onAssessmentUpdate]);

  const handleStartAssessmentModal = React.useCallback(() => {
    if (window._uxa && typeof window._uxa.push === "function") {
      window._uxa.push([
        "trackDynamicVariable",
        {
          key: "cta_click",
          value: "reduce_surgical_risk_button",
        },
      ]);
    }
    console.log("Starting assessment:", assessment);
     trackAssessmentStart(assessment.id, assessment.name, assessment.price);
     trackAddToBasket(assessment.id, assessment.name, assessment.price);
    onAddToBasket(assessment);
    onOpenBasket();
  }, [assessment, trackAssessmentStart, trackAddToBasket, onAddToBasket, onOpenBasket]);

  const saveToSupabase = async (pageData: Data, isPublished = false) => {
    setIsSaving(true);
    try {
      await PuckDatabase.savePage({
        page_name: pageName,
        page_data: pageData,
        is_published: isPublished,
      });
      console.log("✅ Page saved to Supabase successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to save to Supabase:", error);
      // Fallback to localStorage
      localStorage.setItem(`puck-${pageName}-data`, JSON.stringify(pageData));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const loadFromSupabase = async () => {
    try {
      setIsLoading(true);

      // Test connection first
      const isConnected = await testSupabaseConnection();

      if (!isConnected) {
        console.warn("⚠️ Supabase connection failed, using fallback data");
        setData(defaultData);
        return;
      }

      const publishedData = await PuckDatabase.getPublishedPage(pageName);

      if (publishedData?.page_data) {
        setData(publishedData.page_data);
        return;
      }

      // Fallback to localStorage
      const savedData = localStorage.getItem(`puck-${pageName}-data`);
      if (savedData) {
        setData(JSON.parse(savedData));
        return;
      }
      setData(defaultData);
    } catch (error) {
      const savedData = localStorage.getItem(`puck-${pageName}-data`);
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.warn("Failed to parse localStorage data:", e);
          setData(defaultData);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const enhancedConfig = {
    ...puckConfig,
    components: {
      ...puckConfig.components,
      CTASection: {
        ...puckConfig.components.CTASection,
        render: (props: any) => {
          const OriginalComponent = puckConfig.components.CTASection.render;
          return (
            <OriginalComponent
              {...props}
              onButtonClick={handleStartAssessmentModal}
            />
          );
        },
      },
      Button: {
        ...puckConfig.components.Button,
        render: (props: any) => {
          const OriginalComponent = puckConfig.components.Button.render;
          return (
            <OriginalComponent {...props} onClick={handleStartAssessmentModal} />
          );
        },
      },
    },
  };

  useEffect(() => {
    loadFromSupabase();
  }, []);

  useEffect(() => {
    if (!hasEditPermission) {
      setIsEditing(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editMode =
      urlParams.get("edit") === "true" ||
      localStorage.getItem("puck-edit-mode") === "true";
    
    if (editMode) {
      loadPuckStyles();
    }
    
    setIsEditing(editMode);
  }, [hasEditPermission]);

  const toggleEditMode = () => {
    if (!hasEditPermission) {
      alert("Access denied. You need to be logged in to edit pages.");
      return;
    }

    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    localStorage.setItem("puck-edit-mode", newEditMode.toString());

    if (newEditMode) {
      loadPuckStyles();
    }

    const url = new URL(window.location.href);
    if (newEditMode) {
      url.searchParams.set("edit", "true");
    } else {
      url.searchParams.delete("edit");
    }
    window.history.pushState({}, "", url.toString());
  };

  if (isLoading) {
    return ( <PageLoader />);
  }

  if (isEditing) {
    return (
      <div style={{ height: "100vh" }}>
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
              className="bg-white/90 backdrop-blur-sm shadow-lg border hover:bg-gray-50"
            >
              👁️ Preview Page
            </Button>
          </div>
        <Suspense fallback={<PageLoader />}>
          <Puck
            config={enhancedConfig}
            data={data}
            onPublish={async (newData) => {
              setData(newData);
              const success = await saveToSupabase(newData, true);
              if (success) {
                alert("🚀 Page published successfully!");
              } else {
                alert(
                  "⚠️ Failed to publish Page. Changes have been saved locally.",
                );
              }
            }}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {hasEditPermission && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            className="bg-white/90 backdrop-blur-sm shadow-lg border hover:bg-gray-50"
          >
            ✏️ Edit 
          </Button>
        </div>
      )}
      <Render config={enhancedConfig} data={data} />
    </div>
  );
}
