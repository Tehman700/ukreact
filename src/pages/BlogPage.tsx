import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Clock, Users } from 'lucide-react';

export function BlogPage() {
  const blogPosts = [
    {
      id: '10-surgery-ready-signs',
      title: "10 Signs You're Closer to Surgery-Ready Than You Think",
      description: "Discover the key indicators that show you're already on the path to optimal surgery preparation.",
      readTime: '6 min read',
      category: 'Surgery Prep',
      excerpt: 'From your sit-to-stand count to your morning routine, these overlooked signs reveal your true readiness level.',
      featured: true
    },
    {
      id: 'symptom-severity-guide',
      title: 'The Hidden Cost of Ignoring Daily Symptoms',
      description: 'Why tracking symptom severity is crucial for preventing long-term health decline.',
      readTime: '9 min read',
      category: 'Chronic Symptoms',
      excerpt: 'Most people dismiss daily aches and fatigue as "normal aging" - but these symptoms are warning signs.',
      featured: true
    },
    {
      id: 'inflammation-trigger-guide',
      title: 'The Inflammation Time Bomb: 12 Hidden Triggers in Your Home',
      description: 'Everyday items and habits that silently fuel chronic inflammation and accelerate aging.',
      readTime: '11 min read',
      category: 'Inflammation',
      excerpt: 'From your morning coffee routine to bedroom temperature, these overlooked factors drive inflammation.',
      featured: true
    },
    {
      id: 'red-flags-surgery',
      title: "7 Red Flags to Sort Before Surgery (So Recovery Isn't Derailed)",
      description: 'Critical warning signs that must be addressed before any surgical procedure.',
      readTime: '5 min read',
      category: 'Safety',
      excerpt: 'Identify and resolve these serious health concerns that could compromise your surgery and recovery.'
    },
    {
      id: 'medication-safety-guide',
      title: 'Polypharmacy Dangers: When Your Medication List Becomes a Health Risk',
      description: 'How multiple prescriptions interact to create unexpected side effects and health complications.',
      readTime: '8 min read',
      category: 'Medication Safety',
      excerpt: 'Even common medications can become dangerous when combined - learn the warning signs.'
    },
    {
      id: 'energy-optimization-guide',
      title: 'Why You\'re Always Tired (And It\'s Not What You Think)',
      description: 'The hidden energy drains that leave high-achievers feeling exhausted despite "healthy" lifestyles.',
      readTime: '10 min read',
      category: 'Energy Management',
      excerpt: 'Discover the surprising factors that rob your energy and simple fixes that restore vitality.'
    },
    {
      id: 'lifestyle-impact-guide',
      title: 'The Real Cost of "Just Getting Older": When Lifestyle Limits Take Over',
      description: 'How to measure the true impact of health decline on your work, relationships, and life satisfaction.',
      readTime: '7 min read',
      category: 'Lifestyle Impact',
      excerpt: 'Stop normalizing limitations - learn to quantify and reverse the real costs of declining health.'
    },
    {
      id: 'home-tweaks-recovery',
      title: '8 Home Tweaks That Prevent Falls and Speed Recovery',
      description: 'Simple modifications that transform your home into a recovery-optimized environment.',
      readTime: '7 min read',
      category: 'Recovery',
      excerpt: 'Practical changes you can make today to ensure a safer, faster healing process at home.'
    },
    {
      id: 'morning-stiffness-solutions',
      title: '13 Ways to Tame Morning Stiffness in Under 10 Minutes',
      description: 'Quick, effective strategies to start your day with better mobility and less pain.',
      readTime: '8 min read',
      category: 'Mobility',
      excerpt: 'Evidence-based techniques that reduce morning stiffness and improve your daily movement quality.'
    },
    {
      id: 'complication-risk-factors',
      title: '7 Hidden Risk Factors That Could Complicate Your Surgery',
      description: 'Most surgical complications are preventable when you know what to look for beforehand.',
      readTime: '6 min read',
      category: 'Risk Assessment',
      excerpt: 'Hidden risks that even experienced surgeons might miss during routine consultations.'
    },
    {
      id: 'recovery-speed-secrets',
      title: '5 Surprising Factors That Determine How Fast You\'ll Recover',
      description: 'The fastest recoveries come from optimizing these often-overlooked factors.',
      readTime: '7 min read',
      category: 'Recovery',
      excerpt: 'While most patients focus on the surgery itself, these factors determine your healing speed.'
    },
    {
      id: 'anaesthesia-risks',
      title: '6 Anaesthesia Risks Your Doctor May Not Tell You About',
      description: 'Most anaesthetic complications are preventable when risk factors are identified early.',
      readTime: '5 min read',
      category: 'Safety',
      excerpt: 'Hidden risks that could affect your surgery safety and recovery outcomes.'
    },
    {
      id: 'mobility-baseline',
      title: 'Why Your Pre-Surgery Mobility Score Predicts Recovery Success',
      description: 'Your pre-operative mobility baseline is the strongest predictor of recovery outcomes.',
      readTime: '8 min read',
      category: 'Assessment',
      excerpt: 'Research shows your pre-surgery mobility levels determine almost everything about recovery.'
    }
  ];

  const handleReadPost = (postId: string) => {
    window.location.hash = `blog/${postId}`;
  };

  const handleTakeAssessment = () => {
    window.location.hash = 'assessments';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Luther Health Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
              Evidence-Based Insights for Optimal Health & Performance
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guidance on surgery preparation, chronic symptom management, and performance optimization from our team of healthcare specialists.
            </p>
          </div>
        </div>

        {/* Featured CTA */}
      

        {/* Featured Posts */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-primary/20">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="default" className="text-xs">{post.category}</Badge>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-base sm:text-lg">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReadPost(post.id)}
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full"
                    size="sm"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">All Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-base sm:text-lg">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    {post.excerpt}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReadPost(post.id)}
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}