"use client";
import { motion } from "framer-motion";
import { Quote, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/ui/chatbot";
import { useLang } from "@/context/lang";

const ORG = {
  ar: [{ r: "رئيس مجلس الإدارة", l: 0 },{ r: "نائب الرئيس", l: 0 },{ r: "الرئيس التنفيذي", l: 1 },{ r: "الموارد البشرية", l: 2 },{ r: "الشؤون المالية", l: 2 },{ r: "إدارة المشاريع", l: 2 },{ r: "التسويق والإعلام", l: 2 },{ r: "إدارة العمليات", l: 2 },{ r: "تقنية المعلومات", l: 2 }],
  en: [{ r: "Chairman", l: 0 },{ r: "Vice Chairman", l: 0 },{ r: "CEO", l: 1 },{ r: "Human Resources", l: 2 },{ r: "Financial Admin", l: 2 },{ r: "Project Management", l: 2 },{ r: "Marketing & Media", l: 2 },{ r: "Operations", l: 2 },{ r: "IT", l: 2 }],
};
const VALS = {
  ar: [{ e: "🎯", t: "رؤيتنا", d: "أن نكون الشريك الأكثر موثوقية في المملكة لخدمات العيش للعمالة، ونضع معياراً جديداً للإسكان والتنقل والرفاهية في القطاعين الصناعي والإنشائي." },{ e: "🚀", t: "مهمتنا", d: "تقديم خدمات متكاملة للإسكان والنقل والتغذية من خلال مشغّل واحد مسؤول — يحسّن جودة حياة العمال ويقلل المخاطر التشغيلية لعملائنا." }],
  en: [{ e: "🎯", t: "Our Vision", d: "To be the Kingdom's most trusted partner for workforce living — setting a new benchmark for accommodation, mobility, and welfare in the industrial and construction sectors." },{ e: "🚀", t: "Our Mission", d: "To deliver fully integrated housing, transport, and food services through a single accountable operator — improving worker quality of life and reducing operational risk for our clients." }],
};

export default function AboutPage() {
  const { lang } = useLang();
  const org = ORG[lang];
  const vals = VALS[lang];

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: "160px 32px 120px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(1,85,48,0.92) 0%, rgba(0,0,0,0.72) 55%, rgba(235,185,104,0.18) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#ebb968", background: "rgba(235,185,104,0.1)", border: "1px solid rgba(235,185,104,0.3)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 22 }}>
            {lang === "ar" ? "تعرف علينا" : "WHO WE ARE"}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }}
            style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(44px,5.5vw,72px)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            {lang === "ar" ? "عن سكن تك" : "About Sakan Tech"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28, duration: 0.65 }}
            style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
            {lang === "ar" ? "سكن تك شركة سعودية متخصصة في تقديم الحلول المتكاملة لخدمات العمالة — مُصمَّمة لدعم الشركات التي تبني رؤية 2030." : "Sakan Tech is a specialist Saudi provider of integrated workforce living solutions — engineered to support the companies building Vision 2030."}
          </motion.p>
        </div>
      </section>

      {/* About + Vision/Mission */}
      <section style={{ padding: "96px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#015530", background: "rgba(1,85,48,0.07)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 20 }}>
              {lang === "ar" ? "قصتنا" : "OUR STORY"}
            </span>
            <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#1a1a1a", lineHeight: 1.15, marginBottom: 20 }}>
              {lang === "ar" ? "مزود متكامل لبيئة العيش" : "An Integrated Workforce Living Provider"}
            </h2>
            <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 16, color: "#666", lineHeight: 1.9, marginBottom: 16 }}>
              {lang === "ar" ? "سكن تك شركة سعودية متخصصة تقدم حلول العيش المتكاملة للعمالة — الإسكان والنقل اليومي والتغذية — مُصمَّمة لدعم المقاولين والمشغلين الصناعيين ومطوري البنية التحتية الذين يبنون رؤية 2030." : "Sakan Tech is a specialist Saudi provider of integrated workforce living solutions — labor accommodation, daily transportation, and catering — engineered to support contractors, industrial operators, and infrastructure developers building Vision 2030."}
            </p>
            <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 15, color: "#888", lineHeight: 1.9 }}>
              {lang === "ar" ? "نصمم منشآتنا وأسطولنا وخدمات الطعام كنظام تشغيلي متصل واحد. نتمركز في المنطقة الشرقية ونعمل على نطاق واسع في الخبر والدمام." : "We design our facilities, fleet, and food services as one connected operating system. Headquartered in the Eastern Province, operating at scale across Al Khobar and Dammam."}
            </p>
            <div style={{ display: "flex", gap: 40, marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {[{ v: "2016", l: lang === "ar" ? "التأسيس" : "Founded" }, { v: "1,000+", l: lang === "ar" ? "سرير" : "Beds" }, { v: "15+", l: lang === "ar" ? "مدينة" : "Cities" }].map(s => (
                <div key={s.v}>
                  <div style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 28, color: "#015530" }}>{s.v}</div>
                  <div style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 12, color: "#aaa", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {vals.map(v => (
              <div key={v.t} style={{ padding: 32, borderRadius: 20, background: "#f7f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 14 }}>{v.e}</span>
                <h3 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 18, color: "#015530", marginBottom: 10 }}>{v.t}</h3>
                <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 14, color: "#666", lineHeight: 1.9 }}>{v.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section style={{ position: "relative", padding: "112px 32px", overflow: "hidden", clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(1,85,48,0.96) 0%, rgba(0,0,0,0.88) 100%)" }}/>
          {/* Subtle dot pattern */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", color: "#ebb968", background: "rgba(235,185,104,0.12)", border: "1px solid rgba(235,185,104,0.3)", padding: "7px 20px", borderRadius: 999, display: "inline-block" }}>
              {lang === "ar" ? "كلمة المدير التنفيذي" : "CEO'S MESSAGE"}
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.75 }}
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "56px 52px", position: "relative", overflow: "hidden" }}>

            {/* Gold accent bar top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #015530, #ebb968, #015530)", borderRadius: "28px 28px 0 0" }}/>

            {/* Large decorative quote mark */}
            <div style={{ position: "absolute", top: 24, insetInlineEnd: 40, fontSize: 96, fontFamily: "Georgia, serif", color: "rgba(235,185,104,0.12)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>

            <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 18, color: "rgba(255,255,255,0.88)", lineHeight: 2.0, marginBottom: 40, position: "relative", zIndex: 1, maxWidth: 680 }}>
              {lang === "ar"
                ? "مهمتنا التنفيذية ليست مجرد مواكبة متطلبات السوق، بل قيادة التغيير وتقديم حلول مبتكرة تدمج بين اللوجستيات الفعّالة والإسكان الحديث. نحن نؤمن إيماناً راسخاً بأن التميز التشغيلي والسرعة والموثوقية هي المفاتيح الحقيقية لكسب ثقة عملائنا ودعم نمونا المستدام."
                : "Our executive mission is not merely to keep pace with market demands, but to lead change and deliver innovative solutions that merge efficient logistics with modern housing. We firmly believe that operational excellence, speed, and reliability are the ultimate keys to winning our clients' trust and sustaining our growth."}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 18, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {/* Avatar */}
              <div style={{ width: 54, height: 54, borderRadius: 16, background: "linear-gradient(135deg,#ebb968,#d4a040)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Almarai", fontWeight: 800, fontSize: 22, color: "#1a1a1a", flexShrink: 0, boxShadow: "0 4px 16px rgba(235,185,104,0.4)" }}>M</div>
              <div>
                <div style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 3 }}>Muhammad Tariq Zubair</div>
                <div style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 13, color: "#ebb968", letterSpacing: "0.06em" }}>
                  {lang === "ar" ? "الرئيس التنفيذي — سكن تك" : "CEO — Sakan Tech"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Org Chart */}
      <section style={{ padding: "88px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#015530", background: "rgba(1,85,48,0.07)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 18 }}>
              {lang === "ar" ? "هيكلنا التنظيمي" : "ORGANIZATIONAL STRUCTURE"}
            </span>
            <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#1a1a1a" }}>
              {lang === "ar" ? "فريق القيادة" : "Leadership Team"}
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {org.filter(n => n.l === 0).map((n, i) => (
                <div key={i} style={{ padding: "12px 24px", borderRadius: 12, fontFamily: "Almarai", fontWeight: 700, fontSize: 14, background: "linear-gradient(135deg,#ebb968,#d4a040)", color: "#1a1a1a" }}>{n.r}</div>
              ))}
            </div>
            <div style={{ width: 2, height: 32, background: "#015530" }} />
            {org.filter(n => n.l === 1).map((n, i) => (
              <div key={i} style={{ padding: "14px 32px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 800, fontSize: 15, background: "linear-gradient(135deg,#015530,#027a44)", color: "#fff", marginBottom: 0 }}>{n.r}</div>
            ))}
            <div style={{ width: 2, height: 32, background: "#015530" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {org.filter(n => n.l === 2).map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  style={{ padding: "10px 18px", borderRadius: 12, fontFamily: "Almarai", fontWeight: 600, fontSize: 13, border: "1.5px solid rgba(1,85,48,0.2)", color: "#015530", background: "#fff" }}>
                  {n.r}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section style={{ padding: "80px 32px", background: "#f7f5f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#015530", background: "rgba(1,85,48,0.07)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 18 }}>
            {lang === "ar" ? "اعتماداتنا" : "ACCREDITATIONS"}
          </span>
          <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#1a1a1a", marginBottom: 48 }}>
            {lang === "ar" ? "الشهادات والتراخيص الرسمية" : "Official Certificates & Licenses"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[{ e: "📋", t: lang === "ar" ? "السجل التجاري" : "Commercial Registration", v: "7054044909" },
              { e: "🏛️", t: lang === "ar" ? "شهادة الزكاة والضريبة" : "Zakat & Tax Certificate", v: "Sakan Tech Co." },
              { e: "📜", t: lang === "ar" ? "شهادة الاستثمار" : "Investment Registration", v: "Active — IRN" }
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", borderRadius: 20, padding: "32px 24px", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{c.e}</div>
                <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 6 }}>{c.t}</div>
                <div style={{ fontFamily: "Almarai", fontWeight: 600, fontSize: 13, color: "#015530", direction: "ltr" }}>{c.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
