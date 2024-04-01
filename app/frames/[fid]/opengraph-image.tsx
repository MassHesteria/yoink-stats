import { ImageResponse } from "next/og";
import { generateImage } from "../generate";

export default async function Image({ params }: { params: { fid: string } }) {
  return new ImageResponse(await generateImage(parseInt(params.fid)), {
     width: 800,
     height: 420,
  });
}