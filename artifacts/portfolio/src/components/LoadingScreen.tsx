import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIRST = "Alex".split("");
const LAST  = "Johnson".split("");

const ease = [0.22, 1, 0.36, 1] as const;
const dramatic = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#1E1922" }}
          exit={{ y: "-102%", transition: { duration: 0.75, ease: dramatic } }}
        >
          {/* ── Animated mesh blobs ────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                top: "-10%",
                right: "-8%",
                background:
                  "radial-gradient(circle, rgba(138,79,85,0.22) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                bottom: "-12%",
                left: "-6%",
                background:
                  "radial-gradient(circle, rgba(212,156,104,0.18) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, -25, 20, 0], y: [0, 25, -15, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 350,
                height: 350,
                top: "40%",
                left: "40%",
                background:
                  "radial-gradient(circle, rgba(228,163,144,0.10) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={{ x: [0, 20, -30, 0], y: [0, -30, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>

          {/* ── Subtle grid overlay ──────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(228,163,144,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(228,163,144,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── Center content ───────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center select-none">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease }}
              className="font-sans font-medium tracking-[0.45em] uppercase text-xs mb-8"
              style={{ color: "rgba(228,163,144,0.5)" }}
            >
              Portfolio
            </motion.p>

            {/* First name — "Alex" */}
            <div className="flex overflow-hidden mb-1" aria-label="Alex">
              {FIRST.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.055,
                    duration: 0.65,
                    ease,
                  }}
                  className="font-serif font-bold text-white text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
                  style={{
                    textShadow:
                      "0 0 60px rgba(228,163,144,0.35), 0 0 120px rgba(138,79,85,0.20)",
                    display: "inline-block",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Last name — "Johnson" (gradient) */}
            <div className="flex overflow-hidden" aria-label="Johnson">
              {LAST.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.45 + i * 0.055,
                    duration: 0.65,
                    ease,
                  }}
                  className="font-serif font-bold text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
                  style={{
                    display: "inline-block",
                    backgroundImage:
                      "linear-gradient(135deg, #E4A390 0%, #D49C68 55%, #8A4F55 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.7, ease }}
              className="mt-7 font-sans font-light text-sm tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Full Stack Developer &nbsp;·&nbsp; IT Student
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 220,
                  height: 1.5,
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #8A4F55, #D49C68, #E4A390)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                />
                {/* Glowing leading dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
                  style={{
                    background: "#E4A390",
                    boxShadow: "0 0 8px 3px rgba(228,163,144,0.7)",
                    marginLeft: -2.5,
                  }}
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Counter */}
              <ProgressCounter delay={1.0} duration={1500} />
            </motion.div>
          </div>

          {/* ── Bottom brand line ────────────────────────────────────── */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-[1px] w-12"
                style={{ background: "linear-gradient(to right, transparent, rgba(228,163,144,0.3))" }}
              />
              <span
                className="font-sans text-[10px] tracking-[0.4em] uppercase"
                style={{ color: "rgba(228,163,144,0.3)" }}
              >
                Loading
              </span>
              <div
                className="h-[1px] w-12"
                style={{ background: "linear-gradient(to left, transparent, rgba(228,163,144,0.3))" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressCounter({ delay, duration }: { delay: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startMs = delay * 1000;
    let raf: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, startMs);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [delay, duration]);

  return (
    <span
      className="font-sans text-[11px] tabular-nums tracking-widest"
      style={{ color: "rgba(228,163,144,0.4)" }}
    >
      {String(count).padStart(3, "\u2007")}%
    </span>
  );
}
