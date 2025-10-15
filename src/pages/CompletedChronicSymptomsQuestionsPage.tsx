import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const completedChronicSymptomsQuiz: QuizConfig = {
  title: 'Completed Chronic Symptoms Bundle',
  onComplete: () => {
    window.location.hash = 'completed-chronic-symptoms-bundle-information';
  },
  questions: [
    // Symptom Severity Questions (1-15)
    {
      id: 'primary-symptoms',
      question: 'Which of the following symptoms do you currently experience?',
      options: [
        { id: 'chronic-pain', label: 'Chronic pain', description: 'Persistent pain lasting more than 3 months' },
        { id: 'fatigue', label: 'Chronic fatigue', description: 'Ongoing tiredness not relieved by rest' },
        { id: 'joint-pain', label: 'Joint pain or stiffness', description: 'Arthritis, joint inflammation, or mobility issues' },
        { id: 'digestive-issues', label: 'Digestive problems', description: 'IBS, IBD, chronic stomach issues' },
        { id: 'headaches', label: 'Frequent headaches', description: 'Migraines, tension headaches, chronic head pain' },
        { id: 'sleep-problems', label: 'Sleep disorders', description: 'Insomnia, sleep apnea, restless sleep' },
        { id: 'mood-symptoms', label: 'Mood-related symptoms', description: 'Depression, anxiety, mood swings' },
        { id: 'cognitive-issues', label: 'Cognitive problems', description: 'Brain fog, memory issues, concentration problems' },
        { id: 'skin-conditions', label: 'Skin conditions', description: 'Eczema, psoriasis, chronic rashes' },
      ],
    },
    {
      id: 'pain-intensity',
      question: 'On average, how would you rate your pain intensity over the past month?',
      options: [
        { id: 'no-pain', label: 'No pain (0/10)', description: 'No pain experienced' },
        { id: 'mild-pain', label: 'Mild pain (1-3/10)', description: 'Minor discomfort, doesn\'t interfere with activities' },
        { id: 'moderate-pain', label: 'Moderate pain (4-6/10)', description: 'Noticeable pain that sometimes limits activities' },
        { id: 'severe-pain', label: 'Severe pain (7-8/10)', description: 'Significant pain that regularly limits daily activities' },
        { id: 'very-severe-pain', label: 'Very severe pain (9-10/10)', description: 'Intense pain that severely impacts daily function' },
      ],
    },
    {
      id: 'pain-frequency',
      question: 'How often do you experience significant pain?',
      options: [
        { id: 'rarely', label: 'Rarely', description: 'Less than once per week' },
        { id: 'occasionally', label: 'Occasionally', description: '1-2 times per week' },
        { id: 'frequently', label: 'Frequently', description: '3-5 times per week' },
        { id: 'daily', label: 'Daily', description: 'Every day or almost every day' },
        { id: 'constant', label: 'Constant', description: 'Continuous pain with little relief' },
      ],
    },
    {
      id: 'fatigue-severity',
      question: 'How would you describe your fatigue levels?',
      options: [
        { id: 'no-fatigue', label: 'No unusual fatigue', description: 'Normal energy levels throughout the day' },
        { id: 'mild-fatigue', label: 'Mild fatigue', description: 'Slightly more tired than usual but manageable' },
        { id: 'moderate-fatigue', label: 'Moderate fatigue', description: 'Noticeable tiredness affecting some activities' },
        { id: 'severe-fatigue', label: 'Severe fatigue', description: 'Significant tiredness limiting daily activities' },
        { id: 'exhaustion', label: 'Complete exhaustion', description: 'Overwhelming fatigue severely impacting function' },
      ],
    },
    {
      id: 'symptom-duration',
      question: 'How long have you been experiencing your primary symptoms?',
      options: [
        { id: 'less-than-3-months', label: 'Less than 3 months', description: 'Recent onset symptoms' },
        { id: '3-6-months', label: '3-6 months', description: 'Sub-acute symptoms' },
        { id: '6-12-months', label: '6-12 months', description: 'Prolonged symptoms' },
        { id: '1-3-years', label: '1-3 years', description: 'Chronic symptoms' },
        { id: 'more-than-3-years', label: 'More than 3 years', description: 'Long-standing chronic symptoms' },
      ],
    },
    {
      id: 'symptom-progression',
      question: 'How have your symptoms changed over time?',
      options: [
        { id: 'improving', label: 'Gradually improving', description: 'Symptoms are getting better over time' },
        { id: 'stable', label: 'Relatively stable', description: 'Symptoms remain fairly consistent' },
        { id: 'fluctuating', label: 'Fluctuating', description: 'Symptoms vary significantly from day to day' },
        { id: 'worsening', label: 'Gradually worsening', description: 'Symptoms are slowly getting worse' },
        { id: 'rapidly-worsening', label: 'Rapidly worsening', description: 'Symptoms are deteriorating quickly' },
      ],
    },
    {
      id: 'symptom-triggers',
      question: 'What factors tend to worsen your symptoms?',
      multiSelect: true,
      options: [
        { id: 'stress', label: 'Physical or emotional stress', description: 'Work pressure, life events, physical strain' },
        { id: 'weather', label: 'Weather changes', description: 'Barometric pressure, humidity, temperature changes' },
        { id: 'activity', label: 'Physical activity', description: 'Exercise, prolonged standing, repetitive movements' },
        { id: 'diet', label: 'Certain foods or drinks', description: 'Specific dietary triggers or patterns' },
        { id: 'sleep', label: 'Poor sleep', description: 'Lack of sleep or poor sleep quality' },
        { id: 'hormones', label: 'Hormonal changes', description: 'Menstrual cycle, menopause, hormonal fluctuations' },
        { id: 'medications', label: 'Medications', description: 'Side effects from current medications' },
        { id: 'no-clear-triggers', label: 'No clear triggers', description: 'Symptoms seem random or unpredictable' },
      ],
    },
    {
      id: 'morning-symptoms',
      question: 'How do you typically feel when you wake up in the morning?',
      options: [
        { id: 'refreshed', label: 'Refreshed and energetic', description: 'Wake up feeling well-rested and ready for the day' },
        { id: 'slightly-tired', label: 'Slightly tired but manageable', description: 'Some morning fatigue but improves with time' },
        { id: 'stiff-tired', label: 'Stiff and tired', description: 'Morning stiffness and fatigue requiring time to improve' },
        { id: 'very-stiff-tired', label: 'Very stiff and exhausted', description: 'Significant morning symptoms affecting early activities' },
        { id: 'worse-than-bedtime', label: 'Worse than when going to bed', description: 'Wake up feeling worse than the night before' },
      ],
    },
    {
      id: 'symptom-impact-work',
      question: 'How do your symptoms affect your work or daily responsibilities?',
      options: [
        { id: 'no-impact', label: 'No impact', description: 'Able to perform all work duties without limitation' },
        { id: 'minimal-impact', label: 'Minimal impact', description: 'Occasional minor adjustments needed' },
        { id: 'moderate-impact', label: 'Moderate impact', description: 'Regular accommodations or modifications required' },
        { id: 'significant-impact', label: 'Significant impact', description: 'Frequent work limitations or absences' },
        { id: 'severe-impact', label: 'Severe impact', description: 'Unable to work or severely limited capacity' },
      ],
    },
    {
      id: 'symptom-management-current',
      question: 'What methods are you currently using to manage your symptoms?',
      multiSelect: true,
      options: [
        { id: 'prescription-meds', label: 'Prescription medications', description: 'Doctor-prescribed drugs for symptom management' },
        { id: 'otc-meds', label: 'Over-the-counter medications', description: 'Non-prescription pain relievers, supplements' },
        { id: 'physical-therapy', label: 'Physical therapy', description: 'Professional rehabilitation or exercise therapy' },
        { id: 'alternative-therapies', label: 'Alternative therapies', description: 'Acupuncture, chiropractic, massage therapy' },
        { id: 'lifestyle-changes', label: 'Lifestyle modifications', description: 'Diet changes, exercise, stress management' },
        { id: 'psychological-support', label: 'Psychological support', description: 'Counseling, therapy, support groups' },
        { id: 'no-treatment', label: 'No current treatment', description: 'Not currently using any management strategies' },
      ],
    },
    {
      id: 'treatment-effectiveness',
      question: 'How effective are your current treatments?',
      options: [
        { id: 'very-effective', label: 'Very effective', description: 'Treatments provide excellent symptom control' },
        { id: 'moderately-effective', label: 'Moderately effective', description: 'Treatments help but symptoms still present' },
        { id: 'minimally-effective', label: 'Minimally effective', description: 'Some benefit but limited symptom improvement' },
        { id: 'ineffective', label: 'Ineffective', description: 'Little to no benefit from current treatments' },
        { id: 'not-applicable', label: 'Not applicable', description: 'Not currently receiving treatment' },
      ],
    },
    {
      id: 'flare-frequency',
      question: 'How often do you experience symptom flare-ups or bad days?',
      options: [
        { id: 'rarely', label: 'Rarely', description: 'Less than once per month' },
        { id: 'monthly', label: 'Monthly', description: 'About once per month' },
        { id: 'weekly', label: 'Weekly', description: 'About once per week' },
        { id: 'multiple-weekly', label: 'Multiple times per week', description: '2-3 times per week' },
        { id: 'daily', label: 'Daily fluctuations', description: 'Symptoms vary significantly day to day' },
      ],
    },
    {
      id: 'sleep-impact',
      question: 'How do your symptoms affect your sleep?',
      options: [
        { id: 'no-sleep-impact', label: 'No impact on sleep', description: 'Sleep quality unaffected by symptoms' },
        { id: 'occasional-disruption', label: 'Occasional sleep disruption', description: 'Sometimes symptoms interfere with sleep' },
        { id: 'frequent-disruption', label: 'Frequent sleep disruption', description: 'Symptoms regularly affect sleep quality' },
        { id: 'severe-insomnia', label: 'Severe sleep problems', description: 'Symptoms cause significant insomnia' },
        { id: 'unable-to-sleep', label: 'Unable to get restful sleep', description: 'Symptoms prevent restorative sleep' },
      ],
    },
    {
      id: 'mood-impact',
      question: 'How do your chronic symptoms affect your mood and mental health?',
      options: [
        { id: 'no-mood-impact', label: 'No impact on mood', description: 'Mental health unaffected by symptoms' },
        { id: 'occasional-frustration', label: 'Occasional frustration', description: 'Sometimes feel frustrated or discouraged' },
        { id: 'regular-mood-effects', label: 'Regular mood effects', description: 'Symptoms often affect emotional wellbeing' },
        { id: 'significant-depression', label: 'Significant mood problems', description: 'Symptoms contribute to depression or anxiety' },
        { id: 'severe-impact', label: 'Severe mental health impact', description: 'Symptoms severely affect psychological wellbeing' },
      ],
    },
    {
      id: 'social-impact',
      question: 'How do your symptoms affect your social life and relationships?',
      options: [
        { id: 'no-social-impact', label: 'No impact on social life', description: 'Maintain normal social activities and relationships' },
        { id: 'occasional-limitations', label: 'Occasional limitations', description: 'Sometimes need to modify or cancel social plans' },
        { id: 'regular-limitations', label: 'Regular limitations', description: 'Frequently limited in social activities' },
        { id: 'significant-isolation', label: 'Significant social limitations', description: 'Symptoms severely limit social participation' },
        { id: 'complete-isolation', label: 'Complete social isolation', description: 'Unable to maintain social connections' },
      ],
    },

    // Inflammation Risk Questions (16-25)
    {
      id: 'diet-quality',
      question: 'How would you describe your typical diet?',
      options: [
        { id: 'anti-inflammatory', label: 'Anti-inflammatory diet', description: 'Mediterranean, low-processed, high omega-3 foods' },
        { id: 'mostly-healthy', label: 'Mostly healthy', description: 'Balanced diet with occasional processed foods' },
        { id: 'mixed-diet', label: 'Mixed diet', description: 'Combination of healthy and processed foods' },
        { id: 'processed-heavy', label: 'High in processed foods', description: 'Regular consumption of packaged, processed foods' },
        { id: 'inflammatory', label: 'Highly inflammatory', description: 'High sugar, trans fats, excessive processed foods' },
      ],
    },
    {
      id: 'inflammatory-foods',
      question: 'How often do you consume these potentially inflammatory foods?',
      multiSelect: true,
      options: [
        { id: 'sugar-daily', label: 'Added sugars daily', description: 'Sweets, sodas, processed foods with added sugar' },
        { id: 'refined-grains-daily', label: 'Refined grains daily', description: 'White bread, pasta, processed cereals' },
        { id: 'fried-foods-weekly', label: 'Fried foods weekly', description: 'Deep-fried foods, fast food multiple times per week' },
        { id: 'processed-meat-weekly', label: 'Processed meats weekly', description: 'Bacon, sausage, deli meats regularly' },
        { id: 'alcohol-daily', label: 'Alcohol daily', description: 'Regular daily alcohol consumption' },
        { id: 'trans-fats', label: 'Trans fats regularly', description: 'Margarine, packaged baked goods, processed snacks' },
        { id: 'minimal-inflammatory', label: 'Minimal inflammatory foods', description: 'Rarely consume processed or inflammatory foods' },
      ],
    },
    {
      id: 'anti-inflammatory-foods',
      question: 'How often do you eat anti-inflammatory foods?',
      options: [
        { id: 'daily-anti-inflammatory', label: 'Daily anti-inflammatory foods', description: 'Vegetables, fruits, fish, nuts, olive oil daily' },
        { id: 'frequent-anti-inflammatory', label: 'Frequently', description: 'Anti-inflammatory foods most days of the week' },
        { id: 'occasional-anti-inflammatory', label: 'Occasionally', description: 'Some anti-inflammatory foods weekly' },
        { id: 'rare-anti-inflammatory', label: 'Rarely', description: 'Limited consumption of anti-inflammatory foods' },
        { id: 'never-anti-inflammatory', label: 'Never intentionally', description: 'Don\'t specifically seek anti-inflammatory foods' },
      ],
    },
    {
      id: 'stress-levels',
      question: 'How would you rate your current stress levels?',
      options: [
        { id: 'low-stress', label: 'Low stress', description: 'Generally calm, effective stress management' },
        { id: 'mild-stress', label: 'Mild stress', description: 'Some stress but manageable' },
        { id: 'moderate-stress', label: 'Moderate stress', description: 'Regular stress affecting daily life' },
        { id: 'high-stress', label: 'High stress', description: 'Frequent high-stress situations' },
        { id: 'chronic-stress', label: 'Chronic overwhelming stress', description: 'Constant high stress with poor coping' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      options: [
        { id: 'excellent-sleep', label: 'Excellent sleep', description: '7-9 hours of quality, restorative sleep' },
        { id: 'good-sleep', label: 'Good sleep', description: 'Generally good sleep with minor disruptions' },
        { id: 'fair-sleep', label: 'Fair sleep', description: 'Some sleep problems, irregular patterns' },
        { id: 'poor-sleep', label: 'Poor sleep', description: 'Frequent sleep disruptions, inadequate rest' },
        { id: 'very-poor-sleep', label: 'Very poor sleep', description: 'Chronic insomnia, severe sleep disorders' },
      ],
    },
    {
      id: 'exercise-inflammation',
      question: 'How would you describe your exercise habits?',
      options: [
        { id: 'regular-moderate', label: 'Regular moderate exercise', description: 'Consistent moderate-intensity exercise 3-5x/week' },
        { id: 'occasional-exercise', label: 'Occasional exercise', description: 'Some physical activity 1-2x/week' },
        { id: 'minimal-exercise', label: 'Minimal exercise', description: 'Limited physical activity' },
        { id: 'excessive-exercise', label: 'Excessive high-intensity exercise', description: 'Very intense daily exercise potentially inflammatory' },
        { id: 'no-exercise', label: 'No regular exercise', description: 'Sedentary lifestyle with minimal physical activity' },
      ],
    },
    {
      id: 'weight-status',
      question: 'How would you describe your current weight status?',
      options: [
        { id: 'healthy-weight', label: 'Healthy weight', description: 'BMI 18.5-24.9, comfortable with weight' },
        { id: 'slightly-overweight', label: 'Slightly overweight', description: 'BMI 25-29.9, some excess weight' },
        { id: 'significantly-overweight', label: 'Significantly overweight', description: 'BMI 30+, considerable excess weight' },
        { id: 'underweight', label: 'Underweight', description: 'BMI under 18.5, below healthy weight range' },
        { id: 'weight-fluctuations', label: 'Significant weight fluctuations', description: 'Weight varies significantly over time' },
      ],
    },
    {
      id: 'smoking-status',
      question: 'What is your smoking status?',
      options: [
        { id: 'never-smoked', label: 'Never smoked', description: 'No history of regular smoking' },
        { id: 'former-smoker', label: 'Former smoker', description: 'Quit smoking more than 1 year ago' },
        { id: 'recent-quitter', label: 'Recently quit', description: 'Quit smoking within the past year' },
        { id: 'current-smoker', label: 'Current smoker', description: 'Currently smoke cigarettes regularly' },
        { id: 'vaping-user', label: 'Vaping/e-cigarette user', description: 'Use electronic cigarettes or vaping devices' },
      ],
    },
    {
      id: 'environmental-exposures',
      question: 'Are you regularly exposed to environmental inflammatory factors?',
      multiSelect: true,
      options: [
        { id: 'air-pollution', label: 'Air pollution', description: 'Live in area with poor air quality' },
        { id: 'chemical-exposure', label: 'Chemical exposure', description: 'Work or home exposure to chemicals' },
        { id: 'mold-exposure', label: 'Mold exposure', description: 'Current or past mold exposure in living space' },
        { id: 'allergen-exposure', label: 'Allergen exposure', description: 'Regular exposure to known allergens' },
        { id: 'noise-pollution', label: 'Chronic noise exposure', description: 'Constant loud noise in environment' },
        { id: 'minimal-exposure', label: 'Minimal environmental exposures', description: 'Clean, low-exposure environment' },
      ],
    },
    {
      id: 'inflammatory-conditions',
      question: 'Do you have any diagnosed inflammatory conditions?',
      multiSelect: true,
      options: [
        { id: 'rheumatoid-arthritis', label: 'Rheumatoid arthritis', description: 'Autoimmune inflammatory joint disease' },
        { id: 'inflammatory-bowel', label: 'Inflammatory bowel disease', description: 'Crohn\'s disease, ulcerative colitis' },
        { id: 'psoriasis', label: 'Psoriasis', description: 'Inflammatory skin condition' },
        { id: 'asthma', label: 'Asthma', description: 'Inflammatory airway condition' },
        { id: 'allergies', label: 'Chronic allergies', description: 'Environmental or food allergies' },
        { id: 'other-autoimmune', label: 'Other autoimmune conditions', description: 'Lupus, multiple sclerosis, other autoimmune diseases' },
        { id: 'no-inflammatory-conditions', label: 'No diagnosed inflammatory conditions', description: 'No known inflammatory or autoimmune diseases' },
      ],
    },

    // Medication Burden Questions (26-35)
    {
      id: 'total-medications',
      question: 'How many prescription medications do you currently take regularly?',
      options: [
        { id: 'no-medications', label: 'None', description: 'No regular prescription medications' },
        { id: 'one-two-meds', label: '1-2 medications', description: 'Minimal medication burden' },
        { id: 'three-five-meds', label: '3-5 medications', description: 'Moderate medication load' },
        { id: 'six-ten-meds', label: '6-10 medications', description: 'Significant medication burden' },
        { id: 'more-than-ten-meds', label: 'More than 10 medications', description: 'High medication burden (polypharmacy)' },
      ],
    },
    {
      id: 'medication-types',
      question: 'Which types of medications do you take regularly?',
      multiSelect: true,
      options: [
        { id: 'pain-medications', label: 'Pain medications', description: 'Opioids, NSAIDs, other analgesics' },
        { id: 'psychiatric-meds', label: 'Psychiatric medications', description: 'Antidepressants, antipsychotics, mood stabilizers' },
        { id: 'heart-medications', label: 'Heart medications', description: 'Blood pressure, cholesterol, heart rhythm drugs' },
        { id: 'diabetes-medications', label: 'Diabetes medications', description: 'Insulin, metformin, other diabetes drugs' },
        { id: 'autoimmune-medications', label: 'Autoimmune/inflammatory medications', description: 'Steroids, DMARDs, biologics' },
        { id: 'sleep-medications', label: 'Sleep medications', description: 'Sleeping pills, sedatives' },
        { id: 'digestive-medications', label: 'Digestive medications', description: 'Acid reducers, anti-spasmodics, laxatives' },
        { id: 'supplements', label: 'Supplements/vitamins', description: 'Nutritional supplements, herbal remedies' },
      ],
    },
    {
      id: 'medication-side-effects',
      question: 'How often do you experience side effects from your medications?',
      options: [
        { id: 'no-side-effects', label: 'No side effects', description: 'Medications well tolerated' },
        { id: 'occasional-side-effects', label: 'Occasional side effects', description: 'Minor side effects sometimes' },
        { id: 'frequent-side-effects', label: 'Frequent side effects', description: 'Regular bothersome side effects' },
        { id: 'severe-side-effects', label: 'Severe side effects', description: 'Significant side effects affecting quality of life' },
        { id: 'intolerable-side-effects', label: 'Intolerable side effects', description: 'Side effects worse than original symptoms' },
      ],
    },
    {
      id: 'medication-effectiveness',
      question: 'How effective are your current medications for symptom management?',
      options: [
        { id: 'very-effective', label: 'Very effective', description: 'Medications provide excellent symptom control' },
        { id: 'moderately-effective', label: 'Moderately effective', description: 'Good symptom improvement with medications' },
        { id: 'somewhat-effective', label: 'Somewhat effective', description: 'Some benefit but limited improvement' },
        { id: 'minimally-effective', label: 'Minimally effective', description: 'Little benefit from current medications' },
        { id: 'ineffective', label: 'Ineffective', description: 'No noticeable benefit from medications' },
      ],
    },
    {
      id: 'medication-changes',
      question: 'How often have your medications been changed in the past year?',
      options: [
        { id: 'no-changes', label: 'No changes', description: 'Stable medication regimen for over a year' },
        { id: 'minor-adjustments', label: 'Minor dose adjustments', description: 'Small changes to existing medications' },
        { id: 'some-changes', label: 'Some medication changes', description: '1-2 medication changes or additions' },
        { id: 'frequent-changes', label: 'Frequent changes', description: 'Multiple medication trials and changes' },
        { id: 'constant-adjustments', label: 'Constant adjustments', description: 'Ongoing medication trials and frequent changes' },
      ],
    },
    {
      id: 'medication-adherence',
      question: 'How consistently do you take your medications as prescribed?',
      options: [
        { id: 'perfect-adherence', label: 'Always as prescribed', description: 'Never miss doses, take exactly as directed' },
        { id: 'good-adherence', label: 'Usually as prescribed', description: 'Occasionally miss doses but generally compliant' },
        { id: 'fair-adherence', label: 'Sometimes miss doses', description: 'Regular missed doses or timing issues' },
        { id: 'poor-adherence', label: 'Often miss doses', description: 'Frequently forget or skip medications' },
        { id: 'very-poor-adherence', label: 'Rarely take as prescribed', description: 'Inconsistent medication taking' },
      ],
    },
    {
      id: 'drug-interactions',
      question: 'Have you experienced problems with drug interactions?',
      options: [
        { id: 'no-interactions', label: 'No known interactions', description: 'No problems with medication combinations' },
        { id: 'minor-interactions', label: 'Minor interactions', description: 'Some mild interaction effects noted' },
        { id: 'moderate-interactions', label: 'Moderate interactions', description: 'Noticeable problems with medication combinations' },
        { id: 'severe-interactions', label: 'Severe interactions', description: 'Serious problems requiring medication changes' },
        { id: 'unknown-interactions', label: 'Unknown', description: 'Unsure about potential medication interactions' },
      ],
    },
    {
      id: 'over-counter-use',
      question: 'How often do you use over-the-counter medications or supplements?',
      options: [
        { id: 'no-otc', label: 'Never use OTC', description: 'Only take prescribed medications' },
        { id: 'occasional-otc', label: 'Occasional use', description: 'Sometimes use OTC medications as needed' },
        { id: 'regular-otc', label: 'Regular use', description: 'Daily or weekly OTC medication use' },
        { id: 'frequent-otc', label: 'Frequent use', description: 'Multiple OTC medications used regularly' },
        { id: 'excessive-otc', label: 'Excessive use', description: 'Heavy reliance on OTC medications' },
      ],
    },
    {
      id: 'medication-costs',
      question: 'How do medication costs affect your treatment?',
      options: [
        { id: 'no-cost-impact', label: 'No cost concerns', description: 'Medication costs don\'t affect treatment decisions' },
        { id: 'minor-cost-impact', label: 'Minor cost concerns', description: 'Occasionally consider costs but manage to afford all' },
        { id: 'moderate-cost-impact', label: 'Moderate cost impact', description: 'Sometimes skip doses or delay refills due to cost' },
        { id: 'significant-cost-impact', label: 'Significant cost problems', description: 'Frequently can\'t afford medications as prescribed' },
        { id: 'severe-cost-impact', label: 'Severe cost barriers', description: 'Often go without needed medications due to cost' },
      ],
    },
    {
      id: 'medication-management',
      question: 'How do you organize and manage your medications?',
      options: [
        { id: 'excellent-organization', label: 'Excellent organization', description: 'Pill organizers, alarms, perfect tracking system' },
        { id: 'good-organization', label: 'Good organization', description: 'Generally well organized with minor lapses' },
        { id: 'fair-organization', label: 'Fair organization', description: 'Some organization but room for improvement' },
        { id: 'poor-organization', label: 'Poor organization', description: 'Struggle to keep track of medications' },
        { id: 'chaotic-management', label: 'Chaotic management', description: 'No system, frequently confused about medications' },
      ],
    },

    // Daily Energy Questions (36-45)
    {
      id: 'energy-patterns',
      question: 'How would you describe your typical daily energy pattern?',
      options: [
        { id: 'consistent-high', label: 'Consistent high energy', description: 'Stable high energy throughout the day' },
        { id: 'morning-peak', label: 'Morning peak', description: 'Highest energy in morning, declines during day' },
        { id: 'afternoon-peak', label: 'Afternoon peak', description: 'Energy improves during mid-day hours' },
        { id: 'evening-peak', label: 'Evening peak', description: 'Most energetic in evening hours' },
        { id: 'unpredictable-energy', label: 'Unpredictable', description: 'Energy levels vary randomly throughout day' },
        { id: 'consistently-low', label: 'Consistently low', description: 'Low energy throughout entire day' },
      ],
    },
    {
      id: 'morning-energy',
      question: 'How do you typically feel when you wake up?',
      options: [
        { id: 'refreshed-energetic', label: 'Refreshed and energetic', description: 'Wake up feeling well-rested and ready' },
        { id: 'somewhat-rested', label: 'Somewhat rested', description: 'Feel okay but take time to fully wake up' },
        { id: 'groggy-tired', label: 'Groggy and tired', description: 'Difficult to wake up, feel unrested' },
        { id: 'exhausted', label: 'Exhausted', description: 'Wake up feeling more tired than when went to bed' },
        { id: 'variable-mornings', label: 'Variable', description: 'Morning energy varies significantly day to day' },
      ],
    },
    {
      id: 'afternoon-energy',
      question: 'Do you experience afternoon energy crashes?',
      options: [
        { id: 'no-afternoon-crash', label: 'No afternoon crash', description: 'Energy remains stable throughout afternoon' },
        { id: 'mild-afternoon-dip', label: 'Mild afternoon dip', description: 'Slight energy decrease but manageable' },
        { id: 'moderate-crash', label: 'Moderate afternoon crash', description: 'Noticeable energy drop requiring rest or caffeine' },
        { id: 'severe-crash', label: 'Severe afternoon crash', description: 'Significant fatigue requiring nap or break' },
        { id: 'complete-exhaustion', label: 'Complete exhaustion', description: 'Unable to function during afternoon hours' },
      ],
    },
    {
      id: 'sleep-hours',
      question: 'How many hours of sleep do you typically get per night?',
      options: [
        { id: 'less-than-5', label: 'Less than 5 hours', description: 'Severely inadequate sleep duration' },
        { id: '5-6-hours', label: '5-6 hours', description: 'Below recommended sleep duration' },
        { id: '7-8-hours', label: '7-8 hours', description: 'Recommended sleep duration' },
        { id: '9-plus-hours', label: '9+ hours', description: 'Extended sleep duration' },
        { id: 'variable-hours', label: 'Highly variable', description: 'Sleep duration varies significantly night to night' },
      ],
    },
    {
      id: 'sleep-quality-energy',
      question: 'How would you rate your sleep quality?',
      options: [
        { id: 'excellent-quality', label: 'Excellent quality', description: 'Deep, restorative sleep without interruptions' },
        { id: 'good-quality', label: 'Good quality', description: 'Generally good sleep with minor disruptions' },
        { id: 'fair-quality', label: 'Fair quality', description: 'Some sleep problems affecting rest quality' },
        { id: 'poor-quality', label: 'Poor quality', description: 'Frequent wake-ups, unrefreshing sleep' },
        { id: 'very-poor-quality', label: 'Very poor quality', description: 'Severe sleep disruption, never feel rested' },
      ],
    },
    {
      id: 'caffeine-dependence',
      question: 'How dependent are you on caffeine for energy?',
      options: [
        { id: 'no-caffeine', label: 'Don\'t use caffeine', description: 'No regular caffeine consumption' },
        { id: 'minimal-caffeine', label: 'Minimal caffeine use', description: 'Occasional coffee or tea, not dependent' },
        { id: 'moderate-caffeine', label: 'Moderate caffeine use', description: '1-2 cups coffee daily for alertness' },
        { id: 'high-caffeine', label: 'High caffeine dependence', description: 'Multiple cups daily, feel withdrawal without' },
        { id: 'extreme-caffeine', label: 'Extreme caffeine dependence', description: 'Constant caffeine needed to function' },
      ],
    },
    {
      id: 'energy-supplements',
      question: 'Do you use supplements or other methods to boost energy?',
      multiSelect: true,
      options: [
        { id: 'b-vitamins', label: 'B-vitamin supplements', description: 'B12, B-complex, or other B vitamins' },
        { id: 'iron-supplements', label: 'Iron supplements', description: 'For iron deficiency or anemia' },
        { id: 'energy-drinks', label: 'Energy drinks', description: 'Commercial energy drinks or shots' },
        { id: 'herbal-supplements', label: 'Herbal energy supplements', description: 'Ginseng, rhodiola, other herbal energizers' },
        { id: 'prescription-stimulants', label: 'Prescription stimulants', description: 'ADHD medications or other prescribed stimulants' },
        { id: 'exercise-energy', label: 'Exercise for energy', description: 'Use physical activity to boost energy' },
        { id: 'no-energy-aids', label: 'No supplements or aids', description: 'Rely on natural energy only' },
      ],
    },
    {
      id: 'exercise-energy-impact',
      question: 'How does physical activity affect your energy levels?',
      options: [
        { id: 'boosts-energy', label: 'Significantly boosts energy', description: 'Exercise consistently increases energy levels' },
        { id: 'improves-energy', label: 'Moderately improves energy', description: 'Exercise generally helps energy levels' },
        { id: 'mixed-effects', label: 'Mixed effects', description: 'Sometimes helps, sometimes depletes energy' },
        { id: 'depletes-energy', label: 'Depletes energy', description: 'Exercise generally makes fatigue worse' },
        { id: 'severely-depletes', label: 'Severely depletes energy', description: 'Any exercise causes significant fatigue' },
      ],
    },
    {
      id: 'stress-energy-impact',
      question: 'How does stress affect your energy levels?',
      options: [
        { id: 'stress-energizes', label: 'Stress energizes me', description: 'Stress situations tend to increase energy' },
        { id: 'minimal-stress-impact', label: 'Minimal impact', description: 'Stress doesn\'t significantly affect energy' },
        { id: 'moderate-depletion', label: 'Moderate energy depletion', description: 'Stress somewhat drains energy' },
        { id: 'significant-depletion', label: 'Significant energy depletion', description: 'Stress notably reduces energy levels' },
        { id: 'complete-exhaustion', label: 'Complete exhaustion', description: 'Stress causes severe energy crashes' },
      ],
    },
    {
      id: 'recovery-time',
      question: 'How long does it take you to recover energy after exertion?',
      options: [
        { id: 'quick-recovery', label: 'Quick recovery', description: 'Return to baseline energy within hours' },
        { id: 'overnight-recovery', label: 'Overnight recovery', description: 'Feel recovered after a good night\'s sleep' },
        { id: 'day-recovery', label: '1-2 day recovery', description: 'Need 1-2 days to return to baseline energy' },
        { id: 'week-recovery', label: 'Several days to week', description: 'Require multiple days to recover from exertion' },
        { id: 'poor-recovery', label: 'Poor recovery', description: 'Never fully recover baseline energy levels' },
      ],
    },

    // Lifestyle Impact Questions (46-50)
    {
      id: 'work-impact',
      question: 'How do your symptoms impact your work performance?',
      options: [
        { id: 'no-work-impact', label: 'No impact on work', description: 'Perform all work duties at full capacity' },
        { id: 'minor-work-impact', label: 'Minor work limitations', description: 'Occasional accommodations needed' },
        { id: 'moderate-work-impact', label: 'Moderate work impact', description: 'Regular work limitations or absences' },
        { id: 'significant-work-impact', label: 'Significant work impact', description: 'Frequent limitations affecting job performance' },
        { id: 'unable-to-work', label: 'Unable to work', description: 'Symptoms prevent working or severely limit capacity' },
      ],
    },
    {
      id: 'physical-activities',
      question: 'How do your symptoms affect your physical activities and hobbies?',
      options: [
        { id: 'no-activity-limits', label: 'No limitations', description: 'Can participate in all desired physical activities' },
        { id: 'minor-modifications', label: 'Minor modifications needed', description: 'Some adjustments but still participate' },
        { id: 'significant-limitations', label: 'Significant limitations', description: 'Many activities limited or avoided' },
        { id: 'severely-limited', label: 'Severely limited', description: 'Most physical activities impossible' },
        { id: 'completely-unable', label: 'Completely unable', description: 'Cannot participate in any physical activities' },
      ],
    },
    {
      id: 'social-relationships',
      question: 'How do your symptoms affect your relationships and social life?',
      options: [
        { id: 'no-relationship-impact', label: 'No impact on relationships', description: 'Maintain all relationships and social activities' },
        { id: 'minor-relationship-impact', label: 'Minor impact', description: 'Occasionally need to modify social plans' },
        { id: 'moderate-relationship-impact', label: 'Moderate impact', description: 'Regularly limited in social participation' },
        { id: 'significant-relationship-strain', label: 'Significant relationship strain', description: 'Symptoms cause stress in important relationships' },
        { id: 'social-isolation', label: 'Social isolation', description: 'Unable to maintain meaningful social connections' },
      ],
    },
    {
      id: 'daily-responsibilities',
      question: 'How do your symptoms affect daily household responsibilities?',
      options: [
        { id: 'no-household-impact', label: 'No impact', description: 'Complete all household tasks without difficulty' },
        { id: 'minor-household-impact', label: 'Minor impact', description: 'Sometimes need help or take longer to complete tasks' },
        { id: 'moderate-household-impact', label: 'Moderate impact', description: 'Regularly need assistance with household duties' },
        { id: 'significant-household-impact', label: 'Significant impact', description: 'Unable to perform many household responsibilities' },
        { id: 'completely-dependent', label: 'Completely dependent', description: 'Require full assistance with household management' },
      ],
    },
    {
      id: 'future-planning',
      question: 'How do your symptoms affect your ability to plan for the future?',
      options: [
        { id: 'no-planning-impact', label: 'No impact on planning', description: 'Can make long-term plans with confidence' },
        { id: 'cautious-planning', label: 'More cautious planning', description: 'Consider symptoms when making future plans' },
        { id: 'limited-planning', label: 'Limited planning ability', description: 'Difficulty making commitments beyond short term' },
        { id: 'no-long-term-planning', label: 'Can\'t plan long-term', description: 'Unable to make plans beyond immediate future' },
        { id: 'day-to-day-only', label: 'Day-to-day only', description: 'Can only focus on immediate daily needs' },
      ],
    },
  ],
};

export function CompletedChronicSymptomsQuestionsPage() {
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    completedChronicSymptomsQuiz.questions.forEach((q) => {
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
    ...completedChronicSymptomsQuiz,
    informationPageRoute: "completed-chronic-symptoms-bundle-results",
        onComplete: async (answers) => {
          console.log("Chronic Bundle Assessment Complete:", answers);
          sessionStorage.setItem("pendingAnswers", JSON.stringify(convertAnswersToLabels(answers)));
          window.location.hash = "completed-chronic-symptoms-bundle-information"; // go to info page
        },

    onBack: () => {
      window.location.hash = "completed-chronic-symptoms-bundle-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="chronic">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}