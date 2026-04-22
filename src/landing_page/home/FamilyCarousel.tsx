import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  ShieldCheck,
  Globe,
  Lock,
} from "lucide-react";

// Assets
import familyImg1 from "../../assets/hero/a.jpg";
import familyImg2 from "../../assets/hero/b.jpg";
import familyImg3 from "../../assets/hero/c.jpg";

const families = [
  {
    id: 1,
    name: "Zenith Family",
    location: "Port Harcourt, NG",
    caption:
      "Kokohor turned our scattered family photos and documents into a single, permanent home. Now, our history is safe and accessible to every relative, no matter where they are.",
    image: familyImg1,
    stat: "100% Data Ownership",
    tag: "Family Vault",
  },
  {
    id: 2,
    name: "Sterling Family",
    location: "London, UK",
    caption:
      "The weekly family digests are incredible. Instead of scrolling through endless group chats, I get a beautiful summary of our most important shared moments.",
    image: familyImg2,
    stat: "End-to-End Encrypted",
    tag: "Weekly Digest",
  },
  {
    id: 3,
    name: "Chen Family",
    location: "Toronto, CA",
    caption:
      "We needed a place where our children could grow up seeing their heritage. Kokohor is more than an app; it's the digital foundation for our future generations.",
    image: familyImg3,
    stat: "Multi-Gen Storage",
    tag: "Heritage Archive",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "10%" : "-10%",
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "10%" : "-10%",
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.3 },
  }),
};

const FamilyCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = Math.abs(page % families.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="bg-[#050505] py-16 lg:py-32 px-4 md:px-10 overflow-hidden relative">
      {/* Architectural Background Text */}
      <div className="absolute top-10 lg:top-24 left-1/2 -translate-x-1/2 text-[12rem] lg:text-[22rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter leading-none uppercase">
        History
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Responsive Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-yellow-500 mb-4"
            >
              <Globe size={14} className="animate-pulse" />
              <span className="font-black uppercase tracking-[0.3em] text-[9px] lg:text-[11px]">
                Connecting Families Across Borders
              </span>
            </motion.div>
            <h2 className="text-white text-4xl sm:text-6xl lg:text-8xl font-black tracking-tightest leading-[0.85] uppercase">
              Stories that <br />
              <span className="text-white/30">Live Forever.</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-14 h-14 lg:w-20 lg:h-20 rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="relative min-h-[650px] lg:min-h-0 lg:aspect-[16/7] w-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="lg:absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-white/10 bg-[#080808]"
            >
              {/* Responsive Image Container */}
              <div className="lg:col-span-7 relative h-[380px] lg:h-auto border-b lg:border-b-0 lg:border-r border-white/5">
                <img
                  src={families[currentIndex].image}
                  alt={families[currentIndex].name}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-8 left-8 lg:bottom-14 lg:left-14 right-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 px-4 py-1.5 w-fit bg-yellow-500 rounded-lg text-black text-[10px] font-black uppercase tracking-widest">
                      <Lock size={12} className="fill-black" />{" "}
                      {families[currentIndex].tag}
                    </div>
                    <h3 className="text-white font-black text-4xl lg:text-6xl tracking-tighter uppercase">
                      {families[currentIndex].name}
                    </h3>
                    <p className="text-yellow-500 font-bold text-[11px] uppercase tracking-[0.4em]">
                      {families[currentIndex].location}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Responsive Text Container */}
              <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center relative bg-black/40">
                <Quote
                  className="text-white/[0.02] absolute top-10 right-10 lg:top-14 lg:right-14"
                  size={100}
                  strokeWidth={8}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/90 text-xl lg:text-2xl font-medium leading-tight lg:leading-relaxed mb-12 lg:mb-20 relative z-10 tracking-tight"
                >
                  "{families[currentIndex].caption}"
                </motion.p>

                <div className="space-y-10 border-t border-white/10 pt-10 lg:pt-14">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] mb-2">
                        Security
                      </p>
                      <p className="text-white font-black text-xl lg:text-2xl tracking-tighter flex items-center gap-2 uppercase">
                        {families[currentIndex].stat}
                        <ShieldCheck size={20} className="text-yellow-500" />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] mb-2">
                        Platform
                      </p>
                      <p className="text-yellow-500 font-black text-xl lg:text-2xl uppercase">
                        Kokohor Mobile
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Progress Indicator */}
                  <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      key={page}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                      className="h-full bg-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FamilyCarousel;
