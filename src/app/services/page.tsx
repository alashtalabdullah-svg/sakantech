"use client";
import { motion } from "framer-motion";
import { Building2, Bus, Utensils, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/ui/chatbot";
import { useLang } from "@/context/lang";

const SVCS = {
  ar: [
    { n: "01", icon: <Building2 size={30}/>, t: "خدمات الإسكان", sub: "مجمعات متكاملة تلتزم بمعايير MHRSD", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90", c: "#015530",
      d: "توفر سكن تك مجمعات سكنية مجهزة بالكامل تلتزم بمعايير وزارة الموارد البشرية، توفر بيئة معيشية آمنة ومريحة ترفع رفاهية القوى العاملة وإنتاجيتها.",
      fs: ["غرف 2-4-6-8 أشخاص بتكييف فردي","أمن وحراسة 24/7 وكاميرات CCTV","واي فاي عالي السرعة وصالات ترفيه","خدمات نظافة يومية وغسيل ملابس","عيادة ميدانية وضابط رعاية","صيانة وقائية وفق نوافذ SLA محددة"] },
    { n: "02", icon: <Bus size={30}/>, t: "خدمات النقل", sub: "أسطول GPS مهندَس لإيقاع عملياتك", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90", c: "#027a44",
      d: "أسطول حديث مكيّف مع سائقين محترفين وتتبع GPS فوري، يضمن وصول موظفيك بأمان وانتظام مع كل وردية وفق بروتوكولات SLA صارمة.",
      fs: ["حافلات كبيرة ومتوسطة ومكوكية","سائقون مرخصون ومدربون على قيادة الدفاع الآمن","مسارات محسّنة مزامنة مع جداول الوردية","تتبع GPS ومنبهات الانحراف","مركبات احتياطية وتغطية كاملة للوردية","شهادات امتثال لأنظمة المرور السعودية"] },
    { n: "03", icon: <Utensils size={30}/>, t: "خدمات التغذية", sub: "٣ وجبات يومياً من مطابخ HACCP معتمدة", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90", c: "#015530",
      d: "ثلاث وجبات ساخنة يومياً من مطابخ مركزية معتمدة وفق معايير HACCP، بقوائم متعددة الأطباق تراعي التنوع الثقافي للقوى العاملة. 100% حلال.",
      fs: ["إنتاج في مطابخ HACCP بمناطق معزولة","قوائم جنوب آسيوية وعربية وفلبينية وأفريقية","توصيل ساخن مع الحفاظ على درجة حرارة التقديم","تحكم دقيق بالحصص وفحص يومي","اختبار مختبري طرف ثالث ومراجعة المورّدين","بدائل نباتية وخيارات غذائية خاصة"] },
  ],
  en: [
    { n: "01", icon: <Building2 size={30}/>, t: "Labor Housing", sub: "MHRSD-compliant camps built for dignity & rest", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90", c: "#015530",
      d: "Sakan Tech provides MHRSD-compliant residential camps that create safe, comfortable living environments which enhance workforce wellbeing and productivity.",
      fs: ["2-4-6-8 person rooms with individual AC","24/7 manned security & CCTV coverage","High-speed Wi-Fi & recreation halls","Daily housekeeping & laundry services","On-site clinic & welfare officer","Preventive maintenance within defined SLA windows"] },
    { n: "02", icon: <Bus size={30}/>, t: "Staff Transport", sub: "GPS-tracked fleet engineered for your operations", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90", c: "#027a44",
      d: "Sakan Tech's modern AC fleet with licensed drivers and real-time GPS tracking ensures safe, reliable shift mobilization with strict SLA protocols.",
      fs: ["Large coaches, midi-buses & shuttle fleet","Licensed drivers trained in defensive driving","Optimized routes synced to shift schedules","GPS tracking & geofence alerts","Backup vehicles & shift-coverage redundancy","Saudi traffic regulation compliance certification"] },
    { n: "03", icon: <Utensils size={30}/>, t: "Catering & Food", sub: "3 daily meals from HACCP-aligned kitchens", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90", c: "#015530",
      d: "Three daily hot meals from HACCP-certified central kitchens, with multi-cuisine menus respecting the cultural diversity of the workforce. 100% Halal.",
      fs: ["HACCP production with segregated kitchen zones","South Asian, Arabic, Filipino & African menus","Hot delivery maintaining serving temperature","Calibrated portions & daily sample retention","Third-party lab testing & supplier audits","Vegetarian & special dietary alternatives"] },
  ],
};

export default function ServicesPage() {
  const { lang } = useLang();
  const svcs = SVCS[lang];

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: "160px 32px 110px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85" alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(1,85,48,0.92) 0%, rgba(0,0,0,0.75) 60%, rgba(235,185,104,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "#ebb968", background: "rgba(235,185,104,0.15)", border: "1px solid rgba(235,185,104,0.35)", padding: "6px 18px", borderRadius: 999, display: "inline-block", marginBottom: 20 }}>
              {lang === "ar" ? "ما نقدمه" : "WHAT WE OFFER"}
            </span>
            <h1 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(42px,5vw,72px)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              {lang === "ar" ? "خدماتنا المتكاملة" : "Our Services"}
            </h1>
            <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 480, margin: "0 auto", lineHeight: 1.85 }}>
              {lang === "ar" ? "ثلاثة محاور تُشكّل معاً منظومة حياة متكاملة." : "Three pillars forming a complete integrated living ecosystem."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px", display: "flex", flexDirection: "column", gap: 96 }}>
        {svcs.map((svc, i) => {
          const anchor = ["housing", "transport", "catering"][i];
          return (
          <motion.div key={i} id={anchor} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 60, alignItems: "center", scrollMarginTop: 80 }}>
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>
                <img src={svc.img} alt={svc.t} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${svc.c}33, transparent 60%)` }} />
                <div style={{ position: "absolute", top: 20, right: 20, width: 48, height: 48, borderRadius: 14, background: svc.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Almarai", fontWeight: 800, fontSize: 14, color: "#fff" }}>
                  {svc.n}
                </div>
              </div>
            </div>

            <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: svc.c + "14", display: "flex", alignItems: "center", justifyContent: "center", color: svc.c }}>{svc.icon}</div>
                <span style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: svc.c, background: svc.c + "10", padding: "5px 14px", borderRadius: 999 }}>
                  {lang === "ar" ? `خدمة ${svc.n}` : `Service ${svc.n}`}
                </span>
              </div>
              <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: "#1a1a1a", marginBottom: 8, lineHeight: 1.2 }}>{svc.t}</h2>
              <p style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 14, color: svc.c, marginBottom: 16 }}>{svc.sub}</p>
              <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 16, color: "#666", lineHeight: 1.9, marginBottom: 24 }}>{svc.d}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {svc.fs.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckCircle2 size={15} color={svc.c} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontFamily: "Almarai", fontWeight: 400, fontSize: 13, color: "#555", lineHeight: 1.7 }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="/#contact" style={{ display: "inline-flex", marginTop: 28, padding: "14px 32px", borderRadius: 14, fontFamily: "Almarai", fontWeight: 800, fontSize: 14, color: "#fff", textDecoration: "none", background: `linear-gradient(135deg,${svc.c},#027a44)`, boxShadow: `0 8px 28px ${svc.c}44` }}>
                {lang === "ar" ? "اطلب هذه الخدمة" : "Request This Service"}
              </a>
            </div>
          </motion.div>
          );
        })}
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
