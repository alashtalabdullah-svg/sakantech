"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/lang";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const { lang, toggle } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Track active section on home page */
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["contact", "partners"];
    const observers: IntersectionObserver[] = [];

    const cb = (id: string) => (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) setActiveSection(`/#${id}`);
    };

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(cb(id), { threshold: 0.4 });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [pathname]);

  const links = lang === "ar"
    ? [{ h: "/", l: "الرئيسية" }, { h: "/services", l: "الخدمات" }, { h: "/about", l: "من نحن" }, { h: "/#partners", l: "شركاؤنا" }, { h: "/#contact", l: "تواصل معنا" }]
    : [{ h: "/", l: "Home" }, { h: "/services", l: "Services" }, { h: "/about", l: "About Us" }, { h: "/#partners", l: "Partners" }, { h: "/#contact", l: "Contact" }];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !activeSection;
    if (href.startsWith("/#")) return activeSection === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header style={{
      position: "fixed", inset: "0 0 auto 0", zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size="sm" variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
          {links.map(l => {
            const active = isActive(l.h);
            return (
              <Link key={l.h} href={l.h}
                style={{
                  position: "relative",
                  fontFamily: "Almarai", fontWeight: active ? 800 : 700, fontSize: 13.5,
                  color: active
                    ? (scrolled ? "#015530" : "#fff")
                    : (scrolled ? "#374151" : "rgba(255,255,255,0.82)"),
                  padding: "8px 14px", borderRadius: 10, textDecoration: "none",
                  transition: "all 0.2s",
                  background: active && scrolled ? "rgba(1,85,48,0.08)" : "transparent",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = scrolled ? "rgba(1,85,48,0.06)" : "rgba(255,255,255,0.12)";
                    el.style.color = scrolled ? "#015530" : "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.color = scrolled ? "#374151" : "rgba(255,255,255,0.82)";
                  }
                }}>
                {l.l}
                {/* Active underline dot */}
                {active && (
                  <motion.span layoutId="nav-dot"
                    style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: scrolled ? "#015530" : "#ebb968", display: "block" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Lang toggle */}
          <button onClick={toggle}
            style={{ display: "flex", alignItems: "center", gap: 6, background: scrolled ? "rgba(1,85,48,0.07)" : "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontFamily: "Almarai", fontWeight: 700, fontSize: 12, color: scrolled ? "#015530" : "#fff", transition: "all 0.2s" }}
            className="hidden md:flex"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = scrolled ? "rgba(1,85,48,0.14)" : "rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = scrolled ? "rgba(1,85,48,0.07)" : "rgba(255,255,255,0.12)"; }}>
            <Languages size={14} strokeWidth={2.2} />
            {lang === "ar" ? "EN" : "عربي"}
          </button>

          {/* CTA */}
          <Link href="/#contact"
            style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 13, background: "linear-gradient(135deg,#015530,#027a44)", color: "#fff", padding: "10px 22px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 14px rgba(1,85,48,0.28)", transition: "all 0.22s" }}
            className="hidden md:block"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 22px rgba(1,85,48,0.38)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(1,85,48,0.28)"; }}>
            {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#1a1a1a" : "#fff", padding: 6, borderRadius: 8 }}
            className="md:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}
            style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "12px 20px 20px" }}>
            {links.map(l => {
              const active = isActive(l.h);
              return (
                <Link key={l.h} href={l.h} onClick={() => setOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 16px", borderRadius: 12, fontFamily: "Almarai", fontWeight: active ? 800 : 700, fontSize: 15, color: active ? "#015530" : "#1a1a1a", textDecoration: "none", marginBottom: 3, background: active ? "rgba(1,85,48,0.06)" : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(1,85,48,0.04)"; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#015530", display: "inline-block", flexShrink: 0 }} />}
                  {l.l}
                </Link>
              );
            })}
            <button onClick={toggle}
              style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: "rgba(1,85,48,0.07)", border: "none", cursor: "pointer", fontFamily: "Almarai", fontWeight: 700, fontSize: 14, color: "#015530" }}>
              <Languages size={15} />{lang === "ar" ? "English" : "العربية"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
