import type { CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Factory } from 'lucide-react'
import { personas } from '../data/personas'
import { scaleStats } from '../data/scale'
import { TikTokPhone } from './TikTokPhone'

type Vars = CSSProperties & { '--d'?: string }

const heroPersonas = personas.slice(0, 3)
const heroStats = scaleStats.slice(0, 3)
const beltUnits = [0, 1, 2]

function HeroStage() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -48])

  return (
    <motion.div className="hero-stage" style={reduce ? undefined : { y }} aria-label="Примеры контента в TikTok">
      <span className="hero-signal mono" aria-hidden="true">
        <Factory size={13} /> factory · demo
      </span>
      <div className="hero-phones">
        {heroPersonas.map((p, i) => (
          <motion.div
            key={p.id}
            className={`hero-phone hero-phone--${i + 1}`}
            style={{ '--d': `${i * 0.4}s` } as Vars}
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            <TikTokPhone persona={p} size={i === 1 ? 'md' : 'sm'} />
          </motion.div>
        ))}
      </div>

      {/* мини-конвейер: «завод» считывается уже на первом экране */}
      <div className="hero-belt" aria-hidden="true">
        <span className="hero-belt-line" />
        {!reduce &&
          beltUnits.map((u) => (
            <motion.span
              key={u}
              className="hero-belt-unit"
              animate={{ left: ['-4%', '104%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: u * 1.6 }}
            />
          ))}
        <span className="hero-belt-label mono">бриф → ролик → публикация</span>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">AI INFLUENCER FACTORY</p>
          <h1>
            Контент-<span className="neon">завод</span>
          </h1>
          <p className="hero-lead">
            Автоматизированная фабрика AI-инфлюенсеров для TikTok — от брифа до тысяч роликов на множестве
            аккаунтов и гео.
          </p>
          <div className="hero-actions">
            <a className="btn-ghost" href="#conveyor">
              <ArrowDown size={17} />
              Смотреть конвейер
            </a>
            <a className="btn-ghost" href="#personas">
              Наши блогеры
            </a>
          </div>
          <ul className="hero-stats mono" aria-label="Масштаб (иллюстрация)">
            {heroStats.map((s) => (
              <li key={s.label}>
                <b>
                  {s.value}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <HeroStage />
      </div>
    </section>
  )
}
