import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Shield, Mail, Database, Lock } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    <div className="mb-8 text-center">
          <h1 className="mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground max-w-3xl mx-auto">
            At Luther Health, your privacy is our priority. This policy outlines how we collect, use, share, and protect your personal information, whether you interact with us online or offline. Our practices comply with GDPR, HIPAA, and other relevant regulations.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-primary" />
                <h2>Information We Collect</h2>
              </div>
              <div className="space-y-3">
                <p><strong>Contact Information:</strong> Name, address, phone number, and email address.</p>
                <p><strong>Medical Information:</strong> Details necessary for treatment, including medical history.</p>
                <p><strong>Billing Information:</strong> Payment details required for transaction processing.</p>
                <p><strong>Website Usage Data:</strong> Visitor tracking data (via cookies and analytics) to improve website experience.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h2>How We Use Your Information</h2>
              </div>
              <div className="space-y-3">
                <p><strong>Appointments and Scheduling:</strong> To facilitate your appointments with our practice.</p>
                <p><strong>Treatment Tracking:</strong> To document and manage treatment progress and care plans.</p>
                <p><strong>Tailored Health Advice:</strong> To offer customized health advice based on your medical history.</p>
                <p><strong>Payment Processing:</strong> For billing and payment processing, in collaboration with payment processors.</p>
                <p><strong>Analytics and Website Improvement:</strong> To understand and improve user interactions on our website.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Information Sharing and Disclosure</h2>
              <div className="space-y-3">
                <p><strong>Payment Processors:</strong> To process payments securely.</p>
                <p><strong>Third-Party CRM:</strong> To manage client relationships and records.</p>
                <p><strong>Your GP (General Practitioner):</strong> To ensure continuity of care, with your consent.</p>
                <p><strong>Legal Obligations:</strong> We may disclose information to comply with legal and regulatory requirements.</p>
                <p className="text-primary font-medium">We do not sell any personal data.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Cookie Policy and Tracking</h2>
              <p>We use cookies to improve user experience and gather analytics data. You can manage your cookie preferences on our site. For more information on cookie usage, please refer to our Cookie Policy.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Data Retention</h2>
              <p>We retain medical records for a minimum of 10 years following a patient's death, as recommended by the British Medical Association.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Your Rights</h2>
              <p className="mb-4">Under GDPR, you have the following rights:</p>
              <div className="space-y-3">
                <p><strong>Access to Your Data:</strong> You may request a copy of your personal information by emailing admin@luther.health.</p>
                <p><strong>Rectification:</strong> You can request corrections if your data is inaccurate.</p>
                <p><strong>Deletion:</strong> In certain circumstances, you may request the deletion of your data.</p>
                <p><strong>Restriction of Processing:</strong> You may limit how we use your information in some cases.</p>
                <p>All requests should be directed to admin@luther.health.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h2>Data Security</h2>
              </div>
              <p>We employ the highest security standards to protect personal data, including encryption, secure servers, and access controls. Our practices meet GDPR and HIPAA compliance requirements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">International Data Transfers</h2>
              <p>We do not transfer or process data outside the UK.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-primary" />
                <h2>Contact Information</h2>
              </div>
              <p>For any questions or concerns about this Privacy Policy or your data, please contact us at:</p>
              <p className="mt-2"><strong>Email:</strong> admin@luther.health</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Policy Updates</h2>
              <p>We may update this policy periodically. Any changes will be posted on our website, and we encourage you to review it regularly.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}