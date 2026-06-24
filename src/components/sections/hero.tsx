"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useLang } from "@/context/lang";

const stats = {
  ar:[{v:"1,000+",l:"سرير تحت الإدارة"},{v:"7/24",l:"تشغيل وأمن مستمر"},{v:"3 وجبات",l:"يومياً لكل ساكن حسب الطلب"},{v:"100%",l:"أسطول مجهز بأحدث التقنيات"}],
  en:[{v:"1,000+",l:"Beds Under Management"},{v:"7/24",l:"Operations & Security"},{v:"3 Meals",l:"Daily, Per Resident On Demand"},{v:"100%",l:"Tech-Equipped Fleet"}],
};

export default function Hero() {
  const { lang } = useLang();
  const S = stats[lang];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%", "20%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <section ref={ref} style={{ position:"relative", height:"100vh", minHeight:720, display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Parallax background */}
      <motion.div style={{ position:"absolute", inset:0, y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=90"
          alt=""
          style={{ width:"100%", height:"108%", objectFit:"cover", objectPosition:"center 40%" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg, rgba(10,83,42,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(10,83,42,0.70) 100%)" }}/>

      {/* Animated light particles — desktop only */}
      {!isMobile && [...Array(5)].map((_,i) => (
        <motion.div key={i}
          style={{ position:"absolute", borderRadius:"50%", background:"radial-gradient(circle, rgba(227,182,101,0.18) 0%, transparent 70%)", width:`${180+i*60}px`, height:`${180+i*60}px`, top:`${10+i*15}%`, left:`${5+i*18}%`, pointerEvents:"none" }}
          animate={{ scale:[1,1.2,1], opacity:[0.4,0.7,0.4] }}
          transition={{ duration:4+i*0.8, repeat:Infinity, ease:"easeInOut", delay:i*0.6 }}
        />
      ))}

      {/* Spacer — pushes content to bottom, ensures badge never hides behind navbar */}
      <div style={{ flex:1, minHeight:90 }} />

      {/* Content */}
      <div style={{
        position:"relative", zIndex:10,
        maxWidth:1280, margin:"0 auto", width:"100%",
        padding: isMobile ? "0 20px 165px" : "0 48px 148px",
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.65 }}
          style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:22, padding: isMobile ? "6px 14px" : "8px 20px", borderRadius:999, background:"rgba(227,182,101,0.15)", border:"1px solid rgba(227,182,101,0.45)" }}>
          <motion.span
            animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }} transition={{ duration:2.2, repeat:Infinity }}
            style={{ width:6, height:6, borderRadius:"50%", background:"#E3B665", display:"block", flexShrink:0 }}/>
          <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize: isMobile ? 10 : 12, color:"#E3B665", letterSpacing: isMobile ? "0.05em" : "0.1em" }}>
            {lang==="ar" ? "شريكك الاستراتيجي لخدمات التموين، الإعاشة، الأيدي العاملة" : "YOUR STRATEGIC PARTNER IN CATERING, ACCOMMODATION & MANPOWER"}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35, duration:0.8 }}
          style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(30px,7vw,88px)", color:"#fff", lineHeight:1.12, marginBottom:18 }}>
          {lang==="ar"
            ?<>بُنيت للناس الذين<br/><span style={{ color:"#E3B665" }}>يبنون المملكة</span></>
            :<>Built for the People<br/><span style={{ color:"#E3B665" }}>Building the Kingdom</span></>}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.52, duration:0.7 }}
          style={{ fontFamily:"Almarai", fontWeight:300, fontSize:"clamp(14px,1.8vw,19px)", color:"rgba(255,255,255,0.78)", lineHeight:1.9, maxWidth:540, marginBottom:32 }}>
          {lang==="ar"
            ?"سكن تك تقدم حلول متكاملة للإسكان والنقل والتغذية — مُصمَّمة لدعم المقاولين والمشغلين الصناعيين الذين يقودون رؤية 2030."
            :"Sakan Tech delivers integrated accommodation, transport & catering — engineered to support contractors and industrial operators driving Vision 2030."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.66, duration:0.65 }}
          style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
          <Link href="/#contact"
            style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 14 : 15, textDecoration:"none", padding: isMobile ? "13px 26px" : "15px 36px", borderRadius:16, color:"#1a1a1a", background:"linear-gradient(135deg,#E3B665,#d4a040)", boxShadow:"0 8px 32px rgba(227,182,101,0.48)", transition:"all 0.25s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLElement).style.boxShadow="0 14px 42px rgba(227,182,101,0.6)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(227,182,101,0.48)";}}>
            {lang==="ar" ? "تواصل معنا" : "Get in Touch"}
          </Link>
          <Link href="/services"
            style={{ fontFamily:"Almarai", fontWeight:700, fontSize: isMobile ? 14 : 15, textDecoration:"none", padding: isMobile ? "13px 26px" : "15px 36px", borderRadius:16, color:"#fff", background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.35)", backdropFilter:"blur(8px)", transition:"all 0.25s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.22)";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)";(e.currentTarget as HTMLElement).style.transform="translateY(0)";}}>
            {lang==="ar" ? "اكتشف خدماتنا" : "Our Services"}
          </Link>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.92, duration:0.65 }}
        style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:10, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(22px)", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "0 16px" : "0 32px", display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)" }}>
          {S.map((s,i) => (
            <div key={i} style={{
              padding: isMobile ? "14px 10px" : "20px 20px",
              borderInlineStart: "1px solid rgba(255,255,255,0.08)",
              textAlign:"center",
              borderTop: isMobile && i >= 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 20 : 28, color:"#E3B665", lineHeight:1 }}>{s.v}</div>
              <div style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 10 : 12, color:"rgba(255,255,255,0.55)", marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
