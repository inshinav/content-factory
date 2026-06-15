import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Bookmark,
  Cat,
  Flame,
  Heart,
  Home,
  Inbox,
  Music2,
  Plane,
  Plus,
  Search,
  Share2,
  Sun,
  User,
  Volume2,
  VolumeX,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NicheIcon, Persona } from '../data/personas'

type AccentStyle = CSSProperties & { '--acc'?: string; '--hue'?: string }

const ACCENT: Record<Persona['accent'], string> = {
  cyan: 'var(--cyan)',
  magenta: 'var(--magenta)',
}

const NICHE: Record<NicheIcon, LucideIcon> = {
  sun: Sun,
  wind: Wind,
  flame: Flame,
  plane: Plane,
  cat: Cat,
  heart: Heart,
}

// Один анмьют за раз: при включении звука инстанс кричит в window, остальные мьютят себя.
const SOUND_EVENT = 'tt-sound'

// UI-точный мокап экрана «Рекомендации» TikTok: табы, правый action-rail с пульсом
// сердца / вращением муздиска / бегущей строкой трека, нижний таб-бар, прогресс-бар.
// Если у персонажа есть persona.video — статичный кадр заменяется живым <video>
// (muted-автоплей, звук по тапу, пауза вне экрана). Лого не копируется — иконки lucide / SVG.
export function TikTokPhone({ persona, size = 'md' }: { persona: Persona; size?: 'lg' | 'md' | 'sm' }) {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [clipFailed, setClipFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hintShow, setHintShow] = useState(false)

  const Niche = NICHE[persona.nicheIcon]
  const hasVideo = Boolean(persona.video) && !clipFailed
  const style = { '--acc': ACCENT[persona.accent], '--hue': `${persona.hue}deg` } as AccentStyle

  // muted-автоплей: у React атрибут `muted` не всегда долетает до DOM-свойства и блокирует
  // autoplay — выставляем императивно через ref. Плюс показываем подсказку ~3 c.
  useEffect(() => {
    if (!hasVideo) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    void v.play().catch(() => {})
    setHintShow(true)
    const t = setTimeout(() => setHintShow(false), 3200)
    return () => clearTimeout(t)
  }, [hasVideo])

  // играем только в зоне видимости — экономим CPU при нескольких телефонах сразу.
  useEffect(() => {
    if (!hasVideo) return
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) void v.play().catch(() => {})
          else v.pause()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [hasVideo])

  // другой ролик включил звук → мьютим себя (один анмьют за раз).
  useEffect(() => {
    if (!hasVideo) return
    function onSound(e: Event) {
      const id = (e as CustomEvent<string>).detail
      if (id === persona.id) return
      const v = videoRef.current
      if (v) v.muted = true
      setMuted(true)
    }
    window.addEventListener(SOUND_EVENT, onSound)
    return () => window.removeEventListener(SOUND_EVENT, onSound)
  }, [hasVideo, persona.id])

  function toggleSound() {
    const v = videoRef.current
    if (!v) return
    const nextMuted = !v.muted
    v.muted = nextMuted
    setMuted(nextMuted)
    if (!nextMuted) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: persona.id }))
      void v.play().catch(() => {})
    }
  }

  function onTimeUpdate() {
    const v = videoRef.current
    if (v && v.duration) setProgress(v.currentTime / v.duration)
  }

  return (
    <div className={`ttphone ttphone--${size}`} style={style}>
      <div className="ttphone-screen">
        {/* кадр: живой ролик, реальный clip из /assets или намеренный motion-градиент с иконкой ниши */}
        <div className="ttphone-bg" aria-hidden="true">
          {hasVideo && (
            <video
              ref={videoRef}
              className="ttphone-clip"
              src={persona.video}
              poster={persona.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onTimeUpdate={onTimeUpdate}
              onError={() => setClipFailed(true)}
            />
          )}
          {!hasVideo && !clipFailed && (
            <img className="ttphone-clip" src={persona.clip} alt="" onError={() => setClipFailed(true)} />
          )}
          {!hasVideo && clipFailed && (
            <span className="ttphone-niche">
              <Niche size={64} strokeWidth={1.25} />
            </span>
          )}
          <span className="ttphone-noise" />
        </div>

        {/* прогресс-бар: реальный по timeupdate у видео, иначе статичный */}
        <span className="ttphone-progress" aria-hidden="true">
          <span style={hasVideo ? { width: `${Math.round(progress * 100)}%` } : undefined} />
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

        {hasVideo && (
          <>
            {/* бейдж «реальный ролик» — отличает живые клипы от градиентных плейсхолдеров */}
            <span className="ttphone-real mono" aria-hidden="true">
              <i />
              реальный ролик
            </span>
            <button
              type="button"
              className="ttphone-sound"
              onClick={toggleSound}
              aria-label={
                muted ? `Включить звук ролика ${persona.handle}` : `Выключить звук ролика ${persona.handle}`
              }
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <span className={`ttphone-hint mono${hintShow ? ' is-show' : ''}`} aria-hidden="true">
              нажми для звука
            </span>
          </>
        )}

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
