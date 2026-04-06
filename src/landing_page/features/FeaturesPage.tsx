import React from "react";
import { motion } from "framer-motion";
import {

  Lock,
  History,
  Cpu,
  GitBranch,
  Globe,
  Users2,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const FeaturesPage: React.FC = () => {
  return (
    <main className="bg-white selection:bg-yellow-500 selection:text-black font-sans">
      {/* 1. THE HERO: ARCHITECTURAL OVERVIEW */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Kindred Protocol v2.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-black text-6xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 uppercase"
          >
            FAMILY HOME <br />
            <span className="text-gray-200 font-bold">FEATURES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-xl lg:text-3xl font-light max-w-4xl mx-auto leading-tight mb-16"
          >
            A high-fidelity ecosystem designed to bridge the gap between oral
            tradition and digital permanence through neural lineage mapping.
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center text-gray-200"
          >
            <ArrowDown size={32} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Technical Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </section>

      {/* 2. ANCESTRAL BRANCHING: THE LINEAGE ENGINE */}
      <section id="lineage" className="bg-gray-50 py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div className="aspect-square bg-white rounded-[3rem] border border-black/5 overflow-hidden p-8 flex items-center justify-center relative">
              <div className="w-full h-full border border-dashed border-black/10 rounded-[2rem] flex items-center justify-center">
                <div className="relative">
                  <GitBranch size={80} className="text-black" strokeWidth={1} />
                </div>
              </div>
              <div className="absolute bottom-12 right-12 bg-black text-white p-8 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">
                  Heritage Nodes
                </p>
                <p className="text-3xl font-black tracking-tighter">402+ GEN</p>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-black font-black text-[10px] uppercase tracking-[0.5em] mb-6">
              01 — Spatial Heritage
            </h2>
            <h3 className="text-black text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              THE GREAT <br /> LINEAGE ENGINE.
            </h3>
            <p className="text-gray-500 text-xl font-light leading-relaxed mb-12">
              Navigate your history through a dynamic, recursive node system.
              Map polygamous lineages, migrations, and fragmented oral histories
              with mathematical precision.
            </p>
            <div className="space-y-4">
              {[
                "Neural Node Branching",
                "Kinship Logic Verification",
                "Migration Path Visualization",
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3 border-b border-black/5"
                >
                  <CheckCircle2 size={16} className="text-yellow-500" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-black text-black">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE RESOLUTION VAULT: GOVERNANCE */}
      <section
        id="governance"
        className="bg-white py-40 px-6 border-y border-black/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div className="text-left">
              <h2 className="text-black font-black text-[10px] uppercase tracking-[0.5em] mb-6">
                02 — Governance
              </h2>
              <h3 className="text-black text-5xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
                FORMALIZING <br /> CONSENSUS.
              </h3>
            </div>
            <p className="text-gray-500 text-xl font-light max-w-xl text-left leading-relaxed">
              Standard group chats are chaotic. The Resolution Vault provides a
              formal space to debate, vote, and archive family decisions as
              permanent, signed records.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                t: "Consensus Voting",
                d: "Standardized voting protocols for transparent decision making within the circle.",
              },
              {
                t: "The Family Ledger",
                d: "A clear, immutable record of collective assets, dues, and historical contributions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-16 rounded-[3rem] bg-gray-50 border border-black/5 group hover:bg-black transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white mb-8 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <Users2 size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-black group-hover:text-white font-black text-2xl mb-4 uppercase tracking-tighter transition-colors">
                  {item.t}
                </h4>
                <p className="text-gray-500 group-hover:text-white/40 text-sm font-light leading-relaxed transition-colors">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIGNAL INTELLIGENCE: TRIAGE */}
      <section
        id="intelligence"
        className="bg-black py-40 px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6">
            03 — Intelligence
          </h2>
          <h3 className="text-white text-6xl lg:text-[9rem] font-black tracking-tighter mb-16 leading-none uppercase">
            NO MORE <span className="text-white/20">CHAT FATIGUE.</span>
          </h3>

          <div className="w-full max-w-5xl relative">
            <div className="bg-white/5 rounded-[4rem] p-8 lg:p-20 border border-white/10 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 text-left">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-10">
                  <Cpu size={28} strokeWidth={1} />
                </div>
                <p className="text-white font-black text-4xl mb-8 tracking-tighter uppercase leading-none">
                  Signal <br /> Intelligence
                </p>
                <p className="text-white/40 text-xl font-light leading-relaxed">
                  Kindred’s neural core scans activity and generates structured
                  summaries. See critical updates, open polls, and announcements
                  at a glance without scrolling through history.
                </p>
              </div>
              <div className="shrink-0">
                <div className="w-72 h-72 rounded-[3rem] bg-white flex flex-col items-center justify-center text-center p-10">
                  <span className="text-black text-7xl font-black tracking-tighter mb-2">
                    E2E
                  </span>
                  <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em] leading-tight">
                    Real-time
                    <br />
                    Signaling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VILLAGE PROTOCOL: TRADITION */}
      <section id="culture" className="bg-white py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-16 lg:p-24 rounded-[4rem] bg-gray-50 border border-black/5 relative overflow-hidden group">
            <div className="absolute -bottom-20 -right-20 opacity-[0.03]">
              <History size={450} />
            </div>
            <h2 className="text-black font-black text-[10px] uppercase tracking-[0.5em] mb-8">
              04 — Village Tradition
            </h2>
            <h3 className="text-black text-5xl lg:text-8xl font-black tracking-tighter mb-12 leading-[0.85] uppercase">
              PRESERVE THE <br /> ANCESTRAL VOICE.
            </h3>
            <p className="text-gray-500 text-xl font-light leading-relaxed max-w-xl mb-12">
              Digitize cultural rites, upload voice notes from elders, and
              record ancestral village boundaries with GPS precision for
              generations to come.
            </p>
            <button className="px-10 py-5 bg-black text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-yellow-500 hover:text-black transition-all">
              Open Village Vault
            </button>
          </div>

          <div className="lg:col-span-4 p-16 rounded-[4rem] bg-black flex flex-col justify-between">
            <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Globe size={40} strokeWidth={1} />
            </div>
            <div>
              <p className="text-white text-4xl font-black mb-6 tracking-tighter leading-none uppercase">
                CULTURAL <br /> IMMORTALITY.
              </p>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                Ensuring origin stories survive the digital migration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOVEREIGN VAULT: SECURITY */}
      <section
        id="security"
        className="bg-gray-50 py-48 px-6 text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "anticipate" }}
            className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white mx-auto mb-16"
          >
            <Lock size={40} strokeWidth={1} />
          </motion.div>

          <h2 className="text-black text-6xl lg:text-9xl font-black tracking-tighter mb-12 leading-none uppercase">
            SOVEREIGN <br /> BY DESIGN.
          </h2>

          <p className="text-gray-500 text-2xl font-light leading-relaxed mb-20">
            Your family legacy is yours alone. We use AES-256 end-to-end
            encryption and Zero-Knowledge architecture. Even our engineers
            cannot access your estate.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "NG-Data Sovereign",
              "AES-256 Encrypted",
              "Zero Knowledge Storage",
              "Biometric Auth",
            ].map((tag) => (
              <span
                key={tag}
                className="px-10 py-4 rounded-full border border-black/5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3"
              >
                <ShieldCheck size={14} className="text-black" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Branding Watermark */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-black font-black text-[18vw] leading-none opacity-[0.02] pointer-events-none select-none uppercase tracking-tighter">
          Sovereign
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
