import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X } from 'lucide-react';

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

const NEGATIVE_FEEDBACK_OPTIONS = [
  "Brief",
  "Repetitive",
  "Inaccurate",
  "Generic",
  "Incomplete",
  "Rushed",
  "Unclear",
  "Shallow",
  "Confusing"
];

export function ReviewPage() {
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
    const allSelectedFeedback = [...selectedPositiveFeedback, ...selectedNegativeFeedback];
    const reviewParts = [];

    if (rating > 0) {
      reviewParts.push(`I'd rate this ${rating} out of 5 stars.`);
    }

    if (allSelectedFeedback.length > 0) {
      reviewParts.push(...allSelectedFeedback);
    }

    if (customText.trim()) {
      reviewParts.push(customText.trim());
    }

    // Create a more natural review by combining the feedback
    let review = '';
    if (reviewParts.length > 0) {
      if (rating >= 4) {
        review = `I found the Surgery Readiness Assessment really helpful. ${reviewParts.slice(1).join(' ')}`;
      } else if (rating === 3) {
        review = `The Surgery Readiness Assessment was decent overall. ${reviewParts.slice(1).join(' ')}`;
      } else if (rating <= 2) {
        review = `I tried the Surgery Readiness Assessment and had mixed feelings. ${reviewParts.slice(1).join(' ')}`;
      } else {
        review = reviewParts.join(' ');
      }
    }

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
    
    // Navigate to the upsell page
    window.location.hash = 'surgery-readiness-upsell';
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0 || selectedNegativeFeedback.length > 0;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="mb-4">Did you find Surgery Readiness Score helpful?</h1>
          <p className="text-muted-foreground">Leave a public review to help us improve.</p>
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Selected Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  placeholder="Add any additional feedback..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={3}
                />
              </div>

              {!generatedReview && (
                <Button onClick={generateReview} className="w-full">
                  Generate Review
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {generatedReview && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedReview}
                onChange={(e) => setGeneratedReview(e.target.value)}
                rows={4}
                className="mb-4"
              />
              {showSubmitButton && (
                <Button onClick={handleSubmitReview} className="w-full" size="lg">
                  Submit Review
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {!hasSelectedFeedback && rating === 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.hash = 'surgery-readiness-upsell'}
            >
              Skip Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}