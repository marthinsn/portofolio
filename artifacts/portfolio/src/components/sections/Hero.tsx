import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";
import LottieScene from "@/components/LottieScene";
import { FloatingRings, FloatingDots } from "@/components/FloatingGeometry";

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
};

function MagneticButton({
  children,
  className,
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

const heroRings = [
  { size: 480, x: "55%",  y: "-15%", duration: 42, opacity: 0.05, border: "#E4A390", rotate: 10 },
  { size: 300, x: "68%",  y: "5%",   duration: 28, opacity: 0.07, border: "#D49C68", rotate: -25, delay: 2 },
  { size: 180, x: "76%",  y: "28%",  duration: 20, opacity: 0.08, border: "#8A4F55", rotate: 50, delay: 5 },
  { size: 560, x: "60%",  y: "30%",  duration: 50, opacity: 0.03, border: "#E4A390", rotate: -5, delay: 1 },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden"
    >
      {/* Parallax radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(138,79,85,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Premium floating rings */}
      <FloatingRings rings={heroRings} />

      {/* Subtle floating dots */}
      <FloatingDots count={6} />

      {/* Lottie pulse rings — right side, very subtle */}
      <div className="absolute right-[-4%] top-[-4%] w-[520px] h-[520px] pointer-events-none opacity-[0.18]">
        <LottieScene
          src="/animations/pulse-rings.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.4}
        />
      </div>

      {/* Lottie floating particles — bottom-right */}
      <div className="absolute right-[8%] bottom-[12%] w-[240px] h-[240px] pointer-events-none opacity-[0.25]">
        <LottieScene
          src="/animations/particles.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.7}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.p
            variants={stagger.item}
            className="text-[#E4A390] text-sm tracking-[0.3em] uppercase font-sans font-medium"
          >
            Welcome
          </motion.p>

          <motion.div variants={stagger.item} className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tight heading-glow">
              Alex
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #E4A390 0%, #D49C68 50%, #8A4F55 100%)",
                }}
              >
                Johnson
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={stagger.item}
            className="text-[#E4A390]/80 text-base md:text-lg tracking-widest uppercase font-sans font-light max-w-xl"
          >
            Information Technology Student &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; Problem Solver
          </motion.p>

          <motion.p
            variants={stagger.item}
            className="text-white/60 text-lg md:text-xl font-sans font-light max-w-lg leading-relaxed"
          >
            I build modern digital solutions that combine functionality, creativity, and user experience.
          </motion.p>

          <motion.div variants={stagger.item} className="flex flex-wrap gap-4 pt-4">
            <MagneticButton
              data-testid="button-view-work"
              className="px-8 py-3 rounded-full font-sans font-medium text-[#28222C] transition-all duration-300 hover:shadow-lg hover:shadow-[#D49C68]/20"
              style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
              onClick={() =>
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </MagneticButton>

            <MagneticButton
              data-testid="button-download-cv"
              className="px-8 py-3 rounded-full font-sans font-medium text-[#E4A390] border border-[#E4A390]/30 hover:border-[#E4A390]/70 hover:bg-[#E4A390]/5 transition-all duration-300"
              onClick={() => {}}
            >
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div variants={stagger.item} className="flex gap-5 pt-2">
            {[
              { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
              { icon: <SiWhatsapp size={18} />, href: "#", label: "WhatsApp" },
              { icon: <Mail size={18} />, href: "mailto:", label: "Email" },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                data-testid={`link-social-${label.toLowerCase()}`}
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center glass-card text-[#E4A390]/60 hover:text-[#E4A390] hover:border-[#E4A390]/40 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase font-sans">Scroll</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-[#E4A390]/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
