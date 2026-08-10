"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollAnimator(){
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const progress = useSpring(scrollYProgress,{stiffness:120,damping:28,mass:.25});
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{
    const root=document.documentElement;
    const scenes=[...document.querySelectorAll<HTMLElement>("main > section:not(#home), main > nav.sectionNav, main > footer")];
    root.classList.add("motion-ready");
    scenes.forEach(scene=>scene.classList.add("scrollScene"));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:"0px 0px -8%"});
    scenes.forEach(scene=>observer.observe(scene));
    const onScroll=()=>setShowTop(window.scrollY>window.innerHeight*.9);
    onScroll();window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll);root.classList.remove("motion-ready")};
  },[]);
  return <><motion.div className="scrollProgress" aria-hidden="true" style={{scaleX:reducedMotion?scrollYProgress:progress}}/><motion.button className="backToTop" aria-label="Back to top" initial={false} animate={{opacity:showTop?1:0,y:showTop?0:12,pointerEvents:showTop?"auto":"none"}} transition={{duration:.35,ease:[.16,1,.3,1]}} onClick={()=>window.scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"})}><ArrowUp size={17}/><span>Top</span></motion.button></>;
}
