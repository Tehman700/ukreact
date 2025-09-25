import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw, SkipForward } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const POSITIVE_FEEDBACK_OPTIONS = [
  "Comprehensive",
  "Accurate",
  "Relevant",
  "Insightful",
  "Motivating",
  "Reassuring",
  "Confidence-building",
  "Practical",
  "Actionable",
  "Eye-opening",
  "Informative",
  "Clear",
  "Straightforward",
  "Educational",
  "Symptom-focused",
  "Management-focused",
  "Detailed",
  "Complete"
];

const NEGATIVE_FEEDBACK_OPTIONS = [
  "Too technical",
  "Generic",
  "Incomplete",
  "Confusing",
  "Overwhelming",
  "Unclear",
  "Too brief",
  "Repetitive",
  "Inaccurate",
  "Shallow"
];

export function CompletedChronicSymptomsReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedPositiveFeedback, setSelectedPositiveFeedback] = useState<string[]>([]);
  const [selectedNegativeFeedback, setSelectedNegativeFeedback] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handlePositiveFeedbackToggle = (feedback: string) => {
    setSelectedPositiveFeedback(prev =>
      prev.includes(feedback)
        ? prev.filter(item => item !== feedback)
        : [...prev, feedback]
    );
  };

  const handleNegativeFeedbackToggle = (feedback: string) => {
    setSelectedNegativeFeedback(prev =>
      prev.includes(feedback)
        ? prev.filter(item => item !== feedback)
        : [...prev, feedback]
    );
  };

  const removeSelectedFeedback = (feedback: string, isPositive: boolean) => {
    if (isPositive) {
      setSelectedPositiveFeedback(prev => prev.filter(item => item !== feedback));
    } else {
      setSelectedNegativeFeedback(prev => prev.filter(item => item !== feedback));
    }
  };

  const generateReview = () => {
    // Create more sophisticated intro phrases based on rating
    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Completed Chronic Symptoms Bundle and was genuinely impressed with the comprehensive symptom assessment.",
        "Just finished going through the Chronic Symptoms Bundle - what a thorough and insightful symptom management evaluation.",
        "I have to say, the Chronic Symptoms Bundle exceeded my expectations for symptom assessment.",
        "As someone dealing with chronic symptoms, I found the complete Chronic Symptoms Bundle to be incredibly valuable."
      ];
      
      const midRatingIntros = [
        "I completed the Chronic Symptoms Bundle and found it to be a solid symptom assessment tool overall.",
        "The Chronic Symptoms Bundle provided some useful symptom insights, though there's room for improvement.",
        "I went through the Chronic Symptoms Bundle and had a generally positive experience with the assessment.",
        "The Chronic Symptoms Bundle was helpful for understanding symptom management, with mixed results in some areas."
      ];
      
      const lowRatingIntros = [
        "I tried the Chronic Symptoms Bundle but unfortunately didn't find it as comprehensive as I'd hoped.",
        "While I appreciate the concept behind the Chronic Symptoms Bundle, the execution fell short for me.",
        "I completed the Chronic Symptoms Bundle but came away with mixed feelings about the assessment.",
        "The Chronic Symptoms Bundle has potential, but there are several areas that need improvement."
      ];
      
      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    // Create natural feedback phrases
    const createFeedbackSentence = (positive: string[], negative: string[]) => {
      const sentences = [];
      
      if (positive.length > 0) {
        const positiveConnectors = [
          "What I particularly appreciated was how",
          "I found the assessment especially",
          "The symptom analysis was notably",
          "One thing that stood out was how"
        ];
        
        const connector = positiveConnectors[Math.floor(Math.random() * positiveConnectors.length)];
        const traits = positive.slice(0, 3); // Limit to avoid overwhelming
        
        if (traits.length === 1) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} it felt throughout the process.`);
        } else if (traits.length === 2) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()} the entire experience was.`);
        } else {
          sentences.push(`${connector} ${traits.slice(0, -1).map(t => t.toLowerCase()).join(', ')}, and ${traits[traits.length - 1].toLowerCase()} it felt.`);
        }
      }
      
      if (negative.length > 0) {
        const negativeConnectors = [
          "However, I did find some aspects",
          "That said, there were areas that felt",
          "On the flip side, certain parts seemed",
          "I do think some improvements could be made where things felt"
        ];
        
        const connector = negativeConnectors[Math.floor(Math.random() * negativeConnectors.length)];
        const issues = negative.slice(0, 2); // Limit negative feedback to avoid being too harsh
        
        if (issues.length === 1) {
          sentences.push(`${connector} ${issues[0].toLowerCase()}.`);
        } else {
          sentences.push(`${connector} ${issues.join(' and ').toLowerCase()}.`);
        }
      }
      
      return sentences;
    };

    // Generate the review
    let review = '';
    
    if (rating > 0 || selectedPositiveFeedback.length > 0 || selectedNegativeFeedback.length > 0) {
      // Start with intro if we have a rating
      if (rating > 0) {
        review += getIntroPhrase(rating) + ' ';
      }
      
      // Add feedback sentences
      const feedbackSentences = createFeedbackSentence(selectedPositiveFeedback, selectedNegativeFeedback);
      if (feedbackSentences.length > 0) {
        review += feedbackSentences.join(' ') + ' ';
      }
      
      // Add custom text naturally
      if (customText.trim()) {
        review += customText.trim() + ' ';
      }
      
      // Add a conclusion based on rating
      if (rating >= 4) {
        const conclusions = [
          "Overall, I'd definitely recommend this to anyone managing chronic symptoms.",
          "I'm giving this a strong recommendation for anyone looking for comprehensive symptom assessment.",
          "Would absolutely use this again and recommend it to others with chronic conditions.",
          "This has genuinely helped me understand my symptoms better and develop management strategies."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating === 3) {
        const conclusions = [
          "It's worth trying if you're looking for chronic symptom assessment tools.",
          "A decent option among the various symptom management platforms available.",
          "Has some valuable elements that make it worth considering for symptom management.",
          "Could be helpful for some people, though results may vary."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating <= 2) {
        const conclusions = [
          "Hopefully future updates will address some of these concerns.",
          "With some improvements, this could become a much more valuable symptom resource.",
          "There's definitely potential here, but it needs more development.",
          "Others might have a different experience, but this didn't quite work for me."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      }
      
      // Add star rating naturally
      if (rating > 0) {
        review += ` ${rating}/5 stars.`;
      }
    }
    
    // Clean up extra spaces
    review = review.replace(/\s+/g, ' ').trim();
    
    setGeneratedReview(review);
    setShowSubmitButton(true);
  };

  const handleSubmitReview = () => {
    // Here you would typically send the review to your backend
    console.log('Submitting review:', {
      rating,
      review: generatedReview,
      positiveFeedback: selectedPositiveFeedback,
      negativeFeedback: selectedNegativeFeedback
    });
    
    // Navigate to the chronic symptom protocol challenge
    window.location.hash = 'chronic-symptom-protocol-challenge';
  };

  const handleSkip = () => {
    // Navigate directly to the next step without submitting feedback
    window.location.hash = 'chronic-symptom-protocol-challenge';
  };

  const handleRegenerate = () => {
    // Clear the generated review and allow user to generate a new one
    setGeneratedReview('');
    setShowSubmitButton(false);
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0 || selectedNegativeFeedback.length > 0;

  return (
                       <PaymentGate requiredFunnel="chronic">

    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="mb-4">Did you find the Chronic Symptoms Bundle helpful?</h1>
          <p className="text-muted-foreground">Leave a review to help us improve.</p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-4">Overall Rating</h3>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 transition-colors"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">Positive Feedback</h3>
          <div className="flex flex-wrap gap-2">
            {POSITIVE_FEEDBACK_OPTIONS.map((feedback, index) => (
              <Badge
                key={index}
                variant={selectedPositiveFeedback.includes(feedback) ? "default" : "secondary"}
                className="cursor-pointer px-3 py-2 text-sm"
                onClick={() => handlePositiveFeedbackToggle(feedback)}
              >
                {feedback}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">Negative Feedback</h3>
          <div className="flex flex-wrap gap-2">
            {NEGATIVE_FEEDBACK_OPTIONS.map((feedback, index) => (
              <Badge
                key={index}
                variant={selectedNegativeFeedback.includes(feedback) ? "default" : "secondary"}
                className="cursor-pointer px-3 py-2 text-sm"
                onClick={() => handleNegativeFeedbackToggle(feedback)}
              >
                {feedback}
              </Badge>
            ))}
          </div>
        </div>

        {hasSelectedFeedback && (
          <div className="mb-8">
            <h3 className="mb-4">Selected Feedback</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedPositiveFeedback.map((feedback, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-sm">{feedback}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFeedback(feedback, true)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {selectedNegativeFeedback.map((feedback, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                    <span className="text-sm">{feedback}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFeedback(feedback, false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Add your own thoughts:</label>
                <Textarea
                  placeholder="Add any additional feedback about the chronic symptoms bundle..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={3}
                />
              </div>

              {!generatedReview && (
                <Button onClick={generateReview} className="w-full px-[14px] py-[10px]">
                  Generate Review
                </Button>
              )}
            </div>
          </div>
        )}

        {generatedReview && (
          <div className="mb-8">
            <h3 className="mb-4">Your Review</h3>
            <div>
              <Textarea
                value={generatedReview}
                onChange={(e) => setGeneratedReview(e.target.value)}
                rows={4}
                className="mb-4"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                {showSubmitButton && (
                  <Button onClick={handleSubmitReview} className="flex-1 py-[20px] px-[21px] py-[10px]" size="lg">
                    Submit Review
                  </Button>
                )}
                <Button 
                  onClick={generateReview} 
                  variant="outline" 
                  className="flex-1 sm:flex-none px-[14px] py-[10px]" 
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>

              </div>
            </div>
          </div>
        )}

        {!hasSelectedFeedback && rating === 0 && (
          <div className="text-center">

          </div>
        )}

        {/* Alternative skip option for users who have started but want to skip */}
        {(hasSelectedFeedback || rating > 0) && !generatedReview && (
          <div className="text-center mt-6">

          </div>
        )}
      </div>
    </div>
    </PaymentGate>

  );
}