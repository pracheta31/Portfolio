import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { init, send } from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { Send, Mail, GitFork, Link2 } from "lucide-react";
import { siteConfig } from "../data/config";

const { serviceId, templateId, publicKey } = siteConfig.contact.emailjsConfig;
init(publicKey);

function Field({ label, name, type = "text", placeholder, textarea, onFocus, onBlur, focused }) {
  const active = focused === name;
  const base = `w-full bg-slate-900/80 border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-all duration-300 ${
    active ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]" : "border-slate-700 hover:border-slate-600"
  }`;
  return (
    <div className="relative">
      <label className={`block text-xs font-mono mb-2 transition-colors duration-200 ${active ? "text-indigo-400" : "text-slate-500"}`}>
        {label}
      </label>
      {textarea
        ? <textarea name={name} rows={5} required placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} className={`${base} resize-none`} />
        : <input type={type} name={name} required placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} className={base} />
      }
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(null);

  const fp = (name) => ({ focused, onFocus: () => setFocused(name), onBlur: () => setFocused(null) });

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    send(serviceId, templateId, {
      from_name: formRef.current.from_name.value,
      reply_to: formRef.current.reply_to.value,
      subject: formRef.current.subject.value,
      message: formRef.current.message.value,
    })
    .then(() => { toast.success("Sent!"); formRef.current.reset(); })
    .catch(err => { console.error(err.status, err.text); toast.error("Failed. Try emailing directly."); })
    .finally(() => setSending(false));
  }

  const links = [
    { icon: Mail, label: "Email", value: siteConfig.owner.email, href: `mailto:${siteConfig.owner.email}` },
    { icon: GitFork, label: "GitHub", value: "pracheta31", href: siteConfig.social.find(s => s.platform === "github")?.url },
    { icon: Link2, label: "LinkedIn", value: "pracheta-patel", href: siteConfig.social.find(s => s.platform === "linkedin")?.url },
  ];

  return (
    <section id="contact" className="py-16 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-800 relative overflow-hidden" ref={ref}>
      <motion.div animate={{ scale:[1,1.15,1], opacity:[0.04,0.1,0.04] }} transition={{ duration:8, repeat:Infinity }}
        className="absolute inset-0 m-auto w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px] pointer-events-none" />

      <Toaster position="top-right" toastOptions={{ style: { background:"#1e293b", color:"#e2e8f0", border:"1px solid #334155" } }} />

      <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
        className="flex items-center gap-4 mb-16">
        <span className="text-indigo-400 font-mono text-xl">05.</span>
        <h2 className="text-3xl font-bold text-white">Let's Build Something Amazing ✨</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent ml-4" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-12 items-start relative z-10">

        <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.2, duration:0.6 }}
          className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-white text-xl font-semibold mb-3">Ready to collaborate?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              I'm looking for opportunities to work on real projects and grow as a developer. If you have a project idea or need help building something, let's connect and see how we can work together.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">💼 Available for hire</span>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full">💡 Open to projects</span>
            </div>
            
            {/* Quick action buttons */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              <motion.a
                href={siteConfig.social.find(s => s.platform === "linkedin")?.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <Link2 size={16} />
                <span>Connect on LinkedIn</span>
              </motion.a>
            </div>
            
            {/* response time indicator */}
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-slate-400 text-xs">Usually replies within <span className="text-green-400 font-medium">24 hours</span></span>
            </div>
          </div>
          <div className="space-y-4">
            {links.map(({ icon: Icon, label, value, href }) => (
              <motion.a key={label} href={href} target={label === "Email" ? "_self" : "_blank"} rel="noreferrer"
                whileHover={{ x:6 }} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-indigo-500 group-hover:bg-indigo-500/10 transition-all duration-300">
                  <Icon size={15} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-slate-300 text-sm group-hover:text-indigo-400 transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form ref={formRef} onSubmit={handleSubmit}
          initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.3, duration:0.6 }}
          className="md:col-span-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-5 sm:p-8 space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name" name="from_name" placeholder="Your name" {...fp("from_name")} />
            <Field label="Email" name="reply_to" type="email" placeholder="your@email.com" {...fp("reply_to")} />
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" {...fp("subject")} />
          <Field label="Message" name="message" placeholder="Tell me what's on your mind..." textarea {...fp("message")} />

          <motion.button type="submit" disabled={sending}
            whileHover={{ scale:1.02, boxShadow:"0 0 30px rgba(99,102,241,0.45)" }}
            whileTap={{ scale:0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50">
            {sending
              ? <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              : <Send size={15} />
            }
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
