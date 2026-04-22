import React from "react";
import {
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Apple,
  Triangle,
} from "lucide-react";
import logoImg from "../../assets/new.png";

const KindredFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "FAQs", href: "/faqs" },
    { name: "About Us", href: "/about" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  return (
    <footer className="bg-black pt-32 pb-12 px-6 relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Branding & App Distribution Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-32 gap-12">
          <div className="group cursor-pointer">
            <a
              href="/"
              className="w-44 h-20 flex items-center justify-center transition-all overflow-hidden p-2 bg-white/[0.03] border border-white/10 hover:border-yellow-500"
            >
              <img
                src={logoImg}
                alt="Kokohor Logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] text-center lg:text-right max-w-[250px] mb-4 sm:mb-0">
              THE ARCHITECTURAL STANDARD FOR DIGITAL LEGACY.
            </p>

            {/* Store Buttons - High Contrast / No Shadows */}
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-4 bg-white hover:bg-yellow-500 text-black rounded-xl transition-all flex items-center justify-center gap-3 group">
                <Apple size={22} strokeWidth={2.5} className="fill-black" />
                <div className="text-left">
                  <p className="text-[8px] font-black leading-none uppercase tracking-tighter">
                    Download on the
                  </p>
                  <p className="text-sm font-black leading-none uppercase tracking-tighter">
                    App Store
                  </p>
                </div>
              </button>

              <button className="flex-1 sm:flex-none px-6 py-4 bg-white hover:bg-yellow-500 text-black rounded-xl transition-all flex items-center justify-center gap-3 group">
                <Triangle
                  size={20}
                  strokeWidth={2.5}
                  className="fill-black rotate-90"
                />
                <div className="text-left">
                  <p className="text-[8px] font-black leading-none uppercase tracking-tighter">
                    Get it on
                  </p>
                  <p className="text-sm font-black leading-none uppercase tracking-tighter">
                    Google Play
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="mb-24 border-y border-white/10 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.6em] mb-12">
                PROTOCOLS
              </h4>
              <div className="flex flex-wrap gap-x-16 gap-y-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 text-yellow-500"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:block text-right">
              <p className="text-white/5 text-[120px] font-black tracking-tighter leading-none select-none uppercase">
                2026
              </p>
            </div>
          </div>
        </div>

        {/* Final Metadata Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">
              © {currentYear} Kokohor . ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <MapPin size={16} className="text-yellow-500" />
              <span>PH CITY // NG</span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <ShieldCheck size={16} className="text-yellow-500" />
              <span>AES-256 SOVEREIGN ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized Background Label */}
      <div className="absolute -bottom-16 left-0 w-full text-center pointer-events-none opacity-[0.01] select-none">
        <h2 className="text-[25vw] font-black uppercase leading-none tracking-tighter">
          Kokohor
        </h2>
      </div>
    </footer>
  );
};

export default KindredFooter;
