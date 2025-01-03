import { NextResponse } from 'next/server'
import { syncWordPressPosts, getLastSyncStatus } from '@/lib/wordpress'

export async function POST(request: Request) {
  try {
    const { wpUrl } = await request.json()
    
    if (!wpUrl) {
      return NextResponse.json(
        { error: 'WordPress URL is required' },
        { status: 400 }
      )
    }

    await syncWordPressPosts(wpUrl)
    const status = await getLastSyncStatus()

    return NextResponse.json({ status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sync WordPress posts' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const status = await getLastSyncStatus()
    return NextResponse.json({ status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get sync status' },
      { status: 500 }
    )
  }
} 