"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/context/lang";

const CC = [
  { code: "+966", iso: "sa", name: "Saudi Arabia",   nameAr: "السعودية" },
  { code: "+971", iso: "ae", name: "UAE",             nameAr: "الإمارات" },
  { code: "+965", iso: "kw", name: "Kuwait",          nameAr: "الكويت" },
  { code: "+974", iso: "qa", name: "Qatar",           nameAr: "قطر" },
  { code: "+973", iso: "bh", name: "Bahrain",         nameAr: "البحرين" },
  { code: "+968", iso: "om", name: "Oman",            nameAr: "عُمان" },
  { code: "+962", iso: "jo", name: "Jordan",          nameAr: "الأردن" },
  { code: "+20",  iso: "eg", name: "Egypt",           nameAr: "مصر" },
  { code: "+92",  iso: "pk", name: "Pakistan",        nameAr: "باكستان" },
  { code: "+91",  iso: "in", name: "India",           nameAr: "الهند" },
  { code: "+880", iso: "bd", name: "Bangladesh",      nameAr: "بنغلاديش" },
  { code: "+63",  iso: "ph", name: "Philippines",     nameAr: "الفلبين" },
  { code: "+62",  iso: "id", name: "Indonesia",       nameAr: "إندونيسيا" },
  { code: "+1",   iso: "us", name: "USA",             nameAr: "أمريكا" },
  { code: "+44",  iso: "gb", name: "UK",              nameAr: "بريطانيا" },
  { code: "+90",  iso: "tr", name: "Turkey",          nameAr: "تركيا" },
  { code: "+33",  iso: "fr", name: "France",          nameAr: "فرنسا" },
  { code: "+49",  iso: "de", name: "Germany",         nameAr: "ألمانيا" },
];

function PhoneSelect({
  value, onChange, lang,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: "ar" | "en";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = CC.find(c => c.code === value) ?? CC[0];

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "0 14px", height: 52, borderRadius: 12,
          border: `1.5px solid ${open ? "#0A532A" : "rgba(0,0,0,0.1)"}`,
          background: "#fff", cursor: "pointer",
          fontFamily: "Almarai", fontWeight: 700, fontSize: 15, color: "#1a1a1a",
          direction: "ltr", whiteSpace: "nowrap",
          transition: "border-color 0.2s", boxSizing: "border-box",
          minWidth: 100,
        }}
      >
        <span style={{ color: "#0A532A", fontWeight: 800 }}>{selected.code}</span>
        <ChevronDown size={14} color="#888"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              insetInlineStart: 0,
              zIndex: 200,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
              border: "1px solid rgba(0,0,0,0.08)",
              minWidth: 230,
              maxHeight: 280,
              overflowY: "auto",
              padding: "6px",
            }}
          >
            {CC.map(c => {
              const isActive = c.code === value;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onChange(c.code); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", padding: "9px 14px", borderRadius: 10,
                    border: "none", cursor: "pointer", textAlign: "start",
                    background: isActive ? "rgba(10,83,42,0.07)" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{
                    fontFamily: "Almarai", fontWeight: 700, fontSize: 14,
                    color: isActive ? "#0A532A" : "#333",
                    direction: "ltr", minWidth: 46,
                  }}>{c.code}</span>
                  <span style={{
                    fontFamily: "Almarai", fontWeight: 400, fontSize: 13,
                    color: isActive ? "#0A532A" : "#666", flex: 1,
                  }}>
                    {lang === "ar" ? c.nameAr : c.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const field = {
  width: "100%", padding: "14px 16px", borderRadius: 12,
  border: "1.5px solid rgba(0,0,0,0.1)", fontFamily: "Almarai",
  fontWeight: 400, fontSize: 14, color: "#1a1a1a",
  background: "#fff", outline: "none", transition: "border-color 0.2s",
  boxSizing: "border-box" as const,
};

export default function Contact() {
  const { lang } = useLang();
  const [f, setF] = useState({ name: "", email: "", cc: "+966", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"err">("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const fn = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 900);
    };
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
      b.append("الاسم", f.name);
      b.append("البريد", f.email);
      b.append("الجوال", `${f.cc} ${f.phone}`);
      b.append("الخدمة", f.service);
      b.append("الرسالة", f.message);
      b.append("_subject", `طلب جديد — ${f.name} | Sakan Tech`);
      b.append("_captcha", "false");
      const r = await fetch("https://formsubmit.co/ajax/info@sakatech.com.sa", {
        method: "POST", headers: { Accept: "application/json" }, body: b,
      });
      setStatus(r.ok ? "sent" : "err");
    } catch { setStatus("err"); }
  };

  const svcs = lang === "ar"
    ? ["خدمات توفير القوى العاملة", "خدمات الإسكان", "خدمات النقل", "خدمات التغذية", "جميع الخدمات"]
    : ["Workforce Supply Services", "Labor Housing", "Staff Transport", "Catering & Food", "All Services"];

  return (
    <section id="contact" style={{ background: "#fff", padding: isMobile ? "64px 20px" : "96px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(28px,3.5vw,52px)", color: "#1a1a1a", lineHeight: 1.1, marginBottom: 14 }}>
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </h2>
          <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: isMobile ? 15 : 17, color: "#888", marginBottom: 28 }}>
            {lang === "ar" ? "أخبرنا عن متطلباتك وسيتواصل معك فريقنا خلال 24 ساعة." : "Tell us your requirements and our team will respond within 24 hours."}
          </p>
          {/* Quick-contact buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="https://wa.me/966506422739"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 700, fontSize: 14, textDecoration: "none", color: "#fff", background: "linear-gradient(135deg,#0A532A,#0D6B36)", boxShadow: "0 6px 22px rgba(10,83,42,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(10,83,42,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(10,83,42,0.28)"; }}>
              <MessageCircle size={17} />
              {lang === "ar" ? "واتساب" : "WhatsApp"}
            </a>
            <a href="mailto:info@sakatech.com.sa"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 700, fontSize: 14, textDecoration: "none", color: "#fff", background: "linear-gradient(135deg,#0A532A,#0D6B36)", boxShadow: "0 6px 22px rgba(10,83,42,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(10,83,42,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(10,83,42,0.28)"; }}>
              <Mail size={17} />
              {lang === "ar" ? "راسلنا بالإيميل" : "Email Us"}
            </a>
          </div>
        </motion.div>

        {status === "sent" ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "64px 40px", background: "#F8F9FA", borderRadius: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#0A532A,#0D6B36)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={28} color="#fff" />
            </div>
            <p style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              {lang === "ar" ? "تم الإرسال بنجاح! سنتواصل معك قريباً." : "Sent successfully! We'll be in touch soon."}
            </p>
          </motion.div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(2,1fr)", gap: 24, alignItems: "start" }}>

            {/* Info panel */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div style={{ background: "linear-gradient(145deg,#0A532A,#012f1e)", borderRadius: 24, padding: isMobile ? 24 : 40, color: "#fff", position: "relative", overflow: "hidden", marginBottom: 16 }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 22, marginBottom: 28 }}>
                    {lang === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </h3>
                  {[
                    { e: "📧", l: lang === "ar" ? "البريد الإلكتروني" : "Email",   v: "info@sakatech.com.sa", ltr: true },
                    { e: "📞", l: lang === "ar" ? "الهاتف"           : "Phone",    v: "050 642 2739",          ltr: true },
                    { e: "🌐", l: lang === "ar" ? "الموقع"           : "Website",  v: "www.sakatech.com.sa",  ltr: true },
                    { e: "📍", l: lang === "ar" ? "العنوان"          : "Address",
                      v: lang === "ar"
                        ? "طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، مبنى 7277، الدمام"
                        : "Prince Mohammed bin Fahd Rd, East Corniche, Bldg 7277, Dammam",
                      ltr: false },
                  ].map(item => (
                    <div key={item.l} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
                      <span style={{ fontSize: 20, marginTop: 2 }}>{item.e}</span>
                      <div>
                        <div style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>{item.l}</div>
                        <div style={{ fontFamily: "Almarai", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.9)", direction: item.ltr ? "ltr" : undefined, lineHeight: 1.6 }}>{item.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#F8F9FA", borderRadius: 18, padding: "24px 28px" }}>
                <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 13, color: "#1a1a1a", marginBottom: 14 }}>
                  {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                </div>
                {[
                  { d: lang === "ar" ? "الأحد — الخميس" : "Sun — Thu", h: "8:00 AM — 5:00 PM" },
                  { d: lang === "ar" ? "الجمعة — السبت" : "Fri — Sat", h: lang === "ar" ? "مغلق" : "Closed" },
                ].map(h => (
                  <div key={h.d} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <span style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 13, color: "#666" }}>{h.d}</span>
                    <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 13, color: "#0A532A", direction: "ltr" }}>{h.h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.65 }}
              onSubmit={submit}
              style={{ background: "#F8F9FA", borderRadius: 24, padding: isMobile ? 24 : 40, display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                {[
                  { k: "name",  l: lang === "ar" ? "الاسم الكامل *"        : "Full Name *",  p: lang === "ar" ? "محمد العبدالله" : "Muhammad Al-Abdullah", t: "text" },
                  { k: "email", l: lang === "ar" ? "البريد الإلكتروني *"   : "Email *",      p: "name@company.com", t: "email" },
                ].map(fi => (
                  <div key={fi.k}>
                    <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>{fi.l}</label>
                    <input required type={fi.t} placeholder={fi.p} value={(f as any)[fi.k]} onChange={e => set(fi.k, e.target.value)}
                      style={{ ...field, direction: fi.t === "email" ? "ltr" : undefined }}
                      onFocus={e => e.target.style.borderColor = "#0A532A"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                  </div>
                ))}
              </div>

              {/* Phone with custom flag dropdown */}
              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "رقم الجوال *" : "Phone Number *"}
                </label>
                <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                  <PhoneSelect value={f.cc} onChange={v => set("cc", v)} lang={lang} />
                  <input
                    required type="tel" placeholder="050 XXX XXXX" value={f.phone}
                    onChange={e => set("phone", e.target.value)}
                    style={{ ...field, flex: 1, direction: "ltr", height: 52, padding: "0 16px" }}
                    onFocus={e => e.target.style.borderColor = "#0A532A"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
                </div>
              </div>

              {/* Service */}
              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "الخدمة المطلوبة" : "Service Required"}
                </label>
                <select value={f.service} onChange={e => set("service", e.target.value)}
                  style={{ ...field, cursor: "pointer", height: 52, padding: "0 16px" }}
                  onFocus={e => e.target.style.borderColor = "#0A532A"}
                  onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}>
                  <option value="">{lang === "ar" ? "اختر الخدمة" : "Select a service"}</option>
                  {svcs.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: "#555", display: "block", marginBottom: 8 }}>
                  {lang === "ar" ? "رسالتك" : "Your Message"}
                </label>
                <textarea rows={4}
                  placeholder={lang === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  value={f.message} onChange={e => set("message", e.target.value)}
                  style={{ ...field, resize: "none" }}
                  onFocus={e => e.target.style.borderColor = "#0A532A"}
                  onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              </div>

              {/* Submit */}
              <button type="submit" disabled={status === "sending"}
                style={{ padding: "16px 32px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 800, fontSize: 15, color: "#fff", border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", background: "linear-gradient(135deg,#0A532A,#0D6B36)", boxShadow: "0 8px 28px rgba(10,83,42,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: status === "sending" ? 0.7 : 1, transition: "all 0.2s" }}>
                {status === "sending"
                  ? <><Loader2 size={17} className="animate-spin" />{lang === "ar" ? "جاري الإرسال..." : "Sending..."}</>
                  : <><Send size={17} />{lang === "ar" ? "إرسال الرسالة" : "Send Message"}</>}
              </button>
              {status === "err" && (
                <p style={{ textAlign: "center", fontSize: 13, color: "#e53e3e", fontFamily: "Almarai" }}>
                  {lang === "ar" ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong. Please try again."}
                </p>
              )}
            </motion.form>
          </div>
        )}
      </div>
    </section>
  );
}
