import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { siteConfig } from "../data/config";

function CountUp({ target, duration = 1.4 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const num = parseInt(target, 10);

  useEffect(() => {
    if (!inView || isNaN(num)) return;
    let start = 0;
    const steps = 40;
    const inc = num / steps;
    const interval = (duration * 1000) / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= num) {
        setVal(num);
        clearInterval(t);
      } else {
        setVal(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(t);
  }, [inView, num, duration]);

  return <span ref={ref}>{isNaN(num) ? target : val}</span>;
}

const internships = [
  { label: "ML Internship", place: "Infolabz IT Services", dur: "6 weeks" },
  { label: "Django Internship", place: "Infolabz IT Services", dur: "15 days" },
  { label: "Cyber Security Intern", place: "Jinarth Infotech", dur: "May 2026" },
  { label: "Microsoft Elevate AICTE", place: "Power BI project", dur: "2026" },
];

const certs = [
  { name: "Google Cybersecurity", via: "Coursera" },
  { name: "Microsoft Cybersecurity Analyst", via: "Coursera" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { owner, about } = siteConfig;

  return (
    <section id="about" className="py-16 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-800 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-indigo-400 font-mono text-xl">01.</span>
        <h2 className="text-3xl font-bold text-white">About Me</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent ml-4" />
      </motion.div>

      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 leading-relaxed text-lg mb-10"
        >
          {owner.bio}
        </motion.p>

        {/* stat cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-xs sm:max-w-md mb-10">
          {about.highlights.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="relative border border-slate-700 rounded-xl p-3 sm:p-5 text-center bg-slate-900/60 overflow-hidden group cursor-default min-w-0"
            >
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-all duration-300 rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-indigo-400 font-bold text-2xl relative z-10">
                <CountUp target={value} /><span className="text-indigo-300">+</span>
              </p>
              <p className="text-slate-400 text-xs mt-1 relative z-10">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* internships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase mb-3">Internships</p>
          <div className="flex flex-wrap gap-2">
            {internships.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.65 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 hover:border-indigo-500/40 rounded-lg px-3 py-2 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-medium">{item.label}</p>
                  <p className="text-slate-500 text-xs">{item.place} · {item.dur}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
        >
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase mb-3">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {certs.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-400/50 text-indigo-300 text-xs px-3 py-1.5 rounded-lg transition-all cursor-default"
              >
                <span className="text-indigo-400">✓</span>
                {c.name}
                <span className="text-indigo-500/60">· {c.via}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
