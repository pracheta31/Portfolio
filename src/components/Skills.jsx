import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "../data/config";

const skillMeta = {
  "React":        { level: "comfortable",  note: "building production apps" },
  "Node.js":      { level: "comfortable",  note: "RESTful APIs & backends" },
  "Express":      { level: "comfortable",  note: "server-side development" },
  "MongoDB":      { level: "comfortable",  note: "database design & queries" },
  "JavaScript":   { level: "comfortable",  note: "ES6+ & async patterns" },
  "HTML/CSS":     { level: "comfortable",  note: "responsive & modern UI" },
  "Git":          { level: "learning",     note: "version control & collaboration" },
  "Python":       { level: "learning",     note: "scripting & automation" },
  "Power BI":     { level: "learning",     note: "data visualization" },
  "C/C++":        { level: "exploring",    note: "fundamentals" },
  "Tableau":      { level: "exploring",    note: "basic dashboards" },
  "ML Basics":    { level: "exploring",    note: "learning concepts" },
};

const levelStyle = {
  "comfortable": { dot: "bg-indigo-400", text: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  "learning":    { dot: "bg-amber-400",  text: "text-amber-400",  bg: "bg-amber-500/10  border-amber-500/20"  },
  "exploring":   { dot: "bg-slate-500",  text: "text-slate-400",  bg: "bg-slate-700/40  border-slate-600/30"  },
};

function SkillCard({ name, icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const meta = skillMeta[name] ?? { level: "learning", note: "" };
  const s = levelStyle[meta.level];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.12 } }}
      className="flex items-center gap-2.5 bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 rounded-lg px-3 py-2.5 transition-all cursor-default w-full"
    >
      <img 
        src={icon} 
        alt={`${name} logo`}
        className="w-6 h-6 shrink-0 object-contain"
        style={{ filter: name === "Express" ? "invert(1)" : "none" }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="w-6 h-6 shrink-0 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400 text-xs font-bold hidden">
        {name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-medium mb-0.5">{name}</p>
        <p className="text-slate-500 text-xs truncate">{meta.note}</p>
      </div>

      <span className={`shrink-0 flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full border ${s.bg} ${s.text} whitespace-nowrap`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
        {meta.level}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { skills } = siteConfig;

  if (!skills.length) return null;

  return (
    <section id="skills" className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-900 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-5"
      >
        <span className="text-indigo-400 font-mono text-xl">02.</span>
        <h2 className="text-3xl font-bold text-white">Skills</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent ml-4" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15 }}
        className="text-slate-400 text-sm mb-6 max-w-md"
      >
        Technologies I use to build real-world applications
      </motion.p>

      {/* legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        {Object.entries(levelStyle).map(([label, s]) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            {label}
          </span>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-6">
        <div className="w-full">
          {["Core Skills"].map((group) => {
            const groupSkills = skills.filter(s => s.group === group);
            if (!groupSkills.length) return null;
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                  <p className="text-slate-400 font-mono text-xs tracking-wider uppercase">{group}</p>
                </div>

                <div className="space-y-2">
                  {groupSkills.map(({ name, icon }, i) => (
                    <SkillCard
                      key={name}
                      name={name}
                      icon={icon}
                      delay={0.3 + i * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6 w-full">
          {["Working Knowledge", "Familiar With"].map((group, gi) => {
            const groupSkills = skills.filter(s => s.group === group);
            if (!groupSkills.length) return null;
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.32 + gi * 0.07, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                  <p className="text-slate-400 font-mono text-xs tracking-wider uppercase">{group}</p>
                </div>

                <div className="space-y-2">
                  {groupSkills.map(({ name, icon }, i) => (
                    <SkillCard
                      key={name}
                      name={name}
                      icon={icon}
                      delay={0.4 + gi * 0.07 + i * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
