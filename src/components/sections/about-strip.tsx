"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Shield, Compass, Target, BarChart3, MapPin, Sparkles, Brain } from "lucide-react";
import { useLang } from "@/context/lang";

const WHY = {
  ar: [
    { icon: Award,    t:"عقد واحد — تكامل كامل",      d:"مشغّل واحد، وعقد واحد، وفريق مسؤول واحد يتولى الإسكان والنقل والوجبات — مما يُلغي تكلفة التنسيق بين موردين متعددين.", img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
    { icon: Shield,   t:"متوافق مع معايير MHRSD",      d:"صُمّمت المرافق والمأكولات ووسائل النقل لتلبية معايير رعاية العمال السعودية ومعايير الصحة البلدية والتفوق عليها.", img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" },
    { icon: Compass,  t:"موثوقية تشغيلية عالية",       d:"بروتوكولات SLA محددة وفرق احتياطية تضمن الاستمرارية في أصعب المواقع وأكثرها تحدياً.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    { icon: Target,   t:"تصميم يُعلي من شأن العامل",   d:"مساحات معيشية مصمَّمة للكرامة والراحة والرفاهية — مما يُقلّل مباشرة من معدل دوران العمالة لدى عملائنا.", img:"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" },
    { icon: BarChart3,t:"تقارير SLA شفافة ودورية",     d:"لوحات مؤشرات أداء شهرية: نسب الإشغال، تسليم الوجبات، التعبئة في الوقت المحدد، ونتائج تدقيقات الرعاية.", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { icon: MapPin,   t:"قدرة المنطقة الشرقية",        d:"موقع استراتيجي في الخبر والدمام — على بُعد دقائق من أبرز ممرات الصناعة والطاقة والبناء الكبرى.", img:"https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80" },
  ],
  en: [
    { icon: Award,    t:"Single Contract — Full Integration",  d:"One operator, one contract, one accountable team for accommodation, transport, and meals — eliminating multi-vendor coordination costs.", img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
    { icon: Shield,   t:"MHRSD Compliant",                     d:"Facilities, food, and transport designed to meet — and exceed — Saudi worker welfare standards and municipal health codes.", img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" },
    { icon: Compass,  t:"Operational Reliability",             d:"Defined SLA protocols and backup teams ensuring continuity on the toughest and most demanding sites.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    { icon: Target,   t:"Workforce-Centric Design",            d:"Living spaces built for dignity, comfort, and wellbeing — directly reducing workforce attrition for our clients.", img:"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" },
    { icon: BarChart3,t:"Transparent SLA Reporting",           d:"Monthly KPI dashboards: occupancy rates, meal delivery, on-time mobilisation, and welfare audit outcomes.", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { icon: MapPin,   t:"Eastern Region Scale",                d:"Strategically located across Al Khobar and Dammam — minutes from major industrial, energy, and construction corridors.", img:"https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80" },
  ],
};

const VALS = {
  ar: [
    { Icon: Sparkles, t: "رؤيتنا",  accent:"#0A532A", grad:"linear-gradient(135deg,#0A532A,#0D6B36)",
      d: "أن نكون الشريك الأكثر ثقةً في المملكة في مجال سكن القوى العاملة — وضع معيار جديد للإسكان والنقل والرفاهية في القطاعين الصناعي والإنشائي." },
    { Icon: Brain,    t: "مهمتنا", accent:"#C99830", grad:"linear-gradient(135deg,#C99830,#E3B665)",
      d: "تقديم خدمات متكاملة في مجالات الإسكان والنقل والغذاء من خلال مشغّل واحد مسؤول — مما يُحسّن جودة حياة العمال، ويُقلّل المخاطر التشغيلية لعملائنا، ويدعم أجندة رعاية العمال في المملكة." },
  ],
  en: [
    { Icon: Sparkles, t: "Our Vision",  accent:"#0A532A", grad:"linear-gradient(135deg,#0A532A,#0D6B36)",
      d: "To be the Kingdom's most trusted partner in workforce accommodation — setting a new benchmark for housing, transportation, and welfare across the industrial and construction sectors." },
    { Icon: Brain,    t: "Our Mission", accent:"#C99830", grad:"linear-gradient(135deg,#C99830,#E3B665)",
      d: "To deliver fully integrated accommodation, transport, and food services through a single accountable operator — improving worker quality of life, reducing operational risk for our clients, and supporting the Kingdom's worker welfare agenda." },
  ],
};

export default function AboutStrip() {
  const { lang } = useLang();
  const items = WHY[lang];
  const vals  = VALS[lang];
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

      {/* ── Story / Vision / Mission ── */}
      <div style={{ background:"#F8F9FA", padding: isMobile ? "64px 20px" : "100px 32px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Section title */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ textAlign:"center", marginBottom:56 }}>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(28px,3vw,44px)", color:"#1a1a1a", lineHeight:1.15, marginBottom:12 }}>
              {lang==="ar"
                ?<>مزود متكامل <span style={{ color:"#0A532A" }}>لخدمات القوى العاملة</span></>
                :<>An Integrated <span style={{ color:"#0A532A" }}>Workforce Services Provider</span></>}
            </h2>
            <div style={{ width:56, height:3, background:"linear-gradient(to right,#0A532A,#E3B665)", borderRadius:99, margin:"0 auto" }}/>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 60, alignItems:"stretch" }}>

            {/* Left: story text */}
            <motion.div initial={{ opacity:0, x: lang==="ar" ? 30 : -30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
              style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 15 : 17, color:"#4b5563", lineHeight:2.2, marginBottom:20 }}>
                  {lang==="ar"
                    ? "شركة سكن تك هي شركة سعودية متخصصة في توفير حلول سكنية متكاملة للقوى العاملة، تشمل السكن والنقل اليومي وخدمات الطعام، مصممة خصيصًا لدعم المقاولين والمشغلين الصناعيين ومطوري البنية التحتية المساهمين في تحقيق رؤية 2030."
                    : "Sakan Tech is a Saudi company specialising in integrated workforce living solutions — encompassing accommodation, daily transportation, and food services — designed to support contractors, industrial operators, and infrastructure developers contributing to Vision 2030."}
                </p>
                <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 14 : 16, color:"#6b7280", lineHeight:2.2, marginBottom:0 }}>
                  {lang==="ar"
                    ? "نصمم مرافقنا وأسطولنا وخدماتنا الغذائية كنظام تشغيل متكامل، والنتيجة: رفع مستوى معيشة القوى العاملة، وتحقيق مكاسب إنتاجية ملموسة لأصحاب العمل، والامتثال التام لمعايير وزارة الموارد البشرية والتنمية الاجتماعية ومعايير الرعاية البلدية."
                    : "We design our facilities, fleet, and food services as one unified operating system. The result: elevated workforce living standards, measurable productivity gains for employers, and full compliance with MHRSD and municipal welfare standards."}
                </p>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, borderRadius:18, overflow:"hidden", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 4px 20px rgba(0,0,0,0.05)", marginTop:32 }}>
                {[
                  { v:"+1,000", l: lang==="ar" ? "سرير تحت الإدارة" : "Beds Under Management" },
                  { v:"×3",     l: lang==="ar" ? "وجبات حارة يومياً" : "Hot Meals Per Day" },
                  { v:"7/24",   l: lang==="ar" ? "تشغيل وأمن متواصل" : "Non-Stop Ops & Security" },
                ].map((s, si) => (
                  <div key={s.v} style={{
                    padding:"28px 12px", textAlign:"center", background:"#fff",
                    borderInlineEnd: si < 2 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  }}>
                    <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 26 : 34, color:"#0A532A", lineHeight:1, direction:"ltr" }}>{s.v}</div>
                    <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize: isMobile ? 10 : 12, color:"#9ca3af", marginTop:8, letterSpacing:"0.03em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Vision + Mission */}
            <motion.div initial={{ opacity:0, x: lang==="ar" ? -30 : 30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.15, duration:0.7 }}
              style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {vals.map((v, vi) => (
                <motion.div key={vi}
                  whileHover={{ y:-5, boxShadow:"0 24px 56px rgba(0,0,0,0.10)" }}
                  style={{
                    borderRadius:20, background:"#fff",
                    border:"1px solid rgba(0,0,0,0.07)",
                    boxShadow:"0 4px 20px rgba(0,0,0,0.06)",
                    overflow:"hidden", position:"relative",
                    padding: isMobile ? "28px 24px 32px 30px" : "34px 32px 36px 38px",
                    transition:"box-shadow 0.3s, transform 0.3s",
                  }}>
                  {/* Left accent bar */}
                  <div style={{ position:"absolute", top:0, bottom:0, insetInlineStart:0, width:4, background:v.grad }}/>

                  {/* Icon + Title row */}
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
                    <div style={{
                      width:46, height:46, borderRadius:13, flexShrink:0,
                      background:`${v.accent}18`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <v.Icon size={21} color={v.accent} strokeWidth={1.8}/>
                    </div>
                    <span style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 18 : 20, color:"#1a1a1a" }}>
                      {v.t}
                    </span>
                  </div>

                  {/* Accent line */}
                  <div style={{ height:2, width:40, background:v.grad, borderRadius:99, marginBottom:16 }}/>

                  {/* Description */}
                  <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 13 : 14, color:"#6b7280", lineHeight:2.1, margin:0 }}>
                    {v.d}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Why Sakan Tech ── */}
      <div style={{ background: "#fff", padding: isMobile ? "64px 20px" : "96px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}
            style={{ textAlign:"center", marginBottom:56 }}>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(28px,3.5vw,46px)", color:"#1a1a1a", lineHeight:1.1, marginBottom:12 }}>
              {lang==="ar" ? "مزايا تنافسية في سكن تك" : "Competitive Advantages — Sakan Tech"}
            </h2>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:16, color:"#6b7280", maxWidth:480, margin:"0 auto" }}>
              {lang==="ar"
                ? "ستة أسباب تجعلنا الخيار الأول لكبرى شركات المملكة"
                : "Six reasons we are the first choice for leading companies across the Kingdom"}
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: isMobile ? 16 : 20 }}>
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
                    boxShadow: isHovered ? "0 24px 56px rgba(10,83,42,0.18)" : "0 4px 24px rgba(0,0,0,0.07)",
                    border: isHovered ? "1px solid rgba(10,83,42,0.18)" : "1px solid rgba(0,0,0,0.06)",
                    cursor:"pointer",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    transition:"all 0.35s cubic-bezier(0.34,1.1,0.64,1)",
                  }}>
                  <div style={{ position:"relative", height: isMobile ? 148 : 190, overflow:"hidden" }}>
                    <img src={item.img} alt=""
                      style={{ width:"100%", height:"100%", objectFit:"cover",
                        transform: isHovered ? "scale(1.08)" : "scale(1.0)",
                        transition:"transform 0.65s ease" }} />
                    <div style={{ position:"absolute", inset:0,
                      background: isHovered
                        ? "linear-gradient(to bottom, rgba(10,83,42,0.55) 0%, rgba(0,0,0,0.5) 100%)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)",
                      transition:"background 0.4s" }}/>
                    <div style={{
                      position:"absolute", top:16, insetInlineStart:16,
                      width:44, height:44, borderRadius:14,
                      background: isHovered ? "linear-gradient(135deg,#E3B665,#C99830)" : "rgba(255,255,255,0.18)",
                      backdropFilter:"blur(8px)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", transition:"all 0.35s",
                      boxShadow: isHovered ? "0 4px 16px rgba(227,182,101,0.5)" : "none",
                    }}>
                      <Icon size={20} strokeWidth={isHovered ? 2.5 : 2} color={isHovered ? "#1a1a1a" : "#fff"}/>
                    </div>
                    <div style={{ position:"absolute", top:16, insetInlineEnd:16,
                      fontFamily:"Almarai", fontWeight:800, fontSize:26,
                      color: isHovered ? "rgba(227,182,101,0.8)" : "rgba(255,255,255,0.3)",
                      lineHeight:1, transition:"color 0.35s" }}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                  </div>
                  <div style={{ padding: isMobile ? "14px 16px 18px" : "20px 22px 24px" }}>
                    <div style={{ height:2, width: isHovered ? 48 : 24,
                      background:"linear-gradient(to right,#0A532A,#E3B665)",
                      borderRadius:9999, marginBottom:10, transition:"width 0.4s ease" }}/>
                    <h3 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:15,
                      color: isHovered ? "#0A532A" : "#1a1a1a", marginBottom:8, transition:"color 0.3s" }}>
                      {item.t}
                    </h3>
                    <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:13, color:"#6b7280", lineHeight:1.85 }}>
                      {item.d}
                    </p>
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3,
                    background:"linear-gradient(to right,#0A532A,#E3B665)",
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin:"left", transition:"transform 0.4s ease" }}/>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
