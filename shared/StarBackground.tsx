"use client";
import React, { useEffect, useRef } from 'react';

import "@/styles/shared/starBackground.css";

export default function StarBackground() {
  const starsRef = useRef<HTMLDivElement>(null);
  const stars2Ref = useRef<HTMLDivElement>(null);
  const stars3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Функция для генерации теней звезд (аналог SCSS функции multiple-box-shadow)
    const multipleBoxShadow = (n: number) => {
      let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
      for (let i = 2; i <= n; i++) {
        value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
      }
      return value;
    };

    // Генерируем тени для трех слоев звезд
    const shadowsSmall = multipleBoxShadow(105);
    const shadowsMedium = multipleBoxShadow(30);
    const shadowsBig = multipleBoxShadow(15);

    // Применяем тени к элементам
    if (starsRef.current) {
      starsRef.current.style.boxShadow = shadowsSmall;
    }
    if (stars2Ref.current) {
      stars2Ref.current.style.boxShadow = shadowsMedium;
    }
    if (stars3Ref.current) {
      stars3Ref.current.style.boxShadow = shadowsBig;
    }
  }, []);

  return (
    <div className="starBackground">
      {/* Слой 1: Маленькие звезды */}
      <div
        ref={starsRef}
        className="starBackground-smallStar starBackground-star"
        style={{ animationDuration: '50s' }}
      />
      
      {/* Слой 2: Средние звезды */}
      <div
        ref={stars2Ref}
        className="starBackground-mediumStar starBackground-star"
        style={{ animationDuration: '100s', animationDelay: '0.5s' }}
      />
      
      {/* Слой 3: Большие звезды */}
      <div
        ref={stars3Ref}
        className="starBackground-bigStar starBackground-star"
        style={{ animationDuration: '150s', animationDelay: '1s' }}
      />
    </div>
  )
}
