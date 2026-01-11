import React from 'react';
import { Sparkles, ScrollText, Wand2, Gavel, ShieldAlert } from "lucide-react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif relative overflow-hidden pt-24">
      {/* Background Parchment Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0"></div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
              The Sacred Decrees
            </h1>
            <div className="flex items-center justify-center gap-2 text-[#f3e5ab]/50 italic">
                <ScrollText className="h-4 w-4" />
                <p className="text-sm">
                    Terms & Conditions · Last Inscribed: September 16, 2025
                </p>
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6" />
        </div>

        {/* Main Content - Parchment Style */}
        <div className="bg-[#fdf5e6] text-[#2d1e12] p-8 sm:p-12 shadow-[10px_10px_0px_#741b1b] border-2 border-[#d4af37] relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
          
          <div className="relative z-10">
            <p className="mb-10 leading-relaxed italic text-lg border-b border-[#d4af37]/30 pb-6">
              Welcome to <strong>Sambhav Club</strong>. These Terms and Conditions
              ("Terms") govern your use of our website and services for purchasing
              event tickets. By accessing our website and purchasing tickets, you
              agree to be bound by these Terms.
            </p>

            {/* 1. Event Tickets */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
                <Wand2 className="h-5 w-5" />
                1. Event Tickets
              </h2>
              <ul className="list-none pl-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>All tickets are sold on behalf of Sambhav Club.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>A valid ticket must be produced to gain entry into an event. Removing any part of, altering, or defacing the ticket may invalidate it.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>It is your responsibility to check your tickets upon receipt, as mistakes cannot always be rectified after purchase. Please contact us immediately if there is an error.</span>
                </li>
              </ul>
            </section>

            {/* 2. Pricing and Payment */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
                <Sparkles className="h-5 w-5" />
                2. Pricing and Payment
              </h2>
              <ul className="list-none pl-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Ticket prices are displayed on the website in Indian Rupees (INR) and include applicable taxes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Payments are processed through a third-party payment gateway. By making a payment, you agree to the terms and conditions of the payment gateway provider.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Discounts for bulk ticket purchases may be offered as specified on the registration page and are subject to availability.</span>
                </li>
              </ul>
            </section>

            {/* 3. Refunds and Cancellation */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
                <ShieldAlert className="h-5 w-5" />
                3. Refunds and Cancellation
              </h2>
              <ul className="list-none pl-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Tickets purchased are non-refundable and non-exchangeable, except in the case of event cancellation.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>If an event is cancelled by Sambhav Club, a full refund will be issued to the original payment method.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>If an event is rescheduled, tickets remain valid for the new date. Refunds will only be provided if you notify us within the specified timeframe.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Booking fees and transaction charges are non-refundable.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Approved refunds will be processed within 7 working days, subject to the timelines of the payment gateway or bank.</span>
                </li>
              </ul>
            </section>

            {/* 4. User Conduct */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                4. User Conduct
              </h2>
              <ul className="list-none pl-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>You are responsible for providing accurate registration details, including correct email addresses for ticket delivery.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37] font-bold">✦</span>
                  <span>Any misuse of the website, including fraudulent activity, may result in cancellation of transactions and legal action.</span>
                </li>
              </ul>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                5. Limitation of Liability
              </h2>
              <ul className="list-none pl-4 space-y-3 leading-relaxed border-l-4 border-[#d4af37] bg-black/5 p-4 italic">
                <li className="flex gap-3">
                  <span>Sambhav Club is not responsible for loss, injury, or damage related to an event, except where caused by gross negligence or willful misconduct.</span>
                </li>
                <li className="flex gap-3">
                  <span>We are not responsible for payment-related issues managed by third-party providers.</span>
                </li>
                <li className="flex gap-3">
                  <span>Our total liability shall not exceed the amount paid for the tickets in question.</span>
                </li>
              </ul>
            </section>

            {/* 6. Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                6. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content on this website, including logos, text, graphics, and
                software, is the property of Sambhav Club and is protected under
                applicable copyright laws. Unauthorized use is strictly prohibited.
              </p>
            </section>

            {/* 7. Governing Law */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                7. Governing Law and Jurisdiction
              </h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws of India. Any disputes shall be
                subject to the exclusive jurisdiction of the courts in Pune,
                Maharashtra.
              </p>
            </section>

            {/* 8. Changes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                8. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                Sambhav Club reserves the right to update these Terms at any time.
                Changes will be posted on this page, and continued use of the
                website constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mt-12 pt-8 border-t-2 border-[#741b1b]/20">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
                Inquiries & Owls
              </h2>
              <p className="leading-relaxed mb-6 italic">
                If you have any questions regarding these Sacred Decrees,
                please contact the council:
              </p>
              <div className="space-y-4 bg-[#1a120b] text-[#f3e5ab] p-6 shadow-inner">
                  <p className="leading-relaxed">
                    <strong>Email:</strong> <span className="text-[#d4af37]">sambhav.rscoe@gmail.com</span>
                  </p>
                  <p className="leading-relaxed">
                    <strong>Address:</strong><br />
                    JSPM Rajarshi Shahu College of Engineering,<br />
                    Survey No. 80, Pune-Mumbai Bypass Highway, Tathawade,<br />
                    Pune, Maharashtra 411033
                  </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="mt-12 flex justify-center opacity-30">
            <img src="/src/assets/sambhav_logo.png" alt="Official Seal" className="h-20 grayscale sepia" />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;