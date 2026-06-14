// Примеры персонажей — ВЫМЫШЛЕННЫЕ, brand-safe (lifestyle / wellness / fitness /
// travel). Цифры подписчиков/лайков/охвата — ИЛЛЮСТРАЦИЯ, не факт. Хэндлы и реальные
// изображения подставляются через слоты (avatar/clip в public/assets).

export type NicheIcon = 'sun' | 'wind' | 'flame' | 'plane'

export type Persona = {
  id: string
  handle: string
  name: string
  niche: string
  /** Иконка ниши — различает персонажей в намеренных плейсхолдерах. */
  nicheIcon: NicheIcon
  geo: string
  /** Иллюстративные показатели (не факт). */
  followers: string
  likes: string
  saves: string
  shares: string
  style: string
  vibe: string
  /** 'cyan' | 'magenta' — акцент карточки/свечения. */
  accent: 'cyan' | 'magenta'
  /** Сдвиг оттенка плейсхолдера (deg), чтобы 4 кадра выглядели разными. */
  hue: number
  /** Слот под реальный аватар, иначе намеренный плейсхолдер. */
  avatar: string
  /** Слот под кадр ролика для мокапа. */
  clip: string
  /** Подпись и трек для мокапа TikTok. */
  caption: string
  track: string
}

export const personas: Persona[] = [
  {
    id: 'aurora',
    handle: '@aurora.daily',
    name: 'Aurora',
    niche: 'lifestyle',
    nicheIcon: 'sun',
    geo: 'US',
    followers: '1.2M',
    likes: '18.4M',
    saves: '742K',
    shares: '210K',
    style: 'тёплый daily-vlog',
    vibe: 'утро, кофе, мягкий свет',
    accent: 'cyan',
    hue: 0,
    avatar: '/assets/persona-1.jpg',
    clip: '/assets/clip-1.jpg',
    caption: 'один обычный вторник, но по-доброму',
    track: 'soft morning — lo-fi loop',
  },
  {
    id: 'still',
    handle: '@still.minded',
    name: 'Mira',
    niche: 'wellness / mindfulness',
    nicheIcon: 'wind',
    geo: 'US',
    followers: '860K',
    likes: '11.2M',
    saves: '980K',
    shares: '164K',
    style: 'спокойный, эстетичный',
    vibe: 'дыхание, пауза, тишина',
    accent: 'magenta',
    hue: 28,
    avatar: '/assets/persona-2.jpg',
    clip: '/assets/clip-2.jpg',
    caption: '30 секунд тишины перед днём',
    track: 'ambient still — pad',
  },
  {
    id: 'rise',
    handle: '@rise.with.mara',
    name: 'Mara',
    niche: 'fitness / motivation',
    nicheIcon: 'flame',
    geo: 'US',
    followers: '2.1M',
    likes: '31.7M',
    saves: '1.3M',
    shares: '420K',
    style: 'энергичный',
    vibe: 'движение, ритм, драйв',
    accent: 'cyan',
    hue: -18,
    avatar: '/assets/persona-3.jpg',
    clip: '/assets/clip-3.jpg',
    caption: 'пять минут, без оправданий',
    track: 'push it — 124 bpm',
  },
  {
    id: 'north',
    handle: '@northbound.film',
    name: 'Noah',
    niche: 'travel / aesthetic',
    nicheIcon: 'plane',
    geo: 'Global',
    followers: '1.7M',
    likes: '24.9M',
    saves: '1.1M',
    shares: '305K',
    style: 'кинематографичный',
    vibe: 'дороги, окна, горизонты',
    accent: 'magenta',
    hue: 52,
    avatar: '/assets/persona-4.jpg',
    clip: '/assets/clip-4.jpg',
    caption: 'где заканчивается асфальт',
    track: 'wide horizon — cinematic',
  },
]
