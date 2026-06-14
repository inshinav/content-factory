import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS: Array<[string, string]> = [
  ['Конвейер', '#conveyor'],
  ['Лента', '#gallery'],
  ['Блогеры', '#personas'],
  ['Масштаб', '#scale'],
  ['Оборудование', '#machinery'],
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`topbar${open ? ' is-open' : ''}`}>
      <div className="topbar-inner">
        <a className="brand" href="#top" aria-label="Контент-завод" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M9 7l9 5-9 5z" fill="url(#bg)" />
              <defs>
                <linearGradient id="bg" x1="9" y1="7" x2="18" y2="17" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#25F4EE" />
                  <stop offset="1" stopColor="#FE2C55" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-text">Контент-завод</span>
        </a>

        <nav className="topnav" aria-label="Разделы">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="topnav-mobile" aria-label="Меню">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
