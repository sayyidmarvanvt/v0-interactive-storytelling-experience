"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"

interface MaskedYearProps {
  year: string
  index: number
  total: number
  progress: MotionValue<number>
}

export function MaskedYear({ year, index, total, progress }: MaskedYearProps) {
  // Calculate visibility based on scroll progress
  // Each year should peak when its corresponding index is at the front
  const centerPoint = index / total

  // Opacity: fades in and out as it approaches/leaves the center
  const opacity = useTransform(progress, [centerPoint - 0.1, centerPoint, centerPoint + 0.1], [0, 1, 0])

  // Scale: subtle growth as it centers
  const scale = useTransform(progress, [centerPoint - 0.1, centerPoint, centerPoint + 0.1], [0.9, 1.1, 0.9])

  // Masking effect: we use clip-path to slice the number
  // Inspired by the "cut in half" luxury look
  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
    >
      <div className="relative">
        {/* Top Half */}
        <div
          className="text-[20vw] md:text-[25vw] font-serif font-black text-white/5 leading-none"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          {year}
        </div>

        {/* Bottom Half with slight offset for editorial feel */}
        <div
          className="text-[20vw] md:text-[25vw] font-serif font-black text-white/10 leading-none mt-[-2vw]"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          {year}
        </div>

        {/* Subtle decorative line separating the halves */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-[-10%] right-[-10%] h-[1px] bg-white/20 transform -translate-y-1/2"
        />
      </div>
    </motion.div>
  )
}
