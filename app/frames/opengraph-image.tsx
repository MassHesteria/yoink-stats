import { ImageResponse } from "next/og";
import { generateImage } from "./generate";

export default async function Image() {
  return new ImageResponse(await generateImage(null, null), {
     width: 800,
     height: 420,
  });
}