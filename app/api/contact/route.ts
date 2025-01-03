import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email } = await request.json()
  
  // Here you would typically save the contact information to a database
  // For this example, we'll just log it
  console.log(`New contact: ${name} (${email})`)

  // In a real application, you'd want to handle errors and validate input

  return NextResponse.json({ message: 'Contact saved successfully' })
}

