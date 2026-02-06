import React, { useState } from "react";
import { quizQuestions } from "../../data/quizData";
import { SliderQuestion } from "./SliderQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { QuizResults } from "./QuizResults";
import "./Quiz.css";

export const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswer = (questionId: number, answer: any, autoAdvance: boolean = false) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    // Auto-advance for single choice questions
    if (autoAdvance) {
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "slider") {
      return answer !== undefined && answer !== null;
    }
    if (currentQuestion.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== null && answer !== "";
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (isComplete) {
    return <QuizResults answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-wrapper">

        <div className="quiz-content">
          {currentQuestion.type === "slider" && (
            <SliderQuestion
              title={currentQuestion.title}
              subtitle={currentQuestion.subtitle}
              min={currentQuestion.min!}
              max={currentQuestion.max!}
              unit={currentQuestion.unit}
              value={answers[currentQuestion.id] as number}
              onChange={(value) => handleAnswer(currentQuestion.id, value)}
            />
          )}

          {currentQuestion.type === "single" && (
            <SingleChoiceQuestion
              title={currentQuestion.title}
              subtitle={currentQuestion.subtitle}
              helperText={currentQuestion.helperText}
              options={currentQuestion.options!}
              value={answers[currentQuestion.id] as string}
              onChange={(value) => handleAnswer(currentQuestion.id, value, true)}
            />
          )}

          {currentQuestion.type === "multiple" && (
            <MultipleChoiceQuestion
              title={currentQuestion.title}
              subtitle={currentQuestion.subtitle}
              helperText={currentQuestion.helperText}
              options={currentQuestion.options!}
              value={answers[currentQuestion.id] as string[]}
              onChange={(value) => handleAnswer(currentQuestion.id, value)}
            />
          )}
        </div>

        {/* Navigation - Only for slider and multiple choice questions */}
        {(currentQuestion.type === "slider" || currentQuestion.type === "multiple") && (
          <div className="quiz-navigation">
            <button
              className="quiz-btn quiz-btn-primary"
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
            >
              {isLastQuestion ? "View Results" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
