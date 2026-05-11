"use client";
import React, { useRef, useEffect } from "react";

import { useAnimation, motion, useInView } from "framer-motion";

type AnimatedTitleProps = {
  type: number;
  text: string;
  className: string;
  wordSpace: string;
  charSpace: string;
  delay?: number;
};

export default function AnimatedTitle({
  type,
  text,
  className,
  wordSpace,
  charSpace,
}: AnimatedTitleProps) {
  const ctrls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation: any = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

const animatedText = text.split(" ").map((word, index) => {
    return (
      <motion.span
        ref={ref}
        aria-hidden="true"
        key={index}
        initial="hidden"
        animate={ctrls}
        variants={wordAnimation}
        transition={{
          delayChildren: index * 0.25,
          staggerChildren: 0.05,
        }}
        className={`inline-block whitespace-nowrap select-none ${wordSpace}`}
      >
        {word.split("").map((character, index) => {
          return (
            <motion.span
              aria-hidden="true"
              key={index}
              variants={characterAnimation}
              className={`inline-block ${charSpace}`}
            >
              {character}
            </motion.span>
          );
        })}
      </motion.span>
    );
  });

  const getTitleTag = () => {
    switch (type) {
      case 1:
        return <h1 className={className}>{animatedText}</h1>;
      case 2:
        return <h2 className={className}>{animatedText}</h2>;
      case 3:
        return <h3 className={className}>{animatedText}</h3>;
      case 4:
        return <h4 className={className}>{animatedText}</h4>;
      case 5:
        return <h5 className={className}>{animatedText}</h5>;
      case 6:
        return <h6 className={className}>{animatedText}</h6>;
    }
  };

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    }
    if (!isInView) {
      ctrls.start("hidden");
    }
  }, [ctrls, isInView]);

  return getTitleTag();
}