import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiLaravel,
  SiMysql, SiPostgresql, SiMongodb,
  SiGit, SiDocker, SiFigma
} from "react-icons/si";

const categories = [
  {
    name: "Frontend",
    color: "#E4A390",
    skills: [
      { name: "HTML5", icon: <SiHtml5 />, level: 95 },
      { name: "CSS3", icon: <SiCss />, level: 90 },
      { name: "JavaScript", icon: <SiJavascript />, level: 88 },
      { name: "React", icon: <SiReact />, level: 85 },
      { name: "Next.js", icon: <SiNextdotjs />, level: 78 },
    ],
  },
  {
    name: "Backend",
    color: "#D49C68",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, level: 82 },
      { name: "Express", icon: <SiExpress />, level: 80 },
      { name: "Laravel", icon: <SiLaravel />, level: 72 },
    ],
  },
  {
    name: "Database",
    color: "#8A4F55",
    skills: [
      { name: "MySQL", icon: <SiMysql />, level: 85 },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 78 },
      { name: "MongoDB", icon: <SiMongodb />, level: 75 },
    ],
  },
  {
    name: "Tools",
    color: "#E4A390",
    skills: [
      { name: "Git", icon: <SiGit />, level: 90 },
      { name: "Docker", icon: <SiDocker />, level: 68 },
      { name: "Figma", icon: <SiFigma />, level: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto">
      <SectionHeader label="Expertise" title={<>Technical<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}>Skills</span></>} />

      <div ref={ref} className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: ci * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-6"
            data-testid={`card-skill-category-${ci}`}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
              <h3 className="text-white font-sans font-semibold text-sm tracking-widest uppercase">{cat.name}</h3>
            </div>

            <div className="space-y-5">
              {cat.skills.map((skill, si) => (
                <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase()}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#E4A390]/60 text-base">{skill.icon}</span>
                      <span className="text-white/80 text-sm font-sans">{skill.name}</span>
                    </div>
                    <span className="text-[#E4A390]/50 text-xs font-sans">{skill.level}%</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${cat.color}99, ${cat.color})` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: ci * 0.15 + si * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
