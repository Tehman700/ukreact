import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface QuizResultsProps {
  answers: Record<number, any>;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ answers, onRestart }) => {
  // Calculate improvement percentages based on answers
  const calculateImprovements = () => {
    const age = answers[1] || 0;
    const bodyWeight = answers[4] || "";
    const smoking = answers[6] || "";
    const alcohol = answers[7] || "";
    const activity = answers[8] || "";

    let complicationReduction = 30; // Base
    let hospitalStayReduction = 35; // Base
    let painReduction = 40; // Base

    // Smoking cessation has major impact
    if (smoking === "current") {
      complicationReduction += 15;
      hospitalStayReduction += 10;
      painReduction += 10;
    }

    // Body weight optimization
    if (bodyWeight === "obese" || bodyWeight === "very-overweight") {
      complicationReduction += 10;
      hospitalStayReduction += 8;
      painReduction += 8;
    }

    // Activity level improvement
    if (activity === "low") {
      complicationReduction += 8;
      hospitalStayReduction += 7;
      painReduction += 7;
    } else if (activity === "very-active") {
      complicationReduction += 5;
      hospitalStayReduction += 5;
      painReduction += 5;
    }

    // Alcohol reduction
    if (alcohol === "22+") {
      complicationReduction += 7;
      hospitalStayReduction += 5;
    }

    // Age factor
    if (age > 70) {
      complicationReduction += 5;
      hospitalStayReduction += 5;
    }

    // Cap at realistic maximum
    complicationReduction = Math.min(complicationReduction, 45);
    hospitalStayReduction = Math.min(hospitalStayReduction, 50);
    painReduction = Math.min(painReduction, 55);

    return {
      complication: complicationReduction,
      hospital: hospitalStayReduction,
      pain: painReduction,
    };
  };

  const improvements = calculateImprovements();

  // Generate chart data with improvement names and values
  const chartData = [
    {
      name: "Complication Risk",
      value: improvements.complication,
    },
    {
      name: "Hospital Stay",
      value: improvements.hospital,
    },
    {
      name: "Post-op Pain",
      value: improvements.pain,
    },
  ];

  return (
    <div className="quiz-results-simple">
      <div className="results-simple-wrapper">
        <div className="results-simple-content">
          {/* Improvement Items */}
          <div className="improvement-item">
            <div className="improvement-details">
              <p className="improvement-text">
                You could reduce your <strong className="text-muted">overall complication risk</strong> up to:
              </p>
              <div className="improvement-percentage">{improvements.complication}%</div>
            </div>
          </div>

          <div className="improvement-item">
            <div className="improvement-details">
              <p className="improvement-text">
                You could reduce your <strong className="text-muted">length of stay in hospital</strong> up to:
              </p>
              <div className="improvement-percentage">{improvements.hospital}%</div>
            </div>
          </div>

          <div className="improvement-item">
            <div className="improvement-details">
              <p className="improvement-text">
                You could reduce your <strong className="text-muted">post op pain</strong> by up to:
              </p>
              <div className="improvement-percentage">{improvements.pain}%</div>
            </div>
          </div>
          
   
            <div className="chart-container" style={{ marginTop: '1rem' }}>
            <ResponsiveContainer width="50%" height={100}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  domain={[25, 'auto']} 
                  tick={{ fontSize: 5 }}
                  width={10}
                />
                <Tooltip />
                <Line 
                  type="natural" 
                  dataKey="value" 
                  stroke="#a1a1a1" 
                  strokeWidth={2}
                  dot={false}  
                  activeDot={{ r: 5 }}
                  connectNulls
                  animationDuration={700}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="results-simple-actions">
            
          <button 
          className="results-simple-btn btn-book"
           onClick={onRestart}>
            Clear
          </button>
          <a href="#calendar" className="results-simple-btn btn-book">
            Book a call
          </a>
        </div>
        
        </div>

        {/* Action Buttons */}
       
      </div>
    </div>
  );
};
