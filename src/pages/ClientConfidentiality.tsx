import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const ClientConfidentiality = () => {
  return (
    <LegalPageLayout title="Client Confidentiality">
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Commitment to Privacy</h2>
        <p>
          At AeroVisa Global, we understand that our high-net-worth clients value their privacy and discretion above all else. 
          Confidentiality is the cornerstone of our advisory and coordination services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">2. Non-Disclosure Agreements (NDA)</h2>
        <p>
          We provide formal Non-Disclosure Agreements (NDA) to all our clients before any sensitive information is shared. 
          This ensures that your travel itineraries, financial details, and residency applications are protected by 
          legally binding confidentiality obligations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">3. Secure Data Handling</h2>
        <p>
          All client information is handled through secure, encrypted communication channels. 
          Access to client data is strictly limited to authorized advisory personnel who require the information 
          to provide the requested services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Discretion in Coordination</h2>
        <p>
          When coordinating with our verified partner network, we share only the minimum necessary information required 
          to facilitate the service. We work with partners who share our commitment to client confidentiality and 
          professional discretion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Long-Term Protection</h2>
        <p>
          Our confidentiality obligations continue even after the conclusion of our advisory services. 
          We maintain records in accordance with legal requirements and industry best practices for data protection.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default ClientConfidentiality;
