"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  value: string | number;
  className?: string;
  duration?: number;
  start?: string;
};

type ParsedValue = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
};

function parseValue(raw: string | number): ParsedValue | null {
  const text = String(raw).trim();
  const withoutCommas = text.replace(/,/g, "");
  const match = withoutCommas.match(/^([^0-9+\-]*)([-+]?\d*\.?\d+)(.*)$/);

  if (!match) {
    return null;
  }

  const numericPart = match[2];
  const target = Number.parseFloat(numericPart);

  if (!Number.isFinite(target)) {
    return null;
  }

  const decimals = numericPart.includes(".") ? numericPart.split(".")[1].length : 0;

  return {
    prefix: match[1] || "",
    target,
    suffix: match[3] || "",
    decimals,
  };
}

function formatValue(value: number, parsed: ParsedValue): string {
  const safeValue = Math.max(0, value);
  const formatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return `${parsed.prefix}${formatter.format(safeValue)}${parsed.suffix}`;
}

export default function AnimatedCounter({
  value,
  className = "",
  duration = 1.8,
  start = "top 80%",
}: CounterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseValue(value), [value]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !parsed) {
      return;
    }

    let hasStarted = false;
    const counterState = { current: 0 };

    const startAnimation = () => {
      if (hasStarted) {
        return;
      }
      hasStarted = true;

      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(counterState, {
        current: parsed.target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText = formatValue(counterState.current, parsed);
        },
      });
    };

    gsap.set(el, { opacity: 0.82, scale: 0.98 });
    el.innerText = formatValue(0, parsed);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: startAnimation,
    });

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
      startAnimation();
      trigger.kill();
    }

    return () => {
      trigger.kill();
    };
  }, [duration, parsed, start]);

  const initialText = parsed ? formatValue(0, parsed) : String(value);

  return (
    <span
      ref={elRef}
      className={`counter ${className}`.trim()}
      data-target={String(value)}
      suppressHydrationWarning
    >
      {initialText}
    </span>
  );
}
