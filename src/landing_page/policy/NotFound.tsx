import React from "react";
import { motion } from "framer-motion";
import { Home, RefreshCcw, ShieldAlert, Terminal } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-6 font-sans">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        {/* Red Warning Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full animate-pulse" />

        {/* Animated Sonar Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full w-[400px] h-[400px]"
          />
        ))}

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%] pointer-events-none" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Icon & Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-col items-center mb-8"
        >
          <div className="p-5 rounded-3xl bg-red-500/10 border border-red-500/20 mb-4 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <ShieldAlert size={48} className="text-red-500 animate-pulse" />
          </div>
          <span className="text-red-500 font-black tracking-[0.5em] uppercase text-xs">
            System Alert: 404
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl lg:text-9xl font-black text-white tracking-tightest mb-4 uppercase italic"
        >
          NODE <span className="text-gray-800">LOST</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-lg lg:text-xl font-medium max-w-md mx-auto leading-relaxed mb-12"
        >
          The coordinate you are attempting to access is either outside the
          <span className="text-white"> Kindred Sanctuary</span> or has been
          decommissioned.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/"
            className="group px-8 py-4 bg-yellow-500 text-black rounded-2xl font-black flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(234,179,8,0.3)]"
          >
            <Home size={20} />
            BACK TO SANCTUARY
          </a>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <RefreshCcw
              size={20}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            RE-SYNC NODE
          </button>
        </motion.div>

        {/* Terminal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
          className="mt-20 flex items-center justify-center gap-2 text-gray-600 font-mono text-[10px] uppercase tracking-widest"
        >
          <Terminal size={12} />
          <span>Error_Trace: Path_Undefined // Session_Secure</span>
        </motion.div>
      </div>

      {/* Static Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </section>
  );
};

export default NotFound;
