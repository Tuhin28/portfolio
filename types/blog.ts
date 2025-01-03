export interface BlogPost {
  id: string
  title: string
  excerpt: string
  thumbnail: string
  type: 'blog' | 'podcast' | 'video'
  date: string
  readTime?: string
  content: {
    type: 'text' | 'image' | 'video' | 'podcast'
    content: string
    caption?: string
    order: number
  }[]
  author: string
  sources: {
    url: string
  }[]
} 