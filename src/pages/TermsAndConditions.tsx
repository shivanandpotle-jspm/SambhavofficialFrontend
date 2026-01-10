import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last Updated: September 16, 2025
        </p>

        <p className="mb-6 leading-relaxed">
          Welcome to <strong>Sambhav Club</strong>. These Terms and Conditions
          ("Terms") govern your use of our website and services for purchasing
          event tickets. By accessing our website and purchasing tickets, you
          agree to be bound by these Terms.
        </p>

        {/* 1. Event Tickets */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Event Tickets</h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>All tickets are sold on behalf of Sambhav Club.</li>
            <li>
              A valid ticket must be produced to gain entry into an event.
              Removing any part of, altering, or defacing the ticket may
              invalidate it.
            </li>
            <li>
              It is your responsibility to check your tickets upon receipt, as
              mistakes cannot always be rectified after purchase. Please contact
              us immediately if there is an error.
            </li>
          </ul>
        </section>

        {/* 2. Pricing and Payment */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. Pricing and Payment
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Ticket prices are displayed on the website in Indian Rupees (INR)
              and include applicable taxes.
            </li>
            <li>
              Payments are processed through a third-party payment gateway. By
              making a payment, you agree to the terms and conditions of the
              payment gateway provider.
            </li>
            <li>
              Discounts for bulk ticket purchases may be offered as specified on
              the registration page and are subject to availability.
            </li>
          </ul>
        </section>

        {/* 3. Refunds and Cancellation */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Refunds and Cancellation
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Tickets purchased are non-refundable and non-exchangeable, except
              in the case of event cancellation.
            </li>
            <li>
              If an event is cancelled by Sambhav Club, a full refund will be
              issued to the original payment method.
            </li>
            <li>
              If an event is rescheduled, tickets remain valid for the new date.
              Refunds will only be provided if you notify us within the
              specified timeframe.
            </li>
            <li>
              Booking fees and transaction charges are non-refundable.
            </li>
            <li>
              Approved refunds will be processed within 7 working days, subject
              to the timelines of the payment gateway or bank.
            </li>
          </ul>
        </section>

        {/* 4. User Conduct */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              You agree to use this website only for lawful purposes and in a
              manner that does not infringe the rights of others.
            </li>
            <li>
              You are responsible for providing accurate registration details,
              including correct email addresses for ticket delivery.
            </li>
            <li>
              Any misuse of the website, including fraudulent activity, may
              result in cancellation of transactions and legal action.
            </li>
          </ul>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Limitation of Liability
          </h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Sambhav Club is not responsible for loss, injury, or damage related
              to an event, except where caused by gross negligence or willful
              misconduct.
            </li>
            <li>
              We are not responsible for payment-related issues managed by
              third-party providers.
            </li>
            <li>
              Our total liability shall not exceed the amount paid for the
              tickets in question.
            </li>
          </ul>
        </section>

        {/* 6. Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. Intellectual Property
          </h2>
          <p className="leading-relaxed">
            All content on this website, including logos, text, graphics, and
            software, is the property of Sambhav Club and is protected under
            applicable copyright laws. Unauthorized use is strictly prohibited.
          </p>
        </section>

        {/* 7. Governing Law */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            7. Governing Law and Jurisdiction
          </h2>
          <p className="leading-relaxed">
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of the courts in Pune,
            Maharashtra.
          </p>
        </section>

        {/* 8. Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            8. Changes to Terms
          </h2>
          <p className="leading-relaxed">
            Sambhav Club reserves the right to update these Terms at any time.
            Changes will be posted on this page, and continued use of the
            website constitutes acceptance of the updated Terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="leading-relaxed mb-2">
            If you have any questions regarding these Terms and Conditions,
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

export default TermsAndConditions;
