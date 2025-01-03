"use client"

import { useState } from 'react'
import { Search, ArrowLeft } from 'lucide-react'
import { BlogPost } from '@/types/blog-post'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introduction to AI",
    content: "Artificial Intelligence (AI) is revolutionizing various industries...",
    publishDate: new Date("2023-01-15"),
    category: ["Technology", "AI"],
    tags: ["machine learning", "deep learning", "neural networks"],
    aiGenerated: true,
    author: {
      name: "Tuhin Bhattacharya",
      role: "AI Researcher",
      avatar: "/IMG_5342(1).jpg"
    }
  },
  // ... other blog posts
]

export function AIPod() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <section className="space-y-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl font-serif mb-8">Tools & Craft</h2>
        </div>
        
        <div className="mb-8 relative max-w-xl">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-3 pl-10 bg-muted border-none rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="grid gap-8">
          {blogPosts.map(post => (
            <article 
              key={post.id} 
              className="p-6 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-[2/1] bg-muted rounded-xl mb-6" />
              <h3 className="text-2xl font-medium mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.content.substring(0, 120)}...</p>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl p-6 h-[90vh] overflow-y-auto">
            {selectedPost && (
              <article className="prose prose-lg max-w-none">
                <Button
                  variant="ghost"
                  className="mb-8"
                  onClick={() => setSelectedPost(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all posts
                </Button>
                <h1>{selectedPost.title}</h1>
                <div className="flex items-center gap-3 my-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{selectedPost.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Published on {selectedPost.publishDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded-xl mb-8" />
                <p>{selectedPost.content}</p>
              </article>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

