import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Scale, Crown, ArrowRight, ShieldCheck } from "lucide-react";

const legacyCategories = [
  {
    id: "traditions",
    title: "Village Traditions",
    description:
      "Digitize and preserve oral histories, local customs, and cultural rites. Ensure the essence of your origin is never diluted by time.",
    icon: History,
    accent: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    id: "resolutions",
    title: "Family Resolutions",
    description:
      "Formalize family governance. Record meeting outcomes, financial decisions, and long-term resolutions with immutable clarity.",
    icon: Scale,
    accent: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    id: "lineage",
    title: "The Great Lineage",
    description:
      "A living record of Kings, Patriarchs, and Matriarchs. Map your family tree with verified historical nodes and media archives.",
    icon: Crown,
    accent: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];

const LegacyVaultLight: React.FC = () => {
  const [activeTab, setActiveTab] = useState(legacyCategories[0]);

  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden border-t border-gray-100">
      {/* Background Decorative Element - Soft Gray Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left: Navigation & Context */}
          <div className="lg:w-1/3">
            <div className="mb-12">
              <h2 className="text-amber-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                Preservation Protocol
              </h2>
              <h3 className="text-gray-900 text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                THE DIGITAL <br />
                <span className="text-gray-300">VILLAGE VAULT.</span>
              </h3>
              <p className="text-gray-500 text-lg font-light leading-relaxed">
                Beyond chat, Kokohor provides a secure repository for the
                pillars of your family identity.
              </p>
            </div>

            <div className="space-y-4">
              {legacyCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category)}
                  className={`w-full p-6 rounded-2xl flex items-center gap-6 transition-all duration-500 border text-left ${
                    activeTab.id === category.id
                      ? "bg-gray-50 border-gray-200 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${category.bg} ${category.accent} border ${category.border}`}
                  >
                    <category.icon size={24} />
                  </div>
                  <span
                    className={`font-bold text-lg tracking-tight ${
                      activeTab.id === category.id
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {category.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Feature Showcase (Animated) */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full min-h-[500px] rounded-[3rem] bg-gray-50/50 border border-gray-100 p-12 lg:p-20 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
              >
                {/* Visual Depth Elements - Soft Pastel Blobs */}
                <div
                  className={`absolute -top-24 -right-24 w-64 h-64 blur-[80px] rounded-full transition-colors duration-1000 opacity-40 ${activeTab.bg}`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="px-4 py-1 rounded-full border border-gray-200 bg-white shadow-sm flex items-center gap-2">
                      <ShieldCheck className="text-green-600" size={14} />
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">
                        Immutable Record
                      </span>
                    </div>
                  </div>

                  <h4 className="text-gray-900 text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">
                    {activeTab.title}
                  </h4>

                  <p className="text-gray-600 text-xl lg:text-2xl font-light leading-relaxed max-w-xl">
                    {activeTab.description}
                  </p>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-gray-200/60 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-50" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[10px] font-black text-white">
                      +12
                    </div>
                  </div>

                  <button className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-widest text-[10px] hover:text-amber-600 transition-colors group">
                    Explore Archive
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacyVaultLight;
