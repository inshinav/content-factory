// Счётчики масштаба — ИЛЛЮСТРАТИВНЫЕ (пример работы системы, не факт).

export type ScaleStat = { label: string; value: number; suffix: string; format: 'int' | 'short' }

export const scaleStats: ScaleStat[] = [
  { label: 'персонажей', value: 24, suffix: '', format: 'int' },
  { label: 'аккаунтов', value: 180, suffix: '', format: 'int' },
  { label: 'гео / рынков', value: 12, suffix: '', format: 'int' },
  { label: 'роликов в день', value: 600, suffix: '', format: 'int' },
  { label: 'охват / мес', value: 40, suffix: 'M', format: 'short' },
]

// Точки гео на стилизованной карте (проценты по ширине/высоте бокса).
export type GeoDot = { label: string; x: number; y: number }

export const geoDots: GeoDot[] = [
  { label: 'US-W', x: 14, y: 38 },
  { label: 'US-E', x: 24, y: 36 },
  { label: 'BR', x: 33, y: 66 },
  { label: 'UK', x: 47, y: 28 },
  { label: 'EU', x: 52, y: 32 },
  { label: 'NG', x: 50, y: 56 },
  { label: 'AE', x: 60, y: 46 },
  { label: 'IN', x: 68, y: 50 },
  { label: 'ID', x: 78, y: 64 },
  { label: 'JP', x: 84, y: 38 },
  { label: 'KR', x: 82, y: 36 },
  { label: 'AU', x: 86, y: 74 },
]
