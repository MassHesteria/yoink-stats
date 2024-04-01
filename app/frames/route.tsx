/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getHostName } from "../data";
import { generateImage } from "./generate";

const handleRequest = frames(async (ctx) => {
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
           encodeURIComponent(getHostName() + `?fid=${fid}`),
        text: "Share",
     };
  }

  return {
    image: await generateImage(fid),
    buttons: [
      <Button action="post" target={getHostName() + "/frames"}>
        Get Your Stats ↻
      </Button>,
      <Button action="link" target={buttonTwo.link}>
        {buttonTwo.text}
      </Button>,
      <Button action="link" target="https://warpcast.com/horsefacts.eth/0x2dacf32d">
        Go Yoink 🚩
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;