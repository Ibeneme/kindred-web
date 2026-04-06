import React from "react";
import { Fingerprint } from "lucide-react";

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: "Data Collection Matrix",
      content:
        "We collect only the minimum required for operation: Account identifiers, encrypted tokens, and basic device metadata for security. We do not collect behavioral data or contact lists.",
    },
    {
      title: "Zero-Knowledge Encryption",
      content:
        "Your family data is encrypted on your device using AES-256 before transmission. Kindred acts as a blind carrier. We have no technical means to decrypt your vault documents.",
    },
    {
      title: "Third-Party Interaction",
      content:
        "We do not sell or trade your data to third-party advertisers. Our infrastructure is independent. We use limited sub-processors only for technical essentials like push notifications.",
    },
    {
      title: "Retention & Deletion",
      content:
        "When you delete a family vault, the signaling keys are immediately destroyed. Because we do not hold backups of unencrypted data, this action is final and absolute.",
    },
    {
      title: "Regional Sovereignty",
      content:
        "Kindred complies with global data protection standards (GDPR, NDPR). Your data is hosted in high-security regional zones chosen for their robust legal protection of digital privacy.",
    },
  ];

  return (
    <main className="bg-black pt-32 md:pt-48 pb-32 md:pb-64 px-4 md:px-8 text-white selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Header */}
        <header className="mb-20 md:mb-40 text-center lg:text-left border-b border-white/10 pb-16 md:pb-24">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-12">
            <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] sm:border-l border-white/20 sm:pl-6 text-center sm:text-left mt-2 sm:mt-0">
              Privacy Manifesto
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.8] mb-8 md:mb-12 uppercase">
            PRIVACY <br />
            <span className="text-white/20">POLICY.</span>
          </h1>

          <p className="text-white/50 text-lg md:text-2xl font-bold max-w-4xl leading-tight uppercase tracking-tighter mx-auto lg:mx-0">
            We provide the vault; you hold the only key. Our systems are
            incapable of accessing your family estate.
          </p>
        </header>

        {/* Responsive Grid Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {sections.map((s, i) => (
            <div
              key={i}
              className="bg-black p-8 md:p-12 lg:p-16 hover:bg-white/5 transition-colors group"
            >
              <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6">
                Protocol 0{i + 1}
              </h2>
              <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8 leading-none group-hover:text-yellow-500 transition-colors">
                {s.title}
              </h3>
              <p className="text-white/40 text-base md:text-xl font-bold leading-relaxed uppercase tracking-tight">
                {s.content}
              </p>
            </div>
          ))}

          {/* Verification Block */}
          <div className="bg-black p-12 md:p-16 flex flex-col justify-center items-center text-center border-t border-white/10 lg:border-t-0 min-h-[300px]">
            <Fingerprint
              size={48}
              className="text-white/10 mb-6 md:mb-8 animate-pulse"
            />
            <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">
              End-to-End Verified
            </p>
            <div className="mt-4 h-px w-12 bg-yellow-500/50" />
          </div>
        </div>

        {/* Bottom Contact Reference */}
        <div className="mt-12 text-center lg:text-left">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Last Updated: April 2026 // Kindred Legal Dept.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
