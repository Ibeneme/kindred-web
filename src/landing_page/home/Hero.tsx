import React from "react";
import { motion } from "framer-motion";
import {
  //ArrowRight,
  Users,
  ShieldCheck,
  Zap,
  Triangle,
  Apple,
} from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0A0F] overflow-hidden px-6 font-sans pt-48">
      {/* Animated Background Glows - Switched to Yellow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-500 opacity-[0.15] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-yellow-600 opacity-10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
            <Zap size={14} className="fill-yellow-400" />
            <span>Experience the Future of Family</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Deepening{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
              Connections
            </span>{" "}
            Beyond the Screen.
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed font-medium">
            Kindred brings your inner circle closer with secure messaging,
            real-time family dashboards, and shared moments—all protected within
            your private digital sanctuary.
          </p>

          {/* <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(234,179,8,0.35)]">
              Get Started <ArrowRight size={20} strokeWidth={3} />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all backdrop-blur-md">
              Learn More
            </button>
          </div> */}

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white hover:bg-yellow-500 text-black rounded-2xl flex items-center gap-4 transition-all group border border-transparent">
              <Apple size={28} strokeWidth={2.5} className="fill-black" />
              <div className="text-left">
                <p className="text-[10px] font-black leading-none uppercase tracking-tighter">
                  Download on the
                </p>
                <p className="text-xl font-black leading-none uppercase tracking-tighter">
                  App Store
                </p>
              </div>
            </button>

            <button className="px-8 py-4 bg-white hover:bg-yellow-500 text-black rounded-2xl flex items-center gap-4 transition-all group border border-transparent">
              <Triangle
                size={24}
                strokeWidth={2.5}
                className="fill-black rotate-90"
              />
              <div className="text-left">
                <p className="text-[10px] font-black leading-none uppercase tracking-tighter">
                  Get it on
                </p>
                <p className="text-xl font-black leading-none uppercase tracking-tighter">
                  Google Play
                </p>
              </div>
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#0B0A0F] bg-gray-800 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
              Trusted by 200+ families
            </p>
          </div>
        </motion.div>

        {/* Right Content - Visual Dashboard */}
        <motion.div
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2 }}
          className="relative perspective-1000"
        >
          {/* Main Interface Card */}
          <div className="relative z-20 p-10 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Users className="text-black" size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-black tracking-tight">
                    Kindred Network
                  </h3>
                  <p className="text-yellow-500/60 text-xs font-bold uppercase tracking-widest">
                    System Active
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
              </div>
            </div>

            <div className="space-y-6">
              {/* AI Insight Card */}
              <motion.div
                whileHover={{ x: 5 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-yellow-500 font-black uppercase tracking-tighter">
                    Neural Insight
                  </span>
                  <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">
                  "Grandpa’s anniversary is in 2 days. Shall I draft a video
                  tribute?"
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black text-white">98%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Sync Rate
                  </span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center gap-1">
                  <span className="text-3xl font-black text-white">256b</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 p-4 bg-yellow-500 rounded-2xl shadow-xl z-30"
          >
            <ShieldCheck className="text-black" size={32} strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
