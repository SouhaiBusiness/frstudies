import { NextResponse } from "next/server"
import { put } from '@vercel/blob'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Testing upload with file:', file.name, file.size, file.type)

    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json({
      success: true,
      blob,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Test upload error:', error)
    return NextResponse.json(
      { 
        error: 'Upload failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}