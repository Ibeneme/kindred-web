import React from "react";
import { motion } from "framer-motion";
import {
  Fingerprint,
  History,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const intelligenceFeatures = [
  //   {
  //     title: "Neural Mapping",
  //     metric: "98% Sync",
  //     description:
  //       "Our AI-powered engine synthesizes scattered family interactions into a coherent digital consciousness.",
  //     icon: Network,
  //     accent: "bg-yellow-500",
  //     textAccent: "text-yellow-500",
  //   },
  //   {
  //     title: "Intelligence Triage",
  //     metric: "12 New Insights",
  //     description:
  //       "The 'Read-on-Arrival' system distills 100+ messages into high-impact summaries of Polls, Tasks, and Reports.",
  //     icon: Zap,
  //     accent: "bg-purple-500",
  //     textAccent: "text-purple-500",
  //   },
  {
    title: "Ancestral Archive",
    description:
      "Securely vault Village Traditions, Kings, and Patriarchal history within an encrypted family sanctuary.",
    icon: History,
    accent: "bg-blue-500",
    textAccent: "text-blue-500",
  },
];

const KindredIntelligence: React.FC = () => {
  return (
    <section className="bg-[#050505] py-32 px-6 relative overflow-hidden">
      {/* Background Neural Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Interactive Visual Stack */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative z-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                    <Fingerprint className="text-yellow-500" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm tracking-tight">
                      KINDRED
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                      Active Sanctuary Node
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold animate-pulse">
                  ENCRYPTED
                </div>
              </div>

              {/* Mock Intelligence Feed */}
              <div className="space-y-4">
                {[
                  {
                    label: "Family Tree Update",
                    time: "2m ago",
                    type: "Lineage",
                  },
                  {
                    label: "New Resolution Poll",
                    time: "14m ago",
                    type: "Governance",
                  },
                  {
                    label: "Village Tradition Log",
                    time: "1h ago",
                    type: "History",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between group hover:border-yellow-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span className="text-white/80 text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                      {item.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 w-64 p-6 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-3xl z-20 hidden lg:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="text-yellow-500" size={24} />
                <span className="text-white font-bold text-lg tracking-tighter">
                  AI Summary
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed ">
                "3 siblings joined the Village Tradition thread. Consensus
                reached on Summer Resolutions."
              </p>
            </motion.div>
          </div>

          {/* Right: Copy & Features */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <ShieldAlert size={14} className="text-yellow-500" />
              <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em]">
                Family Sovereignty
              </span>
            </div>

            <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
              ONE APP <br />
              <span className="text-white/20">FOR YOUR LINEAGE.</span>
            </h2>

            <p className="text-white/60 text-lg mb-12 max-w-md font-light leading-relaxed">
              Kindred isn't just a messaging app. It's a neural interface for
              your family’s collective memory, designed to preserve traditions
              and streamline modern logistics.
            </p>

            <div className="grid gap-8">
              {intelligenceFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12"
                >
                  {/* Visual Indicator - Vertical Glow Line */}
                  <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:via-yellow-500/50 transition-all duration-700" />

                  {/* Content Area */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Icon with Soft Glow */}
                      <div
                        className={`p-3 rounded-xl bg-white/[0.03] ${feature.textAccent} group-hover:scale-110 transition-transform duration-500`}
                      >
                        <feature.icon size={24} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h4 className="text-white text-3xl lg:text-4xl font-black tracking-tighter mb-4 flex items-center gap-3">
                      {feature.title}
                      <ArrowUpRight
                        className="text-white/10 group-hover:text-yellow-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        size={20}
                      />
                    </h4>

                    <p className="text-white/40 text-[16px] font-light leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors duration-500">
                      {feature.description}
                    </p>
                  </div>

                  {/* Background Highlight (Invisible until hover) */}
                  <div className="absolute -inset-y-8 -inset-x-12 bg-white/[0.01] rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KindredIntelligence;
