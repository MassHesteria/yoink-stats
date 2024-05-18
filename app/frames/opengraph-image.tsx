import { ImageResponse } from "next/og";
import { IntroPage } from "./components/intro";

export default async function Image() {
  return new ImageResponse(<IntroPage />, {
     width: 800,
     height: 420,
  });
}