import { fetchMetadata } from "frames.js/next";
import { getHostName } from "./data";
 
export async function generateMetadata() {
  const metaData = await fetchMetadata(new URL("/frames", getHostName()));
  return {
    title: "Yoink Stats",
    description: "Check your stats on Yoink",
    metadataBase: new URL(getHostName()),
    // provide a full URL to your /frames endpoint
    other: metaData,
    openGraph: {
      title: "Yoink Stats",
      images: [metaData["fc:frame:image"]],
    }
  };
}
 
export default function Page() {
  return <span>Frame to check your stats on Yoink 🚩</span>;
}