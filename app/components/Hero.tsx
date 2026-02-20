
"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!headlineRef.current) return;

    // Animate letters
    gsap.from(headlineRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
    });
    gsap.to(statsRef.current, {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=2000",
    scrub: true,
  },
});
    // Animate stats
    gsap.from(statsRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
    if (!sectionRef.current) return;

    gsap.to(".car", {
  x: window.innerWidth,
  rotation: 5,
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=1500",
    scrub: 1.2,
    pin: true,
  },
});
    gsap.to(headlineRef.current, {
      scale: 0.85,
      opacity: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1500",
        scrub: true,
      },
});
  }, []);

  const text = "WELCOME ITZ FIZZ";

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-5xl md:text-7xl tracking-widest font-bold flex flex-wrap justify-center"
      >
        {text.split("").map((letter, index) => (
          <span key={index} className="mx-1">
            {letter}
          </span>
        ))}
      </h1>

      {/* Stats */}
      <div className="flex gap-10 mt-10">
        {["85% Growth", "120% Revenue", "60% Engagement"].map((stat, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) statsRef.current[i] = el;
            }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold">
              {stat.split(" ")[0]}
            </h2>
            <p className="text-sm text-gray-400">
              {stat.split(" ").slice(1).join(" ")}
            </p>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80" />
      <img
        src="/sp_c.png"
        alt="car"
        className="car absolute bottom-10 left-0 w-20 md:w-30 will-change-transform"
        />
    </section>
  );
}