import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
// Самохостинг шрифтов (с кириллицей): Unbounded — дисплей, Inter — body, JetBrains Mono — данные.
import '@fontsource-variable/unbounded/index.css'
import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './index.css'
import './styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" — циклы конвейера/мокапов уважают prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
