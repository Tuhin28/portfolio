"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { BlogForm } from "./blog-form"
import { LoginDialog } from "./login-dialog"

export function AdminDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleNewPost = () => {
    if (isAuthenticated) {
      setIsOpen(true)
    } else {
      setIsLoginOpen(true)
    }
  }

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
    setIsAuthenticated(true)
    setIsOpen(true)
  }

  return (
    <>
      <Button variant="outline" className="gap-2" onClick={handleNewPost}>
        <PlusCircle className="h-4 w-4" />
        New Post
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <BlogForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  )
} 