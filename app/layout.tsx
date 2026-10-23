import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TAF Energies PLC | Master Optima 20W-50 Premium Engine Oil",
  description:
    "Master Optima 20W-50 SM — Premium multi-grade gasoline engine oil. Superior protection against wear, deposits, and thermal breakdown. Engineered for older and high-mileage vehicles. Made in UAE.",
  keywords: [
    "engine oil",
    "TAF Energies",
    "Master Optima",
    "20W-50",
    "gasoline engine oil",
    "premium oil",
    "Made in UAE",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
