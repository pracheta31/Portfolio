import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "../data/config";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { projects } = siteConfig;

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-800" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14"
      >
        <span className="text-indigo-400 font-mono text-xl">03.</span>
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <div className="flex-1 h-px bg-slate-600 ml-4" />
      </motion.div>

      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all ${
              activeTag === tag
                ? "bg-indigo-500 text-white border-indigo-500"
                : "border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-indigo-400"
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {/* Project Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl"
      >
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden group flex flex-col hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
            >
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-xl">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shrink-0 ml-2">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {project.contribution && (
                  <div className="mb-4 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    <p className="text-slate-500 text-xs font-mono mb-1">My Contribution</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.contribution}</p>
                  </div>
                )}
                
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-2 text-center">
                        <p className="text-indigo-400 font-bold text-sm">{value}</p>
                        <p className="text-slate-500 text-xs capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-indigo-400 font-mono bg-indigo-400/10 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-700/50">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-sm transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition-all"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}