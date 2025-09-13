import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function HealthConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Health Concierge. I'm here to help you navigate your health journey with personalized guidance. What brings you here today? Are you looking to improve a specific area of your health, or would you like general advice on where to start?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    // Mock responses based on common health topics
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('energy') || lowerInput.includes('tired') || lowerInput.includes('fatigue')) {
      return "Energy issues are common and can have many causes. I'd recommend starting with our Daily Energy Audit assessment to identify patterns in your fatigue and sleep quality. This will help us understand if it's related to sleep, nutrition, stress, or other factors. Would you like me to guide you through that assessment?";
    }
    
    if (lowerInput.includes('pain') || lowerInput.includes('ache') || lowerInput.includes('sore')) {
      return "Chronic pain can significantly impact quality of life. Our Symptom Severity Index can help quantify your pain patterns and identify triggers. We also have an Inflammation Risk Score that looks at lifestyle factors that might be contributing. Which would you be more interested in exploring first?";
    }
    
    if (lowerInput.includes('surgery') || lowerInput.includes('operation')) {
      return "Preparing for surgery is crucial for the best outcomes. Our Surgery Readiness Score provides a comprehensive assessment of your current health status and gives personalized recommendations to optimize your surgical outcome. We also have specific assessments for complication risks and recovery speed prediction. When is your surgery scheduled?";
    }
    
    if (lowerInput.includes('aging') || lowerInput.includes('age') || lowerInput.includes('longevity')) {
      return "Understanding your biological age versus chronological age is fascinating and actionable. Our Biological Age Calculator uses advanced biomarkers to determine how fast you're aging. We also have a Complete Longevity Bundle that includes cardiovascular health, resilience, nutrition, and fitness assessments. Are you looking to slow aging or address specific age-related concerns?";
    }
    
    if (lowerInput.includes('weight') || lowerInput.includes('diet') || lowerInput.includes('nutrition')) {
      return "Nutrition and body composition are fundamental to health optimization. Our Nutrition & Body Composition Score analyzes your current status and identifies areas for improvement. This pairs well with our metabolic health assessments. Are you looking to lose weight, gain muscle, or optimize your overall metabolic health?";
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('anxiety') || lowerInput.includes('mental')) {
      return "Mental resilience is just as important as physical health. Our Resilience Index measures your ability to adapt and recover from stress. This assessment looks at both mental and physical resilience factors and provides strategies to build your capacity to handle life's challenges. Would you like to explore your current resilience level?";
    }
    
    if (lowerInput.includes('start') || lowerInput.includes('begin') || lowerInput.includes('where')) {
      return "Great question! The best place to start depends on your current concerns and goals. For a comprehensive overview, I'd recommend either our Surgery Readiness Score (if you have an upcoming procedure) or our Complete Longevity Bundle for general health optimization. Alternatively, if you have specific symptoms, we can target those first. What's your main health priority right now?";
    }
    
    // Default response
    return "Thank you for sharing that with me. Based on what you've told me, I think we have several pathways that could really help you. Our assessments are designed to give you clear, actionable insights rather than just generic advice. Would you like me to recommend a specific assessment that matches your situation, or would you prefer to browse our options first? I'm here to guide you toward the most relevant next steps for your health journey.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl">Health Concierge</h1>
              <p className="text-sm text-muted-foreground">Your personal health guidance assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6 mb-24">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              
              <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className={`text-xs mt-2 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your health question or concern..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}