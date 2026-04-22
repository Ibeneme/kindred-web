import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  History,
  ArrowRight,
  Database,
  Zap,
  Fingerprint,
} from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <main className="bg-white selection:bg-yellow-500 selection:text-black font-sans">
      {/* 1. HERO SECTION - ARCHITECTURAL MINIMALISM */}
      <section className="relative pt-48 pb-32 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              The Kokohor Protocol
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-black text-6xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 uppercase"
          >
            ABOUT<br />
            <span className="text-gray-200 font-bold">Kokohor.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-xl lg:text-xl font-light max-w-4xl mx-auto leading-tight mb-16"
          >
            Kokohor is a digital ecosystem engineered to bridge the gap between
            instant communication and ancestral permanence. We build for the
            generations that follow.
          </motion.p>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION: SIGNAL VS NOISE */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10">
            <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.5em] mb-8">
              01 — The Objective
            </h2>
            <h3 className="text-white text-5xl lg:text-7xl font-black tracking-tighter mb-10 leading-none uppercase">
              DEFEATING <br /> CHAT FATIGUE.
            </h3>
            <p className="text-white/40 text-xl font-light leading-relaxed mb-10">
              Standard social platforms thrive on chaos. Kokohor utilizes Signal
              Intelligence to filter the noise of daily interaction, distilling
              family activity into structured, actionable insights.
            </p>
            <p className="text-white/40 text-xl font-light leading-relaxed">
              By separating ephemeral chat from the Resolution Vault, we ensure
              that important family decisions are never lost to the scroll.
            </p>
          </div>
          <div className="relative border border-white/10 rounded-[3rem] aspect-square flex flex-col items-center justify-center p-12 bg-white/5">
            <Zap size={100} className="text-white mb-8" strokeWidth={1} />
            <div className="text-center">
              <p className="text-white font-black text-sm uppercase tracking-[0.4em]">
                Signal Intelligence
              </p>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mt-4">
                Neural Filtering Enabled
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ARCHITECTURE: THE GREAT LINEAGE */}
      <section className="bg-white py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start mb-32">
            <div className="lg:w-1/3">
              <h2 className="text-black font-black text-[10px] uppercase tracking-[0.5em] mb-6">
                02 — The Engine
              </h2>
              <h3 className="text-black text-5xl font-black tracking-tighter uppercase leading-none">
                THE GREAT <br /> LINEAGE.
              </h3>
            </div>
            <div className="lg:w-2/3">
              <p className="text-gray-600 text-2xl font-light leading-relaxed">
                Our Ancestral Branching technology moves beyond simple trees. It
                is a recursive engine designed to document Village Traditions,
                record oral histories from elders, and map complex family
                structures across borders.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-gray-50 rounded-3xl">
              <History className="text-black mb-6" size={28} />
              <h4 className="font-black text-black text-lg uppercase tracking-tighter mb-4">
                Ancestral Archiving
              </h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Digitizing cultural rites and village landmarks to ensure
                heritage survives migration.
              </p>
            </div>
            <div className="p-10 bg-gray-50 rounded-3xl">
              <Database className="text-black mb-6" size={28} />
              <h4 className="font-black text-black text-lg uppercase tracking-tighter mb-4">
                Resolution Vault
              </h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                A formal ledger for family governance, voting, and consensus
                archived in perpetuity.
              </p>
            </div>
            <div className="p-10 bg-gray-50 rounded-3xl">
              <ShieldCheck className="text-black mb-6" size={28} />
              <h4 className="font-black text-black text-lg uppercase tracking-tighter mb-4">
                Safety Net
              </h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                A secure protocol for emergency coordination and family-wide
                alert systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DATA PRINCIPLES: NG-DATA SOVEREIGN */}
      <section className="bg-black py-40 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Fingerprint
            size={64}
            className="text-yellow-500 mx-auto mb-10"
            strokeWidth={1}
          />
          <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-12">
            SOVEREIGN <br /> BY DESIGN.
          </h2>
          <p className="text-white/40 text-xl font-light leading-relaxed mb-20">
            We operate under the NG-Data Sovereign principle. Family data is
            sovereign territory. Utilizing Zero-Knowledge storage and AES-256
            encryption, we ensure that you—and only you—hold the keys to your
            family estate.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {["AES-256", "Zero-Knowledge", "WebRTC", "Node.js"].map((tech) => (
              <div
                key={tech}
                className="py-4 border border-white/10 rounded-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-48 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-6xl lg:text-8xl font-black tracking-tighter mb-12 leading-[0.9] uppercase">
            ESTABLISH YOUR <br />
            <span className="text-gray-200 font-bold">DIGITAL HOME.</span>
          </h2>
          <p className="text-gray-500 text-xl font-light mb-16 leading-relaxed">
            Kokohor is currently in active development for families who value
            permanence over the ephemeral nature of modern social media.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-12 py-6 bg-black text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-4">
              Initialize Circle <ArrowRight size={14} />
            </button>
            <button className="px-12 py-6 bg-white text-black border border-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-gray-50 transition-all">
              Technical Documentation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
