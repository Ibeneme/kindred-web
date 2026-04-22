import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Apple, Triangle } from "lucide-react";
import logoImg from "../../assets/new.png";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "FAQs", href: "/faqs" },
    { name: "About Us", href: "/about" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "mt-2" : "mt-0"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-300 flex items-center justify-between px-6 py-3 ${
          isScrolled
            ? "bg-black border-white/10"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <a
            href="/"
            className="w-36 h-12 flex items-center justify-center overflow-hidden"
          >
            <img
              src={logoImg}
              alt="Kokohor Logo"
              className="w-full h-full object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons: High-Fidelity App Downloads */}
        <div className="hidden md:flex items-center gap-3">
          <button
            title="App Store"
            className="p-2.5 bg-white hover:bg-yellow-500 text-black rounded-xl transition-all border border-transparent flex items-center justify-center"
          >
            <Apple size={20} strokeWidth={2.5} className="fill-black" />
          </button>
          <button
            title="Google Play"
            className="p-2.5 bg-white hover:bg-yellow-500 text-black rounded-xl transition-all border border-transparent flex items-center justify-center"
          >
            <Triangle
              size={18}
              strokeWidth={2.5}
              className="fill-black rotate-90"
            />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden mt-4 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-none"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-black uppercase tracking-tighter flex justify-between items-center group"
                >
                  {link.name} <ChevronRight className="text-yellow-500" />
                </a>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex justify-center items-center gap-3">
                  <Apple size={20} strokeWidth={2.5} className="fill-black" />{" "}
                  iOS
                </button>
                <button className="py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex justify-center items-center gap-3">
                  <Triangle
                    size={18}
                    strokeWidth={2.5}
                    className="fill-black rotate-90"
                  />{" "}
                  Android
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
