import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email exists
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Create storage directory if it doesn't exist
    const storageDir = path.join(process.cwd(), 'storage')
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir)
    }

    // Path to the emails file
    const filePath = path.join(storageDir, 'newsletter-emails.txt')

    // Read existing emails to prevent duplicates
    let existingEmails: string[] = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      existingEmails = fileContent
        .split('\n')
        .filter(line => line.includes('@'))
        .map(line => line.split(': ')[1]?.trim())
    }

    // Check for duplicate
    if (existingEmails.includes(email)) {
      return NextResponse.json({ error: 'This email is already subscribed' }, { status: 400 })
    }

    // Append the new email with timestamp
    const timestamp = new Date().toISOString()
    fs.appendFileSync(filePath, `${timestamp}: ${email}\n`)

    return NextResponse.json(
      { message: 'Thank you for subscribing to our newsletter!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error saving email:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}