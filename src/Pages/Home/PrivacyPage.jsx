import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-bg-light flex justify-center py-12 px-6">
      <div className="max-w-3xl bg-bg-light2 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Privacy Policy</h1>
        
        <p className="text-gray-300 mb-4">
          Welcome to <strong>Sailect</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when using our AI-powered WhatsApp chatbot and payment services.
        </p>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-300">
          We collect the following information when you interact with our chatbot:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-1">
          <li>Phone number (for WhatsApp messaging)</li>
          <li>Payment status (to verify subscription access)</li>
          <li>Chat interactions (to improve AI responses)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">2. How We Use Your Data</h2>
        <p className="text-gray-300">
          We use your data for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-1">
          <li>To enable AI-powered WhatsApp chat functionality</li>
          <li>To verify payments using Stripe</li>
          <li>To enhance AI responses through chat history analysis</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">3. Data Sharing</h2>
        <p className="text-gray-300">
          We do not sell or share your personal data with third parties, except:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-1">
          <li>With WhatsApp Cloud API for messaging services</li>
          <li>With Stripe for payment processing</li>
          <li>When required by law</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">4. Security</h2>
        <p className="text-gray-300">
          We implement strong security measures to protect your data, including encryption and access controls.
        </p>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">5. Your Rights</h2>
        <p className="text-gray-300">
          You have the right to request access, modification, or deletion of your personal data. Contact us at <strong>info@sailect.de</strong>.
        </p>

        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-2">6. Updates to This Policy</h2>
        <p className="text-gray-300">
          We may update this Privacy Policy periodically. Changes will be posted on this page.
        </p>

        <p className="text-gray-400 text-sm mt-6">Last updated: February 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
