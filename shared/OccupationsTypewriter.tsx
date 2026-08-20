"use client";

import { useEffect, useState } from "react";

type OccupationsTypewriterProps = {
  strings: string[];
};

export default function OccupationsTypewriter({
  strings,
}: OccupationsTypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!strings.length) {
      return;
    }

    const current = strings[index % strings.length];

    const isFinishedTyping = !deleting && text === current;
    const delay = deleting ? 36 : isFinishedTyping ? 1200 : 62;

    const timeoutId = window.setTimeout(() => {
      // Печатаем
      if (!deleting) {
        if (text === current) {
          setDeleting(true);
          return;
        }

        setText(current.slice(0, text.length + 1));
        return;
      }

      // Удаление закончено
      if (text === "") {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % strings.length);
        return;
      }

      // Удаляем последний символ
      setText((prev) => prev.slice(0, -1));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [deleting, index, strings, text]);

  return (
    <span className="greetings-textBlock-occupation">
      {text}
      <span className="occupations-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
