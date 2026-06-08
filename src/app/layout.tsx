import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/lang";
import { LangEffect } from "@/components/ui/lang-effect";

export const metadata: Metadata = {
  title: "سكن تك | Sakan Tech",
  description: "حلول متكاملة للإسكان والنقل والتغذية — Integrated workforce living solutions across Saudi Arabia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body>
        <LangProvider>
          <LangEffect />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
