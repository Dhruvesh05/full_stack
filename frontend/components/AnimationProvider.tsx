"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      if (customEvent.detail?.open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener("tools-sidebar-toggle", handleSidebarToggle as EventListener);

    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener(
        "tools-sidebar-toggle",
        handleSidebarToggle as EventListener
      );
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
