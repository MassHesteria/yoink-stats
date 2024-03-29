import { fetchMetadata } from "frames.js/next";
import { getHostName } from "./data";
 
export async function generateMetadata() {
  return {
    title: "My Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL("/frames", getHostName())
    ),
  };
}
 
export default function Page() {
  return <span>My existing page</span>;
}