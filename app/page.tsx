import { fetchMetadata } from "frames.js/next";
 
export async function generateMetadata() {
  return {
    title: "My Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/frames",
        process.env.NEXT_PUBLIC_VERCEL_ENV
          ? "https://yoink-stats.vercel.app"
          : "http://localhost:3001"
      )
    ),
  };
}
 
export default function Page() {
  return <span>My existing page</span>;
}