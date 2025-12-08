import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw, SkipForward } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const POSITIVE_FEEDBACK_OPTIONS = [
  "Personalized",
  "Relevant",
  "Specific",
  "Motivating",
  "Reassuring",
  "Confidence-building",
  "Practical",
  "Realistic",
  "Actionable",
  "Calming",
  "Empowering",
  "Informative",
  "Clear",
  "Quick",
  "Straightforward",
  "Eye-opening",
  "Educational",
  "Insightful"
];

export function SurgeryReadinessReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedPositiveFeedback, setSelectedPositiveFeedback] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    setRatingError(false);
  };

  const handlePositiveFeedbackToggle = (feedback: string) => {
    setSelectedPositiveFeedback(prev =>
      prev.includes(feedback)
        ? prev.filter(item => item !== feedback)
        : [...prev, feedback]
    );
  };

  const removeSelectedFeedback = (feedback: string) => {
    setSelectedPositiveFeedback(prev => prev.filter(item => item !== feedback));
  };

  const generateReview = () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }

    // Create more sophisticated intro phrases based on rating
    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Surgery Readiness Assessment and was genuinely impressed with the experience.",
        "Just finished going through the Surgery Readiness Assessment - what a comprehensive and thoughtful tool.",
        "I have to say, the Surgery Readiness Assessment exceeded my expectations in several ways.",
        "As someone preparing for surgery, I found the Surgery Readiness Assessment to be incredibly valuable."
      ];

      const midRatingIntros = [
        "I completed the Surgery Readiness Assessment and found it to be a solid resource overall.",
        "The Surgery Readiness Assessment provided some useful insights, though there's room for improvement.",
        "I went through the Surgery Readiness Assessment and had a generally positive experience.",
        "The Surgery Readiness Assessment was helpful in certain areas, with mixed results in others."
      ];

      const lowRatingIntros = [
        "I tried the Surgery Readiness Assessment but unfortunately didn't find it as helpful as I'd hoped.",
        "While I appreciate the concept behind the Surgery Readiness Assessment, the execution fell short for me.",
        "I completed the Surgery Readiness Assessment but came away with mixed feelings about the experience.",
        "The Surgery Readiness Assessment has potential, but there are several areas that need improvement."
      ];

      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    // Create natural feedback phrases
    const createFeedbackSentence = (positive: string[]) => {
      const sentences = [];

      if (positive.length > 0) {
        const positiveConnectors = [
          "What I particularly appreciated was how",
          "I found it especially",
          "The assessment was notably",
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

      return sentences;
    };

    // Generate the review
    let review = '';

    if (rating > 0 || selectedPositiveFeedback.length > 0) {
      // Start with intro if we have a rating
      if (rating > 0) {
        review += getIntroPhrase(rating) + ' ';
      }

      // Add feedback sentences
      const feedbackSentences = createFeedbackSentence(selectedPositiveFeedback);
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
          "Overall, I'd definitely recommend this to anyone preparing for surgery.",
          "I'm giving this a strong recommendation for anyone in a similar situation.",
          "Would absolutely use this again and recommend it to others.",
          "This has genuinely helped me feel more prepared and confident about my upcoming procedure."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating === 3) {
        const conclusions = [
          "It's worth trying if you're looking for surgery preparation resources.",
          "A decent option among the various tools available for surgery prep.",
          "Has some valuable elements that make it worth considering.",
          "Could be helpful for some people, though results may vary."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating <= 2) {
        const conclusions = [
          "Hopefully future updates will address some of these concerns.",
          "With some improvements, this could become a much more valuable resource.",
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
      positiveFeedback: selectedPositiveFeedback
    });

    // Navigate to the upsell page
    window.location.hash = 'surgery-conditioning-protocol-challenge';
  };

  const handleSkip = () => {
    // Navigate directly to the next step without submitting feedback
    window.location.hash = 'surgery-conditioning-protocol-challenge';
  };

  const handleRegenerate = () => {
    // Clear the generated review and allow user to generate a new one
    setGeneratedReview('');
    setShowSubmitButton(false);
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0;

  return (
    <PaymentGate requiredFunnel="surgery-readiness">
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="mb-4">Did you find Surgery Readiness Assessment helpful?</h1>
            <p className="text-muted-foreground">Leave a review to help us improve.</p>
          </div>

          <div className="mb-8 text-center">
            <h3 className="mb-4">Overall Rating *</h3>
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
            {ratingError && (
              <p className="text-red-500 text-sm mt-2">Please select a star rating before generating your review</p>
            )}
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
                        onClick={() => removeSelectedFeedback(feedback)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Add your own thoughts:</label>
                  <Textarea
                    placeholder="Add any additional feedback..."
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

          {/* New button at the bottom */}
          <div className="text-center mt-8">
            <Button
              onClick={() => window.location.hash = "surgery-readiness-assessment-learn-more"}
              size="lg"
            >
              See Recommended Next Steps
            </Button>
          </div>
        </div>
      </div>
    </PaymentGate>
  );
}