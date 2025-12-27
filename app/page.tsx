import { CircularScroll, type Chapter } from "@/components/circular-scroll"

const STORY_CHAPTERS: Chapter[] = [
  {
    id: 1,
    year: "1875",
    title: "The Genesis",
    description:
      "In the heart of the Vallée de Joux, a vision of mechanical perfection was born, setting the standard for generations to come.",
    imageUrl: "/luxury-watch-workshop-1875-vintage.jpg",
  },
  {
    id: 2,
    year: "1921",
    title: "Era of Elegance",
    description:
      "The roaring twenties brought a new language of design, where geometry met grace in a dance of precious metals.",
    imageUrl: "/art-deco-jewelry-watch-1920s.jpg",
  },
  {
    id: 3,
    year: "1948",
    title: "Precision Reimagined",
    description:
      "Post-war innovation pushed the boundaries of accuracy, introducing complications that defied the impossible.",
    imageUrl: "/vintage-watch-movement-gears-1940s.jpg",
  },
  {
    id: 4,
    year: "1972",
    title: "Steel Revolution",
    description:
      "A bold departure from tradition redefined luxury, proving that strength and sophistication could coexist in stainless steel.",
    imageUrl: "/modern-steel-luxury-watch-design-1970s.jpg",
  },
  {
    id: 5,
    year: "1993",
    title: "Grand Complications",
    description:
      "The pinnacle of horological mastery, where thousands of components work in perfect harmony to track the celestial.",
    imageUrl: "/complex-watch-skeleton-dial-gold.jpg",
  },
  {
    id: 6,
    year: "2015",
    title: "Future Horizons",
    description:
      "Merging ancient techniques with tomorrow's materials, the journey continues into an era of limitless potential.",
    imageUrl: "/futuristic-carbon-fiber-watch-concept.jpg",
  },
  {
    id: 7,
    year: "2025",
    title: "The Legacy Lives",
    description: "150 years of uncompromising spirit, celebrating the past while shaping the next century of wonders.",
    imageUrl: "/grand-exhibition-luxury-hall-150-years.jpg",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-serif font-bold tracking-tighter">EST. 1875</div>
        <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] font-mono uppercase text-white/60">
          <a href="#" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Heritage
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Collection
          </a>
        </nav>
        <div className="w-10 h-[1px] bg-white" />
      </header>

      {/* Hero / Intro section could go here if needed, but we dive straight into the scroll */}
      <CircularScroll chapters={STORY_CHAPTERS} />

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 w-full z-50 p-8 flex justify-center pointer-events-none">
        <div className="text-[10px] tracking-[0.5em] font-mono uppercase text-white/20">
          Scroll to explore the legacy
        </div>
      </footer>
    </main>
  )
}
