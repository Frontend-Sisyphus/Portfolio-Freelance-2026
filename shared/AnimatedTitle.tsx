"use client";
import React, { useRef, useEffect } from "react";

import { useAnimation, motion, useInView } from "motion/react";

type AnimatedTitleProps = {
  type: number;
  text: string;
  className: string;
  wordSpace: string;
  charSpace: string;
  delay?: number;
};

const LETTER_STAGGER = 0.016;
const EASE = [0.16, 1, 0.3, 1] as const;

const containerAnimation = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: delay,
    },
  }),
};

const characterAnimation = {
  hidden: {
    opacity: 0,
    y: "0.35em",
  },
  visible: {
    opacity: 1,
    y: "0em",
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export default function AnimatedTitle({
  type,
  text,
  className,
  wordSpace,
  charSpace,
  delay = 0,
}: AnimatedTitleProps) {
  const ctrls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    }
  }, [ctrls, isInView]);

  let letterOffset = 0;

  const animatedText = (
    <motion.span
      initial="hidden"
      animate={ctrls}
      variants={containerAnimation}
      custom={delay}
      aria-hidden="true"
    >
      {text.split(" ").map((word, wordIndex) => {
        const delayChildren = letterOffset * LETTER_STAGGER;
        letterOffset += word.length;

        return (
          <motion.span
            key={`${word}-${wordIndex}`}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren,
                  staggerChildren: LETTER_STAGGER,
                },
              },
            }}
            className={`inline-block whitespace-nowrap select-none ${wordSpace}`}
          >
            {word.split("").map((character, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={characterAnimation}
                className={`inline-block ${charSpace}`}
              >
                {character}
              </motion.span>
            ))}
          </motion.span>
        );
      })}
    </motion.span>
  );

  const titleProps = {
    ref,
    className,
  };

  switch (type) {
    case 1:
      return <h1 {...titleProps}>{animatedText}</h1>;
    case 2:
      return <h2 {...titleProps}>{animatedText}</h2>;
    case 3:
      return <h3 {...titleProps}>{animatedText}</h3>;
    case 4:
      return <h4 {...titleProps}>{animatedText}</h4>;
    case 5:
      return <h5 {...titleProps}>{animatedText}</h5>;
    case 6:
      return <h6 {...titleProps}>{animatedText}</h6>;
    default:
      return <h2 {...titleProps}>{animatedText}</h2>;
  }
}
