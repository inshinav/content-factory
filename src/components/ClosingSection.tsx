import { motion } from 'motion/react'
import { reveal } from '../lib/motion'

export function ClosingSection() {
  return (
    <section className="section closing-section">
      <div className="container">
        <motion.div className="closing" {...reveal}>
          <h2>
            Завод не устаёт.
            <br />
            <span className="neon">Контент не кончается.</span>
          </h2>
          <p className="closing-foot mono">
            Контент-завод · концепт-демо · персонажи вымышлены, цифры иллюстративны
          </p>
        </motion.div>
      </div>
    </section>
  )
}
