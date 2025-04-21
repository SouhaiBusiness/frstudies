import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { NewsletterSubscriber } from '@/lib/models'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db() // Use your database name if different from default

    // Check if email already exists
    const existingSubscriber = await db
      .collection<NewsletterSubscriber>('newsletter')
      .findOne({ email })

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Insert new subscriber
    await db.collection<NewsletterSubscriber>('newsletter').insertOne({
      email,
      createdAt: new Date(),
      verified: false,
      unsubscribed: false
    })

    return NextResponse.json(
      { message: 'Merci ! vous êtes inscrit à notre newsletter.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error saving subscriber:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}