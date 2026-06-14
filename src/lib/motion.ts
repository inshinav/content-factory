// Единый язык движения. Только transform/opacity/filter; уважается reduced-motion
// глобально через <MotionConfig reducedMotion="user"> в main.tsx.

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Проявление секции: вверх + лёгкое размытие. */
export const reveal = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-12% 0px -8% 0px' },
  transition: { duration: 0.6, ease: EASE_OUT },
}

export const staggerParent = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-10% 0px' },
  variants: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } },
}

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT } },
  },
}
