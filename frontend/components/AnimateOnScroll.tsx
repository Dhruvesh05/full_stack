"use client"

import { motion, useReducedMotion } from "framer-motion"

type Props = {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}

const variantsMap = {
  left: { x: -50, opacity: 0 },
  right: { x: 50, opacity: 0 },
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
}

export function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
}: Props) {
   const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : variantsMap[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateOnScroll;