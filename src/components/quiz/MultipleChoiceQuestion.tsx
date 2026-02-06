import React from "react";
import { QuizOption } from "../../types/quiz";

interface MultipleChoiceQuestionProps {
  title: string;
  subtitle?: string;
  helperText?: string;
  options: QuizOption[];
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  title,
  subtitle,
  helperText,
  options,
  value = [],
  onChange,
}) => {
  const handleToggle = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    
    // If "none" is selected, clear all others
    if (optionValue === "none") {
      onChange(["none"]);
      return;
    }
    
    // If any other option is selected, remove "none"
    let newValues = currentValues.filter((v) => v !== "none");
    
    if (currentValues.includes(optionValue)) {
      newValues = newValues.filter((v) => v !== optionValue);
    } else {
      newValues = [...newValues, optionValue];
    }
    
    onChange(newValues);
  };

  return (
    <div className="quiz-question multiple-choice-question">
      {subtitle && <div className="quiz-subtitle">Question — {subtitle}</div>}
      <div  className="quiz-title">{title}</div>
      {helperText && <div className="quiz-helper-text">{helperText}</div>}
      <div className="quiz-options">
        {options.map((option) => {
          const isSelected = Array.isArray(value) && value.includes(option.value as string);
          return (
            <div
              key={option.id}
              className={`quiz-option ${isSelected ? "selected" : ""}`}
              onClick={() => handleToggle(option.value as string)}
            >
              <div className="option-checkbox">
                <div className={`checkbox-mark ${isSelected ? "active" : ""}`}>
                  {isSelected && "✓"}
                </div>
              </div>
              <div className="option-content">
                <div className="option-label">{option.label}</div>
                {option.description && (
                  <div className="option-description">{option.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
