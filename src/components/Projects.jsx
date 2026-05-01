import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GitFork, ExternalLink, FolderOpen } from "lucide-react";
import { siteConfig } from "../data/config";

const projectScreenshots = {
  "FreelanceHub": ["/fl-1.png", "/fl-2.png", "/fl-3.png"],
  "SatConnect Intelligence Platform": ["/sat-1.png", "/sat-2.png", "/sat-3.png"],
};

const projectMeta = {
  "FreelanceHub": {
    what: "A freelancing platform I built solo as a learning project.",
    highlights: [
      "Role-based login (client + freelancer)",
      "Contracts with milestones",
      "Dashboards for both sides",
    ],
    stat: { val: "100%", label: "solo built" },
  },
  "SatConnect Intelligence Platform": {
    what: "Power BI dashboard made for Microsoft Elevate AICTE Internship 2026.",
    highlights: [
      "24+ Power BI features used",
      "ArcGIS maps + forecasting",
      "Data from World Bank, TRAI, ITU",
    ],
    stat: { val: "38.68%", label: "global coverage in 2023" },
  },
};

function BrowserMockup({ images, title }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images?.length) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 2800);
    return () => clearInterval(t);
  }, [images]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl shadow-indigo-500/10">
      {/* fake browser bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 min-w-0 mx-2 bg-slate-700/60 rounded-md px-2 py-1 text-slate-500 text-xs font-mono truncate">
          localhost:5173/{title.toLowerCase().replace(/\s+/g, "-")}
        </div>
      </div>

      {/* image area */}
      <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
        {images?.length ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={images[idx]}
                alt={`${title} screenshot`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === idx ? "w-5 bg-indigo-400" : "w-1.5 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-slate-900 flex items-center justify-center">
            <span className="text-5xl opacity-20">🖥️</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const { projects } = siteConfig;
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  const visibleOthers = showAll ? others : others.slice(0, 3);

  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-800" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10 sm:mb-14"
      >
        <span className="text-indigo-400 font-mono text-xl">04.</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Projects</h2>
        <div className="flex-1 h-px bg-slate-600 ml-4" />
      </motion.div>

      {projects.length === 0 ? (
        <p className="text-slate-500 font-mono text-sm">Projects coming soon — check back later.</p>
      ) : (
        <>
          {/* featured — stacks on mobile, side-by-side on md+ with alternating layout */}
          <div className="space-y-16 sm:space-y-20 mb-16 sm:mb-20">
            {featured.map((project, i) => {
              const meta = projectMeta[project.title];
              const flip = i % 2 !== 0;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.15 }}
                >
                  <div className={`flex flex-col md:flex-row gap-6 md:gap-10 items-start ${flip ? "md:flex-row-reverse" : ""}`}>

                    {/* image */}
                    <div className="w-full md:w-1/2 shrink-0">
                      <BrowserMockup images={projectScreenshots[project.title]} title={project.title} />
                    </div>

                    {/* content */}
                    <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4">
                      <div>
                        <p className="text-indigo-400 font-mono text-xs tracking-widest mb-1">Featured Project</p>
                        <h3 className="text-white text-xl sm:text-2xl font-bold">{project.title}</h3>
                        {meta && <p className="text-slate-400 text-sm mt-1">{meta.what}</p>}
                      </div>

                      <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-3 sm:p-4">
                        <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                      </div>

                      {meta?.highlights && (
                        <ul className="space-y-1.5">
                          {meta.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-sm text-slate-400">
                              <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-start gap-3 flex-wrap">
                        {project.contribution && (
                          <p className="text-indigo-300/70 text-xs italic flex-1 min-w-0">
                            ↳ {project.contribution}
                          </p>
                        )}
                        {meta?.stat && (
                          <div className="shrink-0 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-indigo-300 font-bold text-sm font-mono">{meta.stat.val}</p>
                            <p className="text-slate-500 text-xs">{meta.stat.label}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="bg-indigo-500/10 text-indigo-300 font-mono text-xs px-2.5 py-1 rounded-full border border-indigo-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-1 flex-wrap">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.04 }}
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm border border-slate-600 text-slate-300 hover:border-indigo-400 hover:text-indigo-400 px-4 py-2 rounded-lg transition-all"
                          >
                            <GitFork size={14} /> GitHub
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            whileHover={{ scale: 1.04 }}
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all"
                          >
                            <ExternalLink size={14} /> Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* other projects */}
          {others.length > 0 && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-center text-slate-400 font-mono text-sm mb-8 sm:mb-10"
              >
                Other things I&apos;ve built
              </motion.p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
                {visibleOthers.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -6, borderColor: "#818cf8" }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-5 sm:p-6 flex flex-col gap-4 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    <div className="flex justify-between items-start">
                      <FolderOpen size={26} className="text-indigo-400" />
                      <div className="flex gap-3">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                            <GitFork size={17} />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                            <ExternalLink size={17} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-indigo-300 font-mono text-xs">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {others.length > 3 && (
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setShowAll(!showAll)}
                    className="border border-indigo-400 text-indigo-400 px-6 py-2.5 rounded-lg font-mono text-sm hover:bg-indigo-400/10 transition"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </motion.button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
