import React from 'react';
import { Sparkles, ScrollText, Wand2, ShieldCheck } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif relative overflow-hidden pt-24">
      {/* Background Parchment Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0"></div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
              Privacy Decree
            </h1>
            <div className="flex items-center justify-center gap-2 text-[#f3e5ab]/50 italic">
                <ScrollText className="h-4 w-4" />
                <p className="text-sm">
                    Last Inscribed: September 16, 2025
                </p>
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6" />
        </div>

        {/* Main Content - Parchment Style */}
        <div className="bg-[#fdf5e6] text-[#2d1e12] p-8 sm:p-12 shadow-[10px_10px_0px_#741b1b] border-2 border-[#d4af37] relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
          
          <div className="relative z-10">
            <p className="mb-8 leading-relaxed italic text-lg border-b border-[#d4af37]/30 pb-6">
              This Privacy Policy describes how <strong>Sambhav Club</strong>, affiliated
              with JSPM Rajarshi Shahu College of Engineering ("we", "us", or "our"),
              collects, uses, and protects your personal information when you use our
              website to purchase event tickets.
            </p>

            {/* 1. Information We Collect */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                1. Information We Collect
              </h2>
              <p className="mb-4 leading-relaxed">
                When you register for an event, we may collect the following information:
              </p>
              <ul className="list-none pl-4 space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>Personal Identification Information:</strong> Full name, email address, and phone number.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>Payment Information:</strong> We do not collect or store your credit card, debit card, or other sensitive financial details. All payments are securely processed through a trusted third-party payment gateway.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>Technical Information:</strong> Non-personal data such as IP address, browser type, and operating system for analytics and security purposes.</span>
                </li>
              </ul>
            </section>

            {/* 2. How We Use Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                2. How We Use Your Information
              </h2>
              <ul className="list-none pl-4 space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>To Process Your Order:</strong> To register you for events and deliver tickets via email.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>To Communicate With You:</strong> To send confirmations, reminders, updates, or notifications regarding event changes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>To Improve Our Services:</strong> To analyze website usage and enhance functionality and user experience.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span><strong>For Security:</strong> To prevent fraud and protect users and our platform.</span>
                </li>
              </ul>
            </section>

            {/* 3. Data Sharing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                3. Data Sharing and Disclosure
              </h2>
              <p className="mb-4 leading-relaxed">
                We respect your privacy and do not sell, trade, or rent your personal
                information to third parties.
              </p>
              <ul className="list-none pl-4 space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span>Information may be shared with our payment gateway provider only as necessary to complete transactions.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#d4af37]">✦</span>
                  <span>Information may be disclosed if required by law or a valid legal request.</span>
                </li>
              </ul>
            </section>

            {/* 4. Data Security */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                4. Data Security
              </h2>
              <p className="leading-relaxed italic border-l-4 border-[#d4af37] pl-4">
                We use reasonable security measures, including SSL encryption, to
                protect your personal information during transmission. However, no
                method of data transmission over the Internet is completely secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 5. Your Rights */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                5. Your Rights
              </h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or request deletion of your
                personal information. To exercise these rights, please contact us
                using the details below.
              </p>
            </section>

            {/* 6. Policy Changes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]">
                6. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be
                posted on this page with an updated "Last Updated" date.
              </p>
            </section>

            {/* Contact - Sealed Style */}
            <section className="mt-12 pt-8 border-t-2 border-[#741b1b]/20">
              <h2 className="text-2xl font-bold mb-4 text-[#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
                7. Contact the Ministry
              </h2>
              <p className="leading-relaxed mb-6 italic">
                If you have any questions or concerns regarding this Privacy Policy,
                please send an owl or contact us:
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

export default PrivacyPolicy;