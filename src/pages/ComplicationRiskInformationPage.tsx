import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowRight } from 'lucide-react';
import { PaymentGate } from "../components/PaymentGate";


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
      const response = await fetch("https://luther.health/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          age_range: userInfo.age
        }),
      });

      const savedUser = await response.json();
      sessionStorage.setItem("currentUser", JSON.stringify(savedUser));

      window.location.hash = "complication-risk-checker";
    } catch (err) {
      console.error("Error saving complication risk user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
          <PaymentGate
      requiredFunnel="complication-risk"
      redirectUrl="/Health-Audit.html#complication-risk-checkout"
    >
    <div className="min-h-screen bg-background py-16">
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
                {isSubmitting ? 'Processing...' : <>Next <ArrowRight className="w-4 h-4 ml-2" /></>}
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
