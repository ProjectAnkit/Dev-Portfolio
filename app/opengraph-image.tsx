import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #131313 100%)',
          color: '#E8E8E8',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            AT
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#A0A0A0',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Ankit Thakur
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
