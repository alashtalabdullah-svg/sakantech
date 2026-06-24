"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/lang";
import Logo from "@/components/ui/logo";

const SOCIAL = [
  {
    key: "whatsapp", label: "WhatsApp", url: "https://wa.me/966506422739",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/sakan-tech-sa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    key: "x", label: "X / Twitter", url: "https://x.com/sakantech_sa",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    key: "instagram", label: "Instagram", url: "https://www.instagram.com/sakantech_sa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();
  const pathname = usePathname();
  const router   = useRouter();
  const yr = new Date().getFullYear();
  const [isWide, setIsWide] = useState(true);

  const handleFooterLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "/" && pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.slice(2);
        if (pathname === "/") {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          router.push("/");
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 400);
        }
      }
    },
    [pathname, router]
  );

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
        <div style={{ maxWidth:1280, margin:"0 auto", padding: isWide ? "72px 32px 32px" : "48px 20px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns: isWide ? "repeat(auto-fit,minmax(200px,1fr))" : "1fr", gap: isWide ? 48 : 32, marginBottom:40 }}>

            {/* Brand */}
            <div style={{ gridColumn: isWide ? "span 2" : "span 1" }}>
              <div style={{ marginBottom:16 }}>
                <Logo size="lg" variant="dark" />
              </div>
              <p style={{ fontFamily:"Almarai", fontWeight:300, fontSize:14, color:"#374151", lineHeight:1.95, maxWidth:320 }}>
                {lang==="ar"
                  ?"حلول متكاملة للإسكان والنقل والتغذية لقوى عاملة أكثر إنتاجية في المملكة العربية السعودية."
                  :"Integrated accommodation, transport & catering solutions for a more productive workforce across Saudi Arabia."}
              </p>
              {/* Social icons */}
              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                {SOCIAL.map(s => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width:42, height:42, borderRadius:12,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background:"rgba(1,85,48,0.09)", color:"#015530",
                      textDecoration:"none", transition:"all 0.22s",
                      flexShrink:0,
                    }}
                    onMouseEnter={e=>{
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = s.key === "whatsapp" ? "#25D366" : "#015530";
                      el.style.color="#fff";
                      el.style.transform="translateY(-3px)";
                      el.style.boxShadow = s.key === "whatsapp" ? "0 6px 20px rgba(37,211,102,0.4)" : "0 6px 20px rgba(1,85,48,0.3)";
                    }}
                    onMouseLeave={e=>{
                      const el = e.currentTarget as HTMLElement;
                      el.style.background="rgba(1,85,48,0.09)";
                      el.style.color="#015530";
                      el.style.transform="translateY(0)";
                      el.style.boxShadow="none";
                    }}>
                    {s.icon}
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
                  onClick={e => handleFooterLink(e, l.h)}
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
                { e:"📧", v:"info@sakatech.com.sa",    href:"mailto:info@sakatech.com.sa" },
                { e:"📞", v:"050 642 2739",              href:"tel:+966506422739" },
                { e:"🌐", v:"www.sakatech.com.sa",     href:"https://www.sakatech.com.sa" },
                { e:"📍", v: lang==="ar"
                    ? "طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، مبنى 7277، الدمام"
                    : "Prince Mohammed bin Fahd Rd, East Corniche, Bldg 7277, Dammam",
                  href: undefined },
              ].map(c => (
                <div key={c.v} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:14 }}>
                  <span style={{ fontSize:14, lineHeight:"1.6", flexShrink:0 }}>{c.e}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily:"Almarai", fontWeight:400, fontSize:13, color:"#374151", lineHeight:1.7, textDecoration:"none", transition:"color 0.2s", direction:"ltr" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#015530"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#374151"}>
                      {c.v}
                    </a>
                  ) : (
                    <span style={{ fontFamily:"Almarai", fontWeight:400, fontSize:13, color:"#374151", lineHeight:1.7 }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:"1px solid rgba(1,85,48,0.12)", paddingTop:22, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
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
