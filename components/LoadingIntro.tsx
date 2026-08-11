"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function LoadingIntro({ onDone }: { onDone: () => void }) {
  const [videoFailed, setVideoFailed] = useState(false);

  const finish = () => {
    sessionStorage.setItem("pressd-intro-seen", "1");
    onDone();
  };

  useEffect(() => {
    if (sessionStorage.getItem("pressd-intro-seen")) { onDone(); return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(finish, reduced ? 900 : 13000);
    return () => window.clearTimeout(timer);
  // `onDone` is supplied by the parent and only used to close this one-shot intro.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <motion.div
    className="loader-overlay"
    role="status"
    aria-label="PRESS’D website loading"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: .6, ease: "easeOut" }}
  >
    {!videoFailed && <video
      className="loader-video"
      src="/pressd-loader.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={finish}
      onError={() => setVideoFailed(true)}
      aria-hidden="true"
    />}
    <div className={`loader-fallback${videoFailed ? " is-visible" : ""}`} aria-hidden={!videoFailed}><Logo /></div>
    <div className="loader-mobile-status" aria-hidden="true"><span>PRESS’D · WELLNESS CAFÉ</span><i /></div>
    <button onClick={finish}>Skip intro</button>
  </motion.div>;
}
