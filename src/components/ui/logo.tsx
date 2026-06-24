"use client";

interface Props { size?: "xs"|"sm"|"md"|"lg"; variant?: "dark"|"light"; }

const heights: Record<string, number> = { xs: 36, sm: 56, md: 72, lg: 92 };

export default function Logo({ size = "md", variant = "dark" }: Props) {
  const h = heights[size];
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      padding: variant === "light" ? "4px 10px" : "2px 0",
      borderRadius: 12,
      background: variant === "light" ? "rgba(255,255,255,0.18)" : "transparent",
      backdropFilter: variant === "light" ? "blur(12px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <img
        src="/logo.png"
        alt="Sakan Tech"
        style={{ height: h, width: "auto", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
