import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Users, Zap, Target, Star, Compass } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto">
      <SectionHeader label="Who I Am" title={<>About <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}>Me<br /></span></>} />

      <div ref={ref} className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="text-white/70 text-lg leading-relaxed font-sans font-light">
            I'm an Information Technology student with a deep passion for crafting digital experiences that are both functional and visually compelling. I bridge the gap between design thinking and technical execution — every project I touch is shaped by curiosity, precision, and care.
          </p>
          <p className="text-white/50 text-base leading-relaxed font-sans font-light">
            When I'm not building, I'm learning — exploring the edges of modern web development, open-source tooling, and system design patterns that scale.
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
                    <p className="text-white font-serif font-semibold text-lg leading-tight">Bachelor of Information Technology</p>
                    <p className="text-[#E4A390]/70 text-sm mt-1 font-sans">State University &nbsp;·&nbsp; Currently in Semester 5</p>
                    <p className="text-white/40 text-xs mt-2 font-sans tracking-wide">2022 — Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans font-medium mb-6">Strengths</p>
          <div className="grid grid-cols-1 gap-3">
            {strengths.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-4 flex items-center gap-4 group cursor-default"
                data-testid={`card-strength-${i}`}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#D49C68] transition-colors group-hover:text-[#E4A390]" style={{ background: "rgba(138,79,85,0.2)" }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-sans font-medium text-sm">{s.label}</p>
                  <p className="text-white/40 font-sans text-xs mt-0.5">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
