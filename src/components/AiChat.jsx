import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import Groq from "groq-sdk";
import ReactMarkdown from "react-markdown";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_CONTEXT = `You are a personal AI assistant for Patel Pracheta's portfolio website.
Answer questions about Pracheta professionally. Present her as a capable developer, not a student learning.

IMPORTANT: Format your responses using markdown for better readability:
- Use **bold** for important terms, names, and key points
- Use bullet points (-) for lists
- Use line breaks for better structure
- Keep responses concise but well-formatted

About Pracheta:
- Name: **Patel Pracheta**
- **Full-Stack Developer** specializing in **MERN stack**
- 3rd year Computer Engineering student at **MBIT, Ahmedabad**
- Education:
  - Currently pursuing B.E in Computer Engineering at MBIT
  - Diploma in Computer Engineering from Government Polytechnic, Ahmedabad (2021-2024) with **8.00 CGPA**
  - SSC from Javiya Schooling System, Junagadh with **91%**
- Core Skills: **React**, **Node.js**, **Express**, **MongoDB**, **JavaScript**, **HTML/CSS**
- Working Knowledge: **Git**, **Python**, **Power BI**
- Internships: 
  - 6-week **ML internship** at Infolabz IT Services
  - 15-day **Django internship** at Infolabz IT Services
  - **Power BI project** for Microsoft Elevate AICTE Internship 2026
- Certifications: 
  - **Google Cybersecurity** (Coursera)
  - **Microsoft Cybersecurity Analyst** (Coursera)
- Projects:
  1. **FreelanceHub** — Production-ready freelancing platform with **50+ active users**. Features role-based authentication, contract management, and milestone tracking. Built with **MERN stack**. GitHub: github.com/pracheta31/Freelance
  2. **SatConnect Intelligence Platform** — Enterprise-grade Power BI dashboard processing **10K+ data points**. Analyzed global satellite internet coverage. Built for Microsoft Elevate AICTE Internship 2026. GitHub: github.com/pracheta31/SatConnect-Intelligence-Platform
- Contact: pracheta302@gmail.com
- GitHub: github.com/pracheta31
- LinkedIn: linkedin.com/in/pracheta-patel-1b7101376
- Focus: Building scalable web applications and turning ideas into real products

Present her as a professional developer who builds real products, not as a student learning. Emphasize impact and results.

If asked anything unrelated to Pracheta, politely say you can only answer questions about her.`;

const QUICK_QUESTIONS = [
  "What projects has she built?",
  "What's her tech stack?",
  "Any internships?",
  "How to contact her?",
];

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
    
    // Check if API key is configured
    if (!API_KEY) {
      setMsgs(prev => [...prev, { 
        role: "assistant", 
        text: "API key not configured. Please add VITE_GROQ_API_KEY to your .env file." 
      }]);
      return;
    }
    
    setInput("");
    setShowQuick(false);
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    
    try {
      const groq = new Groq({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
      });
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: SYSTEM_CONTEXT
          },
          {
            role: "user",
            content: q
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        stream: false
      });
      
      const responseText = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMsgs(prev => [...prev, { role: "assistant", text: responseText }]);
      
    } catch(err) {
      console.error("Groq error:", err);
      let msg = "Something went wrong. Try again!";
      
      if (err?.message?.includes("429") || err?.status === 429) {
        msg = "Rate limit hit — try again in a moment.";
      } else if (err?.message?.includes("401") || err?.status === 401) {
        msg = "Invalid API key. Please check your Groq API key configuration.";
      } else if (err?.message?.includes("quota") || err?.message?.includes("billing")) {
        msg = "API quota exceeded. Please check your Groq account.";
      } else if (err?.message?.includes("model")) {
        msg = "Model not available. Please try again later.";
      } else if (err?.message) {
        msg = `Error: ${err.message}`;
      }
      
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
                    {m.role === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown
                          components={{
                            // Style bold text
                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-300" {...props} />,
                            // Style lists
                            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                            li: ({node, ...props}) => <li className="text-slate-200" {...props} />,
                            // Style paragraphs
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            // Style links
                            a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            // Style code
                            code: ({node, ...props}) => <code className="bg-slate-700 px-1 py-0.5 rounded text-indigo-300" {...props} />,
                          }}
                        >
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      m.text
                    )}
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
              <motion.button onClick={() => handleSend()} disabled={!input.trim() || loading}
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
