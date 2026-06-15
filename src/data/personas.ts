// Примеры персонажей — ВЫМЫШЛЕННЫЕ, brand-safe (lifestyle / wellness / fitness /
// travel). Цифры подписчиков/лайков/охвата — ИЛЛЮСТРАЦИЯ, не факт. Хэндлы и реальные
// изображения подставляются через слоты (avatar/clip в public/assets).

export type NicheIcon = 'sun' | 'wind' | 'flame' | 'plane' | 'cat' | 'heart'

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
  /**
   * Веб-оптимизированный вертикальный ролик. Если задан — мокап играет видео вместо статичного кадра.
   * Аудио только ДЕКОРАТИВНОЕ (без значимой речи): ролик autoplay-muted и скрыт от скринридеров
   * (aria-hidden), подписей нет — для информативной речи понадобился бы <track kind="captions">.
   */
  video?: string
  /** Постер (первый кадр) для мгновенного отображения до загрузки видео. */
  poster?: string
}

// Базовый префикс деплоя (Vite base): '/' в корне или '/content-factory/' в подпапке —
// чтобы слоты картинок резолвились в обоих случаях (не мимо подпапки).
const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`

export const personas: Persona[] = [
  {
    id: 'nika',
    handle: '@nika.prosto',
    name: 'Ника',
    niche: 'честно о себе',
    nicheIcon: 'heart',
    geo: 'RU',
    followers: '312K',
    likes: '4.8M',
    saves: '291K',
    shares: '88K',
    style: 'живой разговор в кадр',
    vibe: 'кружка, мягкий свет, без фильтров',
    accent: 'magenta',
    hue: 0,
    avatar: asset('nika-poster.jpg'),
    clip: asset('nika-poster.jpg'),
    video: asset('nika.mp4'),
    poster: asset('nika-poster.jpg'),
    caption: 'я долго тянула. а потом просто устала тянуть одна',
    track: 'тихий вечер · голос за кадром',
  },
  {
    id: 'valera',
    handle: '@kot.valera',
    name: 'Валера',
    niche: 'кот-психотерапевт',
    nicheIcon: 'cat',
    geo: 'RU',
    followers: '980K',
    likes: '22.1M',
    saves: '1.4M',
    shares: '512K',
    style: 'дедпан, уютно',
    vibe: 'лежит на клавиатуре, всё понимает',
    accent: 'cyan',
    hue: 200,
    avatar: asset('valera-poster.jpg'),
    clip: asset('valera-poster.jpg'),
    video: asset('valera.mp4'),
    poster: asset('valera-poster.jpg'),
    caption: 'иногда просто посидеть рядом — уже помогает',
    track: 'мурчание · 40 герц',
  },
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
    avatar: asset('persona-1.jpg'),
    clip: asset('clip-1.jpg'),
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
    avatar: asset('persona-2.jpg'),
    clip: asset('clip-2.jpg'),
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
    avatar: asset('persona-3.jpg'),
    clip: asset('clip-3.jpg'),
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
    avatar: asset('persona-4.jpg'),
    clip: asset('clip-4.jpg'),
    caption: 'где заканчивается асфальт',
    track: 'wide horizon — cinematic',
  },
]
