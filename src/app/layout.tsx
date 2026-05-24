// C:\smartfactory-site\frontend\src\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "./components/LangProvider";

export const metadata: Metadata = {
  title: "Factorix | Engineering the Zero-Defect Future",
  description: "AI-powered smart factory solution and tech blog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white antialiased text-slate-900">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}