import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Play, Pause } from 'lucide-react';

const AUTHORITY_STATEMENTS = [
  "Checking NICE guidelines",
  "Reviewing NHS clinical pathways", 
  "Consulting Royal College recommendations",
  "Cross-checking Cochrane systematic reviews",
  "Consulting British Medical Association statements",
  "Reviewing Royal College of Surgeons protocols",
  "Reviewing British Cardiovascular Society updates",
  "Cross-checking Orthopaedic Society recommendations",
  "Reviewing Royal College of Anaesthetists best practices",
  "Verifying surgical safety checklists",
  "Reviewing patient-reported outcome measures",
  "Cross-checking long-term follow-up data",
  "Running data quality assurance checks",
  "Consulting national audit datasets",
  "Reviewing clinical trial registries",
  "Running population health analytics"
];

interface LoadingPageProps {
  onComplete?: () => void;
  assessmentTitle?: string;
}

export function LoadingPage({ onComplete, assessmentTitle = "your personalised report" }: LoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [completedStatements, setCompletedStatements] = useState<number[]>([]);
  
  // DEBUG: Pause functionality
  const [isPaused, setIsPaused] = useState(false);
  const [activeTimeouts, setActiveTimeouts] = useState<NodeJS.Timeout[]>([]);
  
  // Navigate to home page by default if no onComplete handler
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    } else {
      window.location.hash = 'home';
    }
  }, [onComplete]);

  // DEBUG: Toggle pause/resume
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  useEffect(() => {
    // Clear timeouts when paused
    if (isPaused) {
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      setActiveTimeouts([]);
      return;
    }

    // More realistic progress jumps at random intervals to simulate backend work
    const progressSteps = [
      { progress: 8, delay: 300, statement: 0 },
      { progress: 15, delay: 800, statement: 1 },
      { progress: 23, delay: 600, statement: 2 },
      { progress: 35, delay: 900, statement: 3 },
      { progress: 42, delay: 500, statement: 4 },
      { progress: 58, delay: 700, statement: 5 },
      { progress: 67, delay: 800, statement: 6 },
      { progress: 74, delay: 600, statement: 7 },
      { progress: 82, delay: 900, statement: 8 },
      { progress: 91, delay: 500, statement: 9 },
      { progress: 100, delay: 700, statement: AUTHORITY_STATEMENTS.length - 1 }
    ];

    let stepIndex = 0;
    let cumulativeDelay = 0;
    let isComponentMounted = true; // Track component mount status

    const executeStep = (step: typeof progressSteps[0], delay: number, stepIndex: number) => {
      return setTimeout(() => {
        // Check if component is still mounted and not paused
        if (!isComponentMounted || isPaused) return;
        
        setProgress(step.progress);
        
        // Mark previous statements as completed
        if (stepIndex > 0) {
          setCompletedStatements(prev => {
            const newCompleted = new Set(prev);
            for (let i = 0; i < step.statement; i++) {
              newCompleted.add(i);
            }
            return Array.from(newCompleted);
          });
        }
        
        setCurrentStatementIndex(step.statement);

        if (step.progress >= 100) {
          // Mark final statement as completed and navigate
          setTimeout(() => {
            if (isComponentMounted && !isPaused) {
              setCompletedStatements(prev => [...prev, step.statement]);
              setTimeout(() => {
                if (isComponentMounted && !isPaused) {
                  handleComplete();
                }
              }, 300);
            }
          }, 200);
        }
      }, delay);
    };

    const timeouts: NodeJS.Timeout[] = [];
    
    progressSteps.forEach((step, index) => {
      if (index === 0) {
        cumulativeDelay = step.delay;
      } else {
        cumulativeDelay += step.delay;
      }
      
      timeouts.push(executeStep(step, cumulativeDelay, index));
    });

    setActiveTimeouts(timeouts);

    return () => {
      isComponentMounted = false; // Mark component as unmounted
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [handleComplete, isPaused]); // Re-run when isPaused changes

  // Calculate the stroke dash array for the progress circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8 relative">
      {/* DEBUG: Control buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={togglePause}
          className="text-muted-foreground hover:text-foreground"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.location.hash = 'home'}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>
      
      <div className="w-full max-w-md mx-auto text-center space-y-8">
        
        {/* Progress Circle */}
        <div className="relative flex items-center justify-center">
          <svg
            className="transform -rotate-90 w-36 h-36"
            width="144"
            height="144"
            viewBox="0 0 144 144"
          >
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-foreground"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] // Custom easing for mechanical feel
              }}
            />
          </svg>
          
          {/* Progress percentage - no flashing animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg transition-all duration-300 ease-out">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        {/* Please Wait Message */}
        <div className="space-y-2 mt-[0px] mr-[0px] mb-[55px] ml-[0px]">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="tracking-wide"
          >
            {isPaused ? 'paused' : 'Please wait...'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground"
          >
            {isPaused ? 'Processing paused for debugging' : `Crafting ${assessmentTitle}`}
          </motion.p>
        </div>

        {/* Authority Statements Carousel */}
        <div className="relative h-24 overflow-hidden">
          <AnimatePresence mode="wait">
            <div className="space-y-0.5 text-center text-sm">
              {/* Previous statements (faded) */}
              {currentStatementIndex > 0 && (
                <motion.div
                  key={`prev-${currentStatementIndex - 1}`}
                  initial={{ opacity: 0.3, y: -10 }}
                  animate={{ opacity: 0.2, y: -20 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground/60"
                >
                  {AUTHORITY_STATEMENTS[currentStatementIndex - 1]}
                  <span className="ml-2 text-green-600">✓</span>
                </motion.div>
              )}
              
              {/* Current active statement */}
              <motion.div
                key={`current-${currentStatementIndex}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1] // Mechanical easing
                  }
                }}
                exit={{ 
                  opacity: 0.3, 
                  y: -20, 
                  scale: 0.95,
                  transition: { duration: 0.3 }
                }}
                className="text-foreground py-2"
              >
                {AUTHORITY_STATEMENTS[currentStatementIndex]}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="ml-2 text-green-600"
                >
                  ✓
                </motion.span>
              </motion.div>
              
              {/* Next statements (preview, highly faded) */}
              {currentStatementIndex < AUTHORITY_STATEMENTS.length - 1 && (
                <motion.div
                  key={`next-${currentStatementIndex + 1}`}
                  initial={{ opacity: 0.1, y: 30 }}
                  animate={{ opacity: 0.15, y: 20 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground/40"
                >
                  {AUTHORITY_STATEMENTS[currentStatementIndex + 1]}
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}