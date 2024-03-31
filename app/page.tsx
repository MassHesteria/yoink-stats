import { fetchMetadata } from "frames.js/next";
import { getHostName } from "./data";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props) {
  const routeUrl = new URL("/frames", getHostName())

  for (let key in searchParams) {
    let value = searchParams[key];
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(val => routeUrl.searchParams.append(key, val));
      } else {
        routeUrl.searchParams.append(key, value);
      }
    }
  }

  const metaData = await fetchMetadata(routeUrl);
  return {
    title: "Yoink Stats",
    description: "Check your stats on Yoink",
    metadataBase: new URL(getHostName()),
    openGraph: {
      title: "Yoink Stats",
      images: [routeUrl.href],
    },
    other: metaData,
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