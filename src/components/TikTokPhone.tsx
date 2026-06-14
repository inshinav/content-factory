import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Bookmark, Flame, Home, Inbox, Music2, Plane, Plus, Search, Share2, Sun, User, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NicheIcon, Persona } from '../data/personas'

type AccentStyle = CSSProperties & { '--acc'?: string; '--hue'?: string }

const ACCENT: Record<Persona['accent'], string> = {
  cyan: 'var(--cyan)',
  magenta: 'var(--magenta)',
}

const NICHE: Record<NicheIcon, LucideIcon> = { sun: Sun, wind: Wind, flame: Flame, plane: Plane }

// UI-точный мокап экрана «Рекомендации» TikTok: табы, правый action-rail с пульсом
// сердца / вращением муздиска / бегущей строкой трека, нижний таб-бар, прогресс-бар.
// Лого не копируется — все иконки через lucide / кастомный SVG.
export function TikTokPhone({ persona, size = 'md' }: { persona: Persona; size?: 'lg' | 'md' | 'sm' }) {
  const reduce = useReducedMotion()
  const [clipFailed, setClipFailed] = useState(false)
  const Niche = NICHE[persona.nicheIcon]
  const style = { '--acc': ACCENT[persona.accent], '--hue': `${persona.hue}deg` } as AccentStyle

  return (
    <div className={`ttphone ttphone--${size}`} style={style}>
      <div className="ttphone-screen">
        {/* видео-кадр: реальный clip из /assets, иначе намеренный motion-градиент с иконкой ниши */}
        <div className="ttphone-bg" aria-hidden="true">
          {!clipFailed && (
            <img className="ttphone-clip" src={persona.clip} alt="" onError={() => setClipFailed(true)} />
          )}
          {clipFailed && (
            <span className="ttphone-niche">
              <Niche size={64} strokeWidth={1.25} />
            </span>
          )}
          <span className="ttphone-noise" />
        </div>

        {/* прогресс-бар сверху */}
        <span className="ttphone-progress" aria-hidden="true">
          <span />
        </span>

        {/* верхние табы */}
        <div className="ttphone-tabs" aria-hidden="true">
          <span className="ttphone-tab">Подписки</span>
          <span className="ttphone-tab is-active">Рекомендации</span>
        </div>

        <span className="ttphone-live" aria-hidden="true">
          <i />
          live
        </span>

        {/* правый action-rail */}
        <div className="ttphone-rail" aria-hidden="true">
          <span className="ttphone-rail-avatar">
            {persona.name.slice(0, 1)}
            <i className="ttphone-rail-plus">
              <Plus size={11} strokeWidth={3} />
            </i>
          </span>
          <span className="ttphone-rail-item">
            <motion.svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              animate={reduce ? undefined : { scale: [1, 1.16, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M12 21s-7.2-4.5-9.5-9C1 9 2.3 5.5 5.6 5.5c2 0 3.2 1.2 4.4 2.7C11.2 6.7 12.4 5.5 14.4 5.5c3.3 0 4.6 3.5 3.1 6.5-2.3 4.5-9.5 9-9.5 9z"
                fill="var(--magenta)"
              />
            </motion.svg>
            <b>{persona.likes}</b>
          </span>
          <span className="ttphone-rail-item">
            <Bookmark size={24} />
            <b>{persona.saves}</b>
          </span>
          <span className="ttphone-rail-item">
            <Share2 size={24} />
            <b>{persona.shares}</b>
          </span>
          <motion.span
            className="ttphone-disc"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <Music2 size={14} />
          </motion.span>
        </div>

        {/* подпись + музыка */}
        <div className="ttphone-meta">
          <strong className="ttphone-handle">{persona.handle}</strong>
          <p className="ttphone-caption">{persona.caption}</p>
          <span className="ttphone-music">
            <Music2 size={13} />
            <span className="ttphone-music-mask">
              <span className="ttphone-music-track">
                {persona.track} · {persona.track} ·&nbsp;
              </span>
            </span>
          </span>
        </div>

        {/* нижний таб-бар */}
        <div className="ttphone-tabbar" aria-hidden="true">
          <Home size={18} />
          <Search size={18} />
          <span className="ttphone-tabbar-plus">
            <Plus size={16} strokeWidth={3} />
          </span>
          <Inbox size={18} />
          <User size={18} />
        </div>
      </div>
    </div>
  )
}
