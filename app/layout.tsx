import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRESS’D Wellness Café | Pet-Friendly Café in Dubai",
  description: "PRESS’D is a pet-friendly wellness café in Dubai serving healthy meals, specialty coffee and a comfortable work-friendly atmosphere.",
  keywords: ["Pet Friendly Cafe Dubai","Healthy Cafe Dubai","Wellness Cafe Dubai","Work Friendly Cafe Dubai","Laptop Friendly Cafe Dubai","Protein Meals Dubai","Specialty Coffee Dubai"],
  openGraph: { title: "PRESS’D Wellness Café", description: "Good food. Good work. Good company.", type: "website", locale: "en_AE" }
};

const schema = {"@context":"https://schema.org","@type":"CafeOrCoffeeShop","name":"PRESS’D Wellness Café","description":"A pet-friendly, work-friendly wellness café serving healthy meals and specialty coffee in Dubai.","address":{"@type":"PostalAddress","addressLocality":"Dubai","addressCountry":"AE"},"servesCuisine":["Healthy Food","Specialty Coffee","Protein Meals","Breakfast"],"openingHours":"Mo-Su 07:00-22:00","priceRange":"AED","sameAs":[]};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></body></html>;
}
