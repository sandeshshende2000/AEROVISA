import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const TermsOfService = () => {
  return (
    <LegalPageLayout title="Terms of Service">
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the AeroVisa Global website and services, you agree to be bound by these Terms of Service. 
          If you do not agree with any part of these terms, you must not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">2. Nature of Services</h2>
        <p>
          AeroVisa Global acts solely as an advisory and coordination platform. We connect clients with third-party verified partners, 
          including investment firms, legal experts, and immigration consultants. 
          We do not provide legal or financial services directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">3. User Obligations</h2>
        <p>
          Users agree to provide accurate, current, and complete information during the inquiry process. 
          Any misuse of the platform or provision of false information may result in the termination of services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Limitation of Liability</h2>
        <p>
          AeroVisa Global shall not be liable for any direct, indirect, incidental, or consequential damages arising from the services 
          provided by our third-party partners. All contracts for investment or immigration services are entered into directly between the client and the partner.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is the property of AeroVisa Global 
          and is protected by international copyright laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">6. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AeroVisa Global operates, 
          without regard to its conflict of law provisions.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsOfService;
