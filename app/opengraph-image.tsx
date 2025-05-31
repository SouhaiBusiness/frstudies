import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const alt = 'ETUDESFRANÇAISES - Ressources pour les étudiants de français'
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#0e2d6d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexDirection: 'column',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: '20px' }}>
          ETUDESFRANÇAISES
        </div>
        <div style={{ fontSize: 36 }}>
          Ressources pour les étudiants de français
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}