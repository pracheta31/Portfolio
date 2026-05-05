import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    year: "Pursuing · 3rd Year",
    title: "B.E in Computer Engineering",
    place: "MBIT (Madhuben and Banubhai Patel Institute of Technology)",
    desc: "Focused on Data Structures, Web Development, and building real-world applications using MERN stack and AI.",
    active: true,
    badge: "In Progress",
    achievements: [
      "Built 2 production-ready projects with 50+ users",
      "Google & Microsoft Cybersecurity certified"
    ]
  },
  {
    year: "2021 – 2024",
    title: "Diploma in Computer Engineering",
    place: "Government Polytechnic, Ahmedabad",
    desc: "Strong foundation in programming fundamentals, database management, and software development.",
    active: false,
    badge: "8.00 CGPA",
    achievements: [
      "Graduated with 8.00 CGPA",
      "Built multiple academic projects"
    ]
  },
  {
    year: "2021",
    title: "SSC (10th Standard)",
    place: "Javiya Schooling System, Junagadh",
    desc: "Completed secondary education with strong academic performance and developed interest in technology.",
    active: false,
    badge: "91%",
    achievements: [
      "Scored 91% in board exams",
      "Developed early interest in computers"
    ]
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-900 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-indigo-400 font-mono text-xl">03.</span>
        <h2 className="text-3xl font-bold text-white">Education</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent ml-4" />
      </motion.div>

      <div className="max-w-2xl relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-800 overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-indigo-500 via-indigo-400 to-slate-700"
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : { height: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-8 pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute -left-[2.6rem] top-1.5">
                {item.active ? (
                  <>
                    <motion.div
                      className="absolute inset-0 w-3 h-3 rounded-full bg-indigo-500"
                      animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-3 h-3 rounded-full bg-indigo-400 border-2 border-indigo-300 relative z-10" />
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-500 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-300"
                  />
                )}
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl p-4 border transition-all duration-300 ${
                  item.active
                    ? "bg-indigo-500/5 border-indigo-500/30 group-hover:border-indigo-500/60"
                    : "bg-slate-800/40 border-slate-700/60 group-hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <span className="text-indigo-400 font-mono text-xs tracking-widest">{item.year}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                    item.active
                      ? "text-green-400 border-green-500/30 bg-green-500/10"
                      : "text-slate-400 border-slate-600 bg-slate-800"
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mt-1">{item.title}</h3>
                <p className="text-indigo-300/70 text-sm mt-0.5 mb-2">{item.place}</p>
                {item.desc && (
                  <p className="text-slate-400 text-xs leading-relaxed mb-2.5">{item.desc}</p>
                )}
                {item.achievements && (
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
