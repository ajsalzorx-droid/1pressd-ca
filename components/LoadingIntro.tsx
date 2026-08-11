"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "./Logo";

export function LoadingIntro({ onDone }: { onDone: () => void }) {
  const finish = () => {
    sessionStorage.setItem("pressd-intro-seen", "1");
    onDone();
  };

  useEffect(() => {
    if (sessionStorage.getItem("pressd-intro-seen")) { onDone(); return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(finish, reduced ? 650 : 2200);
    return () => window.clearTimeout(timer);
  // `onDone` is supplied by the parent and only used to close this one-shot intro.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <motion.div
    className="loader-overlay loader-static"
    role="status"
    aria-label="PRESS’D website loading"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: .55, ease: [.16, 1, .3, 1] }}
  >
    <motion.div className="loader-static-logo" initial={{ opacity: 0, scale: .94, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .75, ease: [.16, 1, .3, 1] }}><Logo /></motion.div>
    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .5 }}>GOOD FOOD · GOOD WORK · GOOD COMPANY</motion.p>
    <div className="loader-static-progress" aria-hidden="true"><i /></div>
    <button onClick={finish}>Enter site</button>
  </motion.div>;
}
