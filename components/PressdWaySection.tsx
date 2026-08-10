"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = ["MORE", "THAN", "A CAFÉ."];
const ease = [0.16, 1, 0.3, 1] as const;

export function PressdWaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [12, -12]);
  const headingY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [26, -26]);

  return <section ref={sectionRef} id="about" className="pressdWay" aria-labelledby="pressd-way-heading">
    <div className="pressdWay__inner">
      <motion.div className="pressdWay__copy" style={{ y: copyY }} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .7, ease }}>
        <p className="pressdWay__label">THE PRESS’D WAY</p>
        <p className="pressdWay__body">Your everyday space<br/>for clean food,<br/>good coffee, focused<br/>work and quality time<br/>with your four-legged<br/>best friend.</p>
      </motion.div>
      <motion.h2 id="pressd-way-heading" className="pressdWay__heading" style={{ y: headingY }} aria-label="More than a café">
        {lines.map((line, index) => <span className="pressdWay__mask" key={line}><motion.span initial={reducedMotion ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: .8, delay: index * .1, ease }}>{line}</motion.span></span>)}
      </motion.h2>
    </div>
  </section>;
}
