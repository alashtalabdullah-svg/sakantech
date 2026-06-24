"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/lang";

const clients = [
  { id: "best",      nameAr: "شركة الأفضل المحدودة",                              nameEn: "Al Afdal Co. Ltd",                    logo: "/clients/best-group.png" },
  { id: "pcs",       nameAr: "شركة بروجكت كونتراكتنج آند سيرفيسرز",              nameEn: "Project Contracting & Services Ltd",  logo: "/clients/pcs.jpg" },
  { id: "massadr",   nameAr: "شركة مصادر لخدمات الموارد البشرية",                nameEn: "Massadr HR Services Co.",             logo: "/clients/massadr.png" },
  { id: "syed",      nameAr: "شركة السيد للإنشاءات",                              nameEn: "Al Syed Construction Co.",            logo: "/clients/syed.png" },
  { id: "alphacon",  nameAr: "مؤسسة ألفا كون",                                    nameEn: "Alpha-Con Est.",                      logo: "/clients/alpha-con.jpg" },
  { id: "hsa",       nameAr: "شركة HSA للمقاولات والصيانة الكهروميكانيكية",       nameEn: "HSA Contracting & Electromechanical", logo: "/clients/hsa.png" },
  { id: "muqawil",   nameAr: "شركة مقاول للمقاولات العامة الفنية",                nameEn: "Muqawil General Technical Contracting",logo: "/clients/muqawil.png" },
  { id: "hyundai",   nameAr: "شركة هيونداي للهندسة والإنشاءات",                   nameEn: "Hyundai Engineering & Construction",  logo: "/clients/hyundai.png" },
  { id: "senergy",   nameAr: "نطاق الخضراء للطاقة",                               nameEn: "Nataq Al-Khadra Energy",              logo: "/clients/smart-energy.png" },
  { id: "acciona",   nameAr: "شركة أكسيونا لخدمات المرافق السعودية",              nameEn: "Acciona Utility Services Saudi",      logo: "/clients/acciona.png" },
  { id: "polati",    nameAr: "بولاتي",                                             nameEn: "Polati",                              logo: "/clients/polati.png" },
  { id: "g5pipe",    nameAr: "جروب فايف بايب السعودية",                            nameEn: "Group Five Pipe Saudi Arabia",        logo: "/clients/group-five.png" },
  { id: "limousina", nameAr: "ليموزينا",                                           nameEn: "Limousina",                           logo: "/clients/limousina.jpg" },
];

/*
  Seamless loop technique:
  - Render 4 copies so there is always content on screen.
  - Arabic  (RTL): track moves LEFT  → translateX(0 → -50%) using half of 4 copies = 2 sets.
  - English (LTR): track moves RIGHT → translateX(-50% → 0).
  - CRITICAL: force direction:ltr on the track wrapper so RTL page layout
    never reverses the flex order, which would break the seamless join.
*/
const quad = [...clients, ...clients, ...clients, ...clients];

export default function Partners() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  return (
    <section id="partners" style={{ background: "var(--green-xs)", padding: "88px 0", overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", textAlign: "center", marginBottom: 52 }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(28px,3.5vw,46px)", color: "#1a1a1a", lineHeight: 1.2, marginBottom: 10 }}>
            {isAr ? "شركاؤنا وعملاؤنا" : "Our Partners & Clients"}
          </h2>
          <p style={{ fontFamily: "Almarai", fontWeight: 300, fontSize: 16, color: "#6b7280" }}>
            {isAr
              ? "شركات رائدة من كل القطاعات تثق في سكن تك"
              : "Industry leaders across every sector trust Sakan Tech"}
          </p>
        </motion.div>
      </div>

      {/* ── Scrolling track ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        /* Force LTR so RTL page layout never reverses the flex order */
        direction: "ltr",
      }}>
        {/* Fade left edge */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0,
          width: 120,
          background: "linear-gradient(to right, var(--green-xs), transparent)",
          zIndex: 10, pointerEvents: "none",
        }} />
        {/* Fade right edge */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0,
          width: 120,
          background: "linear-gradient(to left, var(--green-xs), transparent)",
          zIndex: 10, pointerEvents: "none",
        }} />

        {/*
          The track:
          - always direction:ltr so flex is L→R regardless of page dir
          - Arabic  → class "scroll-left"  (0 → -50%  of quad = 2 full sets moving left)
          - English → class "scroll-right" (-50% → 0  of quad = 2 full sets moving right)
        */}
        <div
          className={isAr ? "partners-scroll-left" : "partners-scroll-right"}
          style={{
            display: "flex",
            direction: "ltr",          /* ← critical: keep flex always left-to-right */
            gap: 16,
            width: "max-content",
            padding: "8px 0",
          }}
        >
          {quad.map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              style={{
                flexShrink: 0,
                width: 176,
                height: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                borderRadius: 18,
                padding: "14px 20px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 8px 32px rgba(10,83,42,0.18)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)";
                el.style.transform = "translateY(0)";
              }}
            >
              <img
                src={c.logo}
                alt={isAr ? c.nameAr : c.nameEn}
                style={{ maxWidth: "100%", maxHeight: 58, objectFit: "contain", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
