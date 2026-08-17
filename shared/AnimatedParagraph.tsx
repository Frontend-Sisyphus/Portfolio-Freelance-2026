"use client";
import React, { useRef, useEffect } from "react";

import { useAnimation, motion, useInView } from "motion/react";

type AnimatedParagraphProps = {
  children: string | React.ReactNode;
  className?: string;
  wordSpace?: string;
  charSpace?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const paragraphAnimation = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

export default function AnimatedParagraph({
  children,
  className,
}: AnimatedParagraphProps) {
  const ctrls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    }
  }, [ctrls, isInView]);

  return (
    <motion.p
      className={className}
      ref={ref}
      initial="hidden"
      animate={ctrls}
      variants={paragraphAnimation}
    >
      {children}
    </motion.p>
  );
}
