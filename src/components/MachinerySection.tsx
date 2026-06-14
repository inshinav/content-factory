import { motion } from 'motion/react'
import { Boxes } from 'lucide-react'
import { machinery } from '../data/pipeline'
import { staggerChild, staggerParent } from '../lib/motion'
import { SectionIntro } from './SectionIntro'

export function MachinerySection() {
  return (
    <section className="section machinery-section" id="machinery">
      <div className="container">
        <SectionIntro
          eyebrow="LINE 05 · оборудование цеха"
          title="На чём работает завод"
          lead="Стек автоматизации как станки цеха — каждый узел делает свою операцию в потоке."
        />

        <motion.div className="machinery-grid" {...staggerParent}>
          {machinery.map((m, i) => (
            <motion.article className="machine surface" key={m.label} {...staggerChild}>
              <span className="machine-no mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="machine-icon" aria-hidden="true">
                <Boxes size={18} />
              </span>
              <strong>{m.label}</strong>
              <span className="machine-kind">{m.kind}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
