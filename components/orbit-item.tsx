"use client"
import { motion, useTransform, type MotionValue } from "framer-motion"
import type { Chapter } from "./circular-scroll"
import Image from "next/image"

interface OrbitItemProps {
  chapter: Chapter
  index: number
  total: number
  progress: MotionValue<number>
}

export function OrbitItem({ chapter, index, total, progress }: OrbitItemProps) {
  const angleOffset = (index / total) * 360

  // We subtract progress * 360 to move the items clockwise/counter-clockwise as we scroll
  const rotation = useTransform(progress, [0, 1], [0, -360])

  const angle = useTransform(rotation, (r) => r + angleOffset)

  // Radius of the orbit (e.g., 40vw)
  const radius = 40

  const x = useTransform(angle, (a) => `${Math.sin((a * Math.PI) / 180) * radius}vw`)
  const z = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * 1000)

  const scale = useTransform(angle, (a) => {
    const cos = Math.cos((a * Math.PI) / 180)
    return 0.5 + (cos + 1) * 0.25 // Scale from 0.5 to 1.0
  })

  const opacity = useTransform(angle, (a) => {
    const cos = Math.cos((a * Math.PI) / 180)
    return 0.2 + (cos + 1) * 0.4 // Opacity from 0.2 to 1.0
  })

  const zIndex = useTransform(angle, (a) => Math.round((Math.cos((a * Math.PI) / 180) + 1) * 100))

  return (
    <motion.div
      style={{
        x,
        z,
        scale,
        opacity,
        zIndex,
        perspective: 1000,
      }}
      className="absolute w-[300px] md:w-[450px] aspect-[4/5] pointer-events-none"
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl border border-white/10 group">
        <Image
          src={chapter.imageUrl || "/placeholder.svg"}
          alt={chapter.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
          <motion.h3 className="text-2xl font-serif mb-2">{chapter.title}</motion.h3>
          <motion.p className="text-sm text-white/60 font-sans leading-relaxed">{chapter.description}</motion.p>
        </div>
      </div>
    </motion.div>
  )
}
