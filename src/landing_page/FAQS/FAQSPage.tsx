import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Users2,
  History,
  Fingerprint,
  Cpu,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqs: FAQCategory[] = [
  {
    title: "Governance & Resolution",
    icon: <Users2 size={20} className="text-purple-500" />,
    items: [
      {
        question:
          "How does the 'Resolution Vault' replace standard group chats?",
        answer:
          "Unlike the chaos of standard messaging, the Resolution Vault provides a formal architectural space for family consensus. Proposals are moved from the chat into the Vault, where members vote and reach documented agreements that are cryptographically signed and archived for future generations.",
      },
      {
        question: "Can we manage family assets through the Vault?",
        answer:
          "Yes. The Vault acts as a digital ledger for family governance, allowing you to track collective assets, meeting minutes, and financial contributions within a structured, audit-ready environment.",
      },
    ],
  },
  {
    title: "Heritage & The Great Lineage",
    icon: <History size={20} className="text-amber-500" />,
    items: [
      {
        question: "What is the 'Ancestral Branching' engine?",
        answer:
          "The Great Lineage uses a sophisticated recursive node engine to map complex family trees. It is specifically designed to handle diverse structures—including polygamous branches and extended kinship—ensuring every ancestor is accurately represented in your digital heritage.",
      },
      {
        question: "How are 'Village Traditions' preserved?",
        answer:
          "Kokohor allows families to digitize oral traditions. You can record elders, geotag ancestral village landmarks, and document the specific protocols of traditional rites, ensuring your cultural identity survives the digital migration.",
      },
    ],
  },
  {
    title: "Signal Intelligence",
    icon: <Cpu size={20} className="text-blue-500" />,
    items: [
      {
        question: "How does 'Signal Intelligence' solve chat fatigue?",
        answer:
          "The app utilizes a localized AI core to analyze unread activity. It identifies critical signals—polls, announcements, and key dates—and generates a 'Morning Briefing' summary, allowing you to stay informed without scrolling through hundreds of messages.",
      },
      {
        question: "Is there historical message persistence?",
        answer:
          "Yes. Using robust WebRTC signaling and a sovereign backend, new members joining a family room can immediately access historical context and past resolutions, bridging the gap between new generations and family history.",
      },
    ],
  },
  {
    title: "Sovereignty & Security",
    icon: <ShieldCheck size={20} className="text-emerald-500" />,
    items: [
      {
        question: "What defines the 'NG-Data Sovereign' mindset?",
        answer:
          "We treat family data as a sovereign territory. Your information is protected by AES-256 encryption and 'Zero Knowledge' storage architectures. This means Boring Thinkers Limited has no access to your private data; only your family holds the keys.",
      },
      {
        question: "Is my biometric data used for the Sovereign Vault?",
        answer:
          "The Sovereign Vault supports deep integration with on-device biometrics (FaceID/TouchID) through our React Native implementation, ensuring that access to sensitive family records requires physical verification.",
      },
    ],
  },
];

const FAQAccordion = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-b border-gray-100 transition-all duration-300 ${
        isOpen ? "bg-gray-50/80" : ""
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group px-4"
      >
        <span className="text-gray-900 font-black text-[10px] md:text-xs uppercase tracking-[0.25em] transition-colors group-hover:text-yellow-600">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-300 group-hover:text-yellow-500"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 px-4 text-gray-500 text-sm font-light leading-relaxed max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage: React.FC = () => {
  return (
    <main className="bg-white pt-48 pb-32 px-6 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-32 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl shadow-gray-200">
              <Fingerprint size={24} strokeWidth={1.5} />
            </div>
            <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.5em] border-l border-gray-200 pl-4">
              Support Protocol
            </span>
          </div>
          <h1 className="text-gray-900 text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 uppercase">
            FAQ <br />
          </h1>
          <p className="text-gray-500 text-xl font-light max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Technical insight into the architecture of Kokohor—the digital home
            built for family sovereignty and ancestral permanence.
          </p>
        </div>

        {/* Categories Section */}
        <div className="space-y-32">
          {faqs.map((category, idx) => (
            <div key={idx} className="grid lg:grid-cols-12 gap-16">
              {/* Sidebar Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                      {category.icon}
                    </div>
                    <span className="font-black text-[10px] text-gray-400 uppercase tracking-widest">
                      Module 0{idx + 1}
                    </span>
                  </div>
                  <h2 className="text-gray-900 font-black text-3xl uppercase tracking-tighter mb-6">
                    {category.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                    In-depth details on how Kokohor handles this pillar of the
                    family ecosystem.
                  </p>
                </div>
              </div>

              {/* Accordion Content */}
              <div className="lg:col-span-8 border-t border-gray-100">
                {category.items.map((item, i) => (
                  <FAQAccordion key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
