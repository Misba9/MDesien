import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 110,
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
