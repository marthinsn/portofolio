import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "./About";
import { SiWhatsapp } from "react-icons/si";
import { Mail, Send, Linkedin } from "lucide-react";
import LottieScene from "@/components/LottieScene";
import { FloatingDots } from "@/components/FloatingGeometry";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    background: "rgba(74,63,64,0.3)",
    border: `1px solid ${focused === field ? "rgba(228,163,144,0.5)" : "rgba(228,163,144,0.12)"}`,
    boxShadow: focused === field ? "0 0 0 3px rgba(228,163,144,0.12)" : "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    borderRadius: "12px",
    color: "rgba(255,255,255,0.9)",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
  });

  const contactLinks = [
    { icon: <SiWhatsapp size={18} />, label: "WhatsApp", value: "+62 812 6098 1186", href: "https://wa.me/6281260981186" },
    { icon: <Mail size={18} />, label: "Email", value: "mrthnnababan@gmail.com", href: "mailto:mrthnnababan@gmail.com" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "Marthin Nababan", href: "https://www.linkedin.com/in/marthin-nababan-3b18a9371" },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Floating dots */}
      <FloatingDots count={4} />

      {/* Lottie pulse rings — top-right decoration */}
      <div className="absolute top-4 right-4 w-[200px] h-[200px] pointer-events-none opacity-[0.14]">
        <LottieScene
          src="/animations/pulse-rings.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.35}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader
          label="Get In Touch"
          title={
            <>
              Let's
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}
              >
                Connect
              </span>
            </>
          }
        />
      </motion.div>

      <div ref={ref} className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="text-white/60 text-lg font-sans font-light leading-relaxed">
            Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open.
          </p>

          <div className="space-y-4">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                data-testid={`link-contact-${link.label.toLowerCase()}`}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 glass-card rounded-xl px-5 py-4 group hover:border-[#E4A390]/30 transition-all duration-300"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#D49C68] group-hover:text-[#E4A390] transition-colors shrink-0"
                  style={{ background: "rgba(138,79,85,0.2)" }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs font-sans tracking-wider uppercase">{link.label}</p>
                  <p className="text-white/80 text-sm font-sans mt-0.5">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Lottie particles — below contact links */}
          <div className="w-[180px] h-[180px] opacity-[0.28] pointer-events-none -ml-2">
            <LottieScene
              src="/animations/particles.json"
              style={{ width: "100%", height: "100%" }}
              speed={0.6}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center gap-4"
            >
              {/* Lottie success rings */}
              <div className="w-20 h-20">
                <LottieScene
                  src="/animations/pulse-rings.json"
                  style={{ width: "100%", height: "100%" }}
                  speed={1.2}
                />
              </div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #D49C6840, #E4A39040)" }}
              >
                <Send size={22} className="text-[#E4A390]" />
              </div>
              <h3 className="text-white font-serif text-xl">Message sent!</h3>
              <p className="text-white/50 text-sm font-sans">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 space-y-4">
              <div>
                <label className="text-white/40 text-xs font-sans tracking-wider uppercase block mb-2">
                  Name
                </label>
                <input
                  data-testid="input-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  style={inputStyle("name")}
                />
              </div>
              <div>
                <label className="text-white/40 text-xs font-sans tracking-wider uppercase block mb-2">
                  Email
                </label>
                <input
                  data-testid="input-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  style={inputStyle("email")}
                />
              </div>
              <div>
                <label className="text-white/40 text-xs font-sans tracking-wider uppercase block mb-2">
                  Message
                </label>
                <textarea
                  data-testid="input-message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  style={{ ...inputStyle("message"), resize: "none" }}
                />
              </div>
              <motion.button
                type="submit"
                data-testid="button-submit-contact"
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-sans font-medium text-[#28222C] transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#D49C68]/20"
                style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={15} />
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      <div className="mt-24 pt-8 border-t border-[#E4A390]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-sm font-sans">2026 Marthin S. Nababan. Crafted with intention.</p>
        <p className="text-white/20 text-xs font-sans tracking-widest uppercase">IT Student & Developer</p>
      </div>
    </section>
  );
}
