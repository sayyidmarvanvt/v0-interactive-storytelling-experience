"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import type { Chapter } from "./circular-scroll"

interface TimelineProps {
  chapters: Chapter[]
  progress: MotionValue<number>
}

export function Timeline({ chapters, progress }: TimelineProps) {
  // Sync the horizontal progress bar width with scroll progress
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed bottom-12 left-0 w-full z-50 px-12 md:px-24 pointer-events-none">
      <div className="relative h-12 flex items-center">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 transform -translate-y-1/2" />

        {/* Active Progress Line */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute top-1/2 left-0 h-[1.5px] bg-white transform -translate-y-1/2 origin-left shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />

        {/* Year Markers */}
        <div className="absolute inset-0 flex justify-between items-center">
          {chapters.map((chapter, index) => {
            const markerProgress = index / (chapters.length - 1)

            return (
              <TimelineMarker
                key={`marker-${chapter.id}`}
                year={chapter.year}
                index={index}
                total={chapters.length}
                progress={progress}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface TimelineMarkerProps {
  year: string
  index: number
  total: number
  progress: MotionValue<number>
}

function TimelineMarker({ year, index, total, progress }: TimelineMarkerProps) {
  const markerPoint = index / (total - 1)

  // Markers glow as the progress line passes them
  const opacity = useTransform(progress, [markerPoint - 0.05, markerPoint, markerPoint + 0.05], [0.3, 1, 0.3])

  const scale = useTransform(progress, [markerPoint - 0.05, markerPoint, markerPoint + 0.05], [1, 1.2, 1])

  const translateY = useTransform(progress, [markerPoint - 0.05, markerPoint, markerPoint + 0.05], ["0%", "-10%", "0%"])

  return (
    <motion.div style={{ opacity, scale, translateY }} className="flex flex-col items-center">
      <div className="w-1.5 h-1.5 rounded-full bg-white mb-2 shadow-white" />
      <span className="text-[10px] md:text-xs font-mono tracking-widest text-white uppercase">{year}</span>
    </motion.div>
  )
}
