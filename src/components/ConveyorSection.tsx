import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  AudioLines,
  BarChart3,
  Clapperboard,
  Image as ImageIcon,
  Radar,
  RotateCcw,
  Scissors,
  Send,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { stations } from '../data/pipeline'
import type { StationIcon } from '../data/pipeline'
import { scaleStats } from '../data/scale'
import { reveal } from '../lib/motion'
import { SectionIntro } from './SectionIntro'

const perDay = scaleStats.find((s) => s.label === 'роликов в день')?.value ?? 600

const ICONS: Record<StationIcon, LucideIcon> = {
  radar: Radar,
  persona: Sparkles,
  image: ImageIcon,
  video: Clapperboard,
  voice: AudioLines,
  assembly: Scissors,
  publish: Send,
  analytics: BarChart3,
}

const UNITS = [0, 1, 2, 3]

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const apply = () => setNarrow(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return narrow
}

export function ConveyorSection() {
  const reduce = useReducedMotion()
  const narrow = useIsNarrow()
  const [active, setActive] = useState(0)
  const step = stations[active]

  // На мобиле единицы едут сверху вниз (top), на десктопе слева направо (left).
  const travel = narrow ? { top: ['-3%', '103%'] } : { left: ['-3%', '103%'] }

  return (
    <section className="section conveyor-section" id="conveyor">
      <div className="container">
        <SectionIntro
          eyebrow="LINE 01 · сборочный конвейер"
          title={<>Завод, а не ручная работа</>}
          lead="Единица контента едет по станциям без остановок: от тренда до публикации. Каждая станция — инструмент и действие."
        />

        <motion.div className="conveyor surface" {...reveal}>
          <div className="conveyor-head">
            <span className="belt-throughput mono">
              <span className="belt-throughput-dot" aria-hidden="true" />~{perDay} роликов/день · 24/7
            </span>
            <span className="conveyor-hint mono" aria-hidden="true">
              нажмите станцию
            </span>
          </div>
          <div className="belt">
            <span className="belt-line" aria-hidden="true" />

            {/* едущие единицы контента */}
            {!reduce &&
              UNITS.map((u) => (
                <motion.span
                  key={u}
                  className="belt-unit"
                  aria-hidden="true"
                  initial={false}
                  animate={travel}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: u * 1.75 }}
                />
              ))}

            {/* станции */}
            <div className="stations">
              {stations.map((s, i) => {
                const Icon = ICONS[s.icon]
                return (
                  <button
                    key={s.id}
                    className={`station${i === active ? ' is-active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    aria-label={`${s.label}: ${s.tool}`}
                  >
                    <span className="station-node">
                      <motion.span
                        className="station-glow"
                        aria-hidden="true"
                        animate={reduce ? undefined : { opacity: [0.18, 1, 0.18] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.32 }}
                      />
                      <Icon size={20} />
                    </span>
                    <span className="station-no mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="station-label">{s.label}</span>
                  </button>
                )
              })}
            </div>

            {/* петля обратной связи */}
            <span className="belt-loop" aria-hidden="true">
              <RotateCcw size={14} />
              <span className="mono">feedback → бриф</span>
            </span>
          </div>

          {/* деталь активной станции */}
          <div className="station-detail-region" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              className="station-detail"
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <span className="mono station-detail-tool">{step.tool}</span>
              <strong>{step.label}</strong>
              <p>{step.action}</p>
            </motion.div>
          </AnimatePresence>
          </div>
        </motion.div>

        <p className="conveyor-note">Ни одного ручного шага между трендом и публикацией.</p>
      </div>
    </section>
  )
}
