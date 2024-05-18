/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getHostName } from "../data";
import { generateImage } from "./generate";
import { IntroPage } from "./components/intro";

const handleRequest = frames(async (ctx) => {
  const timestamp = `${Date.now()}`
  const baseRoute = getHostName() + "/frames?ts=" + timestamp
  
  if (ctx.message) {
    if (!ctx.message.isValid) {
      throw new Error('Could not validate request')
    }
  }

  let fid = ctx.message?.requesterFid;
  if (fid == undefined) {
    if (ctx.searchParams?.fid == undefined) {
      return {
        image: <IntroPage />,
        buttons: [
          <Button action="post" target={baseRoute}>
            Get Your Stats ↻
          </Button>,
          <Button
            action="link"
            target="https://warpcast.com/horsefacts.eth/0x7d161970"
          >
            Go Yoink 🚩
          </Button>,
        ],
      };
    }
    fid = parseInt(ctx.searchParams.fid);
  }

  const shareLink = "https://warpcast.com/~/compose?embeds[]=" +
    encodeURIComponent(baseRoute + `&fid=${fid}`)

  return {
    image: await generateImage(fid),
    buttons: [
      <Button action="post" target={baseRoute}>
        Refresh ↻
      </Button>,
      <Button action="link" target="https://yoink.terminally.online">
        Leaderboard
      </Button>,
      <Button action="link" target={shareLink}>
        Share
      </Button>,
      <Button action="link" target="https://warpcast.com/horsefacts.eth/0x7d161970">
        Go Yoink 🚩
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;