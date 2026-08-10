"use client";

import { ArrowUpRight, BriefcaseBusiness, Coffee, Heart, MapPin, PawPrint, Salad } from "lucide-react";

const sections = [
  { number:"01", label:"Menu", note:"Healthy food", href:"#menu", Icon:Salad },
  { number:"02", label:"Pet Friendly", note:"Paws welcome", href:"#pet", Icon:PawPrint },
  { number:"03", label:"Work", note:"Stay focused", href:"#work", Icon:BriefcaseBusiness },
  { number:"04", label:"Wellness", note:"Feel good", href:"#wellness", Icon:Heart },
  { number:"05", label:"Our Story", note:"The PRESS’D way", href:"#about", Icon:Coffee },
  { number:"06", label:"Visit", note:"Dubai, UAE", href:"#visit", Icon:MapPin }
];

export function SectionNavigator(){
 return <nav className="sectionNav" aria-label="Explore PRESS’D"><div className="sectionNav__head"><p>Explore PRESS’D</p><span>Everything you need, one scroll away.</span></div><div className="sectionNav__rail">{sections.map(({number,label,note,href,Icon})=><a href={href} key={href}><div><small>{number}</small><Icon size={19}/></div><h2>{label}</h2><p>{note}</p><ArrowUpRight className="sectionNav__arrow" size={17}/></a>)}</div></nav>
}
