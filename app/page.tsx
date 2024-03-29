import { fetchMetadata } from "frames.js/next";
import { getHostName } from "./data";
 
export async function generateMetadata() {
  return {
    title: "Yoink Stats",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL("/frames", getHostName())
    ),
  };
}
 
export default function Page() {
  return <span>Frame to check your stats on Yoink 🚩</span>;
}