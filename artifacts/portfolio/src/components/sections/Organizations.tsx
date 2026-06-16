import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";
import { NetworkNodes } from "@/components/FloatingGeometry";

const orgs = [
  {
    name: "Student Developer Association",
    role: "Vice President",
    period: "2023 — Present",
    desc: "Led a team of 40+ members in organizing workshops, hackathons, and networking events that connected students with industry professionals.",
  },
  {
    name: "Open Source Club",
    role: "Core Maintainer",
    period: "2022 — 2023",
    desc: "Contributed to and maintained open-source projects, mentored junior contributors, and organized monthly code review sessions.",
  },
  {
    name: "Tech Innovation Lab",
    role: "Research Lead",
    period: "2023 — Present",
    desc: "Driving research initiatives in AI and web technologies, collaborating with faculty on applied research projects and industry partnerships.",
  },
  {
    name: "Google Developer Group",
    role: "Campus Lead",
    period: "2022 — Present",
    desc: "Facilitated Google-powered events and study jams, growing the campus community to 150+ active members.",
  },
];

export default function Organizations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="organizations" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Animated network nodes decoration — positioned in the section corners */}
      <div className="absolute top-8 right-4 opacity-40 pointer-events-none">
        <NetworkNodes />
      </div>
      <div
        className="absolute bottom-8 left-4 opacity-25 pointer-events-none"
        style={{ transform: "rotate(180deg) scaleX(-1)" }}
      >
        <NetworkNodes />
      </div>

      <SectionHeader
        label="Community"
        title={
          <>
            Organizations &amp;
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}
            >
              Involvement
            </span>
          </>
        }
      />

      <div ref={ref} className="relative">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] origin-top"
          style={{
            background: "linear-gradient(to bottom, #E4A390, #8A4F55, transparent)",
            height: "100%",
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-10">
          {orgs.map((org, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={org.name} className="relative flex items-center">
                {/* Timeline dot with pulse animation */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 border-[#E4A390] bg-[#28222C]"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#E4A390]/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-[calc(50%-2rem)] ${isLeft ? "mr-auto pr-6" : "ml-auto pl-6"}`}
                  data-testid={`card-org-${i}`}
                >
                  <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-serif font-semibold text-lg leading-tight">
                          {org.name}
                        </h3>
                        <p className="text-[#D49C68] text-sm font-sans mt-1">{org.role}</p>
                      </div>
                      <span className="text-[#E4A390]/40 text-xs font-sans whitespace-nowrap mt-1">
                        {org.period}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm font-sans leading-relaxed">{org.desc}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
