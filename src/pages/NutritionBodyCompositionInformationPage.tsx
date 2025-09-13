import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { ArrowRight } from 'lucide-react';

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
}

export function NutritionBodyCompositionInformationPage() {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Store user information for the assessment
    sessionStorage.setItem('nutritionBodyCompositionUserInfo', JSON.stringify(userInfo));
    
    // Navigate to database processing
    window.location.hash = 'database-processing';
  };



  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-2xl">


        {/* Information Form */}
        <div>
          <div className="mb-6">
            <h2 className="font-bold">Personal Information</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
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

              {/* Contact Information */}
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

              {/* Demographics */}
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

              {/* Action Buttons */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting} className="mx-auto my-[0px] px-[60px] py-[7px]"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>


          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-8">
          <div className="text-center mb-4">
            <h3 className="pt-[20px] pr-[0px] pb-[0px] pl-[0px] font-bold">Privacy & Confidentiality</h3>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              We take your privacy seriously. All information you provide is kept strictly confidential and handled in accordance with established nutrition and health data protection standards, including the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and where relevant, professional nutrition and dietetics ethics codes. If you are based internationally, we also follow applicable frameworks such as the EU GDPR and HIPAA (Health Insurance Portability and Accountability Act). Your details will never be shared with third parties without your consent, and are stored securely to protect your confidentiality at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}