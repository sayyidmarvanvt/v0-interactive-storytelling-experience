"use client"

import { useRef } from "react"
import { useScroll, useSpring } from "framer-motion"
import { OrbitItem } from "./orbit-item"
import { MaskedYear } from "./masked-year"
import { Timeline } from "./timeline"

export interface Chapter {
  id: number
  year: string
  title: string
  description: string
  imageUrl: string
}

interface CircularScrollProps {
  chapters: Chapter[]
}

export function CircularScroll({ chapters }: CircularScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {chapters.map((chapter, index) => (
            <MaskedYear
              key={`year-${chapter.id}`}
              year={chapter.year}
              index={index}
              total={chapters.length}
              progress={smoothProgress}
            />
          ))}
        </div>

        <div className="relative w-full h-full flex items-center justify-center z-10">
          {chapters.map((chapter, index) => (
            <OrbitItem
              key={chapter.id}
              chapter={chapter}
              index={index}
              total={chapters.length}
              progress={smoothProgress}
            />
          ))}
        </div>

        <Timeline chapters={chapters} progress={smoothProgress} />
      </div>
    </div>
  )
}
