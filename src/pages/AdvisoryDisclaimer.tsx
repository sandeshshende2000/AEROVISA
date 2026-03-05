import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const AdvisoryDisclaimer = () => {
  return (
    <LegalPageLayout title="Advisory Disclaimer">
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Coordination Platform Status</h2>
        <p>
          AeroVisa Global is an advisory and coordination platform. We are not an air carrier, aircraft operator, or immigration law firm. 
          Our role is to facilitate connections between high-net-worth clients and professional service providers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">2. Aviation Services</h2>
        <p>
          All private jet charter flights are operated by licensed Part 135 (or international equivalent) air carriers. 
          AeroVisa Global does not own, maintain, or operate any aircraft. Charter agreements, invoices, and operational 
          responsibilities lie solely with the licensed operator or broker providing the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">3. Immigration and Residency Advisory</h2>
        <p>
          Information provided regarding Golden Visa and residency by investment programs is for advisory purposes only. 
          It does not constitute legal or financial advice. Clients are encouraged to consult with their own legal and 
          tax professionals before making any investment decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Partner Verification</h2>
        <p>
          While we perform due diligence on our partner network, AeroVisa Global does not guarantee the performance or 
          outcomes of services provided by third-party partners. Clients should review the specific terms and conditions 
          of any partner they choose to engage with.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">5. No Professional-Client Relationship</h2>
        <p>
          Use of this website or submission of an inquiry form does not create a professional-client relationship 
          until a formal advisory agreement is signed by both parties.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default AdvisoryDisclaimer;
