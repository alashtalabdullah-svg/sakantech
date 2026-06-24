"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, ClipboardList, Landmark, BadgeCheck, Users, BarChart3, Settings, Building2, Bus, Utensils, Megaphone } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/ui/chatbot";
import { useLang } from "@/context/lang";

const ORG = {
  ar: [
    { r: "رئيس مجلس الإدارة", l: 0 },
    { r: "المدير العام — مالك عدنان", l: 1 },
    { r: "الموارد البشرية والتوظيف", l: 2 },{ r: "الشؤون المالية والإدارية", l: 2 },
    { r: "إدارة العمليات والمواقع", l: 2 },{ r: "خدمات الإسكان", l: 2 },
    { r: "خدمات النقل", l: 2 },{ r: "خدمات التغذية", l: 2 },{ r: "التسويق والمبيعات", l: 2 },
  ],
  en: [
    { r: "Chairman", l: 0 },
    { r: "General Manager — Malik Adnan", l: 1 },
    { r: "HR & Recruitment", l: 2 },{ r: "Finance & Admin", l: 2 },
    { r: "Operations & Sites", l: 2 },{ r: "Accommodation Services", l: 2 },
    { r: "Transport Services", l: 2 },{ r: "Catering Services", l: 2 },{ r: "Sales & Marketing", l: 2 },
  ],
};

const VALS = {
  ar: [
    { Icon: Sparkles, t: "رؤيتنا", accent:"#0A532A", grad:"linear-gradient(135deg,#0A532A,#0D6B36)",
      d: "أن نكون الشريك الأكثر ثقةً في المملكة في مجال سكن القوى العاملة — وضع معيار جديد للإسكان والنقل والرفاهية في القطاعين الصناعي والإنشائي." },
    { Icon: Brain, t: "مهمتنا", accent:"#C99830", grad:"linear-gradient(135deg,#C99830,#E3B665)",
      d: "تقديم خدمات متكاملة في مجالات الإسكان والنقل والغذاء من خلال مشغّل واحد مسؤول — مما يُحسّن جودة حياة العمال، ويُقلّل المخاطر التشغيلية لعملائنا، ويدعم أجندة رعاية العمال في المملكة." },
  ],
  en: [
    { Icon: Sparkles, t: "Our Vision", accent:"#0A532A", grad:"linear-gradient(135deg,#0A532A,#0D6B36)",
      d: "To be the Kingdom's most trusted partner in workforce accommodation — setting a new benchmark for housing, transportation, and welfare across the industrial and construction sectors." },
    { Icon: Brain, t: "Our Mission", accent:"#C99830", grad:"linear-gradient(135deg,#C99830,#E3B665)",
      d: "To deliver fully integrated accommodation, transport, and food services through a single accountable operator — improving worker quality of life, reducing operational risk for our clients, and supporting the Kingdom's worker welfare agenda." },
  ],
};

const WHY = {
  ar: [
    { n:"1", t:"عقد واحد — تكامل كامل",      d:"مشغّل واحد، وعقد واحد، وفريق مسؤول واحد يتولى الإسكان والنقل والوجبات — مما يُلغي تكلفة التنسيق بين موردين متعددين." },
    { n:"2", t:"متوافق مع معايير MHRSD",       d:"صُمّمت المرافق والمأكولات ووسائل النقل لتلبية معايير رعاية العمال السعودية ومعايير الصحة البلدية والتفوق عليها." },
    { n:"3", t:"موثوقية تشغيلية عالية",        d:"مشغّل واحد مسؤول يضمن جودة الخدمة والالتزام بمعايير SLA — مع فرق إدارة موقع متخصصة ودعم على مدار الساعة." },
    { n:"4", t:"تصميم يُعلي من شأن العامل",   d:"مساحات المعيشة وتناول الطعام والترفيه مصممة لتوفير الكرامة والراحة والرفاهية — مما يُقلّل مباشرة من معدل دوران العمالة لدى عملائنا." },
    { n:"5", t:"تقارير SLA شفافة ودورية",      d:"لوحات مؤشرات أداء شهرية تغطي نسب الإشغال، وتسليم الوجبات، والتعبئة في الوقت المحدد، ونتائج تدقيقات الرعاية الاجتماعية." },
    { n:"6", t:"قدرة المنطقة الشرقية",         d:"موقع استراتيجي في الخبر والدمام — على بُعد دقائق من أبرز ممرات الصناعة والطاقة والبناء الكبرى." },
  ],
  en: [
    { n:"1", t:"Single Contract — Full Integration",   d:"One operator, one contract, one accountable team for accommodation, transport, and meals — eliminating multi-vendor coordination costs." },
    { n:"2", t:"MHRSD Compliant",                      d:"Facilities, food, and transport designed to meet — and exceed — Saudi worker welfare standards and municipal health codes." },
    { n:"3", t:"Operational Reliability",              d:"A single accountable operator ensuring consistent service quality and SLA adherence — with dedicated site management and round-the-clock support." },
    { n:"4", t:"Workforce-Centric Design",             d:"Living, dining, and recreation spaces built for dignity, comfort, and wellbeing — directly reducing workforce attrition for our clients." },
    { n:"5", t:"Transparent SLA Reporting",            d:"Monthly KPI dashboards covering occupancy, meal delivery, on-time mobilisation, and welfare audit outcomes." },
    { n:"6", t:"Eastern Region Scale",                 d:"Strategically located across Al Khobar and Dammam — minutes from major industrial, energy, and construction corridors." },
  ],
};

export default function AboutPage() {
  const { lang } = useLang();
  const org  = ORG[lang];
  const vals = VALS[lang];
  const why  = WHY[lang];
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const fn = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const px = isMobile ? "20px" : "32px";

  return (
    <div style={{ minHeight:"100vh", background:"#fff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position:"relative",
        padding: isMobile ? "120px 20px 80px" : "160px 32px 120px",
        overflow:"hidden",
        clipPath: isMobile ? "none" : "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
      }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85"
            alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 25%" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(10,83,42,0.92) 0%, rgba(0,0,0,0.72) 55%, rgba(227,182,101,0.18) 100%)" }}/>
        </div>
        <div style={{ position:"relative", zIndex:1, maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <motion.span initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.2em", color:"#E3B665", background:"rgba(227,182,101,0.1)", border:"1px solid rgba(227,182,101,0.3)", padding:"6px 18px", borderRadius:999, display:"inline-block", marginBottom:22 }}>
            {lang==="ar" ? "تعرف علينا" : "WHO WE ARE"}
          </motion.span>
          <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12, duration:0.7 }}
            style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(34px,5.5vw,72px)", color:"#fff", lineHeight:1.1, marginBottom:20 }}>
            {lang==="ar" ? "عن سكن تك" : "About Sakan Tech"}
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28, duration:0.65 }}
            style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,0.7)", lineHeight:1.9, maxWidth:580, margin:"0 auto" }}>
            {lang==="ar"
              ? "سكن تك شركة سعودية متخصصة في تقديم الحلول المتكاملة لخدمات العمالة — مُصمَّمة لدعم الشركات التي تبني رؤية 2030."
              : "Sakan Tech is a specialist Saudi provider of integrated workforce living solutions — engineered to support the companies building Vision 2030."}
          </motion.p>
        </div>
      </section>

      {/* About + Vision/Mission */}
      <section style={{ padding: isMobile ? "56px 20px" : "96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(300px,1fr))", gap: isMobile ? 40 : 56, alignItems:"start" }}>

          <motion.div initial={{ opacity:0, x: isMobile ? 0 : 30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.2em", color:"#0A532A", background:"rgba(10,83,42,0.07)", padding:"6px 18px", borderRadius:999, display:"inline-block", marginBottom:20 }}>
              {lang==="ar" ? "قصتنا" : "OUR STORY"}
            </span>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(26px,3vw,42px)", color:"#1a1a1a", lineHeight:1.15, marginBottom:20 }}>
              {lang==="ar" ? "مزود خدمات سكنية متكاملة للقوى العاملة" : "Integrated Workforce Living Solutions Provider"}
            </h2>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 15 : 16, color:"#666", lineHeight:1.9, marginBottom:16 }}>
              {lang==="ar"
                ? "شركة سكن تك هي شركة سعودية متخصصة في توفير حلول سكنية متكاملة للقوى العاملة، تشمل السكن والنقل اليومي وخدمات الطعام، مصممة خصيصًا لدعم المقاولين والمشغلين الصناعيين ومطوري البنية التحتية المساهمين في تحقيق رؤية 2030."
                : "Sakan Tech is a Saudi company specialising in integrated workforce living solutions — encompassing accommodation, daily transportation, and food services — designed to support contractors, industrial operators, and infrastructure developers contributing to Vision 2030."}
            </p>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 14 : 15, color:"#888", lineHeight:1.9 }}>
              {lang==="ar"
                ? "نصمم مرافقنا وأسطولنا وخدماتنا الغذائية كنظام تشغيل متكامل، والنتيجة: رفع مستوى معيشة القوى العاملة، وتحقيق مكاسب إنتاجية ملموسة لأصحاب العمل، والامتثال التام لمعايير وزارة الموارد البشرية والتنمية الاجتماعية ومعايير الرعاية البلدية. يقع مقرنا الرئيسي في المنطقة الشرقية، ونعمل على نطاق واسع في الخبر والدمام والمنطقة المحيطة بها."
                : "We design our facilities, fleet, and food services as one unified operating system. The result: elevated workforce living standards, measurable productivity gains for employers, and full compliance with MHRSD and municipal welfare standards. Our headquarters is in the Eastern Province, with broad operations across Al Khobar, Dammam, and the surrounding region."}
            </p>
            <div style={{ display:"flex", marginTop:32, paddingTop:24, borderTop:"1px solid rgba(0,0,0,0.07)", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
              {[
                { v:"+1,000", l: lang==="ar" ? "سرير تحت الإدارة" : "Beds Under Management" },
                { v:"×3",     l: lang==="ar" ? "وجبات يومياً" : "Hot Meals Daily" },
                { v:"7/24",   l: lang==="ar" ? "تشغيل وأمن" : "Ops & Security" },
              ].map((s, si) => (
                <div key={s.v} style={{ flex:1, padding: isMobile ? "18px 6px" : "22px 0", textAlign:"center", borderInlineEnd: si < 2 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                  <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 20 : 28, color:"#0A532A", lineHeight:1, direction:"ltr" }}>{s.v}</div>
                  <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize: isMobile ? 10 : 12, color:"#aaa", marginTop:4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x: isMobile ? 0 : -30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.15, duration:0.7 }}
            style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {vals.map((v, vi) => (
              <motion.div key={v.t}
                initial={{ opacity:0, x: isMobile ? 0 : -20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay: vi * 0.15, duration:0.6 }}
                whileHover={{ y:-5, boxShadow:"0 24px 56px rgba(0,0,0,0.10)" }}
                style={{
                  borderRadius:20, background:"#fff",
                  border:"1px solid rgba(0,0,0,0.07)",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.06)",
                  overflow:"hidden", position:"relative",
                  padding: isMobile ? "28px 24px 32px 30px" : "34px 32px 36px 38px",
                  transition:"box-shadow 0.3s, transform 0.3s", cursor:"default",
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
                  <span style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 17 : 19, color:"#1a1a1a" }}>
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

            {/* CEO quote */}
            <div style={{ padding: isMobile ? "22px 20px" : "28px", borderRadius:20, background:"linear-gradient(145deg,#0A532A,#0D6B36)", position:"relative", overflow:"hidden", boxShadow:"0 12px 40px rgba(10,83,42,0.25)" }}>
              <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"22px 22px" }}/>
              <div style={{ fontSize:36, color:"rgba(227,182,101,0.4)", lineHeight:1, marginBottom:10 }}>"</div>
              <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"rgba(255,255,255,0.85)", lineHeight:1.9, marginBottom:18 }}>
                {lang==="ar"
                  ? "نؤمن إيماناً راسخًا بأن التميز التشغيلي والسرعة والموثوقية هي المفاتيح الأساسية لكسب ثقة عملائنا وضمان استدامة نمونا."
                  : "We firmly believe that operational excellence, speed, and reliability are the fundamental keys to earning our clients' trust and sustaining our long-term growth."}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:11, background:"rgba(227,182,101,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:15, color:"#E3B665", flexShrink:0 }}>م</div>
                <div>
                  <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:13, color:"#fff" }}>{lang==="ar" ? "مالك عدنان" : "Malik Adnan"}</div>
                  <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize:11, color:"#E3B665", marginTop:2 }}>
                    {lang==="ar" ? "المدير العام — سكن تك" : "General Manager — Sakan Tech"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section style={{ position:"relative", padding: isMobile ? "72px 20px" : "112px 32px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85" alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(10,83,42,0.96) 0%, rgba(0,0,0,0.88) 100%)" }}/>
          <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"28px 28px" }}/>
        </div>

        <div style={{ position:"relative", zIndex:1, maxWidth:860, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}
            style={{ textAlign:"center", marginBottom:44 }}>
            <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.22em", color:"#E3B665", background:"rgba(227,182,101,0.12)", border:"1px solid rgba(227,182,101,0.3)", padding:"7px 20px", borderRadius:999, display:"inline-block" }}>
              {lang==="ar" ? "كلمة المدير العام" : "GENERAL MANAGER'S MESSAGE"}
            </span>
          </motion.div>

          <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.12, duration:0.75 }}
            style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding: isMobile ? "32px 24px" : "56px 52px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(to right, #0A532A, #E3B665, #0A532A)", borderRadius:"24px 24px 0 0" }}/>
            <div style={{ position:"absolute", top:24, insetInlineEnd:24, fontSize: isMobile ? 56 : 96, fontFamily:"Georgia, serif", color:"rgba(227,182,101,0.12)", lineHeight:1, pointerEvents:"none" }}>"</div>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,0.88)", lineHeight:2.0, marginBottom:36, position:"relative", zIndex:1 }}>
              {lang==="ar"
                ? "الزملاء والشركاء والعملاء الكرام، مع دخولنا عصرًا جديدًا من التحول الرقمي والنمو الاقتصادي، يسعدني الترحيب بكم في رحلة سكن تك الرائدة. مهمتنا لا تقتصر على مواكبة متطلبات السوق، بل تتعداها إلى قيادة التغيير وتقديم حلول مبتكرة تجمع بين الخدمات اللوجستية الفعّالة والإسكان العصري. تركيزنا اليوم ينصب على تحويل الرؤى الاستراتيجية إلى واقع ملموس عبر تحسين الأداء التشغيلي وتبنّي الأتمتة الذكية. نفخر بفريقنا المتنوع والموهوب، وسنواصل الاستثمار في تنمية المهارات والبنية التحتية التكنولوجية لضمان بقاء سكن تك في طليعة الشركات التي تقدم قيمة حقيقية لعملائها وشركائها."
                : "Dear colleagues, partners, and valued clients — as we enter a new era of digital transformation and economic growth, it is my pleasure to welcome you to Sakan Tech's pioneering journey. Our mission extends beyond keeping pace with market demands; it is about leading change and delivering innovative solutions that unite efficient logistics with modern accommodation. Our focus today is on converting strategic visions into tangible reality through enhanced operational performance and intelligent automation. We take great pride in our diverse and talented team, and we will continue investing in skills development and technological infrastructure to ensure Sakan Tech remains at the forefront of companies delivering genuine value to our clients and partners."}
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:16, paddingTop:24, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ width:52, height:52, borderRadius:16, background:"linear-gradient(135deg,#E3B665,#C99830)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:22, color:"#1a1a1a", flexShrink:0 }}>م</div>
              <div>
                <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 14 : 16, color:"#fff", marginBottom:3 }}>{lang==="ar" ? "مالك عدنان" : "Malik Adnan"}</div>
                <div style={{ fontFamily:"Almarai", fontWeight:400, fontSize:13, color:"#E3B665" }}>
                  {lang==="ar" ? "المدير العام — سكن تك" : "General Manager — Sakan Tech"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sakan Tech */}
      <section style={{ padding: isMobile ? "64px 20px" : "96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ textAlign:"center", marginBottom:52 }}>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(26px,3vw,42px)", color:"#1a1a1a", marginBottom:12 }}>
              {lang==="ar" ? "مزايا تنافسية في سكن تك" : "Competitive Advantages — Sakan Tech"}
            </h2>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:16, color:"#6b7280", maxWidth:520, margin:"0 auto" }}>
              {lang==="ar"
                ? "ستة أسباب تجعلنا الخيار الأول لكبرى شركات المملكة."
                : "Six reasons we are the first choice for leading companies across the Kingdom."}
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 14 : 20 }}>
            {why.map((w, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.55 }}
                whileHover={{ y:-4 }}
                style={{ padding:"28px 24px", borderRadius:20, background:"#F8F9FA", border:"1px solid rgba(0,0,0,0.06)", position:"relative", overflow:"hidden", transition:"box-shadow 0.25s" }}>
                <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#0A532A,#0D6B36)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:16, color:"#fff", marginBottom:16 }}>{w.n}</div>
                <div style={{ fontFamily:"Almarai", fontWeight:800, fontSize:15, color:"#1a1a1a", marginBottom:8 }}>{w.t}</div>
                <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:13, color:"#6b7280", lineHeight:1.85, margin:0 }}>{w.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Org Chart */}
      <section style={{ padding: isMobile ? "60px 20px" : "96px 32px", background:"#F7FAF8" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ textAlign:"center", marginBottom:52 }}>
            <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.2em", color:"#0A532A", background:"rgba(10,83,42,0.07)", padding:"6px 18px", borderRadius:999, display:"inline-block", marginBottom:18 }}>
              {lang==="ar" ? "هيكلنا التنظيمي" : "ORGANIZATIONAL STRUCTURE"}
            </span>
            <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(24px,3vw,42px)", color:"#1a1a1a" }}>
              {lang==="ar" ? "فريق القيادة" : "Leadership Team"}
            </h2>
          </motion.div>

          {(() => {
            const DEPT_ICONS = [Users, BarChart3, Settings, Building2, Bus, Utensils, Megaphone];
            const chairman = org.filter(n => n.l === 0)[0];
            const gm       = org.filter(n => n.l === 1)[0];
            const depts    = org.filter(n => n.l === 2);
            return (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>

                {/* Level 0: Chairman */}
                <motion.div initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
                  <div style={{ padding: isMobile ? "12px 32px" : "14px 48px", borderRadius:16, background:"linear-gradient(135deg,#E3B665,#C99830)", fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 13 : 15, color:"#1a1a1a", boxShadow:"0 4px 22px rgba(201,152,48,0.32)", textAlign:"center" }}>
                    {chairman?.r}
                  </div>
                </motion.div>

                {/* Connector 0 → 1 */}
                <div style={{ width:2, height:30, background:"rgba(10,83,42,0.28)" }}/>

                {/* Level 1: General Manager */}
                <motion.div initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:0.1, duration:0.5 }}>
                  <div style={{ padding: isMobile ? "14px 28px" : "16px 52px", borderRadius:18, background:"linear-gradient(135deg,#0A532A,#0D6B36)", fontFamily:"Almarai", fontWeight:800, fontSize: isMobile ? 14 : 16, color:"#fff", boxShadow:"0 8px 30px rgba(10,83,42,0.28)", textAlign:"center" }}>
                    {gm?.r}
                  </div>
                </motion.div>

                {/* Connector 1 → departments */}
                <div style={{ width:2, height:28, background:"rgba(10,83,42,0.28)" }}/>

                {isMobile ? (
                  /* Mobile: 2-column icon grid */
                  <div style={{ width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {depts.map((d, i) => {
                      const Icon = DEPT_ICONS[i] ?? Users;
                      return (
                        <motion.div key={i}
                          initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i * 0.05 }}
                          style={{ background:"#fff", border:"1.5px solid rgba(10,83,42,0.14)", borderRadius:16, padding:"16px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:9, textAlign:"center" }}>
                          <div style={{ width:42, height:42, borderRadius:13, background:"rgba(10,83,42,0.07)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Icon size={18} color="#0A532A" strokeWidth={1.8}/>
                          </div>
                          <span style={{ fontFamily:"Almarai", fontWeight:600, fontSize:11, color:"#374151", lineHeight:1.55 }}>{d.r}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : isTablet ? (
                  /* Tablet: 4-column grid */
                  <div style={{ width:"100%", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:4 }}>
                    {depts.map((d, i) => {
                      const Icon = DEPT_ICONS[i] ?? Users;
                      return (
                        <motion.div key={i}
                          initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i * 0.05 }}
                          style={{ background:"#fff", border:"1.5px solid rgba(10,83,42,0.14)", borderRadius:16, padding:"16px 12px", display:"flex", flexDirection:"column", alignItems:"center", gap:9, textAlign:"center" }}>
                          <div style={{ width:44, height:44, borderRadius:13, background:"rgba(10,83,42,0.07)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Icon size={19} color="#0A532A" strokeWidth={1.8}/>
                          </div>
                          <span style={{ fontFamily:"Almarai", fontWeight:600, fontSize:11, color:"#374151", lineHeight:1.55 }}>{d.r}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* Desktop: horizontal tree with connecting lines */
                  <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
                    {/* Horizontal branch bar + individual drop lines */}
                    <div style={{ position:"relative", width:"95%", height:2, background:"rgba(10,83,42,0.18)" }}>
                      {depts.map((_, i) => (
                        <div key={i} style={{
                          position:"absolute",
                          left:`${(i + 0.5) / depts.length * 100}%`,
                          top:0, width:2, height:26,
                          background:"rgba(10,83,42,0.18)",
                          transform:"translateX(-50%)",
                        }}/>
                      ))}
                    </div>
                    {/* Department boxes */}
                    <div style={{ width:"95%", display:"flex", justifyContent:"space-around", marginTop:26 }}>
                      {depts.map((d, i) => {
                        const Icon = DEPT_ICONS[i] ?? Users;
                        return (
                          <motion.div key={i}
                            initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.06 + i * 0.07 }}
                            whileHover={{ y:-4 }}
                            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, width:`${100 / depts.length - 1}%`, textAlign:"center" }}>
                            <div style={{ width:52, height:52, borderRadius:16, background:"#fff", border:"1.5px solid rgba(10,83,42,0.14)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 16px rgba(0,0,0,0.07)", transition:"box-shadow 0.2s" }}>
                              <Icon size={22} color="#0A532A" strokeWidth={1.7}/>
                            </div>
                            <span style={{ fontFamily:"Almarai", fontWeight:600, fontSize:11.5, color:"#374151", lineHeight:1.55 }}>{d.r}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Certificates */}
      <section style={{ padding: isMobile ? "56px 20px" : "80px 32px", background:"#F8F9FA" }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.2em", color:"#0A532A", background:"rgba(10,83,42,0.07)", padding:"6px 18px", borderRadius:999, display:"inline-block", marginBottom:18 }}>
            {lang==="ar" ? "اعتماداتنا" : "ACCREDITATIONS"}
          </span>
          <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(22px,3vw,38px)", color:"#1a1a1a", marginBottom:40 }}>
            {lang==="ar" ? "الشهادات والتراخيص الرسمية" : "Official Certificates & Licenses"}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            {[
              { Icon: ClipboardList, t: lang==="ar" ? "السجل التجاري" : "Commercial Registration", v:"7054044909",   color:"#0A532A", bg:"rgba(10,83,42,0.08)" },
              { Icon: Landmark,      t: lang==="ar" ? "شهادة الزكاة والضريبة" : "Zakat & Tax Certificate", v:"Sakan Tech Co.", color:"#0D6B36", bg:"rgba(13,107,54,0.08)" },
              { Icon: BadgeCheck,    t: lang==="ar" ? "شهادة الاستثمار" : "Investment Registration", v:"Active — IRN", color:"#C99830", bg:"rgba(212,160,64,0.1)" },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ background:"#fff", borderRadius:20, padding:"32px 24px", textAlign:"center", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 24px rgba(0,0,0,0.05)", transition:"transform 0.25s, box-shadow 0.25s" }}
                whileHover={{ y:-4, boxShadow:"0 12px 36px rgba(0,0,0,0.1)" }}>
                <div style={{ width:60, height:60, borderRadius:16, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <c.Icon size={28} strokeWidth={1.8} color={c.color} />
                </div>
                <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:14, color:"#1a1a1a", marginBottom:8 }}>{c.t}</div>
                <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:13, color:c.color, direction:"ltr", background:c.bg, display:"inline-block", padding:"4px 14px", borderRadius:99 }}>{c.v}</div>
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
