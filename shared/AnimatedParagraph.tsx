"use client";
import React, { useRef, useEffect } from "react";

import { useAnimation, motion, useInView } from "framer-motion";

type AnimatedParagraphProps = {
  children: string | React.ReactNode;
  className?: string;
  wordSpace?: string;
  charSpace?: string;
};

export default function AnimatedParagraph({
  children,
  className,
  wordSpace,
  charSpace,
}: AnimatedParagraphProps) {
  const ctrls = useAnimation();

  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const paragraphAnimation: any = {
    hidden: {
      opacity: 0,
      y: `1em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        delay: 0.1,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    }
    if (!isInView) {
      ctrls.start("hidden");
    }
  }, [ctrls, isInView]);

  return (
    <motion.p
      role="heading"
      className={className}
      ref={ref}
      aria-hidden="true"
      initial="hidden"
      animate={ctrls}
      variants={paragraphAnimation}
    >
      {children}
    </motion.p>
  );
}