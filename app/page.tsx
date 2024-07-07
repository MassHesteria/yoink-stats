import { getHostName } from "./data";
import { GET } from "./frames/route";
import { NextRequest } from "next/server";

export async function generateMetadata() {
  if (process.env['VERCEL_URL']) {
    console.log('')
    console.log('VERCEL_URL', process.env['VERCEL_URL'])
    console.log('VERCEL_BRANCH_URL', process.env['VERCEL_BRANCH_URL'])
    console.log('VERCEL_PROJECT_PRODUCTION_URL', process.env['VERCEL_PROJECT_PRODUCTION_URL'])
    console.log('NEXT_PUBLIC_VERCEL_URL', process.env['NEXT_PUBLIC_VERCEL_URL'])
    console.log('NEXT_PUBLIC_VERCEL_BRANCH_URL', process.env['NEXT_PUBLIC_VERCEL_BRANCH_URL'])
    console.log('NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', process.env['NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL'])
    console.log('')
  }
  const framesRequest = new NextRequest(`${getHostName()}/frames`, {
    headers: { Accept: "application/frames.js+metatags" },
  });
  const metadataResponse = await GET(framesRequest);
  const metadata = await metadataResponse.json();
  return {
    title: "Yoink Stats",
    description: "Check your stats on Yoink",
    openGraph: {
      title: "Yoink Stats",
    },
    other: metadata,
  };
}
 
export default function Page() {
  return (
    <div className="pl-2 pt-2">
      <div>Frame to check your stats on Yoink 🚩</div>
      <div><a className="text-red-600 no-underline hover:underline" href="https://github.com/masshesteria/yoink-stats">Source code</a></div>
    </div>
  )
}