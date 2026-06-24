"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Bus, Utensils, CheckCircle2, Users } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/ui/chatbot";
import { useLang } from "@/context/lang";

const SVCS = {
  ar: [
    { n:"01", icon:<Users size={30}/>, t:"خدمات توفير القوى العاملة", sub:"استقطاب وتعيين وإدارة الكوادر المؤهلة",
      img:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90", c:"#0A532A",
      d:"في بيئة الأعمال المتسارعة اليوم، يُعدّ تأمين الكفاءات المناسبة في الوقت المناسب أمرًا حاسمًا. نقدم حلول توظيف شاملة ومرنة ومتوافقة تمامًا مع الأنظمة والتشريعات، مما يُتيح للشركات التركيز على أعمالها الأساسية بينما نتولى نحن الاستقطاب والتعيين وإدارة الموارد البشرية.",
      fs:["استقطاب الكفاءات المحلية والدولية","توثيق العقود وفق الأنظمة السعودية","إدارة الرواتب والإجازات والمزايا","تحديد المتطلبات الوظيفية وتطابق المؤهلات","فحص ما قبل التوظيف ودراسة الخلفيات","دعم التأهيل والاستقدام والاستقبال"] },
    { n:"02", icon:<Building2 size={30}/>, t:"سكن العمالة", sub:"منشآت متكاملة وفق معايير MHRSD للكرامة والراحة",
      img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90", c:"#0D6B36",
      d:"صُمّمت منشآتنا السكنية من أجل كرامة القوى العاملة وراحتها ورفاهيتها. نوفر بيئة معيشية آمنة ومريحة معتمدة من وزارة الموارد البشرية والتنمية الاجتماعية، ترفع رفاهية العمال وتُعزز إنتاجيتهم.",
      fs:["غرف 2-4-6-8 أشخاص بتكييف فردي","أمن وحراسة 24/7 وكاميرات CCTV","واي فاي عالي السرعة وصالات ترفيه","خدمات نظافة يومية وغسيل ملابس","خدمات رعاية اجتماعية وعبادة في الموقع","صيانة وقائية وفق نوافذ SLA محددة"] },
    { n:"03", icon:<Bus size={30}/>, t:"نقل طاقم العمل", sub:"أسطول بتقنيات حديثة مُهندَس لإيقاع عملياتك",
      img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90", c:"#0A532A",
      d:"أسطول حديث مكيّف مع سائقين محترفين ومؤهلين يرتدون الزي الرسمي، وتقنيات تتبع فورية، يضمن وصول موظفيك بأمان وفي الوقت المحدد مع كل وردية وفق بروتوكولات SLA صارمة.",
      fs:["حافلات كبيرة ومتوسطة ومكوكية","سائقون مرخصون مدربون على قيادة الدفاع الآمن","مسارات محسّنة مزامنة مع جداول الوردية","تتبع بتقنيات حديثة ومنبهات الانحراف عن المسار","مركبات احتياطية وتغطية كاملة للوردية","شهادات امتثال لأنظمة المرور السعودية"] },
    { n:"04", icon:<Utensils size={30}/>, t:"خدمات الطعام والمأكولات", sub:"٣ وجبات يومياً من مطابخ معتمدة وفق HACCP",
      img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90", c:"#0D6B36",
      d:"ثلاث وجبات ساخنة يومياً يتم إعدادها في مطابخ مركزية معتمدة وفق نظام تحليل المخاطر ونقاط التحكم الحرجة (HACCP)، بقوائم متعددة الأطباق تراعي التنوع الثقافي للقوى العاملة. 100% حلال.",
      fs:["إنتاج في مطابخ HACCP بمناطق معزولة","قوائم جنوب آسيوية وعربية وفلبينية وأفريقية","توصيل ساخن مع الحفاظ على درجات حرارة التقديم","تحكم دقيق بالحصص وفحص عينات يومي","اختبار مختبري من طرف ثالث ومراجعة الموردين","بدائل نباتية وخيارات غذائية خاصة"] },
  ],
  en: [
    { n:"01", icon:<Users size={30}/>, t:"Workforce Supply Services", sub:"Recruitment, placement & HR administration",
      img:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90", c:"#0A532A",
      d:"In today's dynamic business environment, securing the right talent at the right time is critical to operational success. We provide comprehensive, flexible recruitment solutions that are fully compliant with applicable regulations — enabling businesses to focus on their core operations while we manage sourcing, placement, and HR administration.",
      fs:["Local & international talent sourcing","Contracts compliant with Saudi labour law","Payroll, leave & benefits administration","Job profiling & qualification matching","Pre-employment screening & background checks","Onboarding, mobilisation & arrival support"] },
    { n:"02", icon:<Building2 size={30}/>, t:"Labor Accommodation", sub:"MHRSD-compliant facilities built for dignity & comfort",
      img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90", c:"#0D6B36",
      d:"Our facilities are designed for workforce dignity, comfort, and wellbeing. We provide MHRSD-certified residential camps that create safe, comfortable living environments which enhance worker welfare and productivity.",
      fs:["2–4–6–8 person rooms with individual AC","24/7 manned security & CCTV coverage","High-speed Wi-Fi & recreation halls","Daily housekeeping & laundry services","On-site welfare & prayer room facilities","Preventive maintenance within defined SLA windows"] },
    { n:"03", icon:<Bus size={30}/>, t:"Staff Transport", sub:"Advanced technology fleet engineered for your operational rhythm",
      img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90", c:"#0A532A",
      d:"A modern air-conditioned fleet with uniformed, professionally trained drivers and advanced real-time tracking — ensuring safe, on-time shift mobilisation under strict SLA protocols.",
      fs:["Large coaches, midi-buses & shuttle fleet","Licensed drivers trained in defensive driving","Optimised routes synced to shift schedules","Advanced technology tracking & route-deviation alerts","Backup vehicles & full shift-coverage redundancy","Saudi traffic regulation compliance certification"] },
    { n:"04", icon:<Utensils size={30}/>, t:"Food & Catering Services", sub:"3 daily meals from HACCP-certified kitchens",
      img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90", c:"#0D6B36",
      d:"Three hot meals daily, prepared in HACCP-certified central kitchens to ensure food quality and safety — with multi-cuisine menus respecting the cultural diversity of the workforce. 100% Halal.",
      fs:["HACCP production with segregated kitchen zones","South Asian, Arabic, Filipino & African menus","Hot delivery maintaining correct serving temperatures","Calibrated portions & daily sample retention","Third-party lab testing & supplier audits","Vegetarian & special dietary alternatives"] },
  ],
};

export default function ServicesPage() {
  const { lang } = useLang();
  const svcs = SVCS[lang];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#fff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position:"relative",
        padding: isMobile ? "120px 20px 72px" : "160px 32px 110px",
        overflow:"hidden",
        clipPath: isMobile ? "none" : "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
      }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85"
            alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(1,85,48,0.92) 0%, rgba(0,0,0,0.75) 60%, rgba(227,182,101,0.2) 100%)" }}/>
        </div>
        <div style={{ position:"relative", zIndex:1, maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.2em", color:"#E3B665", background:"rgba(227,182,101,0.15)", border:"1px solid rgba(227,182,101,0.35)", padding:"6px 18px", borderRadius:999, display:"inline-block", marginBottom:20 }}>
              {lang==="ar" ? "ما نقدمه" : "WHAT WE OFFER"}
            </span>
            <h1 style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? "clamp(32px,9vw,52px)" : "clamp(42px,5vw,72px)", color:"#fff", lineHeight:1.1, marginBottom:16 }}>
              {lang==="ar" ? "خدماتنا المتكاملة" : "Our Services"}
            </h1>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,0.72)", maxWidth:520, margin:"0 auto", lineHeight:1.85 }}>
              {lang==="ar" ? "تموين · إعاشة · أيدي عاملة — حلول متكاملة تحت مظلة واحدة" : "Catering · Accommodation · Manpower — Integrated solutions under one roof"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "56px 20px" : "88px 32px", display:"flex", flexDirection:"column", gap: isMobile ? 56 : 96 }}>
        {svcs.map((svc, i) => {
          const anchor = ["workforce","housing","transport","catering"][i];
          return (
            <motion.div key={i} id={anchor}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7 }}
              style={{
                display:"grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
                gap: isMobile ? 28 : 60,
                alignItems:"center",
                scrollMarginTop:80,
              }}>

              {/* Image */}
              <div style={{ order: isMobile ? 1 : (i % 2 === 0 ? 1 : 2) }}>
                <div style={{ position:"relative", borderRadius: isMobile ? 18 : 24, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.12)" }}>
                  <img src={svc.img} alt={svc.t} style={{ width:"100%", aspectRatio: isMobile ? "16/9" : "4/3", objectFit:"cover", display:"block" }}/>
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, ${svc.c}33, transparent 60%)` }}/>
                  <div style={{ position:"absolute", top:16, right:16, width:44, height:44, borderRadius:13, background:svc.c, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:14, color:"#fff" }}>
                    {svc.n}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ order: isMobile ? 2 : (i % 2 === 0 ? 2 : 1) }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:50, height:50, borderRadius:16, background:svc.c+"14", display:"flex", alignItems:"center", justifyContent:"center", color:svc.c }}>{svc.icon}</div>
                  <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.18em", color:svc.c, background:svc.c+"10", padding:"5px 14px", borderRadius:999 }}>
                    {lang==="ar" ? `خدمة ${svc.n}` : `Service ${svc.n}`}
                  </span>
                </div>
                <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(24px,3vw,40px)", color:"#1a1a1a", marginBottom:8, lineHeight:1.2 }}>{svc.t}</h2>
                <p style={{ fontFamily:"Almarai", fontWeight:700, fontSize:14, color:svc.c, marginBottom:14 }}>{svc.sub}</p>
                <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 14 : 16, color:"#666", lineHeight:1.9, marginBottom:22 }}>{svc.d}</p>

                <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:isMobile ? 8 : 10 }}>
                  {svc.fs.map((f, fi) => (
                    <div key={fi} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                      <CheckCircle2 size={14} color={svc.c} style={{ flexShrink:0, marginTop:3 }}/>
                      <span style={{ fontFamily:"Almarai", fontWeight:400, fontSize: isMobile ? 12 : 13, color:"#555", lineHeight:1.7 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href="/#contact" style={{
                  display:"inline-flex", alignItems:"center", marginTop:24,
                  padding: isMobile ? "12px 24px" : "14px 32px",
                  borderRadius:14, fontFamily:"Almarai", fontWeight:800, fontSize:14,
                  color:"#fff", textDecoration:"none",
                  background:`linear-gradient(135deg,${svc.c},#0D6B36)`,
                  boxShadow:`0 8px 28px ${svc.c}44`,
                }}>
                  {lang==="ar" ? "اطلب هذه الخدمة" : "Request This Service"}
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
