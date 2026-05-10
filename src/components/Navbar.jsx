import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../data/config";

const links = ["About", "Skills", "Education", "Projects", "Contact"];

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  const ss = time.getSeconds().toString().padStart(2, "0");

  return (
    <span className="hidden sm:flex items-center gap-1 font-mono text-xs text-slate-500 select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      {hh}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-slate-600"
      >:</motion.span>
      {mm}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-slate-600"
      >:</motion.span>
      {ss}
      <span className="text-slate-600 ml-0.5">IST</span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = links.map((l) => l.toLowerCase());
      for (let sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(sec);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault();
    const section = document.getElementById(link.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/60 backdrop-blur-xl border-b border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      {/* scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 origin-left"
        style={{ scaleX }}
      />
      {/* Logo + clock */}
      <div className="flex items-center gap-4">
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          className="text-indigo-400 font-bold text-lg font-mono cursor-pointer tracking-wider"
        >
          &lt;Pracheta /&gt;
        </motion.a>
        <LiveClock />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8">
        {links.map((link, i) => (
          <motion.li
            key={link}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
          >
            <a
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleClick(e, link)}
              className={`relative font-mono text-sm transition-all duration-300 ${
                active === link.toLowerCase()
                  ? "text-indigo-400"
                  : "text-slate-300 hover:text-indigo-400"
              }`}
            >
              <span className="mr-1 text-xs text-indigo-400">
                0{i + 1}.
              </span>
              {link}

              {/* Glow underline */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  active === link.toLowerCase()
                    ? "w-full bg-indigo-400 shadow-[0_0_10px_#6366f1]"
                    : "w-0 bg-indigo-400 group-hover:w-full"
                }`}
              />
            </a>
          </motion.li>
        ))}

        {/* Resume */}
        <motion.li
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href={siteConfig.owner.resumeUrl}
            download="Pracheta_Resume.pdf"
            className="border border-indigo-400 text-indigo-400 px-4 py-1.5 rounded-lg font-mono text-sm hover:bg-indigo-400/10 hover:shadow-[0_0_15px_#6366f1] transition-all"
          >
            Resume
          </a>
        </motion.li>
      </ul>

      {/* Mobile Button */}
      <button
        className="md:hidden text-slate-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 right-4 left-4 sm:left-auto sm:w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl p-6 flex flex-col gap-5 md:hidden shadow-2xl"
          >
            {links.map((link, i) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleClick(e, link)}
                  className={`block font-mono transition ${
                    active === link.toLowerCase()
                      ? "text-indigo-400"
                      : "text-slate-300 hover:text-indigo-400"
                  }`}
                >
                  <span className="mr-2 text-xs text-indigo-400">
                    0{i + 1}.
                  </span>
                  {link}
                </a>
              </motion.li>
            ))}
            
            {/* Resume button in mobile menu */}
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * links.length }}
              className="pt-3 border-t border-slate-700"
            >
              <a
                href={siteConfig.owner.resumeUrl}
                download="Pracheta_Resume.pdf"
                className="block text-center border border-indigo-400 text-indigo-400 px-4 py-2 rounded-lg font-mono text-sm hover:bg-indigo-400/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}