import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { geoDots, scaleStats } from '../data/scale'
import type { ScaleStat } from '../data/scale'
import { useCountUp } from '../lib/useCountUp'
import { reveal } from '../lib/motion'
import { SectionIntro } from './SectionIntro'

function StatTile({ stat, active }: { stat: ScaleStat; active: boolean }) {
  const value = useCountUp(stat.value, active)
  return (
    <div className="scale-tile">
      <strong className="mono">
        {Math.round(value).toLocaleString('ru-RU')}
        {stat.suffix}
      </strong>
      <span>{stat.label}</span>
    </div>
  )
}

export function ScaleSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="section scale-section" id="scale">
      <div className="container">
        <SectionIntro
          eyebrow="LINE 04 · глобальный масштаб"
          title="Один движок — глобальный охват"
          lead="Один завод множится в персонажей, аккаунты, гео и тысячи роликов. Счётчики иллюстративны — это пример работы системы."
        />

        <div className="scale-grid" ref={ref}>
          <motion.div className="scale-stats surface" {...reveal}>
            {scaleStats.map((s) => (
              <StatTile key={s.label} stat={s} active={inView} />
            ))}
          </motion.div>

          <motion.div className="scale-map surface" {...reveal}>
            <span className="scale-map-label mono">geo · 24/7</span>
            <div className="geo" aria-hidden="true">
              {geoDots.map((d, i) => (
                <motion.span
                  key={d.label}
                  className="geo-dot"
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={reduce ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                >
                  <i />
                </motion.span>
              ))}
            </div>
            <span className="scale-map-foot mono">{geoDots.length} рынков · непрерывный постинг</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
