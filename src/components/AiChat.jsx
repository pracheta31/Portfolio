import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCZlUivKWmZjfDw4eNh-FbWUc7bmNzP12U";

const SYSTEM_CONTEXT = `You are a personal AI assistant for Patel Pracheta's portfolio website.
Answer questions about Pracheta only. Keep answers short, honest, and friendly. Don't oversell her — she's a student still learning.

About Pracheta:
- Name: Patel Pracheta
- 3rd year CE (Computer Engineering) student at MBIT, Ahmedabad.
- Completed Diploma in Computer Engineering from Government Polytechnic, Ahmedabad (2021-2024) with 8.00 CGPA.
- Skills: learning MERN stack, Python, basic ML, some data analytics (Tableau, Power BI), Git, C/C++. Still a beginner in most of these.
- Internships: 6-week ML internship and 15-day Django internship at Infolabz IT Services Pvt. Ltd. Also did a Power BI project for Microsoft Elevate AICTE Internship 2026.
- Certifications: Google Cybersecurity (Coursera), Microsoft Cybersecurity Analyst (Coursera)
- Projects:
  1. FreelanceHub — a freelancing platform built solo. Clients post jobs, freelancers apply, contracts with milestones. GitHub: github.com/pracheta31/Freelance
  2. SatConnect Intelligence Platform — Power BI dashboard for Microsoft Elevate AICTE Internship 2026. Analyzed satellite internet coverage (Starlink vs OneWeb vs ISRO). GitHub: github.com/pracheta31/SatConnect-Intelligence-Platform
- Email: pracheta302@gmail.com
- GitHub: github.com/pracheta31
- LinkedIn: linkedin.com/in/pracheta-patel-1b7101376
- Hobbies: Music, Reading, Movies
- Languages: English, Hindi, Gujarati
- She's honest about being a student and still learning. Not claiming to be an expert.

If asked anything unrelated to Pracheta, politely say you can only answer questions about her.`;

const QUICK_QUESTIONS = [
  "What projects has she built?",
  "What's her tech stack?",
  "Any internships?",
  "How to contact her?",
];

const genAI = new GoogleGenerativeAI(API_KEY);

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi! I'm Pracheta's assistant. Ask me anything about her — projects, skills, background, whatever." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  async function handleSend(text) {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    setShowQuick(false);
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(`${SYSTEM_CONTEXT}\n\nUser: ${q}`);
      const text = result.response.text();
      setMsgs(prev => [...prev, { role: "assistant", text }]);
    } catch(err) {
      console.error("Gemini error:", err);
      const msg = err?.message?.includes("429")
        ? "Rate limit hit — try again in a moment."
        : "Something went wrong. Try again!";
      setMsgs(prev => [...prev, { role: "assistant", text: msg }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* floating button with pulse ring */}
      <div className="fixed bottom-6 right-6 z-50">
        <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center transition-colors"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:0.2 }}><X size={22} /></motion.div>
              : <motion.div key="chat" initial={{ rotate:90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:0.2 }}><MessageCircle size={22} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:20, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:20, scale:0.95 }}
            transition={{ duration:0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "480px" }}
          >
            {/* header */}
            <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white">P</div>
              <div>
                <p className="text-white text-sm font-medium">Pracheta's Assistant</p>
                <p className="text-indigo-400 text-xs">Ask me anything about her</p>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-indigo-500 text-white rounded-br-sm"
                      : "bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {/* quick question chips — shown only before first user message */}
              {showQuick && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:text-indigo-300 text-slate-400 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl rounded-bl-sm flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                        animate={{ y:[0,-5,0] }} transition={{ duration:0.6, repeat:Infinity, delay: i*0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            <div className="p-3 border-t border-slate-700 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask about Pracheta..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <motion.button onClick={handleSend} disabled={!input.trim() || loading}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                className="w-9 h-9 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors">
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
