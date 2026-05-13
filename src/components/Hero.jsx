import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GitFork, Link2, Mail, ArrowDown } from "lucide-react";
import { siteConfig } from "../data/config";

// airport departure board — split-flap display
// each tile flips through chars before landing on the target letter

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// one tile — flips through chars then settles
function FlapTile({ target, delay }) {
  const [face, setFace] = useState(" ");
  const [settled, setSettled] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setFace(" ");
    setSettled(false);

    const t = setTimeout(() => {
      let i = 0;
      const upper = target.toUpperCase();
      const targetIdx = FLAP_CHARS.indexOf(upper) === -1 ? 0 : FLAP_CHARS.indexOf(upper);

      timerRef.current = setInterval(() => {
        const ch = FLAP_CHARS[i % FLAP_CHARS.length];
        setFace(ch);
        i++;
        // stop a couple steps before target then snap
        if (i > targetIdx + 2) {
          clearInterval(timerRef.current);
          setFace(upper === " " ? "\u00A0" : upper);
          setSettled(true);
        }
      }, 55);
    }, delay);

    return () => {
      clearTimeout(t);
      clearInterval(timerRef.current);
    };
  }, [target, delay]);

  return (
    <span
      className="inline-flex items-center justify-center rounded-sm font-bold font-mono relative overflow-hidden"
      style={{
        width: "1.05ch",
        background: settled ? "transparent" : "rgba(99,102,241,0.06)",
        color: settled ? "#818cf8" : "#6366f1",
        transition: "background 0.3s, color 0.2s",
        textShadow: settled ? "0 0 14px rgba(129,140,248,0.5)" : "none",
      }}
    >
      {/* horizontal scan line that sweeps during flip */}
      {!settled && (
        <motion.span
          className="absolute left-0 right-0 h-px bg-indigo-400/40 pointer-events-none"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 0.055 * FLAP_CHARS.length, repeat: Infinity, ease: "linear" }}
        />
      )}
      {face}
    </span>
  );
}

// space tile — just a gap
function FlapSpace() {
  return <span className="inline-block" style={{ width: "0.6ch" }} />;
}

// full departure board for one role string
function DepartureBoard({ text }) {
  return (
    <span className="inline-flex items-center gap-0">
      {text.split("").map((ch, i) =>
        ch === " "
          ? <FlapSpace key={i} />
          : <FlapTile key={`${text}-${i}`} target={ch} delay={i * 60} />
      )}
    </span>
  );
}

// cycles through roles, re-mounts board on each change
function RoleBoard({ titles }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // wait for current board to finish settling, then cycle
    const maxLen = titles[idx].replace(/ /g, "").length;
    const settleTime = maxLen * 60 + 55 * FLAP_CHARS.length + 2200;
    const t = setTimeout(() => {
      setIdx(i => (i + 1) % titles.length);
    }, settleTime);
    return () => clearTimeout(t);
  }, [idx, titles]);

  return <DepartureBoard key={idx} text={titles[idx]} />;
}

export default function Hero() {
  const { owner, hero, social } = siteConfig;
  const sectionRef = useRef(null);

  const icons = { github: GitFork, linkedin: Link2, email: Mail };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const letters = owner.name.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden bg-slate-900"
    >
      {/* mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full blur-[100px] pointer-events-none"
      />

      {/* content — split layout */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        
        {/* Left side - Text content */}
        <div>

        {/* status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1.5 mb-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-slate-400 text-xs font-mono">Available for opportunities</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-indigo-400 font-mono text-sm mb-4 tracking-widest"
        >
          Hi, I'm
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight flex flex-wrap">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 120 }}
              whileHover={{ color: "#818cf8", y: -5, transition: { duration: 0.15 } }}
              className="text-white cursor-default inline-block"
              style={{ whiteSpace: l === " " ? "pre" : "normal" }}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </h1>

        {/* role line — departure board flip animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-6 text-xl sm:text-2xl md:text-3xl font-semibold"
        >
          <span className="text-slate-400 font-normal">I'm a</span>
          <RoleBoard titles={hero.titles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="text-slate-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed"
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <motion.a
            whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(99,102,241,0.55)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-6 py-2.5 bg-indigo-500 text-white rounded-lg font-medium text-sm sm:text-base"
          >
            View My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            href={owner.resumeUrl}
            download="Pracheta_Resume.pdf"
            className="px-6 py-2.5 border border-indigo-400 text-indigo-400 rounded-lg font-medium hover:bg-indigo-400/10 transition text-sm sm:text-base"
          >
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-5"
        >
          {social.map(({ platform, url }, i) => {
            const Icon = icons[platform];
            return Icon ? (
              <motion.a
                key={platform}
                href={url}
                target={platform === "email" ? "_self" : "_blank"}
                rel={platform === "email" ? undefined : "noreferrer"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.2 }}
                className="text-slate-400 hover:text-indigo-400 transition-all"
              >
                <Icon size={20} />
              </motion.a>
            ) : null;
          })}
        </motion.div>
        </div>

        {/* Right side - Professional Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full lg:w-auto"
        >
          <div className="relative">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 relative overflow-hidden max-w-xs mx-auto lg:mx-0"
            >
              
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-base">💼</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xs">Open to Work</div>
                    <div className="text-slate-400 text-[10px]">Available now</div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎯</span>
                    <span className="text-white text-[11px]">Internships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💼</span>
                    <span className="text-white text-[11px]">Freelance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🤝</span>
                    <span className="text-white text-[11px]">Collaborations</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Response</span>
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-1 bg-green-400 rounded-full"
                    ></motion.div>
                    <span className="text-green-400">24h</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-slate-500 text-xs font-mono tracking-widest">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} className="text-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
