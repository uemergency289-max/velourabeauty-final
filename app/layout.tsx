import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["300","400","500","600"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400","500","600","700"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Velourabeauty — Luxury Beauty", template: "%s | Velourabeauty" },
  description: "Luxury skincare and cosmetics. Free worldwide shipping, COD in Pakistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body bg-ivory text-espresso antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
