import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
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
          background: '#241c16',
          color: '#f2ede4',
          fontSize: 20,
          fontFamily: 'Georgia, Times New Roman, serif',
          fontWeight: 500,
          letterSpacing: '-0.04em',
        }}
      >
        M
      </div>
    ),
    { ...size }
  )
}
