import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { useAssessmentAnalytics } from '../hooks/useAnalytics';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const completedSurgeryPreparationQuiz: QuizConfig = {
  title: 'Completed Surgery Preparation Bundle',
  onComplete: () => {
    window.location.hash = 'completed-surgery-preparation-bundle-information';
  },
  questions: [
    // Surgery Readiness & Planning Questions (1-15)
    {
      id: 'surgery-type',
      question: 'What type of surgery are you preparing for?',
      options: [
        { id: 'orthopedic', label: 'Orthopedic surgery', description: 'Joint replacement, arthroscopy, fracture repair' },
        { id: 'cardiac', label: 'Cardiac surgery', description: 'Heart bypass, valve repair, pacemaker insertion' },
        { id: 'abdominal', label: 'Abdominal surgery', description: 'Gallbladder, hernia, appendix, bowel surgery' },
        { id: 'gynecological', label: 'Gynecological surgery', description: 'Hysterectomy, ovarian, endometriosis surgery' },
        { id: 'urological', label: 'Urological surgery', description: 'Kidney, bladder, prostate surgery' },
        { id: 'neurological', label: 'Neurological surgery', description: 'Brain, spine, nervous system procedures' },
        { id: 'thoracic', label: 'Thoracic surgery', description: 'Lung, chest wall, esophageal procedures' },
        { id: 'vascular', label: 'Vascular surgery', description: 'Blood vessel, aneurysm, bypass procedures' },
        { id: 'general', label: 'General/Other surgery', description: 'Thyroid, breast, skin, or other procedures' },
      ],
    },
    {
      id: 'surgery-urgency',
      question: 'How urgent is your upcoming surgery?',
      options: [
        { id: 'emergency', label: 'Emergency surgery', description: 'Required within days, life-threatening condition' },
        { id: 'urgent', label: 'Urgent surgery', description: 'Required within 2-4 weeks, significant symptoms' },
        { id: 'semi-elective', label: 'Semi-elective surgery', description: 'Scheduled within 1-3 months, manageable symptoms' },
        { id: 'elective', label: 'Elective surgery', description: 'Planned procedure, can be scheduled flexibly' },
        { id: 'considering', label: 'Still considering', description: 'Exploring surgical options, not yet scheduled' },
      ],
    },
    {
      id: 'surgery-complexity',
      question: 'How would you describe the complexity of your planned surgery?',
      options: [
        { id: 'minor-outpatient', label: 'Minor outpatient procedure', description: 'Same-day discharge, local anaesthesia' },
        { id: 'moderate-outpatient', label: 'Moderate outpatient surgery', description: 'Same-day discharge, general anaesthesia' },
        { id: 'minor-inpatient', label: 'Minor inpatient surgery', description: '1-2 days hospitalization' },
        { id: 'major-surgery', label: 'Major surgery', description: '3-7 days hospitalization, significant recovery' },
        { id: 'complex-surgery', label: 'Complex/high-risk surgery', description: 'Extended hospitalization, intensive monitoring' },
      ],
    },
    {
      id: 'surgery-duration',
      question: 'What is the expected duration of your surgical procedure?',
      options: [
        { id: 'under-1-hour', label: 'Under 1 hour', description: 'Brief procedure, minimal anaesthesia time' },
        { id: '1-3-hours', label: '1-3 hours', description: 'Standard duration for most procedures' },
        { id: '3-6-hours', label: '3-6 hours', description: 'Extended procedure requiring careful monitoring' },
        { id: 'over-6-hours', label: 'Over 6 hours', description: 'Complex, lengthy procedure with extended anaesthesia' },
        { id: 'unknown-duration', label: 'Unknown duration', description: 'Duration depends on findings during surgery' },
      ],
    },
    {
      id: 'previous-surgeries',
      question: 'How many previous surgeries have you had?',
      options: [
        { id: 'none', label: 'None - this is my first surgery', description: 'No previous surgical experience' },
        { id: 'one-two', label: '1-2 previous surgeries', description: 'Limited surgical history' },
        { id: 'three-five', label: '3-5 previous surgeries', description: 'Moderate surgical history' },
        { id: 'six-ten', label: '6-10 previous surgeries', description: 'Extensive surgical history' },
        { id: 'more-than-ten', label: 'More than 10 surgeries', description: 'Very extensive surgical history' },
      ],
    },
    {
      id: 'surgical-complications-history',
      question: 'Have you experienced complications from previous surgeries?',
      options: [
        { id: 'no-complications', label: 'No complications', description: 'All previous surgeries went smoothly' },
        { id: 'minor-complications', label: 'Minor complications', description: 'Easily managed issues (nausea, minor bleeding)' },
        { id: 'moderate-complications', label: 'Moderate complications', description: 'Required additional treatment or monitoring' },
        { id: 'major-complications', label: 'Major complications', description: 'Serious issues requiring intensive intervention' },
        { id: 'no-previous-surgery', label: 'No previous surgeries', description: 'This is my first surgical procedure' },
      ],
    },
    {
      id: 'current-health-status',
      question: 'How would you describe your current overall health?',
      options: [
        { id: 'excellent', label: 'Excellent health', description: 'No chronic conditions, very active, feel great' },
        { id: 'good', label: 'Good health', description: 'Minor health issues, generally active and well' },
        { id: 'fair', label: 'Fair health', description: 'Some chronic conditions, manageable symptoms' },
        { id: 'poor', label: 'Poor health', description: 'Multiple health issues, limited activity tolerance' },
        { id: 'very-poor', label: 'Very poor health', description: 'Serious health problems, significantly limited function' },
      ],
    },
    {
      id: 'pre-operative-testing',
      question: 'What pre-operative testing have you completed?',
      multiSelect: true,
      options: [
        { id: 'blood-tests', label: 'Blood tests', description: 'Complete blood count, chemistry panel' },
        { id: 'ecg', label: 'ECG/EKG', description: 'Heart rhythm and electrical activity test' },
        { id: 'chest-xray', label: 'Chest X-ray', description: 'Lung and heart imaging' },
        { id: 'echocardiogram', label: 'Echocardiogram', description: 'Heart ultrasound assessment' },
        { id: 'stress-test', label: 'Cardiac stress test', description: 'Exercise or medication stress testing' },
        { id: 'pulmonary-function', label: 'Pulmonary function tests', description: 'Lung capacity and function assessment' },
        { id: 'imaging-studies', label: 'Advanced imaging', description: 'CT, MRI, or specialized scans' },
        { id: 'none-yet', label: 'No testing completed yet', description: 'Pre-operative workup not started' },
      ],
    },
    {
      id: 'surgeon-communication',
      question: 'How well do you understand your surgical procedure?',
      options: [
        { id: 'very-clear', label: 'Very clear understanding', description: 'Detailed discussion with surgeon, all questions answered' },
        { id: 'mostly-clear', label: 'Mostly clear', description: 'Good understanding with some minor uncertainties' },
        { id: 'somewhat-clear', label: 'Somewhat clear', description: 'Basic understanding but have remaining questions' },
        { id: 'unclear', label: 'Unclear about details', description: 'Limited understanding of procedure specifics' },
        { id: 'very-unclear', label: 'Very unclear', description: 'Minimal understanding, need more information' },
      ],
    },
    {
      id: 'pre-operative-instructions',
      question: 'Have you received and understood pre-operative instructions?',
      options: [
        { id: 'received-following', label: 'Received and following all instructions', description: 'Clear instructions provided and being followed' },
        { id: 'received-mostly-following', label: 'Received, mostly following', description: 'Have instructions, following most recommendations' },
        { id: 'received-unclear', label: 'Received but instructions unclear', description: 'Have instructions but some confusion' },
        { id: 'not-received', label: 'Have not received instructions', description: 'No pre-operative guidance provided yet' },
        { id: 'not-applicable', label: 'Too early for instructions', description: 'Surgery not scheduled close enough for instructions' },
      ],
    },
    {
      id: 'surgical-team-confidence',
      question: 'How confident do you feel in your surgical team?',
      options: [
        { id: 'very-confident', label: 'Very confident', description: 'Complete trust in surgeon and team expertise' },
        { id: 'mostly-confident', label: 'Mostly confident', description: 'Generally trust team with minor concerns' },
        { id: 'somewhat-confident', label: 'Somewhat confident', description: 'Some concerns about team or hospital' },
        { id: 'not-confident', label: 'Not confident', description: 'Significant concerns about surgical team' },
        { id: 'seeking-second-opinion', label: 'Seeking second opinion', description: 'Want additional consultation before deciding' },
      ],
    },
    {
      id: 'hospital-facility-quality',
      question: 'How would you rate the quality of your surgical facility?',
      options: [
        { id: 'top-tier', label: 'Top-tier facility', description: 'Leading hospital with excellent reputation' },
        { id: 'high-quality', label: 'High-quality facility', description: 'Well-regarded hospital with good outcomes' },
        { id: 'average-quality', label: 'Average quality facility', description: 'Standard hospital with adequate resources' },
        { id: 'below-average', label: 'Below average facility', description: 'Concerns about hospital quality or resources' },
        { id: 'unknown-quality', label: 'Unknown facility quality', description: 'Unfamiliar with hospital reputation' },
      ],
    },
    {
      id: 'second-opinion-sought',
      question: 'Have you sought a second opinion about your surgery?',
      options: [
        { id: 'multiple-opinions', label: 'Multiple opinions obtained', description: 'Consulted several specialists, all agree' },
        { id: 'one-second-opinion', label: 'One second opinion', description: 'Consulted another specialist for confirmation' },
        { id: 'planning-second-opinion', label: 'Planning to get second opinion', description: 'Will consult another specialist before surgery' },
        { id: 'no-second-opinion', label: 'No second opinion needed', description: 'Confident with current recommendation' },
        { id: 'conflicting-opinions', label: 'Conflicting opinions received', description: 'Different specialists have varying recommendations' },
      ],
    },
    {
      id: 'surgery-timing-preference',
      question: 'How do you feel about the timing of your surgery?',
      options: [
        { id: 'optimal-timing', label: 'Optimal timing', description: 'Perfect time for surgery considering all factors' },
        { id: 'good-timing', label: 'Good timing', description: 'Generally good time with minor concerns' },
        { id: 'acceptable-timing', label: 'Acceptable timing', description: 'Not ideal but manageable timing' },
        { id: 'poor-timing', label: 'Poor timing', description: 'Significant life or work conflicts' },
        { id: 'forced-timing', label: 'Forced timing', description: 'Medical urgency overrides personal preferences' },
      ],
    },
    {
      id: 'surgical-anxiety',
      question: 'How anxious do you feel about your upcoming surgery?',
      options: [
        { id: 'not-anxious', label: 'Not anxious', description: 'Calm and confident about the procedure' },
        { id: 'mildly-anxious', label: 'Mildly anxious', description: 'Some concerns but generally manageable' },
        { id: 'moderately-anxious', label: 'Moderately anxious', description: 'Significant worry affecting daily thoughts' },
        { id: 'very-anxious', label: 'Very anxious', description: 'High anxiety impacting sleep and daily function' },
        { id: 'extremely-anxious', label: 'Extremely anxious', description: 'Overwhelming fear about the surgery' },
      ],
    },

    // Medical History & Complication Risk Questions (16-30)
    {
      id: 'medical-conditions',
      question: 'Do you have any of these medical conditions?',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes', description: 'Type 1 or Type 2 diabetes mellitus' },
        { id: 'heart-disease', label: 'Heart disease', description: 'Coronary artery disease, heart failure, arrhythmias' },
        { id: 'high-blood-pressure', label: 'High blood pressure', description: 'Hypertension requiring medication' },
        { id: 'lung-disease', label: 'Lung disease', description: 'COPD, asthma, sleep apnea' },
        { id: 'kidney-disease', label: 'Kidney disease', description: 'Chronic kidney disease or reduced function' },
        { id: 'liver-disease', label: 'Liver disease', description: 'Hepatitis, cirrhosis, fatty liver disease' },
        { id: 'autoimmune', label: 'Autoimmune condition', description: 'Rheumatoid arthritis, lupus, inflammatory conditions' },
        { id: 'blood-disorders', label: 'Blood clotting disorders', description: 'DVT, PE, bleeding disorders' },
        { id: 'thyroid-disease', label: 'Thyroid disease', description: 'Hyperthyroidism, hypothyroidism, thyroid nodules' },
        { id: 'no-conditions', label: 'No significant medical conditions', description: 'Generally healthy without chronic diseases' },
      ],
    },
    {
      id: 'current-medications',
      question: 'How many prescription medications do you currently take?',
      options: [
        { id: 'none', label: 'No medications', description: 'Not taking any regular prescription drugs' },
        { id: 'one-two', label: '1-2 medications', description: 'Minimal medication burden' },
        { id: 'three-five', label: '3-5 medications', description: 'Moderate medication complexity' },
        { id: 'six-ten', label: '6-10 medications', description: 'Significant medication burden' },
        { id: 'more-than-ten', label: 'More than 10 medications', description: 'Complex medication regimen' },
      ],
    },
    {
      id: 'high-risk-medications',
      question: 'Are you taking any of these high-risk medications?',
      multiSelect: true,
      options: [
        { id: 'blood-thinners', label: 'Blood thinners', description: 'Warfarin, rivaroxaban, apixaban, clopidogrel' },
        { id: 'immunosuppressants', label: 'Immunosuppressive drugs', description: 'Steroids, methotrexate, biologics' },
        { id: 'diabetes-medications', label: 'Diabetes medications', description: 'Insulin, metformin, sulfonylureas' },
        { id: 'heart-medications', label: 'Heart medications', description: 'Beta-blockers, ACE inhibitors, diuretics' },
        { id: 'psychiatric-medications', label: 'Psychiatric medications', description: 'Antidepressants, antipsychotics, mood stabilizers' },
        { id: 'pain-medications', label: 'Chronic pain medications', description: 'Opioids, gabapentin, muscle relaxants' },
        { id: 'none-listed', label: 'None of these medications', description: 'Not taking any high-risk medications' },
      ],
    },
    {
      id: 'medication-adherence',
      question: 'How would you describe your medication adherence?',
      options: [
        { id: 'excellent-adherence', label: 'Excellent adherence', description: 'Never miss doses, take exactly as prescribed' },
        { id: 'good-adherence', label: 'Good adherence', description: 'Rarely miss doses, generally compliant' },
        { id: 'fair-adherence', label: 'Fair adherence', description: 'Sometimes miss doses or modify timing' },
        { id: 'poor-adherence', label: 'Poor adherence', description: 'Frequently miss doses or take incorrectly' },
        { id: 'no-medications', label: 'Not applicable', description: 'Not taking any regular medications' },
      ],
    },
    {
      id: 'smoking-status',
      question: 'What is your smoking status?',
      options: [
        { id: 'never-smoked', label: 'Never smoked', description: 'Never been a regular smoker' },
        { id: 'former-smoker-long', label: 'Former smoker (quit >2 years ago)', description: 'Quit smoking more than 24 months ago' },
        { id: 'former-smoker-recent', label: 'Former smoker (quit 1-2 years ago)', description: 'Quit smoking 12-24 months ago' },
        { id: 'recent-quitter', label: 'Recently quit (within 1 year)', description: 'Stopped smoking within the last 12 months' },
        { id: 'current-light', label: 'Current light smoker', description: 'Smoke less than 10 cigarettes per day' },
        { id: 'current-heavy', label: 'Current heavy smoker', description: 'Smoke 10 or more cigarettes per day' },
      ],
    },
    {
      id: 'tobacco-alternatives',
      question: 'Do you use any tobacco alternatives or nicotine products?',
      multiSelect: true,
      options: [
        { id: 'e-cigarettes', label: 'E-cigarettes/vaping', description: 'Electronic cigarettes or vaping devices' },
        { id: 'nicotine-patches', label: 'Nicotine replacement therapy', description: 'Patches, gum, lozenges for smoking cessation' },
        { id: 'chewing-tobacco', label: 'Smokeless tobacco', description: 'Chewing tobacco, snuff, or snus' },
        { id: 'cigars-pipes', label: 'Cigars or pipes', description: 'Occasional cigar or pipe smoking' },
        { id: 'cannabis', label: 'Cannabis products', description: 'Marijuana smoking or vaping' },
        { id: 'none', label: 'No tobacco alternatives', description: 'Do not use any nicotine or tobacco products' },
      ],
    },
    {
      id: 'alcohol-consumption',
      question: 'How much alcohol do you typically consume per week?',
      options: [
        { id: 'none', label: 'No alcohol', description: 'Do not drink alcohol regularly' },
        { id: 'light', label: 'Light drinking', description: '1-7 units per week (1-3 drinks)' },
        { id: 'moderate', label: 'Moderate drinking', description: '8-14 units per week (4-7 drinks)' },
        { id: 'heavy', label: 'Heavy drinking', description: '15-21 units per week (8-10 drinks)' },
        { id: 'excessive', label: 'Excessive drinking', description: 'More than 21 units per week (10+ drinks)' },
      ],
    },
    {
      id: 'weight-status',
      question: 'How would you describe your current weight status?',
      options: [
        { id: 'underweight', label: 'Underweight', description: 'BMI below 18.5, may have nutritional concerns' },
        { id: 'normal-weight', label: 'Normal weight', description: 'BMI 18.5-24.9, healthy weight range' },
        { id: 'overweight', label: 'Overweight', description: 'BMI 25-29.9, above ideal weight range' },
        { id: 'obese', label: 'Obese', description: 'BMI 30-39.9, significantly above ideal weight' },
        { id: 'severely-obese', label: 'Severely obese', description: 'BMI 40+, major weight-related health risks' },
      ],
    },
    {
      id: 'weight-changes',
      question: 'Have you experienced significant weight changes in the past year?',
      options: [
        { id: 'stable-weight', label: 'Stable weight', description: 'Weight has remained consistent within 5 pounds' },
        { id: 'intentional-loss', label: 'Intentional weight loss', description: 'Lost weight through diet and exercise' },
        { id: 'unintentional-loss', label: 'Unintentional weight loss', description: 'Lost weight without trying' },
        { id: 'weight-gain', label: 'Weight gain', description: 'Gained significant weight in past year' },
        { id: 'fluctuating-weight', label: 'Fluctuating weight', description: 'Weight varies significantly week to week' },
      ],
    },
    {
      id: 'infection-risk-factors',
      question: 'Do you have any factors that might increase infection risk?',
      multiSelect: true,
      options: [
        { id: 'diabetes-uncontrolled', label: 'Poorly controlled diabetes', description: 'Blood sugar levels frequently elevated' },
        { id: 'immunosuppressed', label: 'Taking immunosuppressive medications', description: 'Steroids, chemotherapy, or immune-suppressing drugs' },
        { id: 'recent-infections', label: 'Recent infections', description: 'Treated for infection within past month' },
        { id: 'skin-conditions', label: 'Skin conditions at surgical site', description: 'Eczema, psoriasis, or wounds near surgery area' },
        { id: 'poor-hygiene-access', label: 'Limited access to hygiene facilities', description: 'Difficulty maintaining cleanliness at home' },
        { id: 'frequent-infections', label: 'History of frequent infections', description: 'Get infections more often than average' },
        { id: 'none', label: 'No specific infection risk factors', description: 'No factors that increase infection risk' },
      ],
    },
    {
      id: 'allergies-reactions',
      question: 'Do you have any allergies or adverse reactions to medications?',
      options: [
        { id: 'no-allergies', label: 'No known allergies', description: 'No medication or material allergies' },
        { id: 'medication-allergies', label: 'Medication allergies', description: 'Allergic to specific drugs (antibiotics, pain medications)' },
        { id: 'latex-allergy', label: 'Latex allergy', description: 'Allergic reaction to latex materials' },
        { id: 'multiple-allergies', label: 'Multiple allergies', description: 'Allergic to several medications or materials' },
        { id: 'severe-reactions', label: 'History of severe reactions', description: 'Anaphylaxis or severe allergic responses' },
      ],
    },
    {
      id: 'healing-history',
      question: 'How do wounds typically heal for you?',
      options: [
        { id: 'heals-quickly', label: 'Heals quickly and well', description: 'Wounds heal faster than expected, minimal scarring' },
        { id: 'heals-normally', label: 'Heals at normal pace', description: 'Typical healing time, good outcomes' },
        { id: 'heals-slowly', label: 'Heals slowly', description: 'Wounds take longer than average to heal' },
        { id: 'healing-problems', label: 'Frequent healing problems', description: 'Wounds often become infected or heal poorly' },
        { id: 'keloid-tendency', label: 'Tendency to form keloids', description: 'Excessive scar tissue formation' },
      ],
    },
    {
      id: 'family-surgical-history',
      question: 'Do you have family history of surgical complications?',
      options: [
        { id: 'no-family-complications', label: 'No family complications', description: 'Family members had successful surgeries' },
        { id: 'minor-family-complications', label: 'Minor family complications', description: 'Some family members had manageable issues' },
        { id: 'significant-family-complications', label: 'Significant family complications', description: 'Family history of serious surgical problems' },
        { id: 'anaesthesia-problems', label: 'Family anaesthesia problems', description: 'Relatives had adverse reactions to anaesthesia' },
        { id: 'unknown-family-history', label: 'Unknown family history', description: 'Limited information about family surgical experiences' },
      ],
    },
    {
      id: 'genetic-disorders',
      question: 'Do you have any known genetic disorders that might affect surgery?',
      multiSelect: true,
      options: [
        { id: 'malignant-hyperthermia', label: 'Malignant hyperthermia susceptibility', description: 'Genetic predisposition to anaesthesia reaction' },
        { id: 'bleeding-disorders', label: 'Inherited bleeding disorders', description: 'Hemophilia, von Willebrand disease' },
        { id: 'connective-tissue', label: 'Connective tissue disorders', description: 'Ehlers-Danlos syndrome, Marfan syndrome' },
        { id: 'metabolic-disorders', label: 'Metabolic disorders', description: 'Genetic conditions affecting metabolism' },
        { id: 'cardiac-genetic', label: 'Genetic heart conditions', description: 'Familial cardiomyopathy, channelopathies' },
        { id: 'none-known', label: 'No known genetic disorders', description: 'No family history of genetic conditions' },
      ],
    },

    // Recovery Optimization & Support Questions (31-45)
    {
      id: 'nutrition-status',
      question: 'How would you rate your current nutritional status?',
      options: [
        { id: 'excellent-nutrition', label: 'Excellent nutrition', description: 'Well-balanced diet, healthy weight, good appetite' },
        { id: 'good-nutrition', label: 'Good nutrition', description: 'Generally healthy eating habits with minor gaps' },
        { id: 'fair-nutrition', label: 'Fair nutrition', description: 'Some nutritional deficiencies or poor eating patterns' },
        { id: 'poor-nutrition', label: 'Poor nutrition', description: 'Significant dietary limitations or malnutrition risk' },
        { id: 'very-poor-nutrition', label: 'Very poor nutrition', description: 'Severe malnutrition or eating difficulties' },
      ],
    },
    {
      id: 'protein-intake',
      question: 'How would you describe your daily protein intake?',
      options: [
        { id: 'high-protein', label: 'High protein intake', description: 'Multiple protein sources at each meal' },
        { id: 'adequate-protein', label: 'Adequate protein', description: 'Protein at most meals, varied sources' },
        { id: 'moderate-protein', label: 'Moderate protein', description: 'Some protein daily, could be improved' },
        { id: 'low-protein', label: 'Low protein intake', description: 'Limited protein sources, mostly carbohydrates' },
        { id: 'very-low-protein', label: 'Very low protein', description: 'Rarely consume protein-rich foods' },
      ],
    },
    {
      id: 'vitamin-supplements',
      question: 'Do you take vitamins or nutritional supplements?',
      options: [
        { id: 'comprehensive-supplements', label: 'Comprehensive supplement program', description: 'Multivitamin plus targeted supplements' },
        { id: 'basic-multivitamin', label: 'Basic multivitamin', description: 'Daily multivitamin supplement' },
        { id: 'specific-supplements', label: 'Specific supplements only', description: 'Targeted supplements (Vitamin D, B12, etc.)' },
        { id: 'occasional-supplements', label: 'Occasional supplements', description: 'Irregular supplement use' },
        { id: 'no-supplements', label: 'No supplements', description: 'Rely on diet alone for nutrition' },
      ],
    },
    {
      id: 'hydration-habits',
      question: 'How would you describe your daily hydration?',
      options: [
        { id: 'well-hydrated', label: 'Well hydrated', description: '8+ glasses of water daily, clear urine' },
        { id: 'adequately-hydrated', label: 'Adequately hydrated', description: '6-8 glasses daily, pale yellow urine' },
        { id: 'moderately-hydrated', label: 'Moderately hydrated', description: '4-6 glasses daily, some thirst' },
        { id: 'poorly-hydrated', label: 'Poorly hydrated', description: 'Less than 4 glasses daily, frequent thirst' },
        { id: 'chronically-dehydrated', label: 'Chronically dehydrated', description: 'Minimal water intake, dark urine' },
      ],
    },
    {
      id: 'pre-surgery-nutrition-plan',
      question: 'Are you following a specific pre-surgery nutrition plan?',
      options: [
        { id: 'comprehensive-plan', label: 'Comprehensive nutrition plan', description: 'Working with dietitian, following detailed protocol' },
        { id: 'basic-guidelines', label: 'Following basic guidelines', description: 'General pre-surgery nutrition recommendations' },
        { id: 'self-directed', label: 'Self-directed improvements', description: 'Making own dietary changes for surgery prep' },
        { id: 'no-specific-plan', label: 'No specific plan', description: 'Continuing usual diet without modifications' },
        { id: 'unable-to-improve', label: 'Unable to improve diet', description: 'Medical or social barriers to dietary changes' },
      ],
    },
    {
      id: 'support-system',
      question: 'What support do you have for your surgery and recovery?',
      multiSelect: true,
      options: [
        { id: 'family-support', label: 'Strong family support', description: 'Family members available to help with care' },
        { id: 'friend-support', label: 'Friend network support', description: 'Friends willing to assist during recovery' },
        { id: 'professional-care', label: 'Professional care services', description: 'Access to home care or nursing services' },
        { id: 'financial-resources', label: 'Adequate financial resources', description: 'Can afford time off work and care needs' },
        { id: 'transportation', label: 'Reliable transportation', description: 'Access to medical appointments and follow-up' },
        { id: 'employer-support', label: 'Employer support', description: 'Flexible work arrangements for recovery' },
        { id: 'community-resources', label: 'Community support resources', description: 'Church, volunteer, or community assistance' },
        { id: 'limited-support', label: 'Limited support available', description: 'Minimal help available for recovery period' },
      ],
    },
    {
      id: 'home-environment',
      question: 'How suitable is your home environment for recovery?',
      options: [
        { id: 'ideal-setup', label: 'Ideal recovery setup', description: 'Single level, wide doorways, supportive furniture' },
        { id: 'good-setup', label: 'Good setup', description: 'Mostly accessible with minor modifications needed' },
        { id: 'adequate-setup', label: 'Adequate setup', description: 'Some challenges but manageable with help' },
        { id: 'challenging-setup', label: 'Challenging environment', description: 'Stairs, narrow spaces, or accessibility issues' },
        { id: 'poor-setup', label: 'Poor recovery environment', description: 'Significant barriers to safe recovery at home' },
      ],
    },
    {
      id: 'home-modifications',
      question: 'Have you made any home modifications for your recovery?',
      multiSelect: true,
      options: [
        { id: 'bathroom-modifications', label: 'Bathroom modifications', description: 'Grab bars, shower seat, raised toilet seat' },
        { id: 'bedroom-setup', label: 'Bedroom recovery setup', description: 'Hospital bed, bedside commode, easy access' },
        { id: 'accessibility-ramps', label: 'Accessibility improvements', description: 'Ramps, handrails, wider doorways' },
        { id: 'kitchen-modifications', label: 'Kitchen accessibility', description: 'Easy-reach items, prepared meals' },
        { id: 'technology-aids', label: 'Technology assistance', description: 'Medical alert systems, communication devices' },
        { id: 'no-modifications', label: 'No modifications needed', description: 'Home already suitable for recovery' },
        { id: 'planning-modifications', label: 'Planning modifications', description: 'Will make changes before surgery' },
      ],
    },
    {
      id: 'work-arrangements',
      question: 'What are your work arrangements during recovery?',
      options: [
        { id: 'extended-leave', label: 'Extended medical leave', description: 'Sufficient time off work for full recovery' },
        { id: 'adequate-leave', label: 'Adequate time off', description: 'Several weeks off work for initial recovery' },
        { id: 'limited-leave', label: 'Limited time off', description: 'Short leave period, may need to return early' },
        { id: 'work-from-home', label: 'Work from home option', description: 'Can work remotely during recovery' },
        { id: 'gradual-return', label: 'Gradual return plan', description: 'Phased return with reduced hours' },
        { id: 'no-leave-option', label: 'No leave available', description: 'Financial pressure to return to work quickly' },
        { id: 'retired-unemployed', label: 'Retired or unemployed', description: 'Work arrangements not applicable' },
      ],
    },
    {
      id: 'financial-preparation',
      question: 'How well prepared are you financially for surgery and recovery?',
      options: [
        { id: 'well-prepared', label: 'Well prepared financially', description: 'Adequate savings and insurance coverage' },
        { id: 'mostly-prepared', label: 'Mostly prepared', description: 'Some financial cushion, manageable costs' },
        { id: 'adequately-prepared', label: 'Adequately prepared', description: 'Can manage costs but budget will be tight' },
        { id: 'financially-stressed', label: 'Financially stressed', description: 'Surgery costs will create financial hardship' },
        { id: 'unprepared', label: 'Financially unprepared', description: 'Significant concern about affording surgery and recovery' },
      ],
    },
    {
      id: 'stress-anxiety-levels',
      question: 'How are your current stress and anxiety levels?',
      options: [
        { id: 'low-stress', label: 'Low stress/anxiety', description: 'Generally calm and relaxed, good coping strategies' },
        { id: 'mild-stress', label: 'Mild stress/anxiety', description: 'Occasional stress but manageable' },
        { id: 'moderate-stress', label: 'Moderate stress/anxiety', description: 'Regular stress that sometimes affects daily life' },
        { id: 'high-stress', label: 'High stress/anxiety', description: 'Frequent stress that impacts function and wellbeing' },
        { id: 'severe-stress', label: 'Severe stress/anxiety', description: 'Overwhelming stress, difficulty coping' },
      ],
    },
    {
      id: 'mental-health-history',
      question: 'Do you have a history of mental health conditions?',
      options: [
        { id: 'no-mental-health-issues', label: 'No mental health issues', description: 'No history of mental health conditions' },
        { id: 'mild-anxiety-depression', label: 'Mild anxiety/depression', description: 'Manageable symptoms, functioning well' },
        { id: 'moderate-mental-health', label: 'Moderate mental health issues', description: 'Some impact on daily function, receiving treatment' },
        { id: 'significant-mental-health', label: 'Significant mental health issues', description: 'Major impact on function, ongoing treatment' },
        { id: 'prefer-not-to-say', label: 'Prefer not to say', description: 'Comfortable not sharing this information' },
      ],
    },
    {
      id: 'coping-strategies',
      question: 'What strategies do you use to cope with stress and anxiety?',
      multiSelect: true,
      options: [
        { id: 'exercise-activity', label: 'Exercise and physical activity', description: 'Regular exercise for stress management' },
        { id: 'meditation-mindfulness', label: 'Meditation and mindfulness', description: 'Mindfulness practices, meditation, breathing exercises' },
        { id: 'social-support', label: 'Social support systems', description: 'Talking with family, friends, or support groups' },
        { id: 'professional-counseling', label: 'Professional counseling', description: 'Therapy or professional mental health support' },
        { id: 'hobbies-interests', label: 'Hobbies and interests', description: 'Creative activities, reading, music, other interests' },
        { id: 'spiritual-practices', label: 'Spiritual or religious practices', description: 'Prayer, religious activities, spiritual community' },
        { id: 'limited-strategies', label: 'Limited coping strategies', description: 'Few effective ways to manage stress' },
      ],
    },
    {
      id: 'recovery-motivation',
      question: 'How motivated are you about your recovery process?',
      options: [
        { id: 'extremely-motivated', label: 'Extremely motivated', description: 'Eager to follow all instructions and optimize recovery' },
        { id: 'highly-motivated', label: 'Highly motivated', description: 'Committed to doing what\'s needed for good recovery' },
        { id: 'moderately-motivated', label: 'Moderately motivated', description: 'Willing to follow basic recovery guidelines' },
        { id: 'somewhat-motivated', label: 'Somewhat motivated', description: 'May struggle with some recovery requirements' },
        { id: 'low-motivation', label: 'Low motivation', description: 'Concerned about ability to follow recovery plan' },
      ],
    },
    {
      id: 'recovery-goals',
      question: 'What are your primary goals for recovery?',
      multiSelect: true,
      options: [
        { id: 'return-normal-activities', label: 'Return to normal activities', description: 'Resume daily activities and routine' },
        { id: 'pain-relief', label: 'Achieve pain relief', description: 'Reduce or eliminate current pain symptoms' },
        { id: 'improve-function', label: 'Improve physical function', description: 'Better mobility, strength, or capabilities' },
        { id: 'return-work', label: 'Return to work', description: 'Resume professional responsibilities' },
        { id: 'maintain-independence', label: 'Maintain independence', description: 'Continue living independently' },
        { id: 'improve-quality-life', label: 'Improve quality of life', description: 'Overall better life satisfaction and wellbeing' },
        { id: 'prevent-complications', label: 'Prevent complications', description: 'Avoid surgical or long-term complications' },
      ],
    },

    // Anaesthesia Risk & Respiratory Questions (46-55)
    {
      id: 'sleep-quality',
      question: 'How is your sleep quality and duration?',
      options: [
        { id: 'excellent-sleep', label: 'Excellent sleep', description: '7-9 hours of quality, restful sleep nightly' },
        { id: 'good-sleep', label: 'Good sleep', description: 'Generally good sleep with occasional disruptions' },
        { id: 'fair-sleep', label: 'Fair sleep', description: 'Some sleep problems, irregular patterns' },
        { id: 'poor-sleep', label: 'Poor sleep', description: 'Frequent sleep disruptions, less than 6 hours' },
        { id: 'very-poor-sleep', label: 'Very poor sleep', description: 'Severe insomnia or sleep disorders' },
      ],
    },
    {
      id: 'sleep-apnea-risk',
      question: 'Do you have signs or symptoms of sleep apnea?',
      multiSelect: true,
      options: [
        { id: 'loud-snoring', label: 'Loud snoring', description: 'Regular loud snoring that disturbs others' },
        { id: 'breathing-pauses', label: 'Breathing pauses during sleep', description: 'Partner notices breathing stops during sleep' },
        { id: 'morning-headaches', label: 'Morning headaches', description: 'Frequent headaches upon waking' },
        { id: 'excessive-daytime-sleepiness', label: 'Excessive daytime sleepiness', description: 'Falling asleep during daily activities' },
        { id: 'diagnosed-sleep-apnea', label: 'Diagnosed sleep apnea', description: 'Formally diagnosed with sleep apnea' },
        { id: 'cpap-user', label: 'CPAP machine user', description: 'Currently using CPAP for sleep apnea' },
        { id: 'no-symptoms', label: 'No sleep apnea symptoms', description: 'No signs of sleep-disordered breathing' },
      ],
    },
    {
      id: 'previous-anaesthesia-experience',
      question: 'What has been your experience with previous anaesthesia?',
      options: [
        { id: 'no-previous-anaesthesia', label: 'No previous anaesthesia', description: 'Never had general or regional anaesthesia' },
        { id: 'good-tolerance', label: 'Good tolerance', description: 'Previous anaesthesia without complications' },
        { id: 'minor-side-effects', label: 'Minor side effects', description: 'Nausea, grogginess, or minor reactions' },
        { id: 'significant-side-effects', label: 'Significant side effects', description: 'Prolonged nausea, breathing difficulties' },
        { id: 'serious-complications', label: 'Serious complications', description: 'Major adverse reactions to anaesthesia' },
      ],
    },
    {
      id: 'anaesthesia-concerns',
      question: 'What specific concerns do you have about anaesthesia?',
      multiSelect: true,
      options: [
        { id: 'awareness-during-surgery', label: 'Awareness during surgery', description: 'Fear of being conscious during procedure' },
        { id: 'nausea-vomiting', label: 'Post-operative nausea and vomiting', description: 'Concern about feeling sick after surgery' },
        { id: 'breathing-problems', label: 'Breathing difficulties', description: 'Worry about respiratory complications' },
        { id: 'memory-confusion', label: 'Memory problems or confusion', description: 'Cognitive effects after anaesthesia' },
        { id: 'allergic-reactions', label: 'Allergic reactions', description: 'Fear of adverse drug reactions' },
        { id: 'not-waking-up', label: 'Not waking up', description: 'Fear of anaesthesia-related death' },
        { id: 'no-specific-concerns', label: 'No specific concerns', description: 'Generally comfortable with anaesthesia' },
      ],
    },
    {
      id: 'breathing-difficulties',
      question: 'Do you have any breathing difficulties or lung conditions?',
      multiSelect: true,
      options: [
        { id: 'asthma', label: 'Asthma', description: 'Active asthma requiring inhalers or medications' },
        { id: 'copd', label: 'COPD', description: 'Chronic obstructive pulmonary disease' },
        { id: 'smoking-related-damage', label: 'Smoking-related lung damage', description: 'Reduced lung function from smoking' },
        { id: 'shortness-of-breath', label: 'Frequent shortness of breath', description: 'Breathing difficulties with mild exertion' },
        { id: 'chest-tightness', label: 'Chest tightness', description: 'Regular sensation of chest constriction' },
        { id: 'previous-pneumonia', label: 'History of pneumonia', description: 'Past episodes of lung infection' },
        { id: 'no-breathing-issues', label: 'No breathing difficulties', description: 'Normal respiratory function' },
      ],
    },
    {
      id: 'heart-rhythm-issues',
      question: 'Do you have any heart rhythm irregularities?',
      options: [
        { id: 'no-rhythm-issues', label: 'No rhythm issues', description: 'Normal, regular heart rhythm' },
        { id: 'occasional-palpitations', label: 'Occasional palpitations', description: 'Infrequent heart racing or skipping' },
        { id: 'atrial-fibrillation', label: 'Atrial fibrillation', description: 'Irregular heart rhythm condition' },
        { id: 'other-arrhythmias', label: 'Other arrhythmias', description: 'Different types of heart rhythm disorders' },
        { id: 'pacemaker-device', label: 'Pacemaker or cardiac device', description: 'Implanted device to regulate heart rhythm' },
      ],
    },
    {
      id: 'cardiovascular-fitness',
      question: 'How would you rate your cardiovascular fitness?',
      options: [
        { id: 'excellent-fitness', label: 'Excellent cardiovascular fitness', description: 'Can climb multiple flights of stairs without difficulty' },
        { id: 'good-fitness', label: 'Good cardiovascular fitness', description: 'Can climb 1-2 flights of stairs with minimal difficulty' },
        { id: 'fair-fitness', label: 'Fair cardiovascular fitness', description: 'Some difficulty with stairs or sustained activity' },
        { id: 'poor-fitness', label: 'Poor cardiovascular fitness', description: 'Significant difficulty with minimal exertion' },
        { id: 'very-poor-fitness', label: 'Very poor cardiovascular fitness', description: 'Cannot tolerate any significant physical activity' },
      ],
    },
    {
      id: 'substance-use',
      question: 'Do you use any recreational substances or have substance use history?',
      options: [
        { id: 'no-substance-use', label: 'No substance use', description: 'No recreational drug or substance use' },
        { id: 'occasional-cannabis', label: 'Occasional cannabis use', description: 'Infrequent marijuana or CBD use' },
        { id: 'regular-cannabis', label: 'Regular cannabis use', description: 'Frequent marijuana use' },
        { id: 'other-substances', label: 'Other recreational substances', description: 'Use of stimulants, opioids, or other drugs' },
        { id: 'substance-use-history', label: 'History of substance use', description: 'Previous substance use disorder, now clean' },
      ],
    },
    {
      id: 'caffeine-consumption',
      question: 'How much caffeine do you consume daily?',
      options: [
        { id: 'no-caffeine', label: 'No caffeine', description: 'Do not consume caffeine regularly' },
        { id: 'low-caffeine', label: 'Low caffeine intake', description: '1-2 cups of coffee or equivalent per day' },
        { id: 'moderate-caffeine', label: 'Moderate caffeine intake', description: '3-4 cups of coffee or equivalent per day' },
        { id: 'high-caffeine', label: 'High caffeine intake', description: '5+ cups of coffee or equivalent per day' },
        { id: 'energy-drinks', label: 'Energy drinks/high caffeine', description: 'Regular consumption of energy drinks or high-caffeine products' },
      ],
    },
    {
      id: 'medication-sensitivities',
      question: 'Do you have sensitivities to any anaesthetic or pain medications?',
      multiSelect: true,
      options: [
        { id: 'opioid-sensitivity', label: 'Opioid pain medication sensitivity', description: 'Unusual reactions to morphine, fentanyl, oxycodone' },
        { id: 'local-anaesthetic', label: 'Local anaesthetic sensitivity', description: 'Reactions to lidocaine, novocaine, other local anaesthetics' },
        { id: 'muscle-relaxant', label: 'Muscle relaxant sensitivity', description: 'Unusual reactions to paralytic agents' },
        { id: 'sedative-sensitivity', label: 'Sedative medication sensitivity', description: 'Unusual reactions to propofol, midazolam' },
        { id: 'anti-nausea', label: 'Anti-nausea medication sensitivity', description: 'Reactions to ondansetron, metoclopramide' },
        { id: 'no-sensitivities', label: 'No known sensitivities', description: 'No unusual reactions to anaesthetic medications' },
      ],
    },

    // Physical Function & Mobility Questions (56-60)
    {
      id: 'physical-activity',
      question: 'How would you describe your current physical activity level?',
      options: [
        { id: 'very-active', label: 'Very active', description: 'Regular vigorous exercise 5+ times per week' },
        { id: 'moderately-active', label: 'Moderately active', description: 'Regular exercise 3-4 times per week' },
        { id: 'somewhat-active', label: 'Somewhat active', description: 'Light exercise 1-2 times per week' },
        { id: 'sedentary', label: 'Sedentary', description: 'Minimal structured exercise or activity' },
        { id: 'very-sedentary', label: 'Very sedentary', description: 'Mostly sitting or lying down, very limited mobility' },
      ],
    },
    {
      id: 'mobility-limitations',
      question: 'Do you currently have any mobility limitations?',
      multiSelect: true,
      options: [
        { id: 'walking-difficulties', label: 'Difficulty walking distances', description: 'Cannot walk more than a few blocks' },
        { id: 'stair-climbing', label: 'Difficulty with stairs', description: 'Need assistance or handrails for stairs' },
        { id: 'balance-problems', label: 'Balance or coordination issues', description: 'Unsteady on feet, fear of falling' },
        { id: 'joint-pain', label: 'Joint pain limiting movement', description: 'Arthritis or joint problems restricting activity' },
        { id: 'back-problems', label: 'Back problems', description: 'Back pain limiting bending, lifting, or activity' },
        { id: 'assistive-devices', label: 'Use assistive devices', description: 'Walker, cane, wheelchair, or mobility aids' },
        { id: 'fatigue-weakness', label: 'Chronic fatigue or weakness', description: 'General weakness limiting physical activity' },
        { id: 'no-limitations', label: 'No mobility limitations', description: 'Full mobility without restrictions' },
      ],
    },
    {
      id: 'strength-assessment',
      question: 'How would you rate your current strength and endurance?',
      options: [
        { id: 'excellent-strength', label: 'Excellent strength', description: 'Can lift heavy objects, excellent endurance' },
        { id: 'good-strength', label: 'Good strength', description: 'Handle most daily tasks without difficulty' },
        { id: 'fair-strength', label: 'Fair strength', description: 'Some limitations with heavy lifting or prolonged activity' },
        { id: 'poor-strength', label: 'Poor strength', description: 'Difficulty with many daily activities' },
        { id: 'very-poor-strength', label: 'Very poor strength', description: 'Struggle with basic tasks like lifting groceries' },
      ],
    },
    {
      id: 'pre-surgery-conditioning',
      question: 'Are you doing any pre-surgery physical conditioning?',
      multiSelect: true,
      options: [
        { id: 'structured-exercise', label: 'Structured exercise program', description: 'Following specific pre-surgery fitness plan' },
        { id: 'physical-therapy', label: 'Pre-operative physical therapy', description: 'Working with physical therapist before surgery' },
        { id: 'breathing-exercises', label: 'Breathing and respiratory exercises', description: 'Practicing breathing techniques for recovery' },
        { id: 'strength-training', label: 'Strength training', description: 'Building muscle strength before surgery' },
        { id: 'flexibility-stretching', label: 'Flexibility and stretching', description: 'Maintaining or improving range of motion' },
        { id: 'walking-program', label: 'Walking program', description: 'Regular walking to improve cardiovascular fitness' },
        { id: 'no-conditioning', label: 'No specific conditioning', description: 'Not doing targeted pre-surgery exercise' },
      ],
    },
    {
      id: 'fall-risk-factors',
      question: 'Do you have any factors that increase your risk of falling?',
      multiSelect: true,
      options: [
        { id: 'medications-causing-dizziness', label: 'Medications causing dizziness', description: 'Take medications that affect balance' },
        { id: 'vision-problems', label: 'Vision problems', description: 'Poor eyesight affecting mobility' },
        { id: 'home-hazards', label: 'Home safety hazards', description: 'Loose rugs, poor lighting, clutter' },
        { id: 'previous-falls', label: 'History of falls', description: 'Have fallen in the past year' },
        { id: 'weakness-fatigue', label: 'General weakness or fatigue', description: 'Feel weak or tired affecting stability' },
        { id: 'inner-ear-problems', label: 'Inner ear or vestibular problems', description: 'Balance issues from ear conditions' },
        { id: 'cognitive-changes', label: 'Cognitive changes affecting safety', description: 'Memory or thinking problems affecting judgment' },
        { id: 'no-fall-risks', label: 'No significant fall risks', description: 'Good balance and stable mobility' },
      ],
    },
  ],
};

export function CompletedSurgeryPreparationQuestionsPage() {
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    completedSurgeryPreparationQuiz.questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      let labels: string;
      if (q.multiSelect && Array.isArray(answer)) {
        labels = answer
          .map((id) => q.options.find((o) => o.id === id)?.label || id)
          .join(", ");
      } else {
        const selectedId = Array.isArray(answer) ? answer[0] : answer;
        labels =
          q.options.find((o) => o.id === selectedId)?.label ||
          selectedId ||
          "";
      }

      converted.push({ question: q.question, answer: labels });
    });
    return converted;
  };

  const quizWithSubmit: QuizConfig = {
    ...completedSurgeryPreparationQuiz,
    informationPageRoute: "surgery-bundle-results",
        onComplete: async (answers) => {
          console.log("Surgery Bundle Assessment Complete:", answers);
          sessionStorage.setItem("pendingAnswers", JSON.stringify(convertAnswersToLabels(answers)));
          window.location.hash = "surgery-bundle-information"; // go to info page
        },

    onBack: () => {
      window.location.hash = "surgery-bundle-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="surgery">
      <QuizTemplate config={completedSurgeryPreparationQuizWithAnalytics} />
    </PaymentGate>
  );
}