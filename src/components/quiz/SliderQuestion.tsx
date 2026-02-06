import React, { useState } from "react";

interface SliderQuestionProps {
  title: string;
  subtitle?: string;
  min: number;
  max: number;
  unit?: string;
  value: number | undefined;
  onChange: (value: number) => void;
}

export const SliderQuestion: React.FC<SliderQuestionProps> = ({
  title,
  subtitle,
  min,
  max,
  unit,
  value,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value || min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="quiz-question slider-question">
      <div  className="quiz-title">{title}</div>
      <div className="slider-container">
        <div className="slider-value">
          <span className="value-number">{localValue}</span>
          {unit && <span className="value-unit">{unit}</span>}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
          className="slider-input"
        />
        <div className="slider-labels">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
