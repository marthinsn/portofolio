import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Users, Zap, Target, Star, Compass } from "lucide-react";
import LottieScene from "@/components/LottieScene";
import { FloatingDots } from "@/components/FloatingGeometry";

const strengths = [
  { icon: <Target size={20} />, label: "Problem Solving", desc: "Breaking down complex challenges into elegant solutions" },
  { icon: <Users size={20} />, label: "Team Collaboration", desc: "Thriving in cross-functional environments" },
  { icon: <Zap size={20} />, label: "Fast Learner", desc: "Adapting quickly to new technologies and frameworks" },
  { icon: <Compass size={20} />, label: "Adaptability", desc: "Navigating change with confidence and clarity" },
  { icon: <Star size={20} />, label: "Leadership", desc: "Inspiring teams and driving outcomes with purpose" },
];

function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="mb-14">
      <p className="text-[#E4A390] text-xs tracking-[0.35em] uppercase font-sans font-medium mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-white heading-glow">{title}</h2>
      <div className="mt-4 h-[1px] w-16 bg-gradient-to-r from-[#E4A390] to-transparent" />
    </div>
  );
}

export { SectionHeader };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  } as const;

  return (
    <section id="about" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Subtle floating dots in the background */}
      <FloatingDots count={5} />

      {/* Lottie particles — top-right corner decoration */}
      <div className="absolute top-0 right-0 w-[220px] h-[220px] pointer-events-none opacity-[0.22]">
        <LottieScene
          src="/animations/particles.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.5}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeInUp}>
          <SectionHeader
            label="Who I Am"
            title={
              <>
                About{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}
                >
                  Me
                  <br />
                </span>
              </>
            }
          />
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-16">
          <motion.div
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Lottie abstract illustration beside bio — minimal, geometric */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-[120px] h-[120px] pointer-events-none opacity-[0.20]">
                <LottieScene
                  src="/animations/pulse-rings.json"
                  style={{ width: "100%", height: "100%" }}
                  speed={0.3}
                />
              </div>
              <p className="text-white/70 text-lg leading-relaxed font-sans font-light italic border-l-2 border-[#E4A390] pl-4 mb-6">
                "Keep learning, keep building, and let every process shape you."
              </p>
              <p className="text-white/70 text-lg leading-relaxed font-sans font-light">
                I'm an Information Technology student at Telkom University with a deep passion for crafting digital experiences. 
                I specialize in bridging the gap between complex analytical problems and elegant technical solutions, particularly in web and mobile development.
              </p>
            </div>

            <p className="text-white/50 text-base leading-relaxed font-sans font-light">
              With a background in student leadership and event coordination, I bring strong communication and team collaboration skills to every technical project I undertake.
            </p>

            <div className="space-y-4 pt-2">
              <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans font-medium mb-5">Education</p>
              <div className="relative pl-5 border-l border-[#8A4F55]/40">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[1px] origin-top"
                  style={{ background: "linear-gradient(to bottom, #E4A390, #D49C68, transparent)" }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full border-2 border-[#E4A390] bg-[#28222C]" />
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-[#D49C68] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white font-serif font-semibold text-lg leading-tight">
                        S1 Teknologi Informasi
                      </p>
                      <p className="text-[#E4A390]/70 text-sm mt-1 font-sans">
                        Telkom University
                      </p>
                      <p className="text-white/40 text-xs mt-2 font-sans tracking-wide">2023 — Present</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans font-medium mb-6">Strengths</p>
            <div className="grid grid-cols-1 gap-3">
              {strengths.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 group cursor-default"
                  data-testid={`card-strength-${i}`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#D49C68] transition-colors group-hover:text-[#E4A390]"
                    style={{ background: "rgba(138,79,85,0.2)" }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white font-sans font-medium text-sm">{s.label}</p>
                    <p className="text-white/40 font-sans text-xs mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
