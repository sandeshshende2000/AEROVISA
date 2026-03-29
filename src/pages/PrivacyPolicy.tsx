import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Introduction</h2>
        <p>
          AeroVisa Global ("we," "us," or "our") is committed to protecting the privacy of our clients and website visitors. 
          This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our advisory and coordination services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">2. Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you inquire about our services, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Full name and contact details (email, phone number, WhatsApp)</li>
          <li>Nationality and residency information</li>
          <li>Investment budget and financial information for residency applications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">3. How We Use Your Information</h2>
        <p>
          Your information is used solely to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide professional advisory and coordination services</li>
          <li>Connect you with verified legal and investment partners</li>
          <li>Communicate with you regarding your inquiries and requests</li>
          <li>Ensure compliance with legal and regulatory requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
        <p>
          As an advisory platform, we share your information with our verified partner network (legal experts, investment firms, and immigration consultants) 
          only to the extent necessary to provide the services you have requested. We do not sell or rent your personal data to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Data Security</h2>
        <p>
          We implement robust technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. 
          All communications are handled with the highest level of confidentiality.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
