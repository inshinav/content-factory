import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ConveyorSection } from './components/ConveyorSection'
import { GallerySection } from './components/GallerySection'
import { PersonasSection } from './components/PersonasSection'
import { ScaleSection } from './components/ScaleSection'
import { MachinerySection } from './components/MachinerySection'
import { ClosingSection } from './components/ClosingSection'

// Драматургия: завод (конвейер) → реальный TikTok (лента) → персонажи →
// глобальный масштаб → машинерия → тихое закрытие.
export default function App() {
  return (
    <>
      <a className="skip-link" href="#top">
        К содержимому
      </a>
      <Header />
      <main>
        <Hero />
        <ConveyorSection />
        <GallerySection />
        <PersonasSection />
        <ScaleSection />
        <MachinerySection />
        <ClosingSection />
      </main>
    </>
  )
}
