import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ComplaintsForm } from '../components/ComplaintsForm';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

export function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4">Complaints Procedure</h1>
          <p className="text-muted-foreground">
            Luther Medical Ltd, trading as Luther Health, is dedicated to delivering the highest standards of care and customer service to all Patients. In the event that our service falls short of expectations, we are committed to attentively addressing and resolving complaints promptly. We acknowledge any mistakes made and take corrective actions to enhance our service. The complete complaints policy is provided to Patients, their affected relatives, or representatives when concerns are initially raised regarding any aspect of the service received.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-4">Our complaints process consists of three stages:</h2>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default" className="text-sm">Stage 1</Badge>
                <h2>Local Resolution</h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Complaints can be raised verbally or in writing to Luther Health, preferably as soon as possible or within 6 months of the event or the complainant's awareness of the matter. Complaints can be emailed to admin@luther.health.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Acknowledgment of a written complaint will be sent to the complainant's provided postal address (or via email) within 2 working days.</p>
                  </div>
                  
                  <p>A thorough investigation, including detailed case review and statements from relevant staff, will be initiated. The response to the complainant, whether the complaint was made verbally, in writing, via text, or email, will be direct.</p>
                  
                  <p>A comprehensive response to the complaint will generally be provided within 20 working days. If the investigation is ongoing, updates will be sent to the complainant every 20 working days. The goal is to complete stage 1 within three months.</p>
                  
                  <p>If dissatisfied with the stage 1 response, the complainant may escalate to Stage 2 in writing within 6 months of the final response at Stage 1.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">Stage 2</Badge>
                <h2>Complaint Review</h2>
              </div>
              <div className="space-y-4">
                <p>An acknowledgment of the escalated complaint will be sent within 3 working days.</p>
                
                <p>An objective review, typically led by a senior staff member not involved in stage 1, will be conducted. This involves a thorough examination of documentation and may include interviews with relevant staff.</p>
                
                <p>A review of the investigation and the response at stage 1 will be provided.</p>
                
                <p>The staff or team from stage 1 may be invited to make a further response for potential resolution.</p>
                
                <p>Consideration will be given to a face-to-face meeting or teleconference between the complainant and those involved in the stage 1 response.</p>
                
                <p>A full response on the outcome of the review will be provided within 20 working days. Updates on ongoing investigations will be sent every 20 working days. The aim is to complete the review at stage 2 within three months.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">Stage 3</Badge>
                <h2>Independent External Adjudication</h2>
              </div>
              <div className="space-y-4">
                <p>Complainants have the right to an independent external adjudication at Stage 3. Requests should be made in writing to The Independent Sector Complaints Adjudication Service (ISCAS) within 6 months of receiving the Stage 2 decision letter. Complainants must have gone through Stages 1 and 2 before accessing Stage 3. ISCAS will direct complainants back to the Provider where appropriate. Complainants need to sign a 'Statement of Understanding and Consent' for Stage 3 access.</p>
                
                <div className="mt-6">
                  <h3 className="mb-4">To contact ISCAS:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>ISCAS, 70 Fleet Street, London, EC4Y 1EU</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>info@iscas.org.uk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>020 7536 6091</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h2 className="mb-4">Contact Us for Complaints</h2>
              <p className="mb-4">If you wish to make a complaint, please contact us using the details below:</p>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span><strong>Email:</strong> admin@luther.health</span>
              </div>
            </CardContent>
          </Card>

          {/* Complaints Form */}
          <div className="mt-8">
            <ComplaintsForm />
          </div>
        </div>
      </div>
    </div>
  );
}