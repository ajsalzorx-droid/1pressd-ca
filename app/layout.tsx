import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRESS’D Wellness Café | Pet-Friendly Café in Dubai",
  description: "PRESS’D is a pet-friendly wellness café in Dubai serving healthy meals, specialty coffee and a comfortable work-friendly atmosphere.",
  openGraph: { title: "PRESS’D Wellness Café", description: "Good food. Good work. Good company.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
