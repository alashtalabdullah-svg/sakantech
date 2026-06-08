"use client";
import { useEffect } from "react";
import { useLang } from "@/context/lang";
export function LangEffect() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
