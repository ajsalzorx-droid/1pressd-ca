"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BriefcaseBusiness, Coffee, Heart, MapPin, PawPrint, Salad } from "lucide-react";

const sections = [
  { number: "01", label: "Menu", note: "Healthy food", href: "#menu", Icon: Salad },
  { number: "02", label: "Pet Friendly", note: "Paws welcome", href: "#pet", Icon: PawPrint },
  { number: "03", label: "Work", note: "Stay focused", href: "#work", Icon: BriefcaseBusiness },
  { number: "04", label: "Wellness", note: "Feel good", href: "#wellness", Icon: Heart },
  { number: "05", label: "Our Story", note: "The PRESS’D way", href: "#about", Icon: Coffee },
  { number: "06", label: "Visit", note: "Dubai, UAE", href: "#visit", Icon: MapPin }
];

export function SectionNavigator() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const pause = () => { paused = true; };
    const play = () => { paused = false; };
    const advance = () => {
      if (paused || !rail.firstElementChild) return;
      const card = rail.firstElementChild as HTMLElement;
      const gap = Number.parseFloat(getComputedStyle(rail).gap) || 0;
      const step = card.offsetWidth + gap;
      const end = rail.scrollWidth - rail.clientWidth;
      rail.scrollTo({ left: rail.scrollLeft + step >= end - 4 ? 0 : rail.scrollLeft + step, behavior: "smooth" });
    };

    const timer = window.setInterval(advance, 2800);
    rail.addEventListener("mouseenter", pause);
    rail.addEventListener("mouseleave", play);
    rail.addEventListener("focusin", pause);
    rail.addEventListener("focusout", play);
    rail.addEventListener("touchstart", pause, { passive: true });
    rail.addEventListener("touchend", play, { passive: true });
    return () => {
      window.clearInterval(timer);
      rail.removeEventListener("mouseenter", pause);
      rail.removeEventListener("mouseleave", play);
      rail.removeEventListener("focusin", pause);
      rail.removeEventListener("focusout", play);
      rail.removeEventListener("touchstart", pause);
      rail.removeEventListener("touchend", play);
    };
  }, []);

  return <nav className="sectionNav" aria-label="Explore PRESS’D">
    <div className="sectionNav__head"><p>Explore PRESS’D</p><span>Everything you need, one scroll away.</span></div>
    <div className="sectionNav__rail sectionNav__carousel" ref={railRef} role="region" aria-roledescription="carousel">
      {sections.map(({ number, label, note, href, Icon }) => <a href={href} key={href} aria-label={`${label}: ${note}`}>
        <div><small>{number}</small><Icon size={19} /></div>
        <h2>{label}</h2><p>{note}</p><ArrowUpRight className="sectionNav__arrow" size={17} />
      </a>)}
    </div>
    <div className="sectionNav__autoplay" aria-hidden="true"><i /></div>
  </nav>;
}
