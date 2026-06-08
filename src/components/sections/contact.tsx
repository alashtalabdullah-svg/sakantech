"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useLang } from "@/context/lang";

const CC = [{c:"+966",f:"🇸🇦"},{c:"+971",f:"🇦🇪"},{c:"+965",f:"🇰🇼"},{c:"+974",f:"🇶🇦"},{c:"+973",f:"🇧🇭"},{c:"+968",f:"🇴🇲"},{c:"+962",f:"🇯🇴"},{c:"+20",f:"🇪🇬"},{c:"+92",f:"🇵🇰"},{c:"+91",f:"🇮🇳"},{c:"+880",f:"🇧🇩"},{c:"+63",f:"🇵🇭"},{c:"+62",f:"🇮🇩"},{c:"+1",f:"🇺🇸"},{c:"+44",f:"🇬🇧"},{c:"+90",f:"🇹🇷"},{c:"+33",f:"🇫🇷"},{c:"+49",f:"🇩🇪"}];

const field = { width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.1)", fontFamily: "Almarai", fontWeight: 400, fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" as const };

export default function Contact() {
  const { lang } = useLang();
  const [f, setF] = useState({ name: "", email: "", cc: "+966", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"err">("idle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const b = new FormData();
      b.append("الاسم", f.name); b.append("البريد", f.email);
      b.append("الجوال", `${f.cc} ${f.phone}`); b.append("الخدمة", f.service);
      b.append("الرسالة", f.message);
      b.append("_subject", `طلب جديد — ${f.name} | Sakan Tech`);
      b.append("_captcha", "false");
      const r = await fetch("https://formsubmit.co/ajax/Abdulaziz@sakan.sa", { method: "POST", headers: { Accept: "application/json" }, body: b });
      setStatus(r.ok ? "sent" : "err");
    } catch { setStatus("err"); }
  };

  const svcs = lang === "ar"
    ? ["خدمات الإسكان", "خدمات النقل", "خدمات التغذية", "الخدمات الثلاث"]
    : ["Labor Housing", "Staff Transport", "Catering & Food", "All Three Services"];

  return (
    <section id="contact" style={{ background: "#fff", padding: isMobile ? "64px 20px" : "96px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#015530", background: "rgba(1,85,48,0.07)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 18 }}>
            {lang === "ar" ? "ابدأ معنا" : "GET IN TOUCH"}
          </span>
          <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(32px,3.5vw,52px)", color: "#1a1a1a", lineHeight: 1.1, marginBottom: 14 }}>
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </h2>
          <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 17, color: "#888" }}>
            {lang === "ar" ? "أخبرنا عن متطلباتك وسيتواصل معك فريقنا خلال 24 ساعة." : "Tell us your requirements and our team will respond within 24 hours."}
          </p>
        </motion.div>

        {status === "sent" ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "64px 40px", background: "#f7f5f0", borderRadius: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#015530,#027a44)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={28} color="#fff" />
            </div>
            <p style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              {lang === "ar" ? "تم الإرسال بنجاح! سنتواصل معك قريباً." : "Sent successfully! We'll be in touch soon."}
            </p>
          </motion.div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, alignItems: "start" }}>
            {/* Info panel */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div style={{ background: "linear-gradient(145deg,#015530,#012f1e)", borderRadius: 24, padding: isMobile ? 24 : 40, color: "#fff", position: "relative", overflow: "hidden", marginBottom: 16 }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 22, marginBottom: 28 }}>
                    {lang === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </h3>
                  {[
                    { e: "📧", l: lang === "ar" ? "البريد الإلكتروني" : "Email", v: "Abdulaziz@sakan.sa", ltr: true },
                    { e: "📞", l: lang === "ar" ? "الهاتف" : "Phone", v: "+966 55 000 7777", ltr: true },
                    { e: "📍", l: lang === "ar" ? "العنوان" : "Address", v: lang === "ar" ? "طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، مبنى 7277، الدمام" : "Prince Mohammed bin Fahd Rd, East Corniche, Bldg 7277, Dammam", ltr: false },
                  ].map(item => (
                    <div key={item.l} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
                      <span style={{ fontSize: 20, marginTop: 2 }}>{item.e}</span>
                      <div>
                        <div style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4, letterSpacing: "0.06em" }}>{item.l}</div>
                        <div style={{ fontFamily: "Almarai", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.9)", direction: item.ltr ? "ltr" : undefined, lineHeight: 1.6 }}>{item.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#f7f5f0", borderRadius: 18, padding: "24px 28px" }}>
                <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 13, color: "#1a1a1a", marginBottom: 14 }}>
                  {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                </div>
                {[{ d: lang === "ar" ? "الأحد — الخميس" : "Sun — Thu", h: "8:00 AM — 5:00 PM" }, { d: lang === "ar" ? "الجمعة — السبت" : "Fri — Sat", h: lang === "ar" ? "مغلق" : "Closed" }].map(h => (
                  <div key={h.d} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <span style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 13, color: "#666" }}>{h.d}</span>
                    <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 13, color: "#015530", direction: "ltr" }}>{h.h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.65 }}
              onSubmit={submit}
              style={{ background: "#f7f5f0", borderRadius: 24, padding: isMobile ? 24 : 40, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                {[{ k: "name", l: lang === "ar" ? "الاسم الكامل *" : "Full Name *", p: lang === "ar" ? "محمد العبدالله" : "Muhammad Al-Abdullah", t: "text" },
                  { k: "email", l: lang === "ar" ? "البريد الإلكتروني *" : "Email *", p: "name@company.com", t: "email" }
                ].map(fi => (
                  <div key={fi.k}>
                    <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8, letterSpacing: "0.04em" }}>{fi.l}</label>
                    <input required type={fi.t} placeholder={fi.p} value={(f as any)[fi.k]} onChange={e => set(fi.k, e.target.value)}
                      style={{ ...field, direction: fi.t === "email" ? "ltr" : undefined }}
                      onFocus={e => e.target.style.borderColor = "#015530"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "رقم الجوال *" : "Phone Number *"}
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={f.cc} onChange={e => set("cc", e.target.value)}
                    style={{ ...field, width: "auto", minWidth: 100, cursor: "pointer" }}>
                    {CC.map(c => <option key={c.c} value={c.c}>{c.f} {c.c}</option>)}
                  </select>
                  <input required type="tel" placeholder="05X XXX XXXX" value={f.phone} onChange={e => set("phone", e.target.value)}
                    style={{ ...field, flex: 1, direction: "ltr" }}
                    onFocus={e => e.target.style.borderColor = "#015530"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "الخدمة المطلوبة" : "Service Required"}
                </label>
                <select value={f.service} onChange={e => set("service", e.target.value)}
                  style={{ ...field, cursor: "pointer" }}
                  onFocus={e => e.target.style.borderColor = "#015530"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}>
                  <option value="">{lang === "ar" ? "اختر الخدمة" : "Select a service"}</option>
                  {svcs.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "رسالتك" : "Your Message"}
                </label>
                <textarea rows={4} placeholder={lang === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."} value={f.message} onChange={e => set("message", e.target.value)}
                  style={{ ...field, resize: "none" }}
                  onFocus={e => e.target.style.borderColor = "#015530"} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              </div>

              <button type="submit" disabled={status === "sending"}
                style={{ padding: "16px 32px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 800, fontSize: 15, color: "#fff", border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", background: "linear-gradient(135deg,#015530,#027a44)", boxShadow: "0 8px 28px rgba(1,85,48,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: status === "sending" ? 0.7 : 1, transition: "all 0.2s" }}>
                {status === "sending" ? <><Loader2 size={17} className="animate-spin" />{lang === "ar" ? "جاري الإرسال..." : "Sending..."}</> : <><Send size={17} />{lang === "ar" ? "إرسال الرسالة" : "Send Message"}</>}
              </button>
              {status === "err" && <p style={{ textAlign: "center", fontSize: 13, color: "#e53e3e", fontFamily: "Almarai" }}>{lang === "ar" ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong. Please try again."}</p>}
            </motion.form>
          </div>
        )}
      </div>
    </section>
  );
}
