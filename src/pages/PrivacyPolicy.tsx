import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last Updated: September 16, 2025
        </p>

        <p className="mb-6 leading-relaxed">
          This Privacy Policy describes how <strong>Sambhav Club</strong>, affiliated
          with JSPM Rajarshi Shahu College of Engineering ("we", "us", or "our"),
          collects, uses, and protects your personal information when you use our
          website to purchase event tickets.
        </p>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-3 leading-relaxed">
            When you register for an event, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              <strong>Personal Identification Information:</strong> Full name,
              email address, and phone number.
            </li>
            <li>
              <strong>Payment Information:</strong> We do not collect or store
              your credit card, debit card, or other sensitive financial details.
              All payments are securely processed through a trusted third-party
              payment gateway.
            </li>
            <li>
              <strong>Technical Information:</strong> Non-personal data such as
              IP address, browser type, and operating system for analytics and
              security purposes.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              <strong>To Process Your Order:</strong> To register you for events
              and deliver tickets via email.
            </li>
            <li>
              <strong>To Communicate With You:</strong> To send confirmations,
              reminders, updates, or notifications regarding event changes.
            </li>
            <li>
              <strong>To Improve Our Services:</strong> To analyze website usage
              and enhance functionality and user experience.
            </li>
            <li>
              <strong>For Security:</strong> To prevent fraud and protect users
              and our platform.
            </li>
          </ul>
        </section>

        {/* 3. Data Sharing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Data Sharing and Disclosure
          </h2>
          <p className="mb-3 leading-relaxed">
            We respect your privacy and do not sell, trade, or rent your personal
            information to third parties.
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Information may be shared with our payment gateway provider only
              as necessary to complete transactions.
            </li>
            <li>
              Information may be disclosed if required by law or a valid legal
              request.
            </li>
          </ul>
        </section>

        {/* 4. Data Security */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Data Security
          </h2>
          <p className="leading-relaxed">
            We use reasonable security measures, including SSL encryption, to
            protect your personal information during transmission. However, no
            method of data transmission over the Internet is completely secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 5. Your Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Your Rights
          </h2>
          <p className="leading-relaxed">
            You have the right to access, correct, or request deletion of your
            personal information. To exercise these rights, please contact us
            using the details below.
          </p>
        </section>

        {/* 6. Policy Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy periodically. Changes will be
            posted on this page with an updated "Last Updated" date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            7. Contact Us
          </h2>
          <p className="leading-relaxed mb-2">
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us:
          </p>
          <p className="leading-relaxed">
            <strong>Email:</strong> sambhav.rscoe@gmail.com
          </p>
          <p className="leading-relaxed mt-2">
            <strong>Address:</strong><br />
            JSPM Rajarshi Shahu College of Engineering,<br />
            Survey No. 80, Pune-Mumbai Bypass Highway, Tathawade,<br />
            Pune, Maharashtra 411033
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
