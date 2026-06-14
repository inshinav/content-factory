import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { Heart, MapPin, Play, Users } from 'lucide-react'
import { personas } from '../data/personas'
import type { Persona } from '../data/personas'
import { staggerChild, staggerParent } from '../lib/motion'
import { SectionIntro } from './SectionIntro'

type AccentStyle = CSSProperties & { '--acc'?: string }

function Avatar({ persona }: { persona: Persona }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <span className="pcard-ph">{persona.name.slice(0, 1)}</span>
  }
  return <img className="pcard-img" src={persona.avatar} alt="" onError={() => setFailed(true)} />
}

// Карточка-мини-профиль TikTok: шапка (аватар, счётчики), сетка превью, мета персонажа.
function PersonaCard({ persona }: { persona: Persona }) {
  const style = { '--acc': persona.accent === 'cyan' ? 'var(--cyan)' : 'var(--magenta)' } as AccentStyle
  return (
    <motion.article className="pcard surface" style={style} {...staggerChild}>
      <div className="pcard-head">
        <Avatar persona={persona} />
        <div className="pcard-id">
          <strong>{persona.handle}</strong>
          <span className="pcard-niche">{persona.niche}</span>
        </div>
      </div>

      <div className="pcard-stats mono">
        <span>
          <Users size={13} />
          {persona.followers}
        </span>
        <span>
          <Heart size={13} />
          {persona.likes}
        </span>
        <span>
          <MapPin size={13} />
          {persona.geo}
        </span>
      </div>

      <div className="pcard-grid" aria-hidden="true">
        {[persona.likes, persona.saves, persona.shares].map((m, i) => (
          <span key={i} className="pcard-thumb">
            <Play size={12} fill="currentColor" />
            <em className="mono">{m}</em>
          </span>
        ))}
      </div>

      <div className="pcard-meta">
        <span className="chip">{persona.style}</span>
        <span className="chip">{persona.vibe}</span>
      </div>
    </motion.article>
  )
}

export function PersonasSection() {
  return (
    <section className="section personas-section" id="personas">
      <div className="container">
        <SectionIntro
          eyebrow="LINE 03 · наши персонажи"
          title="Персонажи завода"
          lead="Вымышленные персонажи в безопасных нишах — lifestyle, wellness, fitness, travel. Реальные аватары подставляются из /assets."
        />

        <motion.div className="personas-grid" {...staggerParent}>
          {personas.map((p) => (
            <PersonaCard key={p.id} persona={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
