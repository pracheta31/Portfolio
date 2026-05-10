import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "../data/config";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const { emailjsConfig } = siteConfig.contact;
  const { owner } = siteConfig;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch {
      toast.error("Failed to send. Please try again.");
    }
    setLoading(false);
  };

  const inputClass =
  "w-full px-4 py-3 rounded-lg bg-slate-800/60 backdrop-blur-md text-white border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition";
  return (
    <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 bg-slate-900" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14"
      >
        <span className="text-indigo-400 font-mono text-xl">04.</span>
        <h2 className="text-3xl font-bold text-white">Contact</h2>
        <div className="flex-1 h-px bg-slate-700 ml-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 max-w-5xl">
        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            I'm currently open to new opportunities. Whether you have a question,
            a project in mind, or just want to say hello — my inbox is always open!
          </p>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 text-slate-400"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Mail size={18} className="text-indigo-400" />
              </div>
              <span>{owner.email}</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 text-slate-400"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <MapPin size={18} className="text-indigo-400" />
              </div>
              <span>India</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <motion.div whileFocus={{ scale: 1.01 }}>
            <input
              name="user_name"
              required
              placeholder="Your Name"
              className={inputClass}
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.01 }}>
            <input
              name="user_email"
              type="email"
              required
              placeholder="Your Email"
              className={inputClass}
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.01 }}>
            <input
              name="subject"
              placeholder="Subject"
              className={inputClass}
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.01 }}>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your Message"
              className={inputClass}
            />
          </motion.div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-600 transition glow"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}