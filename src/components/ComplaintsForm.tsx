import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Mail, Phone, User, Calendar, AlertCircle } from 'lucide-react';

export function ComplaintsForm() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    
    // Complaint Details
    complaintType: '',
    dateOfIncident: '',
    serviceAffected: '',
    complaintDescription: '',
    previouslyReported: false,
    previousReportDetails: '',
    
    // Desired Outcome
    desiredOutcome: '',
    
    // Consent
    dataProcessingConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.complaintDescription) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!formData.dataProcessingConsent) {
      toast.error('Please consent to data processing to submit your complaint');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Complaint submitted successfully. You will receive a confirmation email within 2 working days.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        complaintType: '',
        dateOfIncident: '',
        serviceAffected: '',
        complaintDescription: '',
        previouslyReported: false,
        previousReportDetails: '',
        desiredOutcome: '',
        dataProcessingConsent: false,
      });
      
    } catch (error) {
      toast.error('Failed to submit complaint. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-primary" />
          Submit a Complaint
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Please complete this form to submit your complaint. All fields marked with * are required. 
          We will acknowledge your complaint within 2 working days.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Preferred Contact Method</Label>
              <RadioGroup
                value={formData.preferredContact}
                onValueChange={(value) => handleInputChange('preferredContact', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Complaint Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complaintType">Type of Complaint</Label>
                <Select value={formData.complaintType} onValueChange={(value) => handleInputChange('complaintType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service-quality">Service Quality</SelectItem>
                    <SelectItem value="communication">Communication Issues</SelectItem>
                    <SelectItem value="appointment">Appointment Related</SelectItem>
                    <SelectItem value="billing">Billing/Payment</SelectItem>
                    <SelectItem value="staff-conduct">Staff Conduct</SelectItem>
                    <SelectItem value="data-privacy">Data Privacy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfIncident">Date of Incident</Label>
                <Input
                  id="dateOfIncident"
                  type="date"
                  value={formData.dateOfIncident}
                  onChange={(e) => handleInputChange('dateOfIncident', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceAffected">Service/Protocol Affected</Label>
              <Select value={formData.serviceAffected} onValueChange={(value) => handleInputChange('serviceAffected', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select affected service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="symptom-control">Symptom Control Protocol</SelectItem>
                  <SelectItem value="surgery-conditioning">Surgery Conditioning Protocol</SelectItem>
                  <SelectItem value="longevity-focus">Longevity Focus Protocol</SelectItem>
                  <SelectItem value="surgery-readiness">Surgery Readiness Score</SelectItem>
                  <SelectItem value="biological-age">Practical Biological Age Proxy</SelectItem>
                  <SelectItem value="healthspan">Healthspan Potential Index</SelectItem>
                  <SelectItem value="safety-gate">Red-Flag Safety Gate</SelectItem>
                  <SelectItem value="general">General Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complaintDescription">Complaint Description *</Label>
              <Textarea
                id="complaintDescription"
                placeholder="Please provide a detailed description of your complaint, including what happened, when it occurred, and how it has affected you..."
                value={formData.complaintDescription}
                onChange={(e) => handleInputChange('complaintDescription', e.target.value)}
                className="min-h-32"
                required
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="previouslyReported"
                  checked={formData.previouslyReported}
                  onCheckedChange={(checked) => handleInputChange('previouslyReported', !!checked)}
                />
                <Label htmlFor="previouslyReported">This issue has been previously reported</Label>
              </div>
              
              {formData.previouslyReported && (
                <div className="space-y-2">
                  <Label htmlFor="previousReportDetails">Previous Report Details</Label>
                  <Textarea
                    id="previousReportDetails"
                    placeholder="Please provide details about when and how this was previously reported..."
                    value={formData.previousReportDetails}
                    onChange={(e) => handleInputChange('previousReportDetails', e.target.value)}
                    className="min-h-24"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Desired Outcome */}
          <div className="space-y-4">
            <h3>Desired Outcome</h3>
            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">What would you like us to do to resolve this complaint?</Label>
              <Textarea
                id="desiredOutcome"
                placeholder="Please describe what outcome you would like from this complaint..."
                value={formData.desiredOutcome}
                onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          {/* Consent */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="dataProcessingConsent"
                checked={formData.dataProcessingConsent}
                onCheckedChange={(checked) => handleInputChange('dataProcessingConsent', !!checked)}
                className="mt-0.5"
              />
              <Label htmlFor="dataProcessingConsent" className="text-sm">
                I consent to Luther Health processing my personal data for the purpose of investigating and responding to this complaint. 
                I understand that my data will be handled in accordance with our Privacy Policy and may be shared with relevant staff members 
                and external bodies (such as ISCAS) as necessary to resolve this complaint. *
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}