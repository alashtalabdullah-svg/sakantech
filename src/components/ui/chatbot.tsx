"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/context/lang";

type Step = "name" | "email" | "phone" | "service" | "done";
const SVCS_AR = ["خدمات توفير القوى العاملة", "خدمات الإسكان", "خدمات النقل", "خدمات التغذية", "جميع الخدمات"];
const SVCS_EN = ["Workforce Supply Services", "Labor Housing", "Staff Transport", "Catering & Food", "All Services"];

export default function Chatbot() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [inp, setInp] = useState("");
  const [data, setData] = useState({ name: "", email: "", phone: "", service: "" });
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const [ready, setReady] = useState(false);
  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || ready) return;
    setReady(true);
    setTimeout(() => add("bot", lang === "ar" ? "مرحباً! 👋 أنا مساعد سكن تك." : "Hello! 👋 I'm the Sakan Tech assistant."), 400);
    setTimeout(() => add("bot", lang === "ar" ? "ما اسمك الكريم؟" : "What's your name?"), 1200);
  }, [open]);

  useEffect(() => { botRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const add = (from: "bot" | "user", text: string) => setMsgs(m => [...m, { from, text }]);

  const send = (val?: string) => {
    const v = (val ?? inp).trim(); if (!v) return;
    setInp(""); add("user", v);
    if (step === "name") {
      setData(d => ({ ...d, name: v }));
      setTimeout(() => { add("bot", (lang === "ar" ? `شكراً ${v}! ما بريدك الإلكتروني؟` : `Thanks ${v}! What's your email?`)); setStep("email"); }, 600);
    } else if (step === "email") {
      setData(d => ({ ...d, email: v }));
      setTimeout(() => { add("bot", lang === "ar" ? "ما رقم جوالك؟" : "What's your phone number?"); setStep("phone"); }, 600);
    } else if (step === "phone") {
      setData(d => ({ ...d, phone: v }));
      setTimeout(() => { add("bot", lang === "ar" ? "أي خدماتنا تهمك؟" : "Which service interests you?"); setStep("service"); }, 600);
    }
  };

  const pickService = async (svc: string) => {
    const updated = { ...data, service: svc }; setData(updated);
    add("user", svc); setStep("done");
    try {
      const b = new FormData();
      Object.entries({ الاسم: updated.name, البريد: updated.email, الجوال: updated.phone, الخدمة: svc, المصدر: "Chatbot" }).forEach(([k, v]) => b.append(k, v));
      b.append("_subject", `طلب شات بوت — ${updated.name}`); b.append("_captcha", "false");
      await fetch("https://formsubmit.co/ajax/info@sakatech.com.sa", { method: "POST", headers: { Accept: "application/json" }, body: b });
    } catch {}
    setTimeout(() => add("bot", lang === "ar" ? "شكراً جزيلاً! 🎉 سيتواصل معك فريقنا قريباً." : "Thank you! 🎉 Our team will contact you very soon."), 700);
  };

  return (
    <>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(!open)}
        style={{ position: "fixed", bottom: 28, left: 28, zIndex: 999, width: 58, height: 58, borderRadius: 18, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#015530,#027a44)", boxShadow: "0 8px 32px rgba(1,85,48,0.45)", color: "#fff", transition: "transform 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <AnimatePresence mode="wait">
          {open ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} /></motion.div>}
        </AnimatePresence>
        {!open && <span style={{ position: "absolute", top: 10, right: 10, width: 10, height: 10, borderRadius: "50%", background: "#ebb968", border: "2px solid #027a44" }} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.94 }} transition={{ duration: 0.25 }}
            style={{ position: "fixed", bottom: 96, left: 24, zIndex: 998, width: 340, borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", maxHeight: 520 }}>
            {/* Header */}
            <div style={{ padding: "16px 20px", background: "linear-gradient(135deg,#015530,#027a44)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MessageCircle size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 14, color: "#fff" }}>
                  {lang === "ar" ? "مساعد سكن تك" : "Sakan Tech Assistant"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ebb968", display: "block" }} />
                  <span style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{lang === "ar" ? "متاح الآن" : "Online now"}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", background: "#F8F9FA", display: "flex", flexDirection: "column", gap: 10, minHeight: 220, maxHeight: 280 }}>
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", justifyContent: m.from === "bot" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: 16, fontFamily: "Almarai", fontWeight: 400, fontSize: 13, lineHeight: 1.7,
                    background: m.from === "bot" ? "#fff" : "linear-gradient(135deg,#015530,#027a44)",
                    color: m.from === "bot" ? "#1a1a1a" : "#fff",
                    boxShadow: m.from === "bot" ? "0 2px 8px rgba(0,0,0,0.06)" : "none" }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {step === "service" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  {(lang === "ar" ? SVCS_AR : SVCS_EN).map(s => (
                    <button key={s} onClick={() => pickService(s)}
                      style={{ padding: "10px 14px", borderRadius: 12, border: "1.5px solid #015530", background: "transparent", cursor: "pointer", fontFamily: "Almarai", fontWeight: 700, fontSize: 13, color: "#015530", textAlign: "right", transition: "all 0.2s" }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.background = "#015530"; (e.target as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#015530"; }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={botRef} />
            </div>

            {/* Input */}
            {step !== "service" && step !== "done" && (
              <div style={{ display: "flex", gap: 8, padding: "12px 14px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                  placeholder={step === "name" ? (lang === "ar" ? "اكتب اسمك..." : "Enter your name...") : step === "email" ? "example@email.com" : "05X XXX XXXX"}
                  type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.1)", fontFamily: "Almarai", fontSize: 13, outline: "none", direction: step === "phone" || step === "email" ? "ltr" : undefined }}
                  onFocus={e => e.target.style.borderColor = "#015530"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                <button onClick={() => send()} style={{ width: 42, height: 42, borderRadius: 12, border: "none", cursor: "pointer", background: "#015530", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={15} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
