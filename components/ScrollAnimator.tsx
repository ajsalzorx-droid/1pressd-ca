"use client";

import { useEffect } from "react";

export function ScrollAnimator(){
  useEffect(()=>{
    const root=document.documentElement;
    const scenes=[...document.querySelectorAll<HTMLElement>("main > section:not(#home), main > nav.sectionNav, main > footer")];
    root.classList.add("motion-ready");
    scenes.forEach(scene=>scene.classList.add("scrollScene"));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:"0px 0px -8%"});
    scenes.forEach(scene=>observer.observe(scene));
    return()=>{observer.disconnect();root.classList.remove("motion-ready")};
  },[]);
  return null;
}
