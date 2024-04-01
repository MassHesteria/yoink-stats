import { ImageResponse } from "next/og";
import { generateImage } from "../generate";

export default async function Image({ params }: { params: { fid: string } }) {
  const temp = await generateImage(parseInt(params.fid), null);
  return new ImageResponse(temp.image, { width: 800, height: 420 });
}