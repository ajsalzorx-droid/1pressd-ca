"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "./Logo";

const Stroke = ({ d, length = 260 }: { d: string; length?: number }) => (
  <path className="introStroke introDraw" style={{ "--path-length": length } as React.CSSProperties} d={d} />
);

export function LoadingIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    if (sessionStorage.getItem("pressd-intro-seen")) { onDone(); return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("pressd-intro-seen", "1");
      onDone();
    }, reduced ? 900 : 6200);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  const finish = () => { sessionStorage.setItem("pressd-intro-seen", "1"); onDone(); };

  return <motion.div className="brandIntro storyLoader" role="status" aria-label="PRESS’D website loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65, ease: [.16, 1, .3, 1] }}>
    <div className="loaderScene loaderWalk" aria-hidden="true">
      <svg viewBox="0 0 700 400">
        <g className="introWalker">
          <Stroke length={170} d="M330 150c0-15 12-26 26-26s26 11 26 26-12 26-26 26-26-11-26-26Z" />
          <Stroke length={210} d="M356 176v94m0-70 44 30m-44-10-36 40m36 10-26 70m26-70 29 70" />
          <Stroke length={90} d="M400 230c30 15 50 30 70 45" />
          <g transform="translate(430 255)">
            <Stroke length={520} d="M0 60C-10 40-5 15 15 5 35-5 55-10 78-6c17 3 30 12 40 24 8 10 10 22 4 32 16 2 30 8 38 20 5 8 3 18-6 22-9 4-21 0-26-8-4 6-12 10-20 8v18m-16-18-2 20M40 88l-4 22M18 84l-6 20M118 18c8-8 18-10 26-6 6 3 8 10 4 15-4 4-11 3-15-1" />
            <path className="introStroke introTail" d="M-8 45c-14-6-22-16-20-28" />
          </g>
        </g>
      </svg>
      <p>Everyday company</p>
    </div>

    <div className="loaderScene loaderSign" aria-hidden="true">
      <svg viewBox="0 0 700 400">
        <g transform="translate(160 45)">
          <Stroke length={640} d="M40 285v60m290-60v60M10 150h360v140H10z" />
          <g transform="translate(85 8)">
            <Stroke length={420} d="M70 120C55 105 50 85 60 68c10-16 30-24 52-22 20 2 36 14 42 32 4 12 1 22-8 28 14-4 26 2 30 14 3 10-2 20-13 22-8 2-16-2-19-10M110 46c-8-16-4-32 10-38 10-4 20 2 20 12 0 8-8 12-14 8M60 80C40 70 25 55 20 35" />
            <rect className="introStroke introDraw" style={{ "--path-length": 70 } as React.CSSProperties} x="0" y="10" width="28" height="25" rx="3" />
            <g className="introSteam"><path d="M6 8c-5-7 5-10 0-18"/><path d="M17 8c-5-7 5-10 0-18"/></g>
          </g>
          <text x="190" y="218" textAnchor="middle" className="introSignTitle">PRESS’D</text>
          <text x="190" y="247" textAnchor="middle" className="introSignSub">WELLNESS CAFÉ</text>
          <text x="190" y="274" textAnchor="middle" className="introSignPet">● PET FRIENDLY COFFEE SHOP ●</text>
        </g>
      </svg>
    </div>

    <div className="loaderScene loaderCafe" aria-hidden="true">
      <svg viewBox="0 0 700 400">
        <g transform="translate(155 70)">
          <Stroke length={200} d="M60 170c0-10 40-18 90-18s90 8 90 18-40 18-90 18-90-8-90-18Zm90 18v58m-32 0h64" />
          <Stroke length={140} d="M360 55a20 20 0 1 1-40 0 20 20 0 0 1 40 0Zm-20 20v90m0-55-38 25m38-25 25-28m-25 83-20 68m20-68 28 68" />
          <Stroke length={220} d="M32 202c-6-25 4-48 26-56 20-7 40 0 48 18 6 13 2 26-10 30 6 8 4 20-6 22-8 2-14-4-14-12M84 146c6-14 18-18 26-10 6 6 2 14-6 14" />
          <rect className="introStroke introDraw" style={{ "--path-length": 60 } as React.CSSProperties} x="132" y="125" width="34" height="28" rx="3" />
          <g className="introSteam" transform="translate(138 122)"><path d="M3 0c-5-7 5-10 0-18"/><path d="M16 0c-5-7 5-10 0-18"/></g>
        </g>
      </svg>
      <p>Good coffee. Better moments.</p>
    </div>

    <div className="loaderScene loaderFinal">
      <Logo />
      <p>GOOD FOOD · GOOD WORK · GOOD COMPANY</p>
    </div>

    <div className="storyProgress" aria-hidden="true"><i /></div>
    <button onClick={finish}>Skip intro</button>
  </motion.div>;
}
