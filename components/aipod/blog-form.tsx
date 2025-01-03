"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Minus, Image as ImageIcon, Video, Mic, Type } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface Section {
  type: 'subheading' | 'text' | 'image' | 'video' | 'podcast'
  content: string
  caption?: string
  subheadingId?: string
}

interface BlogFormProps {
  onClose: () => void
}

export function BlogForm({ onClose }: BlogFormProps) {
  const [sections, setSections] = useState<Section[]>([])
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    thumbnail: '',
    readTime: '',
    author: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    if (!formData.excerpt.trim()) {
      setError('Excerpt is required')
      return
    }
    if (!formData.thumbnail.trim()) {
      setError('Thumbnail URL is required')
      return
    }
    if (!formData.author.trim()) {
      setError('Author name is required')
      return
    }
    if (sections.length === 0) {
      setError('At least one section is required')
      return
    }

    // Validate sections
    for (const section of sections) {
      if (!section.content.trim()) {
        setError(`${section.type.charAt(0).toUpperCase() + section.type.slice(1)} content cannot be empty`)
        return
      }
    }

    const blogPost = {
      ...formData,
      type: 'blog',
      date: new Date().toISOString(),
      content: sections.map((section, index) => ({
        ...section,
        order: index
      }))
    }

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      })

      if (!response.ok) {
        throw new Error('Failed to save blog post')
      }

      onClose()
    } catch (error) {
      setError('Failed to save blog post. Please try again.')
    }
  }

  const addSection = (type: Section['type'], subheadingId?: string) => {
    setSections([...sections, { type, content: '', subheadingId }])
    setError('')
  }

  const removeSection = (index: number) => {
    const removedSection = sections[index]
    const updatedSections = sections.filter((_, i) => i !== index)
    
    // If removing a subheading, also remove its content sections
    if (removedSection.type === 'subheading') {
      setSections(updatedSections.filter(section => section.subheadingId !== removedSection.content))
    } else {
      setSections(updatedSections)
    }
    setError('')
  }

  const updateSection = (index: number, updates: Partial<Section>) => {
    setSections(sections.map((section, i) => 
      i === index ? { ...section, ...updates } : section
    ))
    setError('')
  }

  const getCurrentSubheading = () => {
    const lastSubheading = [...sections].reverse().find(section => section.type === 'subheading')
    return lastSubheading?.content || undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Post Title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Post Excerpt"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            placeholder="Thumbnail URL"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="readTime">Read Time</Label>
            <Input
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
              placeholder="e.g., 5 min"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author Name"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className={`space-y-2 p-4 border rounded-lg ${
            section.type === 'subheading' ? 'bg-muted/50' : ''
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSection(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            {section.type === 'subheading' ? (
              <Input
                value={section.content}
                onChange={(e) => updateSection(index, { content: e.target.value })}
                placeholder="Subheading title..."
              />
            ) : (
              <>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, { content: e.target.value })}
                  placeholder={`${section.type} content...`}
                />
                {(section.type === 'image' || section.type === 'video') && (
                  <Input
                    value={section.caption || ''}
                    onChange={(e) => updateSection(index, { caption: e.target.value })}
                    placeholder="Caption (optional)"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSection('subheading')}
        >
          <Type className="h-4 w-4 mr-1" />
          Subheading
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSection('text', getCurrentSubheading())}
        >
          <Plus className="h-4 w-4 mr-1" />
          Text
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSection('image', getCurrentSubheading())}
        >
          <ImageIcon className="h-4 w-4 mr-1" />
          Image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSection('video', getCurrentSubheading())}
        >
          <Video className="h-4 w-4 mr-1" />
          Video
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSection('podcast', getCurrentSubheading())}
        >
          <Mic className="h-4 w-4 mr-1" />
          Podcast
        </Button>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Post</Button>
      </div>
    </form>
  )
} 