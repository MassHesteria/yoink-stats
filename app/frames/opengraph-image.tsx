import { ImageResponse } from "next/og";
import { generateImage } from "./route";

export default async function Image() {
  const temp = await generateImage(null, null);
  return new ImageResponse(temp.image, { width: 800, height: 420 });
}