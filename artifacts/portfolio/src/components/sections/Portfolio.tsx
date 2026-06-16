import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "./About";
import { X, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Luminary CMS",
    description: "A headless CMS with a beautiful editor experience, real-time collaboration, and flexible content modeling.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    color: "#8A4F55",
    size: "large",
    features: ["Real-time multi-user editing", "Custom content types", "Media asset management", "API-first architecture"],
    challenges: "Implemented operational transformation for conflict-free concurrent editing without external dependencies.",
  },
  {
    title: "Orbital Finance",
    description: "Personal finance dashboard with smart categorization and visual spending insights.",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    color: "#D49C68",
    size: "small",
    features: ["Smart transaction categorization", "Visual spending trends", "Budget goal tracking", "Export to CSV/PDF"],
    challenges: "Built a rule engine that auto-categorizes transactions with 94% accuracy using pattern matching.",
  },
  {
    title: "Archival",
    description: "Knowledge management tool for developers — capture, link, and retrieve anything fast.",
    tech: ["React", "Express", "SQLite"],
    color: "#E4A390",
    size: "small",
    features: ["Bi-directional linking", "Fuzzy full-text search", "Markdown support", "Keyboard-first navigation"],
    challenges: "Implemented a graph-based data structure for bi-directional note linking with cycle detection.",
  },
  {
    title: "Pulse Social",
    description: "Minimalist micro-blogging platform focused on authentic, unalgorithmic sharing.",
    tech: ["Next.js", "PostgreSQL", "Redis"],
    color: "#4A3F40",
    size: "large",
    features: ["Chronological feed only", "No engagement metrics", "Thread conversations", "End-to-end encrypted DMs"],
    challenges: "Designed a fan-out-on-write architecture that handles 10k concurrent users on minimal infrastructure.",
  },
  {
    title: "Codelab IDE",
    description: "Browser-based IDE with containerized execution environments for teaching programming.",
    tech: ["React", "Docker", "Node.js", "Monaco"],
    color: "#8A4F55",
    size: "small",
    features: ["Isolated execution sandboxes", "Syntax highlighting for 20+ languages", "Live output streaming", "Assignment auto-grading"],
    challenges: "Streamed stdout/stderr in real-time over SSE while enforcing per-container memory and CPU limits.",
  },
  {
    title: "Wavelength",
    description: "Collaborative mood board and design system builder for creative teams.",
    tech: ["React", "Canvas API", "Firebase"],
    color: "#D49C68",
    size: "small",
    features: ["Infinite canvas with zoom/pan", "Component library builder", "Token export to CSS/JSON", "Multi-user presence"],
    challenges: "Built an infinite canvas renderer in pure Canvas API that stays smooth at 60fps with thousands of objects.",
  },
];

type Project = typeof projects[0];

function ProjectCard({ project, i, onClick }: { project: Project; i: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
      data-testid={`card-project-${i}`}
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:border-[#E4A390]/30 transition-all duration-400">
        <div
          className="h-48 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(40,34,44,0.7)", backdropFilter: "blur(4px)" }}
          >
            <span className="text-white/80 font-sans text-sm tracking-widest uppercase">View Details</span>
          </div>
          <motion.div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 30% 50%, ${project.color}40 0%, transparent 60%)` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] font-sans tracking-wider text-white/60 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-white font-serif font-semibold text-lg leading-tight mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm font-sans leading-relaxed">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "rgba(40,34,44,0.85)", backdropFilter: "blur(16px)" }} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project"
      >
        <button
          data-testid="button-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={16} />
        </button>

        <div
          className="h-52 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}15)` }}
        >
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 40% 60%, ${project.color}50 0%, transparent 65%)` }} />
          <div className="absolute bottom-5 left-6 flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-sans text-white/70 rounded-full" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-7 space-y-5">
          <h2 className="text-white font-serif font-bold text-2xl">{project.title}</h2>
          <p className="text-white/60 font-sans text-sm leading-relaxed">{project.description}</p>

          <div>
            <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans mb-3">Key Features</p>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="text-white/60 text-sm font-sans flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D49C68] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans mb-2">Engineering Challenge</p>
            <p className="text-white/50 text-sm font-sans leading-relaxed italic">{project.challenges}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href="#"
              data-testid="link-live-demo"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[#28222C] text-sm font-sans font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
            <a
              href="#"
              data-testid="link-github"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white/70 text-sm font-sans border border-white/10 hover:border-[#E4A390]/30 hover:text-white transition-all"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto">
      <SectionHeader label="Work" title={<>Selected<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}>Projects</span></>} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} i={i} onClick={() => setSelected(p)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
