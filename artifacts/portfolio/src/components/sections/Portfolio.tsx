import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "./About";
import { X, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "OnlyCats Website",
    description: "A comprehensive cat rescue and adoption platform designed to connect rescuers with potential adopters. Features role-based access for Admin, Clinic, and Rescuer.",
    longDescription: "OnlyCats Website adalah platform manajemen rescue dan adopsi kucing yang terintegrasi. Website ini memfasilitasi tiga peran utama: Admin untuk manajemen sistem, Rescuer untuk pendataan kucing terlantar, dan Clinic untuk dukungan medis. Dibangun dengan fokus pada efisiensi alur kerja penyelamatan hewan.",
    tech: ["Laravel", "MySQL", "JavaScript", "Tailwind"],
    image: "/images/web-admin-role.jpg",
    gallery: [
      { url: "/images/web-admin-role.jpg", title: "Admin Dashboard" },
      { url: "/images/web-rescuer-role.jpg", title: "Rescuer Portal" },
      { url: "/images/web-clinic-role.jpg", title: "Clinic Interface" }
    ],
    color: "#E4A390",
    size: "large",
    features: ["Role-based access (Admin, Clinic, Rescuer)", "Full CRUD functionality", "Activity monitoring", "Medical history tracking"],
    challenges: "Synchronizing status updates across multiple user roles while maintaining data integrity.",
  },
  {
    title: "OnlyCats Mobile",
    description: "Mobile application for the OnlyCats ecosystem, providing a portable way to manage rescues and adoptions using Flutter and Firebase.",
    longDescription: "Aplikasi mobile yang melengkapi ekosistem OnlyCats. Dirancang untuk memberikan kemudahan bagi Rescuer di lapangan dalam mendata kucing secara real-time. Menggunakan Firebase untuk sinkronisasi data instan dan Cloudinary untuk penyimpanan foto dokumentasi yang efisien.",
    tech: ["Flutter", "Dart", "Firebase", "Cloudinary"],
    image: "/images/rescuerapb.png",
    gallery: [
      { url: "/images/adminapb.png", title: "Admin View" },
      { url: "/images/rescuerapb.png", title: "Rescuer View" }
    ],
    color: "#D49C68",
    size: "small",
    features: ["Real-time synchronization", "Media storage integration", "Firebase Authentication", "Optimized mobile UI"],
    challenges: "Optimizing image uploads and handling large media files over mobile networks.",
  },
  {
    title: "OnlyCats Java OOP",
    description: "A desktop implementation of the OnlyCats system focusing on robust Object-Oriented Programming principles and MySQL connectivity.",
    longDescription: "Implementasi desktop dari sistem OnlyCats yang menitikberatkan pada arsitektur perangkat lunak berbasis objek. Project ini mendemonstrasikan penerapan pola desain OOP dalam mengelola relasi data yang kompleks antara kucing, klinik, dan rescuer.",
    tech: ["Java", "OOP", "MySQL", "Swing"],
    image: "/images/admin-role.jpg",
    gallery: [
      { url: "/images/admin-role.jpg", title: "Dashboard Admin (Java)" },
      { url: "/images/rescuer-role.jpg", title: "Rescuer Page" },
      { url: "/images/clinic-role.jpg", title: "Clinic Page" }
    ],
    color: "#4A3F40",
    size: "large",
    features: ["Modular architecture", "Complex SQL relations", "User Authentication", "Desktop Swing UI"],
    challenges: "Mapping complex object relationships to a relational database using pure Java.",
  },
  {
    title: "IoT Monitoring System",
    description: "Hardware and software solution for monitoring workstation ergonomics, specifically monitor distance and sitting duration.",
    longDescription: "Project riset Internet of Things yang menggabungkan sensor hardware dengan pengolahan data untuk meningkatkan kesehatan kerja. Sistem ini memantau jarak pandang mata ke monitor dan durasi duduk pengguna untuk mencegah kelelahan fisik.",
    tech: ["IoT", "Hardware Integration", "C++", "Sensors"],
    image: "/images/iot-monitoring-paper.png",
    gallery: [
      { url: "/images/iot-monitoring-paper.png", title: "Research Documentation" }
    ],
    color: "#8A4F55",
    size: "small",
    features: ["Real-time distance measurement", "Ergonomic alerts", "Sitting duration tracking", "Research paper output"],
    challenges: "Ensuring sensor accuracy and low-latency feedback for real-time ergonomics monitoring.",
  },
  {
    title: "Ethical Hacking Bootcamp",
    description: "Intensive training on cybersecurity fundamentals, vulnerability assessment, and defensive strategies by JagoanSiber.",
    longDescription: "Program pelatihan intensif untuk mendalami cara berpikir seorang 'Ethical Hacker'. Mencakup pembelajaran tentang keamanan jaringan, identifikasi celah keamanan (vulnerability assessment), dan strategi pertahanan sistem digital.",
    tech: ["Cybersecurity", "Networking", "Penetration Testing"],
    image: "/images/jagoansiber-certificate.jpg",
    gallery: [
      { url: "/images/jagoansiber-certificate.jpg", title: "Completion Certificate" }
    ],
    color: "#E4A390",
    size: "small",
    features: ["Vulnerability assessment", "Network security fundamentals", "Defensive strategies", "Cybersecurity mindset"],
    challenges: "Identifying and mitigating security risks in controlled virtual environments.",
  },
];

type Project = typeof projects[0];

function ProjectCard({ project, i, onClick }: { project: Project; i: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
      data-testid={`card-project-${i}`}
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:border-[#E4A390]/30 transition-all duration-400">
        <div className="h-48 relative overflow-hidden bg-slate-900">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(40,34,44,0.7)", backdropFilter: "blur(4px)" }}
          >
            <div className="flex flex-col items-center gap-2">
               <span className="text-white/80 font-sans text-sm tracking-widest uppercase">View Details</span>
               {project.gallery.length > 1 && (
                 <span className="text-white/40 text-[10px] font-sans">+{project.gallery.length - 1} more images</span>
               )}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] font-sans tracking-wider text-white/60 rounded-full" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-white font-serif font-semibold text-lg leading-tight mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm font-sans leading-relaxed line-clamp-2">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "rgba(40,34,44,0.85)", backdropFilter: "blur(16px)" }} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project"
      >
        <button
          data-testid="button-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={16} />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-3/5 bg-slate-950 flex flex-col relative border-r border-white/5">
          <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={project.gallery[activeImage].url}
                alt={project.gallery[activeImage].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
            
            {/* Gallery Label Overlay */}
            <div className="absolute bottom-4 left-6 right-6">
               <p className="text-white/40 text-[10px] uppercase tracking-widest font-sans bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                 {project.gallery[activeImage].title}
               </p>
            </div>
          </div>
          
          {/* Thumbnails */}
          {project.gallery.length > 1 && (
            <div className="h-20 border-t border-white/5 flex gap-2 p-3 overflow-x-auto scrollbar-hide">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-full aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === idx ? "border-[#E4A390]" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-2/5 p-7 md:p-8 overflow-y-auto custom-scrollbar">
          <p className="text-[#E4A390] text-xs tracking-[0.3em] uppercase font-sans mb-2">Project Detail</p>
          <h2 className="text-white font-serif font-bold text-3xl mb-4">{project.title}</h2>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 text-[10px] font-sans text-white/50 rounded-full border border-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-white/80 font-sans text-sm leading-relaxed mb-4">
                {project.longDescription}
              </p>
            </div>

            <div>
              <p className="text-[#E4A390] text-xs tracking-[0.2em] uppercase font-sans mb-3">Key Features</p>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="text-white/60 text-[13px] font-sans flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D49C68] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-3">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[#28222C] text-xs font-sans font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
              <a
                href="#"
                className="w-12 flex items-center justify-center rounded-xl text-white/70 border border-white/10 hover:border-[#E4A390]/30 hover:text-white transition-all"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-28 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader label="Work" title={<>Selected<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}>Projects</span></>} />
      </motion.div>

      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
