"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/lang";

/* ── Client logos — placeholders ready for real logos ── */
const clients = [
  { id: "c1",  nameAr: "أرامكو السعودية",      nameEn: "Saudi Aramco",     abbr: "SA", color: "#004f2d", bg: "#e8f5ee" },
  { id: "c2",  nameAr: "سابك",                  nameEn: "SABIC",            abbr: "SB", color: "#003087", bg: "#e8f0fb" },
  { id: "c3",  nameAr: "أكوا باور",             nameEn: "ACWA Power",       abbr: "AP", color: "#c0392b", bg: "#fdecea" },
  { id: "c4",  nameAr: "موانئ",                  nameEn: "Mawani",           abbr: "MW", color: "#015530", bg: "#e8f5ee" },
  { id: "c5",  nameAr: "زين السعودية",           nameEn: "Zain KSA",         abbr: "ZN", color: "#8b0067", bg: "#f7e9f3" },
  { id: "c6",  nameAr: "الجابر",                 nameEn: "Al Jaber Group",   abbr: "AJ", color: "#7b3f00", bg: "#f5ede0" },
  { id: "c7",  nameAr: "المراعي",                nameEn: "Almarai",          abbr: "AM", color: "#006340", bg: "#e6f2ec" },
  { id: "c8",  nameAr: "الاتصالات السعودية",    nameEn: "STC",              abbr: "ST", color: "#6b00ac", bg: "#f0e9fb" },
];

/* Double for seamless loop */
const doubled = [...clients, ...clients];

export default function Partners() {
  const { lang } = useLang();

  return (
    <section id="partners" style={{ background: "var(--green-xs)", padding: "88px 0" }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center", marginBottom: 52 }}>
        <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}>
          <span className="section-label">{lang==="ar"?"يثقون بنا":"TRUSTED BY"}</span>
          <h2 style={{ fontFamily:"Almarai", fontWeight:800, fontSize:"clamp(28px,3.5vw,46px)", color:"#1a1a1a", lineHeight:1.2, marginBottom:10 }}>
            {lang==="ar"?"شركاؤنا":"Our Partners"}
          </h2>
          <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:16, color:"#6b7280" }}>
            {lang==="ar"?"شركات رائدة من كل القطاعات تثق في سكن تك":"Industry leaders across every sector trust Sakan Tech"}
          </p>
        </motion.div>
      </div>

      {/* Scrolling row */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        {/* Fade edges */}
        <div style={{ position:"absolute", inset:"0 auto 0 0", width:120, background:"linear-gradient(to right,var(--green-xs),transparent)", zIndex:10, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:"0 0 0 auto", width:120, background:"linear-gradient(to left,var(--green-xs),transparent)", zIndex:10, pointerEvents:"none" }}/>

        <div className="marquee" style={{ display:"flex", gap:14, width:"max-content", padding:"4px 0" }}>
          {doubled.map((c, i) => (
            <motion.div key={`${c.id}-${i}`} whileHover={{ y:-4, boxShadow:"0 12px 32px rgba(0,0,0,0.12)" }}
              style={{
                flexShrink:0, display:"flex", alignItems:"center", gap:10,
                background:"#fff", borderRadius:18, padding:"14px 22px",
                boxShadow:"0 2px 14px rgba(0,0,0,0.06)", border:"1px solid rgba(0,0,0,0.05)",
                transition:"all 0.25s ease", cursor:"default",
              }}>
              <div style={{ width:36, height:36, borderRadius:10, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Almarai", fontWeight:800, fontSize:13, color:c.color, flexShrink:0 }}>
                {c.abbr}
              </div>
              <span style={{ fontFamily:"Almarai", fontWeight:700, fontSize:14, color:"#1a1a1a", whiteSpace:"nowrap" }}>
                {lang==="ar"?c.nameAr:c.nameEn}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
