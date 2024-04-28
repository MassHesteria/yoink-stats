/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getHostName } from "../data";
import { generateImage } from "./generate";

const handleRequest = frames(async (ctx) => {
  const timestamp = `${Date.now()}`
  const baseRoute = getHostName() + "/frames?ts=" + timestamp
  
  if (ctx.message) {
    if (!ctx.message.isValid) {
      throw new Error('Could not validate request')
    }
  }

  let fid = ctx.message?.requesterFid;
  let buttonTwo = {
     link: "https://yoink.terminally.online",
     text: "Full Leaderboard",
  };
  if (fid == undefined) {
     if (ctx.searchParams?.fid) {
        fid = parseInt(ctx.searchParams.fid);
     }
  } else {
     buttonTwo = {
        link:
           "https://warpcast.com/~/compose?embeds[]=" +
           encodeURIComponent(baseRoute + `&fid=${fid}`),
        text: "Share",
     };
  }

  return {
    image: await generateImage(fid),
    buttons: [
      <Button action="post" target={baseRoute}>
        Get Your Stats ↻
      </Button>,
      <Button action="link" target={buttonTwo.link}>
        {buttonTwo.text}
      </Button>,
      <Button action="link" target="https://warpcast.com/horsefacts.eth/0x7d161970">
        Go Yoink 🚩
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;