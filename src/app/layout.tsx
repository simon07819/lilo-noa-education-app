import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilo & Noa - Apprentissage Magique",
  description: "Application éducative pour enfants de première année primaire",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="h-dvh flex items-start justify-center bg-[#1a0a3e]">
        {children}
      </body>
    </html>
  );
}
