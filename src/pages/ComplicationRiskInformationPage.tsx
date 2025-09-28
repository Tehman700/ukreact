import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowRight } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
}

export function ComplicationRiskInformationPage() {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof UserInformation, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      userInfo.firstName.trim() !== '' &&
      userInfo.lastName.trim() !== '' &&
      userInfo.email.trim() !== '' &&
      userInfo.age !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
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
          assessmentType: "Complication Risk",
          answers: pendingAnswers,
          userInfo: savedUser,
        }),
      });

      const reportData = await reportResponse.json();
      sessionStorage.setItem("assessmentReport", JSON.stringify(reportData.report));
      sessionStorage.setItem("reportId", reportData.reportId.toString());
      sessionStorage.setItem("assessmentType", "Complication Risk"); // Add this line

      // Send email automatically
// WITH THIS:
// Send email automatically
        await fetch("https://luther.health/api/send-email-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: savedUser.email,
            userName: `${savedUser.first_name} ${savedUser.last_name}`,
            assessmentType: "Complication Risk",
            report: reportData.report, // Pass the full report object
            reportId: reportData.reportId,
          }),
        });

      // Redirect to results page
      window.location.hash = "complication-risk-checker-results";
    } catch (err) {
      console.error("Error saving user info and generating report:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
                       <PaymentGate requiredFunnel="complication-risk">

    <div className="min-h-screen bg-background py-16 relative">
      {/* Full-page loading indicator */}
      {isSubmitting && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '300px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px',
              }}
            />
            <h3 style={{ margin: '0 0 10px 0' }}>Generating Your Report</h3>
            <p style={{ margin: 0, color: '#666' }}>We are analyzing your Symptoms...</p>
          </div>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

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
