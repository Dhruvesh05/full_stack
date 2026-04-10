"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
};

const offsets = {
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
};

export default function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(root, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const offset = offsets[direction];
    const context = gsap.context(() => {
      gsap.fromTo(
        root,
        {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          scale: 0.985,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        }
      );

      const staggerTargets = root.querySelectorAll(
        ":scope > *"
      ) as NodeListOf<HTMLElement>;

      if (staggerTargets.length > 1) {
        gsap.fromTo(
          staggerTargets,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, root);

    return () => context.revert();
  }, [delay, direction]);

  return (
    <div ref={rootRef} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
