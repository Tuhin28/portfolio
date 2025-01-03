"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

export function WordPressSync() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    lastSyncedAt: string
    syncStatus: string
    errorMessage?: string
  } | null>(null)

  const handleSync = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/wordpress/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wpUrl: 'https://karmaaipod.wordpress.com'
        })
      })

      const data = await response.json()
      setStatus(data.status)
    } catch (error) {
      console.error('Sync error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        onClick={handleSync}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Sync WordPress Posts
      </Button>

      {status && (
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            {status.syncStatus === 'success' ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                Success
              </span>
            ) : status.syncStatus === 'failed' ? (
              <span className="flex items-center gap-1 text-red-600">
                <XCircle className="h-4 w-4" />
                Failed
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                In Progress
              </span>
            )}
          </div>
          <div>
            Last synced: {new Date(status.lastSyncedAt).toLocaleString()}
          </div>
          {status.errorMessage && (
            <div className="text-red-600">{status.errorMessage}</div>
          )}
        </div>
      )}
    </div>
  )
} 