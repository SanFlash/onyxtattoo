import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:{default:"ONYX Tattoo Studio | Indore",template:"%s | ONYX Tattoo Studio"},
  description:"ONYX Tattoo Studio — Ink. Art. Identity. Premium tattoo artistry in Indore, Madhya Pradesh.",
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}