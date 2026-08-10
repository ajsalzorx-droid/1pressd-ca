"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "./Logo";

export function LoadingIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    if (sessionStorage.getItem("pressd-intro-seen")) { onDone(); return; }
    const timer = window.setTimeout(() => { sessionStorage.setItem("pressd-intro-seen", "1"); onDone(); }, 2200);
    return () => window.clearTimeout(timer);
  }, [onDone]);
  const finish = () => { sessionStorage.setItem("pressd-intro-seen", "1"); onDone(); };
  return <motion.div className="brandIntro" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.65,ease:[.16,1,.3,1]}}>
    <motion.div initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.7,ease:[.16,1,.3,1]}}><Logo/></motion.div>
    <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.55}}>GOOD FOOD · GOOD WORK · GOOD COMPANY</motion.p>
    <div className="introProgress"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:2,ease:[.16,1,.3,1]}} /></div>
    <button onClick={finish}>Skip intro</button>
  </motion.div>;
}
