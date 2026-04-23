/** Static (non-translatable) data for services. Text lives in locales/*/
export interface ServiceStatic {
  icon: string
  img: string
  reverse?: boolean
}

export const SERVICE_STATIC: ServiceStatic[] = [
  { icon: '🖨', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80' },
  { icon: '⚡', img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80', reverse: true },
  { icon: '🎁', img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80' },
  { icon: '🚩', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', reverse: true },
  { icon: '📦', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
  { icon: '✏️', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', reverse: true },
]
