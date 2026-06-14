import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { personas } from '../data/personas'
import { scaleStats } from '../data/scale'
import { reveal, staggerChild, staggerParent } from '../lib/motion'
import { SectionIntro } from './SectionIntro'
import { TikTokPhone } from './TikTokPhone'

const perDay = scaleStats.find((s) => s.label === 'роликов в день')?.value ?? 600
const creators = scaleStats.find((s) => s.label === 'персонажей')?.value ?? 24

export function GallerySection() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <SectionIntro
          eyebrow="LINE 02 · вертикальная лента"
          title="Поток, а не каталог"
          lead="Так это выглядит в TikTok — те же табы, панель действий справа и музыка. Это поток: сотни роликов в день, а не четыре аккаунта."
        />
      </div>

      <motion.div className="gallery-rail" {...staggerParent} aria-label="Примеры роликов">
        {personas.map((p) => (
          <motion.div className="gallery-cell" key={p.id} {...staggerChild}>
            <TikTokPhone persona={p} size="md" />
          </motion.div>
        ))}
        <motion.div className="gallery-more surface" {...staggerChild} aria-hidden="true">
          <strong className="mono">+{perDay}</strong>
          <span>роликов в день</span>
          <span className="gallery-more-sub mono">
            {creators} авторов <ArrowRight size={13} />
          </span>
        </motion.div>
      </motion.div>

      <div className="container">
        <motion.p className="gallery-note" {...reveal}>
          Мокап интерфейса — стилизованный, без копирования проприетарного лого; счётчики иллюстративны. Кадры
          роликов подставляются из <code>/assets</code>.
        </motion.p>
      </div>
    </section>
  )
}
