import React from 'react';
import { Card, CardContent } from '../components/ui/card';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            By continuing to browse and use this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Luther Medical Ltd's relationship with you, trading as Luther Health, in relation to this website. If you refuse to be bound by any part of these terms and conditions, please do not use our website.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="mb-6">
              The terms Luther Medical Ltd's, Luther Health, us and we refer to the owner of the website whose registered office is 10 Prospect Place, Welwyn, Hertfordshire, England, AL6 9EW. Our company registration number is 16008962, registered in England and Wales. The term "you" refers to the user or viewer of our website. The use of this website is subject to the following terms of use:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3">1. General Information and Use</h3>
                <p>The content of the pages of this website are for your general information and use only. This is subject to change without notice.</p>
              </div>

              <div>
                <h3 className="mb-3">2. No Warranties</h3>
                <p>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
              </div>

              <div>
                <h3 className="mb-3">3. Use at Your Own Risk</h3>
                <p>Your use of any information or materials on this website is entirely at your own risk. It is your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</p>
              </div>

              <div>
                <h3 className="mb-3">4. Copyright and Intellectual Property</h3>
                <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>
              </div>

              <div>
                <h3 className="mb-3">5. Trademarks</h3>
                <p>All trademarks reproduced on this website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>
              </div>

              <div>
                <h3 className="mb-3">6. Unauthorized Use and External Links</h3>
                <p>Unauthorised use of this website may give rise to a claim for damages and may also be a criminal offence. From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</p>
              </div>

              <div>
                <h3 className="mb-3">7. Governing Law</h3>
                <p>Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Northern Ireland, Scotland and Wales.</p>
              </div>

              <div>
                <h3 className="mb-3">8. Service Guarantees</h3>
                <p>Any guarantee offered in connection with our services, whether in official promotions, sales materials, or written communications, shall remain binding provided the patient/client reasonably adheres to all components of the treatment plan as outlined and agreed upon during the initial consultation. Luther Health will provide clear, easy-to-follow treatment plans with ample support. The definition of symptom improvement will be determined by a series of user-reported values, as part of our detailed ongoing data collection throughout the treatment plan, with data being collected at regular intervals (e.g multiple times a day). If the patient/client fails to adhere to the treatment plan without reasonable cause, such as unexpected illness or other unforeseen circumstances beyond the patient's control, the guarantee may be considered void at the discretion of Luther Health. This guarantee applies only as long as the patient/client follows the plan in good faith, and any modifications to this agreement must be made in writing.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}