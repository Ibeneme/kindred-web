import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, ShieldAlert } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0B0A0F] overflow-hidden px-6 font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[35rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none uppercase">
        404
      </div>

      {/* Yellow Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500 opacity-[0.05] blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-600 opacity-[0.05] blur-[150px] rounded-full" />

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon Header */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-3xl mb-12 relative group">
            <ShieldAlert
              size={40}
              className="text-yellow-500 group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full animate-pulse" />
          </div>

          <h1 className="text-white text-6xl md:text-9xl font-black tracking-tightest leading-none mb-6 uppercase">
             <br />
            <span className="text-white/20">NOT FOUND.</span>
          </h1>

          <p className="text-gray-500 text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-16 uppercase tracking-tighter leading-tight">
            The family node you are looking for does not exist or has been
            relocated within the digital sanctuary.
          </p>

          {/* Action Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group"
            >
              <Home size={18} />
              Return Home
            </a>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/10 hover:border-white/30 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Technical Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
              Protocol Error // Node_Disconnected
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-700">
            <Search
              size={16}
              className="hover:text-yellow-500 cursor-pointer transition-colors"
            />
            <span className="text-[10px] font-black uppercase tracking-widest cursor-default">
              Kindred v2.1
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
