import { fetchMetadata } from "frames.js/next";
import { getHostName } from "./data";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props) {
  const routeUrl = new URL("/frames", getHostName());
  routeUrl.search = searchParams.toString();

  const metaData = await fetchMetadata(routeUrl);
  return {
    title: "Yoink Stats",
    description: "Check your stats on Yoink",
    metadataBase: new URL(getHostName()),
    other: metaData,
    openGraph: {
      title: "Yoink Stats",
    }
  };
}
 
export default function Page() {
  return <span>Frame to check your stats on Yoink 🚩</span>;
}