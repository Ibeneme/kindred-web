import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Database,
  Plus,
  Apple,
  Triangle,
} from "lucide-react";

const stats = [
  { label: "Active Nodes", value: "2.4k", icon: MapPin },
  { label: "Data Integrity", value: "99.9%", icon: Database },
  { label: "Verified Clans", value: "850+", icon: Users },
];

const KindredStudio: React.FC = () => {
  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Minimalist & Bold */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-black font-black uppercase tracking-[0.3em] text-[10px]">
                The Kindred Standard
              </span>
            </motion.div>
            <h2 className="text-[#050505] text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              PURITY IN <br />
              <span className="text-gray-300">CONNECTION.</span>
            </h2>
          </div>

          <p className="text-gray-500 text-lg lg:text-xl max-w-sm font-medium leading-relaxed">
            Stripping away the noise to leave only what matters: the authentic
            pulse of your family’s history.
          </p>
        </div>

        {/* Feature Cards - Zero Border, Soft Elevation */}
        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] bg-[#f9f9f9] hover:bg-black transition-all duration-700 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-12 shadow-sm group-hover:bg-yellow-500 transition-colors duration-500">
                <stat.icon size={20} className="text-black" />
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 group-hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-colors">
                  {stat.label}
                </p>
                <h4 className="text-black group-hover:text-white text-5xl font-black tracking-tighter transition-colors">
                  {stat.value}
                </h4>
              </div>

              <div className="mt-12 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="text-yellow-500" size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action - The "Surgical" look */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-[4rem] bg-black p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative border border-white/5"
        >
          {/* Decorative Glow inside Black Box */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-white text-4xl lg:text-7xl font-black tracking-tighter mb-4 uppercase leading-[0.9]">
              READY TO <br />
              <span className="text-yellow-500">UNIFY?</span>
            </h3>
            <p className="text-white/40 font-black uppercase tracking-[0.3em] text-xs">
              Deploy your family node in seconds.
            </p>
          </div>

          {/* Store Download Actions */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="px-10 py-6 bg-white hover:bg-yellow-500 text-black rounded-[2rem] transition-all flex items-center justify-center gap-4 group">
              <Apple size={32} strokeWidth={2.5} className="fill-black" />
              <div className="text-left">
                <p className="text-[10px] font-black leading-none uppercase tracking-tighter">
                  Download on the
                </p>
                <p className="text-2xl font-black leading-none uppercase tracking-tighter">
                  App Store
                </p>
              </div>
            </button>

            <button className="px-10 py-6 bg-white hover:bg-yellow-500 text-black rounded-[2rem] transition-all flex items-center justify-center gap-4 group border border-transparent">
              <Triangle
                size={28}
                strokeWidth={2.5}
                className="fill-black rotate-90"
              />
              <div className="text-left">
                <p className="text-[10px] font-black leading-none uppercase tracking-tighter">
                  Get it on
                </p>
                <p className="text-2xl font-black leading-none uppercase tracking-tighter">
                  Google Play
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KindredStudio;
