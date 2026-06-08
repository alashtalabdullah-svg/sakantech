"use client";
import React, { createContext, useContext, useState } from "react";
export type Lang = "ar" | "en";
const Ctx = createContext<{ lang: Lang; toggle: () => void }>({ lang: "ar", toggle: () => {} });
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  return <Ctx.Provider value={{ lang, toggle: () => setLang(l => l === "ar" ? "en" : "ar") }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
