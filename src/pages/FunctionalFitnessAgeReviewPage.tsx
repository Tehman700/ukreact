import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw } from 'lucide-react';
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
  "Movement-focused",
  "Fitness-focused",
  "Detailed",
  "Personalized"
];

export function FunctionalFitnessAgeReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedPositiveFeedback, setSelectedPositiveFeedback] = useState<string[]>([]);
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

  const removeSelectedFeedback = (feedback: string) => {
    setSelectedPositiveFeedback(prev => prev.filter(item => item !== feedback));
  };

  const generateReview = () => {
    if (rating === 0) {
      alert("Please provide a star rating before generating your review.");
      return;
    }

    // Intro phrases
    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Functional Fitness Age Test and was genuinely impressed with the comprehensive movement analysis.",
        "Just finished going through the Functional Fitness Age Test - what a thorough and insightful physical capability evaluation.",
        "I have to say, the Functional Fitness Age Test exceeded my expectations for fitness assessment.",
        "As someone focused on maintaining physical capability as I age, I found the Functional Fitness Age Test to be incredibly valuable."
      ];
      const midRatingIntros = [
        "I completed the Functional Fitness Age Test and found it to be a solid fitness assessment tool overall.",
        "The Functional Fitness Age Test provided some useful movement insights, though there's room for improvement.",
        "I went through the Functional Fitness Age Test and had a generally positive experience with the fitness analysis.",
        "The Functional Fitness Age Test was helpful for understanding physical capabilities, with mixed results in some areas."
      ];
      const lowRatingIntros = [
        "I tried the Functional Fitness Age Test but unfortunately didn't find it as comprehensive as I'd hoped.",
        "While I appreciate the concept behind the Functional Fitness Age Test, the execution fell short for me.",
        "I completed the Functional Fitness Age Test but came away with mixed feelings about the fitness assessment.",
        "The Functional Fitness Age Test has potential, but there are several areas that need improvement."
      ];
      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    // Feedback sentence
    const createFeedbackSentence = (positive: string[]) => {
      if (positive.length === 0) return [];
      const positiveConnectors = [
        "What I particularly appreciated was how",
        "I found the assessment especially",
        "The fitness analysis was notably",
        "One thing that stood out was how"
      ];
      const connector = positiveConnectors[Math.floor(Math.random() * positiveConnectors.length)];
      const traits = positive.slice(0, 3);

      if (traits.length === 1) {
        return [`${connector} ${traits[0].toLowerCase()} it felt throughout the process.`];
      } else if (traits.length === 2) {
        return [`${connector} ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()} the entire experience was.`];
      } else {
        return [`${connector} ${traits.slice(0, -1).map(t => t.toLowerCase()).join(', ')}, and ${traits[traits.length - 1].toLowerCase()} it felt.`];
      }
    };

    // Build review
    let review = '';
    review += getIntroPhrase(rating) + ' ';
    const feedbackSentences = createFeedbackSentence(selectedPositiveFeedback);
    if (feedbackSentences.length > 0) {
      review += feedbackSentences.join(' ') + ' ';
    }
    if (customText.trim()) {
      review += customText.trim() + ' ';
    }

    // Conclusion
    if (rating >= 4) {
      const conclusions = [
        "Overall, I'd definitely recommend this to anyone looking to understand their functional fitness age.",
        "I'm giving this a strong recommendation for anyone interested in assessing their movement capabilities.",
        "Would absolutely use this again and recommend it to others focused on healthy aging.",
        "This has genuinely helped me understand my physical capabilities and optimization strategies."
      ];
      review += conclusions[Math.floor(Math.random() * conclusions.length)];
    } else if (rating === 3) {
      const conclusions = [
        "It's worth trying if you're looking for functional fitness assessment tools.",
        "A decent option among the various movement analysis platforms available.",
        "Has some valuable elements that make it worth considering for fitness evaluation.",
        "Could be helpful for some people, though results may vary."
      ];
      review += conclusions[Math.floor(Math.random() * conclusions.length)];
    } else if (rating <= 2) {
      const conclusions = [
        "Hopefully future updates will address some of these concerns.",
        "With some improvements, this could become a much more valuable fitness resource.",
        "There's definitely potential here, but it needs more development.",
        "Others might have a different experience, but this didn't quite work for me."
      ];
      review += conclusions[Math.floor(Math.random() * conclusions.length)];
    }

    review += ` ${rating}/5 stars.`;
    review = review.replace(/\s+/g, ' ').trim();

    setGeneratedReview(review);
    setShowSubmitButton(true);
  };

  const handleSubmitReview = () => {
    console.log('Submitting review:', {
      rating,
      review: generatedReview,
      positiveFeedback: selectedPositiveFeedback
    });
    window.location.hash = 'longevity-focus-protocol-challenge';
  };

  const handleRegenerate = () => {
    setGeneratedReview('');
    setShowSubmitButton(false);
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0;

  return (
    <PaymentGate requiredFunnel="functional">
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="mb-4">Did you find Functional Fitness Age Test helpful?</h1>
            <p className="text-muted-foreground">Leave a review to help us improve.</p>
          </div>

          {/* Rating */}
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

          {/* Positive Feedback */}
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

          {/* Selected Feedback + Custom */}
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
                    placeholder="Add any additional feedback about the functional fitness age test..."
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

          {/* Generated Review */}
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
        </div>
      </div>
    </PaymentGate>
  );
}
