import { ImageResponse } from "next/og";

export default async function Image({ params }: { params: { seed: string } }) {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
      }}
    >
      <span>Test Image</span>
    </div>
  )
}