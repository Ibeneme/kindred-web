import React from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Users2,
  Activity,
  Maximize2,
  Plus,
  Search,
} from "lucide-react";

const KindredMapping: React.FC = () => {
  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Copy & Meta-Data */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8"
            >
              <Activity size={14} className="text-amber-600" />
              <span className="text-gray-900 text-[10px] font-black uppercase tracking-widest">
                Lineage Protocol v2.0
              </span>
            </motion.div>

            <h2 className="text-gray-900 text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
              MAPPING <br />
              <span className="text-gray-300  font-light">KINSHIP.</span>
            </h2>

            <p className="text-gray-500 text-xl font-light leading-relaxed mb-12 max-w-md">
              Visualize the threads of your heritage. Our dynamic mapping engine
              transforms genealogical records into an interactive landscape of
              family connections.
            </p>

            {/* Feature List */}
            <div className="space-y-8">
              {[
                {
                  title: "Ancestral Branching",
                  desc: "Automated generation of expansive family structures up to 12 generations.",
                  icon: GitBranch,
                },
                {
                  title: "Global Node Sync",
                  desc: "Updates to the family tree reflect instantly across every connected member.",
                  icon: Users2,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The "Interactive Canvas" */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] bg-gray-50 border border-gray-200 p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              {/* Toolbar */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold border-r border-gray-100 pr-4">
                    <Search size={14} /> Find Kin
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                    <Maximize2 size={16} />
                  </button>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                    <Plus size={14} /> New Record
                  </button>
                </div>
              </div>

              {/* Map Visualization Area */}
              <div className="h-[450px] relative bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
                {/* Connection Paths */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                  <path
                    d="M100,200 Q250,100 400,200 T700,300"
                    stroke="#d1d5db"
                    fill="transparent"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                  <path
                    d="M150,400 Q350,300 550,400"
                    stroke="#d1d5db"
                    fill="transparent"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>

                {/* Floating "Nodes" */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-20 left-1/4 p-4 bg-white border border-gray-100 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer hover:border-amber-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-black text-xs">
                    PI
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-xs">
                      Patriarch 
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                      High Chief
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, 0, 10] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-24 right-1/4 p-4 bg-white border border-gray-100 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer hover:border-purple-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 font-black text-xs">
                    BT
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-xs">
                      Padiman Route
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                      Verified Company
                    </p>
                  </div>
                </motion.div>

                {/* Canvas Grid */}
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            </motion.div>

            {/* Total Connections Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-6 bg-amber-500 p-6 rounded-3xl shadow-2xl text-white"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">
                Global Network
              </p>
              <p className="text-3xl font-black tracking-tighter">14,802</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KindredMapping;
