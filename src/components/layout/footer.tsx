"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/lang";
import Logo from "@/components/ui/logo";

export default function Footer() {
  const { lang } = useLang();
  const yr = new Date().getFullYear();
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const fn = () => setIsWide(window.innerWidth >= 720);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const links = lang === "ar"
    ? [{ h:"/",l:"الرئيسية"},{h:"/services",l:"الخدمات"},{h:"/about",l:"من نحن"},{h:"/#partners",l:"شركاؤنا"},{h:"/#contact",l:"تواصل معنا"}]
    : [{ h:"/",l:"Home"},{h:"/services",l:"Services"},{h:"/about",l:"About"},{h:"/#partners",l:"Partners"},{h:"/#contact",l:"Contact"}];

  return (
    <footer style={{ position:"relative", overflow:"hidden" }}>
      {/* Background image */}
      <div style={{ position:"absolute", inset:0, zIndex:0 }}>
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1800&q=80"
          alt=""
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 60%" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(240,250,244,0.97) 0%, rgba(230,245,238,0.96) 60%, rgba(215,240,228,0.95) 100%)" }}/>
      </div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding: isWide ? "72px 32px 32px" : "56px 20px 28px" }}>
          <div style={{ display:"grid", gridTemplateColumns: isWide ? "repeat(auto-fit,minmax(200px,1fr))" : "1fr", gap: isWide ? 48 : 36, marginBottom:48 }}>

            {/* Brand */}
            <div style={{ gridColumn: isWide ? "span 2" : "span 1" }}>
              <div style={{ marginBottom:18 }}>
                <Logo size="md" variant="dark" />
              </div>
              <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"#374151", lineHeight:1.95, maxWidth:300 }}>
                {lang==="ar"
                  ?"حلول متكاملة للإسكان والنقل والتغذية لقوى عاملة أكثر إنتاجية في المملكة العربية السعودية."
                  :"Integrated accommodation, transport & catering solutions for a more productive workforce across Saudi Arabia."}
              </p>
              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                {["in","tw","ig"].map(s => (
                  <a key={s} href="#"
                    style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(1,85,48,0.09)", fontSize:11, fontFamily:"Almarai", fontWeight:700, color:"#015530", textDecoration:"none", transition:"all 0.2s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#015530";(e.currentTarget as HTMLElement).style.color="#fff";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(1,85,48,0.09)";(e.currentTarget as HTMLElement).style.color="#015530";}}>
                    {s.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.18em", color:"#015530", marginBottom:18, textTransform:"uppercase" }}>
                {lang==="ar" ? "روابط سريعة" : "Quick Links"}
              </div>
              {links.map(l => (
                <Link key={l.h} href={l.h}
                  style={{ display:"block", fontFamily:"Almarai", fontWeight:400, fontSize:14, color:"#374151", textDecoration:"none", marginBottom:12, transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#015530"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#374151"}>
                  {l.l}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontFamily:"Almarai", fontWeight:700, fontSize:11, letterSpacing:"0.18em", color:"#015530", marginBottom:18, textTransform:"uppercase" }}>
                {lang==="ar" ? "تواصل معنا" : "Contact"}
              </div>
              {[
                { e:"📧", v:"Abdulaziz@sakan.sa" },
                { e:"📞", v:"+966 55 000 7777" },
                { e:"📍", v: lang==="ar" ? "طريق الأمير محمد بن فهد، مبنى 7277، الدمام" : "Prince Mohammed bin Fahd Rd, Bldg 7277, Dammam" },
              ].map(c => (
                <div key={c.v} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:14 }}>
                  <span style={{ fontSize:14, lineHeight:"1.6", flexShrink:0 }}>{c.e}</span>
                  <span style={{ fontFamily:"Almarai", fontWeight:400, fontSize:13, color:"#374151", lineHeight:1.7 }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:"1px solid rgba(1,85,48,0.12)", paddingTop:24, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
            <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:12, color:"#6b7280" }}>
              © {yr} {lang==="ar" ? "سكن تك — جميع الحقوق محفوظة" : "Sakan Tech — All rights reserved"}
            </p>
            <div style={{ display:"flex", gap:20 }}>
              {[lang==="ar"?"سياسة الخصوصية":"Privacy Policy", lang==="ar"?"الشروط والأحكام":"Terms of Service"].map(l => (
                <a key={l} href="#"
                  style={{ fontFamily:"Almarai", fontWeight:300, fontSize:12, color:"#6b7280", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#015530"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#6b7280"}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
