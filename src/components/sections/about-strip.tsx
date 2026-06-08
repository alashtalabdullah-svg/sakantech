"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Compass, Award, Shield, BarChart3, MapPin } from "lucide-react";
import { useLang } from "@/context/lang";

const WHY = {
  ar: [
    { icon: Award,    t:"عقد واحد شامل",            d:"مشغّل واحد للإسكان والنقل والتغذية — لا تعدد جهات ولا تضارب عقود.", img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
    { icon: Shield,   t:"امتثال MHRSD",              d:"منشآت وخدمات مصمَّمة لتلبية وتجاوز معايير وزارة الموارد البشرية.",  img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" },
    { icon: Compass,  t:"موثوقية تشغيلية",            d:"بروتوكولات SLA محددة وفرق احتياطية تضمن الاستمرارية في أصعب المواقع.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    { icon: Target,   t:"تصميم يُكرم الإنسان",         d:"مساحات معيشية مصمَّمة للكرامة والراحة — تحسّن بيئة الاحتفاظ بالعمالة.", img:"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" },
    { icon: BarChart3,t:"تقارير شفافة",               d:"لوحات KPI شهرية: الإشغال، الوجبات، التعبئة في الوقت المحدد.",  img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { icon: MapPin,   t:"حضور قوي في المنطقة الشرقية", d:"موقع استراتيجي في الخبر والدمام — دقائق من أكبر ممرات الطاقة.", img:"https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80" },
  ],
  en: [
    { icon: Award,    t:"Single-Contract",          d:"One operator for housing, transport & meals — no multi-vendor complexity.",               img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
    { icon: Shield,   t:"MHRSD Compliant",          d:"Facilities and services engineered to meet and exceed Saudi labor welfare standards.",    img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" },
    { icon: Compass,  t:"Operational Reliability",  d:"Defined SLA windows and backup teams ensuring continuity on the toughest sites.",        img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    { icon: Target,   t:"Workforce-Centric Design", d:"Living spaces designed for dignity and rest — improving workforce retention rates.",      img:"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" },
    { icon: BarChart3,t:"Transparent Reporting",    d:"Monthly KPI dashboards: occupancy, meals, mobilization, and welfare audits.",           img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { icon: MapPin,   t:"Eastern Province Scale",   d:"Strategically based in Khobar & Dammam — minutes from major industrial corridors.",     img:"https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80" },
  ],
};

export default function AboutStrip() {
  const { lang } = useLang();
  const items = WHY[lang];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <section style={{ background: "#fff" }}>

      {/* ── Why Us ── */}
      <div style={{ background: "#fff", padding: isMobile ? "64px 20px" : "96px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}
            style={{ textAlign:"center", marginBottom:64 }}>
            <span className="section-label">{lang==="ar"?"مزايانا التنافسية":"WHY CHOOSE US"}</span>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(32px,3.5vw,50px)", color:"#1a1a1a", lineHeight:1.1, marginBottom:14 }}>
              {lang==="ar"?"لماذا سكن تك؟":"Why Sakan Tech?"}
            </h2>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:16, color:"#6b7280", maxWidth:440, margin:"0 auto" }}>
              {lang==="ar"?"ستة أسباب تجعلنا الخيار الأول لكبرى شركات المقاولات":"Six reasons we are the first choice for top contractors"}
            </p>
          </motion.div>

          {/* Cards grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {items.map((item, i) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === i;
              return (
                <motion.div key={i}
                  initial={{ opacity:0, y:28 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-30px" }}
                  transition={{ delay:i*0.08, duration:0.6 }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position:"relative", borderRadius:24, overflow:"hidden",
                    background:"#fff",
                    boxShadow: isHovered ? "0 24px 56px rgba(1,85,48,0.18)" : "0 4px 24px rgba(0,0,0,0.07)",
                    border: isHovered ? "1px solid rgba(1,85,48,0.18)" : "1px solid rgba(0,0,0,0.06)",
                    cursor:"pointer",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    transition:"all 0.35s cubic-bezier(0.34,1.1,0.64,1)",
                  }}>

                  {/* Image with zoom */}
                  <div style={{ position:"relative", height:200, overflow:"hidden" }}>
                    <img src={item.img} alt=""
                      style={{
                        width:"100%", height:"100%", objectFit:"cover",
                        transform: isHovered ? "scale(1.08)" : "scale(1.0)",
                        transition:"transform 0.65s ease",
                      }}
                    />
                    {/* Overlay */}
                    <div style={{
                      position:"absolute", inset:0,
                      background: isHovered
                        ? "linear-gradient(to bottom, rgba(1,85,48,0.55) 0%, rgba(0,0,0,0.5) 100%)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)",
                      transition:"background 0.4s",
                    }}/>
                    {/* Icon badge */}
                    <div style={{
                      position:"absolute", top:16, insetInlineStart:16,
                      width:44, height:44, borderRadius:14,
                      background: isHovered ? "linear-gradient(135deg,#ebb968,#d4a040)" : "rgba(255,255,255,0.18)",
                      backdropFilter:"blur(8px)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff",
                      transition:"all 0.35s",
                      boxShadow: isHovered ? "0 4px 16px rgba(235,185,104,0.5)" : "none",
                    }}>
                      <Icon size={20} strokeWidth={isHovered ? 2.5 : 2} color={isHovered ? "#1a1a1a" : "#fff"}/>
                    </div>
                    {/* Number */}
                    <div style={{
                      position:"absolute", top:16, insetInlineEnd:16,
                      fontFamily:"Almarai", fontWeight:800, fontSize:28,
                      color: isHovered ? "rgba(235,185,104,0.8)" : "rgba(255,255,255,0.3)",
                      lineHeight:1, transition:"color 0.35s",
                    }}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:"22px 24px 26px" }}>
                    {/* Accent line */}
                    <div style={{
                      height:2, width: isHovered ? 48 : 28,
                      background:"linear-gradient(to right,#015530,#ebb968)",
                      borderRadius:9999, marginBottom:12,
                      transition:"width 0.4s ease",
                    }}/>
                    <h3 style={{
                      fontFamily:"Almarai", fontWeight:800, fontSize:16,
                      color: isHovered ? "#015530" : "#1a1a1a",
                      marginBottom:8, transition:"color 0.3s",
                    }}>
                      {item.t}
                    </h3>
                    <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:13.5, color:"#6b7280", lineHeight:1.85 }}>
                      {item.d}
                    </p>
                  </div>

                  {/* Bottom accent bar on hover */}
                  <div style={{
                    position:"absolute", bottom:0, left:0, right:0, height:3,
                    background:"linear-gradient(to right,#015530,#ebb968)",
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin:"left",
                    transition:"transform 0.4s ease",
                  }}/>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Story ── */}
      <div style={{ background:"var(--green-xs)", padding: isMobile ? "64px 20px" : "100px 32px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap: isMobile ? 36 : 60, alignItems:"start" }}>

          {/* Left: story text */}
          <motion.div initial={{ opacity:0, x: lang==="ar"?30:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <span className="section-label">{lang==="ar"?"قصتنا":"OUR STORY"}</span>

            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(28px,3vw,44px)", color:"#1a1a1a", lineHeight:1.12, marginBottom:20 }}>
              {lang==="ar"
                ?<>مزود متكامل<br/><span style={{ color:"#015530" }}>لبيئة العيش</span></>
                :<>An Integrated<br/><span style={{ color:"#015530" }}>Workforce Living Provider</span></>
              }
            </h2>

            {/* Gold divider */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
              <div style={{ height:2, width:40, background:"linear-gradient(to right,#015530,#ebb968)", borderRadius:9999 }}/>
              <div style={{ height:6, width:6, borderRadius:"50%", background:"#ebb968" }}/>
            </div>

            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:16, color:"#4b5563", lineHeight:2.0, marginBottom:16 }}>
              {lang==="ar"
                ?"سكن تك شركة سعودية متخصصة تقدم حلول العيش المتكاملة للعمالة — الإسكان والنقل اليومي والتغذية — مُصمَّمة لدعم المقاولين والمشغلين الصناعيين ومطوري البنية التحتية الذين يبنون رؤية 2030."
                :"Sakan Tech is a specialist Saudi provider of integrated workforce living solutions — labor accommodation, daily transportation, and catering — engineered to support contractors, industrial operators, and infrastructure developers building Vision 2030."}
            </p>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:15, color:"#6b7280", lineHeight:2.0 }}>
              {lang==="ar"
                ?"نصمم منشآتنا وأسطولنا وخدمات الطعام كنظام تشغيلي متصل واحد، مما يوفر مستوى معيشياً أعلى للعمال ومكاسب إنتاجية قابلة للقياس."
                :"We design our facilities, fleet, and food services as one connected operating system — delivering a higher standard of life for workers and measurable productivity gains for employers."}
            </p>

            {/* Stats */}
            <div style={{ display:"flex", gap:0, marginTop:36, borderTop:"1px solid rgba(0,0,0,0.08)", borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
              {[
                { v:"2016", l:lang==="ar"?"التأسيس":"Founded" },
                { v:"1,000+", l:lang==="ar"?"سرير":"Beds" },
                { v:"15+", l:lang==="ar"?"مدينة":"Cities" }
              ].map((s, si) => (
                <div key={s.v} style={{
                  flex:1, padding:"24px 0", textAlign:"center",
                  borderInlineEnd: si < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                }}>
                  <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize:30, color:"#015530", lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize:12, color:"#9ca3af", marginTop:5, letterSpacing:"0.05em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Vision + Mission (premium, no emojis) */}
          <motion.div initial={{ opacity:0, x: lang==="ar"?-30:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.15, duration:0.7 }}
            style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Vision */}
            {[
              {
                Icon: Target,
                label: lang==="ar"?"رؤيتنا":"Our Vision",
                text: lang==="ar"
                  ?"أن نكون الشريك الأكثر موثوقية في المملكة لخدمات العيش للعمالة، ونضع معياراً جديداً للإسكان والتنقل والرفاهية في القطاعين الصناعي والإنشائي."
                  :"To be the Kingdom's most trusted partner for workforce living — setting a new benchmark for accommodation, mobility, and welfare in the industrial and construction sectors.",
                accent:"#015530",
              },
              {
                Icon: Compass,
                label: lang==="ar"?"مهمتنا":"Our Mission",
                text: lang==="ar"
                  ?"تقديم خدمات متكاملة للإسكان والنقل والتغذية من خلال مشغّل واحد مسؤول — يحسّن جودة حياة العمال ويقلل المخاطر التشغيلية لعملائنا."
                  :"To deliver fully integrated housing, transport, and food services through a single accountable operator — improving worker quality of life and reducing operational risk for our clients.",
                accent:"#d4a040",
              },
            ].map(({ Icon, label, text, accent }) => (
              <div key={label} style={{
                padding:"32px 28px",
                borderRadius:22,
                background:"#fff",
                border:"1px solid rgba(0,0,0,0.07)",
                boxShadow:"0 4px 20px rgba(0,0,0,0.05)",
                position:"relative",
                overflow:"hidden",
              }}>
                {/* Left accent */}
                <div style={{ position:"absolute", top:0, bottom:0, insetInlineStart:0, width:3, background:`linear-gradient(to bottom,${accent},transparent)`, borderRadius:99 }}/>

                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <div style={{ width:42, height:42, borderRadius:13, background: accent==="#015530" ? "rgba(1,85,48,0.08)" : "rgba(212,160,64,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={20} color={accent} strokeWidth={2}/>
                  </div>
                  <span style={{ fontFamily:"Almarai", fontWeight:800, fontSize:15, color:"#1a1a1a" }}>{label}</span>
                </div>
                <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"#6b7280", lineHeight:1.9 }}>{text}</p>
              </div>
            ))}

            {/* CEO quote card */}
            <div style={{
              padding:"28px",
              borderRadius:22,
              background:"linear-gradient(145deg,#015530,#027a44)",
              position:"relative",
              overflow:"hidden",
              boxShadow:"0 12px 40px rgba(1,85,48,0.25)",
            }}>
              <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"22px 22px" }}/>
              <div style={{ fontSize:40, color:"rgba(235,185,104,0.4)", lineHeight:1, marginBottom:12 }}>"</div>
              <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"rgba(255,255,255,0.85)", lineHeight:1.9, marginBottom:18 }}>
                {lang==="ar"
                  ?"نؤمن بأن التميز التشغيلي هو المفتاح الحقيقي لكسب ثقة عملائنا."
                  :"Operational excellence is the true key to winning our clients' trust."}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:11, background:"rgba(235,185,104,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:15, color:"#ebb968" }}>M</div>
                <div>
                  <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:13, color:"#fff" }}>
                    {lang==="ar" ? "محمد طارق زبير" : "Muhammad Tariq Zubair"}
                  </div>
                  <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize:11, color:"#ebb968", marginTop:2 }}>
                    {lang==="ar" ? "الرئيس التنفيذي — سكن تك" : "CEO — Sakan Tech"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
