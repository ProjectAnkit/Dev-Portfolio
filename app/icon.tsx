import { ImageResponse } from 'next/og'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          border: '2px solid #1F1F1F',
          color: '#E8E8E8',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        AT
      </div>
    ),
    {
      ...size,
    }
  )
}
