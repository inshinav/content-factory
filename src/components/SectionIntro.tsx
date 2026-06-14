import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { reveal } from '../lib/motion'

export function SectionIntro({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string
  title: ReactNode
  lead?: string
  center?: boolean
}) {
  return (
    <motion.header className={`sec-intro${center ? ' is-center' : ''}`} {...reveal}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </motion.header>
  )
}
