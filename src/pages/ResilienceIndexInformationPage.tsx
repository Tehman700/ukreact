import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate';

const AUTHORITY_STATEMENTS = [
  "Checking NICE guidelines",
  "Reviewing NHS clinical pathways",
  "Consulting Royal College recommendations",
  "Cross-checking Cochrane systematic reviews",
  "Consulting British Medical Association statements",
  "Reviewing Royal College of Surgeons protocols",
  "Reviewing British Cardiovascular Society updates",
  "Cross-checking Orthopaedic Society recommendations",
  "Reviewing Royal College of Anaesthetists best practices",
  "Verifying surgical safety checklists",
  "Reviewing patient-reported outcome measures",
  "Cross-checking long-term follow-up data",
  "Running data quality assurance checks",
  "Consulting national audit datasets",
  "Reviewing clinical trial registries",
  "Running population health analytics"
];

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
}

export function ResilienceIndexInformationPage() {
    const [userInfo, setUserInfo] = useState<UserInformation>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [reportReady, setReportReady] = useState(false);

  const handleInputChange = (field: keyof UserInformation, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return userInfo.firstName.trim() !== '' &&
           userInfo.lastName.trim() !== '' &&
           userInfo.email.trim() !== '' &&
           userInfo.age !== '';
  };

  // Progress animation effect - MUCH SLOWER
  useEffect(() => {
    if (!isSubmitting) {
      setProgress(0);
      setCurrentStatementIndex(0);
      return;
    }

    // Significantly slower progress steps - about 30-40 seconds total
    const progressSteps = [
      { progress: 5, delay: 1500, statement: 0 },
      { progress: 10, delay: 2000, statement: 1 },
      { progress: 18, delay: 2500, statement: 2 },
      { progress: 25, delay: 2000, statement: 3 },
      { progress: 32, delay: 2500, statement: 4 },
      { progress: 40, delay: 2000, statement: 5 },
      { progress: 48, delay: 2500, statement: 6 },
      { progress: 55, delay: 2000, statement: 7 },
      { progress: 63, delay: 2500, statement: 8 },
      { progress: 70, delay: 2000, statement: 9 },
      { progress: 78, delay: 2500, statement: 10 },
      { progress: 85, delay: 2000, statement: 11 },
      { progress: 92, delay: 2500, statement: 12 },
      // Only go to 95% via animation, wait for report to finish
      { progress: 95, delay: 2000, statement: 13 }
    ];

    let cumulativeDelay = 0;
    const timeouts: NodeJS.Timeout[] = [];

    progressSteps.forEach((step, index) => {
      if (index === 0) {
        cumulativeDelay = step.delay;
      } else {
        cumulativeDelay += step.delay;
      }

      const timeout = setTimeout(() => {
        setProgress(step.progress);
        setCurrentStatementIndex(step.statement);
      }, cumulativeDelay);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isSubmitting]);

  // When report is ready, complete the progress bar
  useEffect(() => {
    if (reportReady && progress >= 95) {
      const timeout = setTimeout(() => {
        setProgress(100);
        setCurrentStatementIndex(AUTHORITY_STATEMENTS.length - 1);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [reportReady, progress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setReportReady(false);

    try {
      // Save user
      const response = await fetch("https://luther.health/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          age_range: userInfo.age,
        }),
      });

      const savedUser = await response.json();
      sessionStorage.setItem("currentUser", JSON.stringify(savedUser));

      // Get stored answers
      const pendingAnswers = JSON.parse(sessionStorage.getItem("pendingAnswers") || "[]");

      // Generate AI report
      const reportResponse = await fetch("https://luther.health/api/generate-assessment-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentType: "Resilience Index",
          answers: pendingAnswers,
          userInfo: savedUser,
        }),
      });

      const reportData = await reportResponse.json();
      sessionStorage.setItem("assessmentReport", JSON.stringify(reportData.report));
      sessionStorage.setItem("reportId", reportData.reportId.toString());
      sessionStorage.setItem("assessmentType", "Resilience Index");

      await fetch("https://luther.health/api/send-email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: savedUser.email,
          userName: `${savedUser.first_name} ${savedUser.last_name}`,
          assessmentType: "Resilience Index",
          report: reportData.report,
          reportId: reportData.reportId,
        }),
      });

      // Mark report as ready
      setReportReady(true);

      // Wait for progress animation to complete, then redirect
      setTimeout(() => {
        window.location.hash = "resilience-index-results";
      }, 1500);

    } catch (err) {
      console.error("Error saving user info and generating report:", err);
      setIsSubmitting(false);
    }
  };

  // Calculate the stroke dash array for the progress circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <PaymentGate requiredFunnel="res">
      <div className="min-h-screen bg-background py-16 relative">
        {/* Full-page loading overlay with LoadingPage UI */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background flex flex-col items-center justify-center px-6 py-8 z-50"
            >
              <div className="w-full max-w-md mx-auto text-center space-y-8">

                {/* Progress Circle */}
                <div className="relative flex items-center justify-center">
                  <svg
                    className="transform -rotate-90 w-36 h-36"
                    width="144"
                    height="144"
                    viewBox="0 0 144 144"
                  >
                    {/* Background circle */}
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="72"
                      cy="72"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="text-foreground"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    />
                  </svg>

                  {/* Progress percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg transition-all duration-300 ease-out">
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Please Wait Message */}
                <div className="space-y-2 mt-[0px] mr-[0px] mb-[55px] ml-[0px]">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="tracking-wide"
                  >
                    Please wait...
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground"
                  >
                    Crafting your personalised report
                  </motion.p>
                </div>

                {/* Authority Statements Carousel */}
                <div className="relative h-24 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <div className="space-y-0.5 text-center text-sm">
                      {/* Previous statements (faded) */}
                      {currentStatementIndex > 0 && (
                        <motion.div
                          key={`prev-${currentStatementIndex - 1}`}
                          initial={{ opacity: 0.3, y: -10 }}
                          animate={{ opacity: 0.2, y: -20 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.3 }}
                          className="text-muted-foreground/60"
                        >
                          {AUTHORITY_STATEMENTS[currentStatementIndex - 1]}
                          <span className="ml-2 text-green-600">✓</span>
                        </motion.div>
                      )}

                      {/* Current active statement */}
                      <motion.div
                        key={`current-${currentStatementIndex}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }}
                        exit={{
                          opacity: 0.3,
                          y: -20,
                          scale: 0.95,
                          transition: { duration: 0.3 }
                        }}
                        className="text-foreground py-2"
                      >
                        {AUTHORITY_STATEMENTS[currentStatementIndex]}
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="ml-2 text-green-600"
                        >
                          ✓
                        </motion.span>
                      </motion.div>

                      {/* Next statements (preview, highly faded) */}
                      {currentStatementIndex < AUTHORITY_STATEMENTS.length - 1 && (
                        <motion.div
                          key={`next-${currentStatementIndex + 1}`}
                          initial={{ opacity: 0.1, y: 30 }}
                          animate={{ opacity: 0.15, y: 20 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="text-muted-foreground/40"
                        >
                          {AUTHORITY_STATEMENTS[currentStatementIndex + 1]}
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 max-w-2xl">
          <div>
            <div className="mb-6">
              <h2 className="font-bold">Personal Information</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={userInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={userInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age Range *</Label>
                <Select value={userInfo.age} onValueChange={(value) => handleInputChange('age', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-35">26-35</SelectItem>
                    <SelectItem value="36-45">36-45</SelectItem>
                    <SelectItem value="46-55">46-55</SelectItem>
                    <SelectItem value="56-65">56-65</SelectItem>
                    <SelectItem value="66-75">66-75</SelectItem>
                    <SelectItem value="76+">76+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="mx-auto my-[0px] px-[60px] py-[7px]"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8">
            <div className="text-center mb-4">
              <h3 className="pt-[20px] font-bold">Privacy & Confidentiality</h3>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                We take your privacy seriously. All information you provide is kept strictly confidential and handled in accordance with established data protection standards (GDPR, HIPAA, NHS DSP Toolkit, etc.). Your details will never be shared without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PaymentGate>
  );
}