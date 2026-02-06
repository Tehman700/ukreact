import React from "react";
import { QuizOption } from "../../types/quiz";

interface SingleChoiceQuestionProps {
  title: string;
  subtitle?: string;
  helperText?: string;
  options: QuizOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  title,
  subtitle,
  helperText,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="quiz-question single-choice-question">
      <div className="quiz-title">{title}</div>
      {helperText && <div className="quiz-helper-text">{helperText}</div>}
      <div className={`select-wrapper ${value ? 'has-value' : ''}`}>
        <select
          className="quiz-select"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.value as string}>
              {option.label}
              {option.description ? ` - ${option.description}` : ""}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
