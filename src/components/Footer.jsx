import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitFork, Link2, Mail, Eye } from "lucide-react";
import { siteConfig } from "../data/config";

// on Vercel, frontend and API are on the same domain so we use relative paths
// locally, point to the dev server or the separate backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function Footer() {
  const icons = { github: GitFork, linkedin: Link2, email: Mail };
  const [launched, setLaunched] = useState(false);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    // ping the backend to increment + get count
    // using a sessionStorage flag so we only count once per browser session
    const alreadyCounted = sessionStorage.getItem("visited");

    if (!alreadyCounted) {
      fetch(`${BACKEND_URL}/api/visit`, { method: "POST" })
        .then(r => r.json())
        .then(data => {
          setVisitCount(data.count);
          sessionStorage.setItem("visited", "true");
        })
        .catch(() => {
          // if backend is down, just fetch the current count silently
          fetch(`${BACKEND_URL}/api/visits`)
            .then(r => r.json())
            .then(data => setVisitCount(data.count))
            .catch(() => setVisitCount(null));
        });
    } else {
      fetch(`${BACKEND_URL}/api/visits`)
        .then(r => r.json())
        .then(data => setVisitCount(data.count))
        .catch(() => setVisitCount(null));
    }
  }, []);

  function handleTop() {
    if (launched) return;
    setLaunched(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 320);
    setTimeout(() => setLaunched(false), 1400);
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-10 text-center bg-slate-900 border-t border-slate-800 relative"
    >
      {/* back to top */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleTop}
          className="relative flex flex-col items-center gap-1 group"
          aria-label="Back to top"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {launched ? (
                <motion.span
                  key="launch"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -60, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                  className="absolute text-xl"
                >
                  🚀
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl group-hover:scale-110 transition-transform"
                >
                  🚀
                </motion.span>
              )}
            </AnimatePresence>

            {launched && (
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full bg-orange-400"
                    style={{ width: 3 - i * 0.5, height: 3 - i * 0.5, opacity: 1 - i * 0.2 }}
                    animate={{ scaleY: [1, 1.5, 0.8, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.04 }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          <span className="text-slate-600 text-xs font-mono group-hover:text-indigo-400 transition-colors">
            back to top
          </span>
        </button>
      </div>

      {/* social icons */}
      <div className="flex justify-center gap-5 mb-5">
        {siteConfig.social.map(({ platform, url }) => {
          const Icon = icons[platform];
          return Icon ? (
            <motion.a
              key={platform}
              href={url}
              target={platform === "email" ? "_self" : "_blank"}
              rel={platform === "email" ? undefined : "noreferrer"}
              whileHover={{ y: -4 }}
              className="text-slate-500 hover:text-indigo-400 transition-all"
            >
              <Icon size={18} />
            </motion.a>
          ) : null;
        })}
      </div>

      <p className="text-slate-500 font-mono text-sm mb-3">
        Built by <span className="text-indigo-400">{siteConfig.owner.name}</span>
      </p>

      {/* visitor counter — only shows if backend is reachable */}
      {visitCount !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-1.5 text-slate-600 text-xs font-mono"
        >
          <Eye size={12} />
          <span>{visitCount.toLocaleString()} {visitCount === 1 ? "visit" : "visits"} so far</span>
        </motion.div>
      )}
    </motion.footer>
  );
}
