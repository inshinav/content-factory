// Станции сборочного конвейера контент-завода. Иконки — ключи, мапятся на lucide
// в компоненте. Порядок = поток единицы контента слева направо, затем петля.

export type StationIcon =
  | 'radar'
  | 'persona'
  | 'image'
  | 'video'
  | 'voice'
  | 'assembly'
  | 'publish'
  | 'analytics'

export type Station = {
  id: string
  label: string
  tool: string
  action: string
  icon: StationIcon
}

export const stations: Station[] = [
  { id: 'brief', label: 'Бриф / тренд', tool: 'trend radar', action: 'сбор трендов, звуков и тем в бриф', icon: 'radar' },
  { id: 'persona', label: 'Персона-движок', tool: 'AI-персона · LoRA', action: 'стабильная внешность и голос автора', icon: 'persona' },
  { id: 'image', label: 'Изображение', tool: 'GPT Image 2', action: 'кадры, обложки, опорные фреймы', icon: 'image' },
  { id: 'video', label: 'Видео', tool: 'Kling · Seedance', action: 'вертикальное видео 9:16', icon: 'video' },
  { id: 'voice', label: 'Голос', tool: 'ElevenLabs', action: 'синтетический голос и интонации', icon: 'voice' },
  { id: 'assembly', label: 'Сборка / монтаж', tool: 'auto-edit', action: 'субтитры, музыка, тайминг, хук', icon: 'assembly' },
  { id: 'publish', label: 'Публикация', tool: 'мульти-аккаунт', action: 'TikTok по слотам и гео, с AI-меткой контента', icon: 'publish' },
  { id: 'analytics', label: 'Аналитика', tool: 'metrics loop', action: 'досмотры, сохранения, охват', icon: 'analytics' },
]

// Машинерия цеха (стек автоматизации). Нейтральные индустриальные узлы.
export type Machine = { label: string; kind: string }

export const machinery: Machine[] = [
  { label: 'GPT Image 2', kind: 'кадры и обложки' },
  { label: 'Kling · Seedance', kind: 'генерация видео' },
  { label: 'ElevenLabs', kind: 'синтез голоса' },
  { label: 'n8n', kind: 'оркестрация пайплайна' },
  { label: 'Мульти-аккаунт', kind: 'публикация по слотам' },
  { label: 'Гео-роутинг', kind: 'расписание по часовым поясам' },
]
