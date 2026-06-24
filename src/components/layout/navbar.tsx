"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/lang";
import Logo from "@/components/ui/logo";

/* Sections on the home page that have hash anchors */
const HOME_ANCHORS = ["partners", "contact"];

export default function Navbar() {
  const { lang, toggle } = useLang();
  const pathname  = usePathname();
  const router    = useRouter();

  const [scrolled,       setScrolled]       = useState(false);
  const [open,           setOpen]           = useState(false);
  const [activeSection,  setActiveSection]  = useState("");

  /* ── Scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* ── Active section tracking (home page only) ── */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const detect = () => {
      const vh = window.innerHeight;
      let found = "";

      for (const id of HOME_ANCHORS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        /* Active when section occupies the middle band of the viewport */
        if (top < vh * 0.65 && bottom > vh * 0.25) {
          found = `/#${id}`;
        }
      }
      setActiveSection(found);
    };

    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, [pathname]);

  /* ── Smooth scroll / navigation handler ── */
  const handleLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {

      /* Home link — always scroll to top smoothly */
      if (href === "/") {
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setOpen(false);
        return;
      }

      /* Hash anchor links (/#section) */
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
        setOpen(false);
        return;
      }

      /* Regular page links — let Next.js handle */
      setOpen(false);
    },
    [pathname, router]
  );

  /* ── Nav links ── */
  const links = lang === "ar"
    ? [
        { h: "/",          l: "الرئيسية"   },
        { h: "/services",  l: "الخدمات"    },
        { h: "/about",     l: "من نحن"     },
        { h: "/#partners", l: "شركاؤنا"    },
        { h: "/#contact",  l: "تواصل معنا" },
      ]
    : [
        { h: "/",          l: "Home"       },
        { h: "/services",  l: "Services"   },
        { h: "/about",     l: "About Us"   },
        { h: "/#partners", l: "Partners"   },
        { h: "/#contact",  l: "Contact"    },
      ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return activeSection === href;
    if (href === "/")          return pathname === "/" && !activeSection;
    return pathname === href || pathname.startsWith(href + "/");
  };

  /* ── Shared style helpers ── */
  const linkColor   = (active: boolean) =>
    active ? (scrolled ? "#015530" : "#fff") : (scrolled ? "#374151" : "rgba(255,255,255,0.82)");
  const linkBg      = (active: boolean) =>
    active && scrolled ? "rgba(1,85,48,0.08)" : "transparent";

  return (
    <header style={{
      position: "fixed", inset: "0 0 auto 0", zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
      transition: "background 0.35s, box-shadow 0.35s, border-color 0.35s",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 24px", height: 80,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Logo size="sm" variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* ── Desktop nav ── */}
        <nav style={{ alignItems: "center", gap: 2 }} className="hidden md:flex">
          {links.map(link => {
            const active = isActive(link.h);
            return (
              <Link
                key={link.h}
                href={link.h}
                onClick={e => handleLink(e, link.h)}
                style={{
                  position: "relative",
                  fontFamily: "Almarai", fontWeight: active ? 800 : 700, fontSize: 13.5,
                  color: linkColor(active),
                  padding: "8px 14px", borderRadius: 10,
                  textDecoration: "none",
                  background: linkBg(active),
                  transition: "color 0.2s, background 0.2s",
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
                    el.style.background = linkBg(false);
                    el.style.color = linkColor(false);
                  }
                }}
              >
                {link.l}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: "absolute", bottom: 4, left: "50%",
                      transform: "translateX(-50%)",
                      width: 4, height: 4, borderRadius: "50%",
                      background: scrolled ? "#015530" : "#ebb968",
                      display: "block",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right controls ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Language toggle — desktop */}
          <button
            onClick={toggle}
            className="hidden md:flex"
            style={{
              alignItems: "center", gap: 6,
              background: scrolled ? "rgba(1,85,48,0.07)" : "rgba(255,255,255,0.12)",
              border: "none", borderRadius: 10, padding: "8px 14px",
              cursor: "pointer", fontFamily: "Almarai", fontWeight: 700,
              fontSize: 12, color: scrolled ? "#015530" : "#fff",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = scrolled ? "rgba(1,85,48,0.14)" : "rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = scrolled ? "rgba(1,85,48,0.07)" : "rgba(255,255,255,0.12)"; }}
          >
            <Languages size={14} strokeWidth={2.2} />
            {lang === "ar" ? "EN" : "عربي"}
          </button>


          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: scrolled ? "#1a1a1a" : "#fff", padding: 6, borderRadius: 8,
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)",
              padding: "12px 16px 20px",
            }}
          >
            {links.map(link => {
              const active = isActive(link.h);
              return (
                <Link
                  key={link.h}
                  href={link.h}
                  onClick={e => { handleLink(e, link.h); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "13px 16px", borderRadius: 12,
                    fontFamily: "Almarai", fontWeight: active ? 800 : 700, fontSize: 15,
                    color: active ? "#015530" : "#1a1a1a",
                    textDecoration: "none", marginBottom: 3,
                    background: active ? "rgba(1,85,48,0.06)" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  {active && (
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "#015530", display: "inline-block", flexShrink: 0,
                    }} />
                  )}
                  {link.l}
                </Link>
              );
            })}

            {/* Language toggle — mobile */}
            <button
              onClick={() => { toggle(); setOpen(false); }}
              style={{
                marginTop: 8, display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(1,85,48,0.07)", border: "none", cursor: "pointer",
                fontFamily: "Almarai", fontWeight: 700, fontSize: 14, color: "#015530",
              }}
            >
              <Languages size={15} />
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
