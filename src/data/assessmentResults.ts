import { CheckCircle2, TrendingUp, AlertCircle, AlertTriangle, Shield, Clock, Zap, Heart, Activity } from 'lucide-react';

export interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'optimal';
  description: string;
  recommendations: string[];
  riskFactors?: string[];
  timeline?: string;
  priority?: 'immediate' | 'high' | 'medium' | 'low';
}

export interface AssessmentConfiguration {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: React.ReactNode;
  primaryColor: string;
  accentColor: string;
  overallScoreInterpretation: (score: number) => {
    rating: string;
    level: 'low' | 'moderate' | 'high' | 'optimal';
    description: string;
  };
  categories: AssessmentResult[];
  uniqueFeatures: {
    hasRiskMatrix?: boolean;
    hasTimelineView?: boolean;
    hasProgressTracking?: boolean;
    hasComparisonChart?: boolean;
    customScoring?: string;
  };
  disclaimers: {
    main: string;
    additional?: string[];
  };
  nextSteps: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  successMetrics: string[];
}

export const assessmentConfigurations: Record<string, AssessmentConfiguration> = {
  'surgery-readiness': {
    id: 'surgery-readiness',
    title: 'Surgery Readiness Score',
    type: 'Comprehensive Health Assessment',
    description: 'Your complete readiness evaluation for upcoming surgical procedures',
    icon: Shield,
    primaryColor: 'text-blue-600',
    accentColor: 'bg-blue-50',
    overallScoreInterpretation: (score: number) => {
      if (score >= 85) return { 
        rating: 'Excellent Readiness', 
        level: 'optimal',
        description: 'You demonstrate exceptional preparation for surgery with optimal health indicators across all assessed categories.'
      };
      if (score >= 70) return { 
        rating: 'Good Readiness', 
        level: 'high',
        description: 'You show strong preparation for surgery with most health indicators in favorable ranges.'
      };
      if (score >= 55) return { 
        rating: 'Fair Readiness', 
        level: 'moderate',
        description: 'You have moderate preparation for surgery with several areas that could benefit from optimization.'
      };
      return { 
        rating: 'Needs Improvement', 
        level: 'low',
        description: 'Your preparation for surgery requires significant improvement in multiple key areas.'
      };
    },
    categories: [
      {
        category: "Physical Readiness",
        score: 82,
        maxScore: 100,
        level: "high",
        description: "Your physical condition shows strong preparation for surgical procedures with good cardiovascular fitness and muscle strength.",
        recommendations: [
          "Continue current exercise routine with focus on functional movements",
          "Maintain protein intake at 1.2-1.6g per kg body weight daily",
          "Add 10-15 minutes of flexibility training to your daily routine",
          "Consider adding resistance training 2-3x per week"
        ],
        timeline: "2-4 weeks before surgery",
        priority: "high"
      },
      {
        category: "Metabolic Health",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your metabolic markers indicate room for optimization before surgery, particularly blood sugar control and inflammatory markers.",
        recommendations: [
          "Focus on blood sugar stabilization through consistent meal timing",
          "Consider intermittent fasting protocol (12-14 hour overnight fast)",
          "Increase omega-3 fatty acid intake to 2-3g daily",
          "Reduce processed food intake by 50% over the next 4 weeks"
        ],
        timeline: "4-6 weeks before surgery",
        priority: "high"
      },
      {
        category: "Recovery Potential",
        score: 88,
        maxScore: 100,
        level: "optimal",
        description: "Excellent indicators for post-surgical healing and recovery based on sleep quality, stress management, and nutritional status.",
        recommendations: [
          "Maintain current sleep schedule of 7-9 hours nightly",
          "Continue stress management practices (meditation, deep breathing)",
          "Ensure adequate vitamin D levels (>30 ng/mL)",
          "Keep consistent bedtime routine to optimize recovery hormones"
        ],
        timeline: "Ongoing",
        priority: "medium"
      },
      {
        category: "Risk Factors",
        score: 65,
        maxScore: 100,
        level: "moderate",
        description: "Some modifiable risk factors identified that should be addressed pre-surgery to optimize outcomes.",
        recommendations: [
          "Schedule comprehensive pre-operative consultation",
          "Review all current medications with your surgeon",
          "Complete smoking cessation program if applicable",
          "Address any untreated dental issues"
        ],
        riskFactors: ["Elevated blood pressure", "Irregular medication adherence", "Suboptimal dental hygiene"],
        timeline: "6-8 weeks before surgery",
        priority: "immediate"
      },
      {
        category: "Preparation Status",
        score: 70,
        maxScore: 100,
        level: "moderate",
        description: "Your current preparation efforts are on track but could be enhanced with structured protocols.",
        recommendations: [
          "Implement structured pre-operative exercise program",
          "Create detailed recovery timeline and support plan",
          "Address remaining lifestyle optimization areas",
          "Establish post-operative care coordination plan"
        ],
        timeline: "2-3 weeks before surgery",
        priority: "high"
      }
    ],
    uniqueFeatures: {
      hasRiskMatrix: true,
      hasTimelineView: true,
      hasProgressTracking: true,
      customScoring: "Weighted scoring emphasizes recovery potential and risk mitigation"
    },
    disclaimers: {
      main: "This assessment is for informational purposes only and does not constitute medical advice. Please consult with your surgical team before making any health-related decisions.",
      additional: [
        "Individual results may vary based on surgical type and complexity",
        "This assessment should complement, not replace, standard pre-operative evaluations"
      ]
    },
    nextSteps: {
      immediate: [
        "Schedule pre-operative consultation with your surgical team",
        "Address any identified high-priority risk factors",
        "Begin recommended lifestyle modifications"
      ],
      shortTerm: [
        "Complete structured conditioning protocol",
        "Optimize nutritional status",
        "Finalize recovery support systems"
      ],
      longTerm: [
        "Maintain fitness and health improvements post-surgery",
        "Monitor recovery milestones",
        "Apply lessons learned to future health decisions"
      ]
    },
    successMetrics: [
      "Reduced surgical complications",
      "Faster recovery times",
      "Better post-operative outcomes",
      "Improved quality of life scores"
    ]
  },

  'complication-risk': {
    id: 'complication-risk',
    title: 'Complication Risk Assessment',
    type: 'Comprehensive Risk Analysis',
    description: 'Advanced analysis of factors that could impact your surgical outcomes',
    icon: AlertTriangle,
    primaryColor: 'text-orange-600',
    accentColor: 'bg-orange-50',
    overallScoreInterpretation: (score: number) => {
      if (score >= 85) return { 
        rating: 'Low Risk Profile', 
        level: 'optimal',
        description: 'Your risk profile indicates minimal likelihood of surgical complications with proper standard care.'
      };
      if (score >= 70) return { 
        rating: 'Moderate Risk Profile', 
        level: 'high',
        description: 'Your risk profile shows manageable factors that can be optimized before surgery.'
      };
      if (score >= 55) return { 
        rating: 'Elevated Risk Profile', 
        level: 'moderate',
        description: 'Your risk profile indicates several factors requiring active management before surgery.'
      };
      return { 
        rating: 'High Risk Profile', 
        level: 'low',
        description: 'Your risk profile requires immediate attention and aggressive optimization before considering surgery.'
      };
    },
    categories: [
      {
        category: "Medical History Risk",
        score: 68,
        maxScore: 100,
        level: "moderate",
        description: "Your medical history contains several factors that may increase surgical complication risk if not properly managed.",
        recommendations: [
          "Optimize diabetes control (HbA1c <7%) before surgery",
          "Ensure blood pressure control (<140/90) for 4+ weeks",
          "Complete pre-operative cardiology clearance",
          "Review and optimize current chronic condition management"
        ],
        riskFactors: ["Type 2 diabetes", "Hypertension", "Previous cardiac events"],
        timeline: "6-12 weeks before surgery",
        priority: "immediate"
      },
      {
        category: "Lifestyle Risk Factors",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Several modifiable lifestyle factors could significantly impact your surgical outcome and recovery.",
        recommendations: [
          "Complete smoking cessation program immediately (minimum 4 weeks before surgery)",
          "Reduce alcohol consumption to <7 units per week",
          "Begin structured exercise program (30 min, 5x/week)",
          "Address nutritional deficiencies identified in screening"
        ],
        riskFactors: ["Current smoking", "Regular alcohol use", "Sedentary lifestyle"],
        timeline: "8-12 weeks before surgery",
        priority: "immediate"
      },
      {
        category: "Medication Risk Profile",
        score: 82,
        maxScore: 100,
        level: "high",
        description: "Your current medications present manageable risks with proper perioperative planning and coordination.",
        recommendations: [
          "Create detailed medication management plan with surgeon",
          "Adjust blood thinner timing (stop 5-7 days before surgery)",
          "Discontinue herbal supplements 2 weeks before surgery",
          "Plan comprehensive post-operative pain management strategy"
        ],
        timeline: "2-4 weeks before surgery",
        priority: "high"
      },
      {
        category: "Surgical History Impact",
        score: 85,
        maxScore: 100,
        level: "optimal",
        description: "Your previous surgical experiences demonstrate good healing capacity and low complication rates.",
        recommendations: [
          "Apply successful strategies from previous surgeries",
          "Maintain proven pre-operative preparation methods",
          "Ensure same support systems and care teams are available",
          "Document lessons learned for surgical team reference"
        ],
        timeline: "Ongoing",
        priority: "low"
      },
      {
        category: "Physical Risk Factors",
        score: 65,
        maxScore: 100,
        level: "moderate",
        description: "Current weight and fitness levels may impact surgical outcomes and should be addressed before elective procedures.",
        recommendations: [
          "Target 5-10% weight reduction if BMI >30",
          "Increase protein intake to 1.2-1.6g per kg body weight",
          "Begin progressive cardiovascular fitness program",
          "Address any sleep apnea concerns with sleep study"
        ],
        riskFactors: ["BMI >30", "Poor cardiovascular fitness", "Possible sleep apnea"],
        timeline: "8-16 weeks before surgery",
        priority: "high"
      }
    ],
    uniqueFeatures: {
      hasRiskMatrix: true,
      hasComparisonChart: true,
      customScoring: "Risk-weighted algorithm prioritizes modifiable factors"
    },
    disclaimers: {
      main: "This risk assessment is for informational purposes only. All surgical decisions should be made in consultation with your surgical team and primary care physician.",
      additional: [
        "Risk factors are based on statistical models and may not predict individual outcomes",
        "Some risk factors may not be modifiable within typical pre-operative timeframes"
      ]
    },
    nextSteps: {
      immediate: [
        "Address smoking cessation if applicable",
        "Optimize chronic disease management",
        "Schedule required pre-operative consultations"
      ],
      shortTerm: [
        "Complete lifestyle modification program",
        "Finalize medication management plan",
        "Address modifiable physical risk factors"
      ],
      longTerm: [
        "Maintain risk reduction strategies post-surgery",
        "Monitor for late complications",
        "Apply risk management to future procedures"
      ]
    },
    successMetrics: [
      "Reduced complication rates",
      "Shorter hospital stays",
      "Faster return to normal activities",
      "Lower readmission rates"
    ]
  },

  'recovery-speed': {
    id: 'recovery-speed',
    title: 'Recovery Speed Predictor',
    type: 'Personalized Recovery Analysis',
    description: 'Evidence-based prediction of your post-surgical recovery timeline',
    icon: Zap,
    primaryColor: 'text-green-600',
    accentColor: 'bg-green-50',
    overallScoreInterpretation: (score: number) => {
      if (score >= 85) return { 
        rating: 'Rapid Recovery Expected', 
        level: 'optimal',
        description: 'Your profile indicates excellent potential for faster-than-average recovery with optimal outcomes.'
      };
      if (score >= 70) return { 
        rating: 'Good Recovery Expected', 
        level: 'high',
        description: 'Your profile suggests good recovery potential with appropriate support and preparation.'
      };
      if (score >= 55) return { 
        rating: 'Moderate Recovery Expected', 
        level: 'moderate',
        description: 'Your recovery timeline may be average to slightly extended without optimization efforts.'
      };
      return { 
        rating: 'Extended Recovery Likely', 
        level: 'low',
        description: 'Your profile suggests recovery may take longer without significant preparation and support improvements.'
      };
    },
    categories: [
      {
        category: "Nutritional Foundation",
        score: 78,
        maxScore: 100,
        level: "high",
        description: "Your nutritional status provides a solid foundation for healing, with some areas for optimization.",
        recommendations: [
          "Increase protein intake to 1.6-2.0g per kg body weight daily",
          "Add vitamin C supplementation (1000mg daily) 2 weeks before surgery",
          "Ensure adequate zinc intake (15-20mg daily) for wound healing",
          "Consider collagen peptide supplementation (10-15g daily)"
        ],
        timeline: "4-6 weeks before surgery",
        priority: "high"
      },
      {
        category: "Mental Readiness",
        score: 85,
        maxScore: 100,
        level: "optimal",
        description: "Excellent psychological preparation and coping strategies that will support faster recovery.",
        recommendations: [
          "Continue current stress management techniques",
          "Practice visualization exercises for positive surgical outcomes",
          "Maintain social connections and communication during recovery",
          "Consider guided meditation or mindfulness apps during recovery"
        ],
        timeline: "Ongoing",
        priority: "medium"
      },
      {
        category: "Support System Strength",
        score: 72,
        maxScore: 100,
        level: "moderate",
        description: "Your support network is adequate but could be strengthened to optimize recovery speed.",
        recommendations: [
          "Identify and confirm primary caregiver for first 48-72 hours",
          "Arrange meal preparation support for first 1-2 weeks",
          "Set up transportation assistance for follow-up appointments",
          "Create communication plan to keep family/friends updated"
        ],
        timeline: "2-4 weeks before surgery",
        priority: "high"
      },
      {
        category: "Physical Conditioning",
        score: 80,
        maxScore: 100,
        level: "high",
        description: "Good baseline physical fitness that will contribute to faster recovery and better outcomes.",
        recommendations: [
          "Continue current exercise routine up to 48 hours before surgery",
          "Add specific exercises targeting surgical area if appropriate",
          "Practice deep breathing exercises for post-operative lung function",
          "Learn and practice gentle mobility exercises for early recovery"
        ],
        timeline: "4-8 weeks before surgery",
        priority: "medium"
      },
      {
        category: "Recovery Environment",
        score: 68,
        maxScore: 100,
        level: "moderate",
        description: "Your home recovery environment could be optimized to support faster healing and comfort.",
        recommendations: [
          "Create comfortable recovery space with easy access to bathroom",
          "Ensure adequate lighting and ventilation in recovery area",
          "Prepare easy-to-reach storage for medications and supplies",
          "Consider mobility aids (grabber, shower chair) if recommended"
        ],
        timeline: "1-2 weeks before surgery",
        priority: "medium"
      }
    ],
    uniqueFeatures: {
      hasTimelineView: true,
      hasProgressTracking: true,
      customScoring: "Predictive algorithm based on recovery research and patient outcomes"
    },
    disclaimers: {
      main: "Recovery predictions are estimates based on multiple factors and individual results may vary. Follow your surgical team's specific recovery guidelines.",
      additional: [
        "Recovery times can be affected by unexpected complications or individual healing variations",
        "These predictions are based on typical recovery patterns and may not account for all variables"
      ]
    },
    nextSteps: {
      immediate: [
        "Optimize nutritional status",
        "Strengthen support system coordination",
        "Prepare recovery environment"
      ],
      shortTerm: [
        "Complete physical conditioning program",
        "Finalize caregiver arrangements",
        "Stock recovery supplies"
      ],
      longTerm: [
        "Monitor recovery milestones",
        "Maintain fitness gains post-recovery",
        "Document successful strategies for future reference"
      ]
    },
    successMetrics: [
      "25-40% faster recovery times",
      "Reduced pain medication usage",
      "Earlier return to work/activities",
      "Higher patient satisfaction scores"
    ]
  },

  'anaesthesia-risk': {
    id: 'anaesthesia-risk',
    title: 'Anaesthesia Risk Screening',
    type: 'Perioperative Safety Assessment',
    description: 'Comprehensive evaluation of factors affecting anaesthesia safety and outcomes',
    icon: Heart,
    primaryColor: 'text-red-600',
    accentColor: 'bg-red-50',
    overallScoreInterpretation: (score: number) => {
      if (score >= 85) return { 
        rating: 'Low Anaesthesia Risk', 
        level: 'optimal',
        description: 'Your profile indicates minimal anaesthesia-related risks with standard monitoring and care.'
      };
      if (score >= 70) return { 
        rating: 'Moderate Anaesthesia Risk', 
        level: 'high',
        description: 'Your risk factors are manageable with appropriate precautions and monitoring.'
      };
      if (score >= 55) return { 
        rating: 'Elevated Anaesthesia Risk', 
        level: 'moderate',
        description: 'Several risk factors require careful anaesthesia planning and enhanced monitoring.'
      };
      return { 
        rating: 'High Anaesthesia Risk', 
        level: 'low',
        description: 'Your risk profile requires specialist anaesthesia consultation and intensive monitoring protocols.'
      };
    },
    categories: [
      {
        category: "Airway Risk Assessment",
        score: 88,
        maxScore: 100,
        level: "optimal",
        description: "Your airway characteristics suggest low risk for difficult intubation or airway management issues.",
        recommendations: [
          "Continue current oral hygiene routine",
          "Avoid eating or drinking after midnight before surgery",
          "Remove any dental appliances before surgery",
          "Inform anaesthesia team of any recent dental work"
        ],
        timeline: "Day of surgery",
        priority: "low"
      },
      {
        category: "Sleep Apnoea Risk",
        score: 65,
        maxScore: 100,
        level: "moderate",
        description: "Indicators suggest possible sleep apnoea which can complicate anaesthesia and recovery.",
        recommendations: [
          "Complete sleep study evaluation if not done within 2 years",
          "If using CPAP, bring machine and settings to hospital",
          "Discuss sleep patterns and snoring history with anaesthesia team",
          "Consider pre-operative weight loss if BMI >30"
        ],
        riskFactors: ["Loud snoring", "Witnessed apnoea episodes", "BMI >30"],
        timeline: "4-8 weeks before surgery",
        priority: "high"
      },
      {
        category: "Medication Interactions",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your current medications require careful consideration for anaesthesia drug selection and timing.",
        recommendations: [
          "Provide complete medication list including over-the-counter drugs",
          "Discuss herbal supplements and alternative medicines with team",
          "Follow specific pre-operative medication instructions",
          "Bring current medications to hospital for reference"
        ],
        timeline: "2-4 weeks before surgery",
        priority: "high"
      },
      {
        category: "Cardiovascular Stability",
        score: 82,
        maxScore: 100,
        level: "high",
        description: "Your cardiovascular status is stable and should tolerate anaesthesia well with standard monitoring.",
        recommendations: [
          "Continue current cardiac medications as directed",
          "Monitor blood pressure in weeks leading up to surgery",
          "Report any new chest pain, shortness of breath, or palpitations",
          "Maintain current activity level unless advised otherwise"
        ],
        timeline: "Ongoing",
        priority: "medium"
      },
      {
        category: "Recovery Risk Factors",
        score: 70,
        maxScore: 100,
        level: "moderate",
        description: "Some factors may affect your recovery from anaesthesia and should be addressed proactively.",
        recommendations: [
          "Minimize alcohol consumption for 48 hours before surgery",
          "Ensure adequate hydration up to 2 hours before surgery",
          "Plan for extended recovery room monitoring if needed",
          "Arrange reliable transportation home after surgery"
        ],
        timeline: "48 hours before surgery",
        priority: "medium"
      }
    ],
    uniqueFeatures: {
      hasRiskMatrix: true,
      customScoring: "ASA (American Society of Anesthesiologists) physical status classification integrated"
    },
    disclaimers: {
      main: "This screening assessment complements but does not replace formal pre-anaesthetic consultation. Your anaesthesia team will conduct their own comprehensive evaluation.",
      additional: [
        "Anaesthesia risks can change based on the type and duration of surgery planned",
        "Some risk factors may only be apparent during formal anaesthetic assessment"
      ]
    },
    nextSteps: {
      immediate: [
        "Complete any recommended sleep studies",
        "Address alcohol consumption patterns",
        "Optimize cardiovascular health"
      ],
      shortTerm: [
        "Confirm medication management plan",
        "Complete pre-anaesthetic consultation",
        "Address any identified risk factors"
      ],
      longTerm: [
        "Monitor for post-operative complications",
        "Address underlying sleep or cardiovascular issues",
        "Maintain optimizations for future procedures"
      ]
    },
    successMetrics: [
      "Reduced anaesthesia complications",
      "Faster emergence from anaesthesia",
      "Lower post-operative nausea rates",
      "Improved patient satisfaction with anaesthesia experience"
    ]
  },

  'mobility-strength': {
    id: 'mobility-strength',
    title: 'Mobility & Strength Assessment',
    type: 'Functional Capacity Evaluation',
    description: 'Baseline assessment of physical function to guide rehabilitation and track recovery progress',
    icon: Activity,
    primaryColor: 'text-purple-600',
    accentColor: 'bg-purple-50',
    overallScoreInterpretation: (score: number) => {
      if (score >= 85) return { 
        rating: 'Excellent Function', 
        level: 'optimal',
        description: 'Your mobility and strength are excellent for your age group, providing optimal foundation for surgery and recovery.'
      };
      if (score >= 70) return { 
        rating: 'Good Function', 
        level: 'high',
        description: 'Your functional capacity is good and should support successful surgical outcomes with proper rehabilitation.'
      };
      if (score >= 55) return { 
        rating: 'Fair Function', 
        level: 'moderate',
        description: 'Your functional capacity is adequate but could benefit from pre-operative conditioning and structured rehabilitation.'
      };
      return { 
        rating: 'Limited Function', 
        level: 'low',
        description: 'Your current functional limitations require intensive pre-operative conditioning and comprehensive rehabilitation planning.'
      };
    },
    categories: [
      {
        category: "Upper Body Strength",
        score: 75,
        maxScore: 100,
        level: "moderate",
        description: "Your upper body strength is adequate for daily activities but could be improved to support post-surgical recovery tasks.",
        recommendations: [
          "Begin progressive resistance training 2-3x per week",
          "Focus on functional movements (pushing, pulling, lifting)",
          "Include exercises for core stability and posture",
          "Use resistance bands or light weights to start"
        ],
        timeline: "6-8 weeks before surgery",
        priority: "medium"
      },
      {
        category: "Lower Body Strength",
        score: 82,
        maxScore: 100,
        level: "high",
        description: "Good lower body strength that will support mobility during recovery and reduce fall risk.",
        recommendations: [
          "Continue current leg strengthening activities",
          "Add balance training exercises (single leg stands, heel-to-toe walking)",
          "Practice sit-to-stand movements to prepare for post-surgery mobility",
          "Consider adding stair climbing practice if applicable to recovery"
        ],
        timeline: "4-6 weeks before surgery",
        priority: "low"
      },
      {
        category: "Flexibility & Range of Motion",
        score: 68,
        maxScore: 100,
        level: "moderate",
        description: "Limited flexibility in key areas may impact post-surgical positioning and rehabilitation progress.",
        recommendations: [
          "Begin daily stretching routine focusing on tight muscle groups",
          "Consider yoga or gentle movement classes",
          "Pay special attention to hip flexors, shoulders, and spine mobility",
          "Use heat therapy before stretching and cold therapy if experiencing soreness"
        ],
        timeline: "8-12 weeks before surgery",
        priority: "high"
      },
      {
        category: "Balance & Coordination",
        score: 78,
        maxScore: 100,
        level: "high",
        description: "Good balance and coordination skills that will help prevent falls during recovery period.",
        recommendations: [
          "Continue activities that challenge balance (walking, dancing, sports)",
          "Practice exercises on unstable surfaces (foam pad, balance board)",
          "Maintain good lighting and clear pathways in home environment",
          "Consider balance-focused classes like Tai Chi or gentle yoga"
        ],
        timeline: "Ongoing",
        priority: "low"
      },
      {
        category: "Functional Mobility",
        score: 85,
        maxScore: 100,
        level: "optimal",
        description: "Excellent functional mobility for daily activities and recovery-related tasks.",
        recommendations: [
          "Maintain current activity levels and movement patterns",
          "Practice specific movements you'll need during recovery",
          "Ensure you can safely navigate your home environment",
          "Consider mobility aids only if specifically recommended by surgical team"
        ],
        timeline: "Ongoing",
        priority: "low"
      }
    ],
    uniqueFeatures: {
      hasProgressTracking: true,
      hasComparisonChart: true,
      customScoring: "Age and gender-adjusted functional capacity scoring"
    },
    disclaimers: {
      main: "This functional assessment provides baseline measurements for rehabilitation planning. Your physical therapy team will conduct more detailed evaluations as needed.",
      additional: [
        "Functional capacity can change with conditioning and may improve significantly with targeted interventions",
        "Some limitations may only become apparent during formal physical therapy evaluation"
      ]
    },
    nextSteps: {
      immediate: [
        "Begin targeted flexibility program",
        "Address any balance concerns",
        "Start gentle conditioning if cleared by physician"
      ],
      shortTerm: [
        "Complete pre-operative conditioning program",
        "Practice recovery-specific movements",
        "Optimize home environment for recovery"
      ],
      longTerm: [
        "Track rehabilitation progress against baseline",
        "Maintain functional improvements post-recovery",
        "Continue long-term fitness and mobility program"
      ]
    },
    successMetrics: [
      "Faster return to pre-surgery function",
      "Reduced rehabilitation time",
      "Lower risk of post-operative complications",
      "Better long-term functional outcomes"
    ]
  }
};