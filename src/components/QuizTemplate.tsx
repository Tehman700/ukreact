import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

export interface QuizConfig {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (answers: Record<string, string | string[]>) => void;
  onBack?: () => void;
  onQuestionComplete?: (questionIndex: number, totalQuestions: number) => void;
  informationPageRoute?: string;
}

interface QuizTemplateProps {
  config: QuizConfig;
}

export function QuizTemplate({ config }: QuizTemplateProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Safety checks
  if (!config || !config.questions || config.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2>Quiz Not Available</h2>
          <p className="text-muted-foreground">There was an error loading the quiz questions.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = config.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === config.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / config.questions.length) * 100;

  // Additional safety check for currentQuestion
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2>Question Not Found</h2>
          <p className="text-muted-foreground">Unable to load question {currentQuestionIndex + 1}.</p>
          <div className="mt-4">
            <Button onClick={() => setCurrentQuestionIndex(0)} variant="outline">
              Reset to First Question
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion.multiSelect) {
      const newSelected = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId];
      setSelectedOptions(newSelected);
    } else {
      setSelectedOptions([optionId]);
      // Auto-advance for single select after a brief delay
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  };

  const handleNext = () => {
    // Save current answer
    const currentAnswer = currentQuestion.multiSelect ? selectedOptions : selectedOptions[0];
    const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Navigate to information page after quiz completion
      config.onComplete?.(newAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptions([]); // Reset selections for next question
    }

    // Trigger onQuestionComplete if defined
    if (config.onQuestionComplete) {
      config.onQuestionComplete(currentQuestionIndex + 1, config.questions.length);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Load previous answer
      const previousAnswer = answers[config.questions[currentQuestionIndex - 1].id];
      if (previousAnswer) {
        setSelectedOptions(Array.isArray(previousAnswer) ? previousAnswer : [previousAnswer]);
      } else {
        setSelectedOptions([]);
      }
    } else {
      config.onBack?.();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOptions([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between py-6">
              <Button variant="ghost" size="icon" onClick={resetQuiz} className="hover:bg-muted">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-center">Your next steps</h1>
              <div className="w-10" />
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="container mx-auto px-4 max-w-2xl py-16">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-4">
                <h2>Assessment Complete!</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Thank you for completing the {config.title}. Your responses have been recorded 
                  and you'll receive personalized recommendations based on your specific situation.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Button onClick={resetQuiz} variant="outline" className="flex-1">
                Take Again
              </Button>
              <Button onClick={() => window.location.hash = 'assessments'} className="flex-1">
                View All Assessments
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
{/* Header with navigation */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Bar */}
          <div className="py-4 sm:py-6">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={handlePrevious} className="hover:bg-muted flex-shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center justify-between flex-1">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {config.questions.length}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {Math.round(progress)}% complete
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-1 sm:h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-2xl py-6 sm:py-8 lg:py-16">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Question Section */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="mx-auto max-w-2xl text-xl sm:text-2xl lg:text-3xl leading-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className={`
                  w-full min-h-[48px] sm:min-h-[56px] lg:min-h-[60px] h-auto p-3 sm:p-4 lg:p-6 rounded-lg text-left justify-start
                  border transition-all duration-200 ease-in-out
                  ${selectedOptions.includes(option.id)
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                    : 'bg-card hover:bg-muted border-border hover:border-muted-foreground/30'
                  }
                `}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex flex-col items-start text-left w-full">
                  <span className="font-medium text-sm sm:text-base leading-tight break-words pb-1 sm:pb-[6px]">{option.label}</span>
                  {option.description && (
                    <span className={`text-xs sm:text-sm mt-1 leading-tight break-words ${selectedOptions.includes(option.id) ? 'opacity-90' : 'text-muted-foreground'}`}>
                      {option.description}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Continue Button for Multi-Select */}
          {currentQuestion.multiSelect && selectedOptions.length > 0 && (
            <div className="flex justify-center pt-4 sm:pt-6">
              <Button onClick={handleNext} size="lg" className="px-6 sm:px-8">
                {isLastQuestion ? 'Complete Assessment' : 'Continue'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}