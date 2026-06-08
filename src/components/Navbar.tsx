import { useState, useEffect } from "react";
import { Menu, X, Smartphone, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onDownloadResume: () => void;
}

export function Navbar({ onDownloadResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Overview", id: "hero" },
    { label: "Skills Matrix", id: "skills" },
    { label: "Featured Work", id: "projects" },
    { label: "Milestones", id: "experience" },
    { label: "Certifications", id: "certifications" },
    { label: "Inquire", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detector
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "py-3 bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30" 
        : "py-5 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-2 group cursor-pointer text-left focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffe082] to-amber-700 p-[1px] flex items-center justify-center shadow-md shadow-amber-500/5 group-hover:shadow-amber-500/15 transition-all">
              <div className="w-full h-full bg-[#0d0f14] rounded-[11px] flex items-center justify-center">
                <Smartphone className="w-4.5 h-4.5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-serif italic font-bold text-lg tracking-tight text-white">
              Chauhan<span className="text-amber-400 font-sans not-italic text-sm font-semibold ml-0.5">.dev</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="glass-pill px-4 py-1.5 flex items-center space-x-1 rounded-full">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    activeSection === item.id 
                      ? "text-black z-10 font-semibold" 
                      : "text-gray-400 hover:text-white"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-nav-dot"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-md shadow-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-white/10 mx-3" />

            <button
              onClick={onDownloadResume}
              className="relative group px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full border border-white/20 hover:border-transparent text-xs font-semibold tracking-wide transition-all flex items-center space-x-1.5 cursor-pointer"
              id="resume-nav-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5 mt-3 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 layout flex flex-col items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-[1px] w-full bg-white/5 my-2" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onDownloadResume();
                }}
                className="w-full py-3 bg-white text-black font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-white/5 hover:bg-white/90 transition-colors"
                id="mobile-resume-btn"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
