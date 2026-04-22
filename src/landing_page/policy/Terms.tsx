import React from "react";
import { Fingerprint } from "lucide-react";

const TermsPage: React.FC = () => {
  const protocols = [
    {
      id: "01",
      tag: "INFRASTRUCTURE",
      title: "Service Protocol",
      content:
        "Kokohor operates as a digital estate facilitator. By using this platform, you acknowledge that our role is strictly limited to providing the secure scaffolding for family mapping and document storage. We do not mediate family disputes or verify the historical accuracy of uploaded data.",
    },
    {
      id: "02",
      tag: "ADMINISTRATION",
      title: "User Sovereignty",
      content:
        "You are the sole administrator of your family vault. Kokohor utilizes a Zero-Access architecture; we do not maintain backdoors or master recovery keys. Loss of access credentials results in the permanent, irreversible seal of your vault. We cannot reset passwords for you.",
    },
    {
      id: "03",
      tag: "OWNERSHIP",
      title: "Heritage Rights",
      content:
        "All assets—including family trees, photos, and voice recordings—remain the absolute intellectual property of your family. Kokohor claims zero rights to your data and will never monetize your lineage. You grant us a limited, technical license only to process data for display within your private circle.",
    },
    {
      id: "04",
      tag: "INTEGRITY",
      title: "Network Usage",
      content:
        "Abuse of the platform for automated spam, malicious uploads, or activities violating the privacy of others will result in immediate account termination. You agree not to attempt to bypass encryption layers or reverse-engineer the underlying security protocols.",
    },
    {
      id: "05",
      tag: "MAINTENANCE",
      title: "Estate Continuity",
      content:
        "Maintenance of the digital estate requires an active subscription. Failure to maintain contributions may result in your vault entering a read-only state. After 12 months of total inactivity, Kokohor reserves the right to archive data to preserve network resources.",
    },
  ];

  return (
    <main className="bg-black pt-32 md:pt-48 pb-32 md:pb-64 px-4 md:px-8 text-white selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header - Styled like Privacy Policy */}
        <header className="mb-20 md:mb-40 text-center lg:text-left border-b border-white/10 pb-16 md:pb-24">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-12">
            <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] sm:border-l border-white/20 sm:pl-6 text-center sm:text-left mt-2 sm:mt-0">
              Legal Infrastructure // v2.1
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.8] mb-8 md:mb-12 uppercase">
            TERMS OF <br />
            <span className="text-white/20">SERVICE.</span>
          </h1>

          <p className="text-white/50 text-lg md:text-2xl font-bold max-w-4xl leading-tight uppercase tracking-tighter mx-auto lg:mx-0">
            Formalizing the boundary between infrastructure and family
            sovereignty. By initializing a node, you accept these protocols.
          </p>
        </header>

        {/* Responsive Grid Matrix - Matching Privacy Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {protocols.map((item, i) => (
            <div
              key={i}
              className="bg-black p-8 md:p-12 lg:p-16 hover:bg-white/5 transition-colors group"
            >
              <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6">
                Protocol {item.id} // {item.tag}
              </h2>
              <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8 leading-none group-hover:text-yellow-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-white/40 text-base md:text-xl font-bold leading-relaxed uppercase tracking-tight">
                {item.content}
              </p>
            </div>
          ))}

          {/* Institutional Block */}
          <div className="bg-black p-12 md:p-16 flex flex-col justify-center items-center text-center border-t border-white/10 lg:border-t-0 min-h-[300px]">
            <Fingerprint
              size={48}
              className="text-white/10 mb-6 md:mb-8 animate-pulse"
            />
            <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">
              Sovereignty Verified
            </p>
            <div className="mt-4 h-px w-12 bg-yellow-500/50" />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center lg:text-left">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Effective Date: April 2026 // Kokohor Operations Center
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
