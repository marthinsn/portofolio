import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, Cpu } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Portfolio", href: "#portfolio", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic active state detection
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveItem(navItems.find(item => item.href === `#${section}`)?.label || "Home");
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 px-6 py-4 ${
        scrolled ? "bg-background/40 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif font-bold text-xl text-white tracking-tighter"
        >
          M<span className="text-[#E4A390]">.</span>N
        </motion.div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.label} 
              item={item} 
              active={activeItem === item.label} 
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden"
        >
          {/* Mobile menu button could go here */}
          <div className="w-8 h-8 rounded-lg bg-[#E4A390]/10 border border-[#E4A390]/20 flex items-center justify-center">
            <div className="w-4 h-[1px] bg-[#E4A390] relative before:content-[''] before:absolute before:-top-1 before:left-0 before:w-4 before:h-[1px] before:bg-[#E4A390] after:content-[''] after:absolute after:top-1 after:left-0 after:w-4 after:h-[1px] after:bg-[#E4A390]" />
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

function NavLink({ item, active, onClick }: { item: typeof navItems[0], active: boolean, onClick: () => void }) {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        onClick();
      }}
      className="relative px-4 py-2 group"
    >
      <div className="relative z-10 flex items-center gap-2">
        <item.icon 
          size={14} 
          className={`transition-colors duration-300 ${active ? "text-[#E4A390]" : "text-white/40 group-hover:text-white/70"}`} 
        />
        <span className={`text-xs font-sans tracking-widest uppercase transition-colors duration-300 ${
          active ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
        }`}>
          {item.label}
        </span>
      </div>

      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-[#E4A390]/5 border border-[#E4A390]/20 rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </a>
  );
}
