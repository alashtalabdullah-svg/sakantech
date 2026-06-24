"use client";
import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Bus, Utensils, Users, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/lang";

const DATA = {
  ar: [
    { id:"workforce", icon:<Users size={24}/>,     tag:"01 — التوظيف",  title:"توفير القوى العاملة", sub:"استقطاب • توظيف • إدارة الكوادر",          desc:"حلول توظيف شاملة ومرنة ومتوافقة مع الأنظمة — نتولى الاستقطاب والتعيين وإدارة الموارد البشرية بينما تركّز على أعمالك الأساسية.", img:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90" },
    { id:"housing",   icon:<Building2 size={24}/>, tag:"02 — الإسكان",  title:"خدمات الإسكان",       sub:"مجمعات متكاملة • امتثال MHRSD",             desc:"مجمعات سكنية مجهزة بالكامل: أمن 24/7، واي فاي، غرف متعددة التكوين، عيادة ميدانية — بيئة معيشية تليق بكل موظف.", img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90" },
    { id:"transport", icon:<Bus size={24}/>,       tag:"03 — النقل",    title:"خدمات النقل",         sub:"أسطول بتقنيات حديثة • توقيت مثالي",         desc:"أسطول حديث مكيّف مع سائقين محترفين ومؤهلين، وتقنيات تتبع فورية وبروتوكولات SLA صارمة لضمان وصول موظفيك في الوقت المحدد.", img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90" },
    { id:"catering",  icon:<Utensils size={24}/>,  tag:"04 — التغذية",  title:"خدمات التغذية",       sub:"3 وجبات يومياً • معايير HACCP",             desc:"ثلاث وجبات ساخنة يومياً من مطابخ معتمدة وفق HACCP — قوائم متنوعة تراعي التنوع الثقافي، 100% حلال.", img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90" },
  ],
  en: [
    { id:"workforce", icon:<Users size={24}/>,     tag:"01 — WORKFORCE", title:"Workforce Supply",   sub:"Sourcing • Placement • HR Management",       desc:"Comprehensive, flexible recruitment solutions fully compliant with regulations — we handle sourcing, placement, and HR while you focus on your core operations.", img:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90" },
    { id:"housing",   icon:<Building2 size={24}/>, tag:"02 — HOUSING",   title:"Labor Housing",      sub:"MHRSD-Compliant • 24/7 Security",            desc:"Fully equipped residential camps with 24/7 security, Wi-Fi, configurable rooms, on-site clinic — a living standard worthy of every worker.", img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=90" },
    { id:"transport", icon:<Bus size={24}/>,       tag:"03 — TRANSPORT", title:"Staff Transport",    sub:"Advanced Tech Fleet • Shift-Aligned",         desc:"Modern AC fleet with licensed, uniformed drivers and advanced real-time tracking — strict SLA protocols ensuring your workforce arrives on time, every shift.", img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90" },
    { id:"catering",  icon:<Utensils size={24}/>,  tag:"04 — CATERING",  title:"Catering & Food",    sub:"3 Daily Meals • HACCP Standards",            desc:"Three daily hot meals from HACCP-certified kitchens — multi-cuisine menus covering diverse workforce preferences. 100% Halal.", img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90" },
  ],
};

export default function Services() {
  const { lang } = useLang();
  const items = DATA[lang];
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const gridStyle = useMemo(() => isDesktop
    ? { gridTemplateColumns: items.map((_,i) => i===active ? "5fr" : "1fr").join(" ") }
    : { gridTemplateRows:    items.map((_,i) => i===active ? "5fr" : "1fr").join(" ") }
  , [active, isDesktop]);

  return (
    <section style={{ background:"#fff", padding: isDesktop ? "96px 32px" : "64px 20px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}
          style={{ textAlign:"center", marginBottom:52 }}>
          <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(34px,4vw,52px)", color:"#1a1a1a", lineHeight:1.1, marginBottom:14 }}>
            {lang==="ar"?"خدماتنا المتكاملة":"Our Integrated Services"}
          </h2>
          <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:17, color:"#6b7280", maxWidth:520, margin:"0 auto" }}>
            {lang==="ar"
              ? "تموين · إعاشة · أيدي عاملة — حلول متكاملة تحت مظلة واحدة"
              : "Catering · Accommodation · Manpower — Integrated solutions under one roof"}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.ul initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.75, delay:0.1 }}
          style={{
            display:"grid", gap:12, listStyle:"none",
            height: isDesktop ? 560 : "auto", minHeight: isDesktop ? "auto" : 600,
            ...gridStyle,
            ...(isDesktop ? { gridTemplateRows:"1fr" } : { gridTemplateColumns:"1fr" }),
            transition:"grid-template-columns 0.58s cubic-bezier(0.34,1.08,0.64,1), grid-template-rows 0.58s cubic-bezier(0.34,1.08,0.64,1)",
          }}>
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={i}
                /* Desktop: hover to expand; Mobile: click */
                onMouseEnter={() => isDesktop && setActive(i)}
                onClick={() => !isDesktop && setActive(i)}
                style={{
                  position:"relative", overflow:"hidden", borderRadius:28, cursor:"pointer",
                  minWidth: isDesktop ? 72 : 0, minHeight: !isDesktop ? 68 : 0,
                  boxShadow: isActive ? "0 24px 60px rgba(10,83,42,0.24)" : "0 4px 20px rgba(0,0,0,0.1)",
                  transition:"box-shadow 0.4s ease",
                }}>

                {/* Image with zoom on hover */}
                <img src={item.img} alt=""
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
                    transition:"transform 0.75s ease, filter 0.5s",
                    transform: isActive ? "scale(1.04)" : "scale(1.1)",
                    filter: isActive ? "brightness(0.72) saturate(1.1)" : "brightness(0.45) saturate(0.7)" }} />

                {/* Gradient */}
                <div style={{ position:"absolute", inset:0, transition:"background 0.5s",
                  background: isActive
                    ? "linear-gradient(to top, rgba(10,83,42,0.97) 0%, rgba(10,83,42,0.5) 38%, rgba(0,0,0,0.1) 70%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)" }} />

                {/* Top accent */}
                <div style={{ position:"absolute", top:0, inset:"0 0 auto 0", height:4,
                  background:"linear-gradient(to right,#0A532A,#E3B665)",
                  opacity: isActive ? 1 : 0, transition:"opacity 0.4s", borderRadius:"28px 28px 0 0" }} />

                {/* Collapsed label — desktop */}
                {isDesktop && !isActive && (
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14 }}>
                    <span style={{
                      color:"rgba(255,255,255,0.92)", fontSize:14, fontFamily:"Almarai", fontWeight:800,
                      letterSpacing:"0.12em", writingMode:"vertical-lr" as const,
                      transform: lang === "ar" ? "rotate(180deg)" : "none",
                      display:"block",
                      textShadow:"0 2px 10px rgba(0,0,0,0.7)",
                    }}>
                      {item.title}
                    </span>
                    <span style={{ color:"rgba(255,255,255,0.55)", fontSize:11, fontFamily:"Almarai", fontWeight:700 }}>0{i+1}</span>
                  </div>
                )}

                {/* Expanded content */}
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding: isDesktop ? "36px 34px" : "24px 22px" }}>
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div key={`c${i}`} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }} transition={{ duration:0.38 }}>
                        <motion.div initial={{ scale:0.65, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.04, type:"spring", stiffness:220 }}
                          style={{ width:52, height:52, borderRadius:17, marginBottom:16, background:"linear-gradient(135deg,rgba(227,182,101,0.6),#E3B665)", boxShadow:"0 8px 28px rgba(227,182,101,0.42)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
                          {item.icon}
                        </motion.div>
                        <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.09 }}
                          style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.18em", color:"#E3B665", display:"block", marginBottom:8 }}>
                          {item.tag}
                        </motion.span>
                        <motion.h3 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.13 }}
                          style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(22px,2vw,30px)", color:"#fff", marginBottom:10, lineHeight:1.2 }}>
                          {item.title}
                        </motion.h3>
                        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.18, duration:0.38 }}
                          style={{ height:2, width:44, background:"linear-gradient(to right,#E3B665,transparent)", marginBottom:14, borderRadius:9999 }} />
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.22 }}
                          style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"rgba(255,255,255,0.8)", lineHeight:1.9, maxWidth:340, marginBottom:18 }}>
                          {item.desc}
                        </motion.p>
                        {/* ← Link to services page at the anchor */}
                        <Link href={`/services#${item.id}`}
                          style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"Almarai", fontWeight:700, fontSize:13, color:"#E3B665", textDecoration:"none", transition:"gap 0.22s" }}
                          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.gap="10px";}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.gap="6px";}}>
                          {lang==="ar"?"اكتشف المزيد":"Learn More"}
                          {lang==="ar"?<ArrowLeft size={14}/>:<ArrowRight size={14}/>}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mobile collapsed */}
                  {!isDesktop && !isActive && (
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ color:"rgba(255,255,255,0.7)" }}>{item.icon}</span>
                      <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:16, color:"rgba(255,255,255,0.9)" }}>{item.title}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </motion.ul>

        {/* Dots */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:28 }}>
          {items.map((_,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ height:5, borderRadius:9999, border:"none", cursor:"pointer", transition:"all 0.38s", width: i===active ? 36 : 8, background: i===active ? "#0A532A" : "#d1d5db" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
