/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getHostName } from "../data";
import { generateImage, generateLeaderboard } from "./generate";
import { IntroPage } from "./components/intro";

const handleRequest = frames(async (ctx) => {
  const timestamp = `${Date.now()}`
  const baseRoute = getHostName() + "/frames?ts=" + timestamp
  const initFid = ctx.searchParams.fid
  const leaderboard = ctx.searchParams.leaderboard
  
  if (ctx.message) {
    if (!ctx.message.isValid) {
      throw new Error('Could not validate request')
    }
  }

  let fid = ctx.message?.requesterFid;
  if (fid == undefined) {
    if (initFid == undefined) {
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
    fid = parseInt(initFid);
  }

  const shareLink = "https://warpcast.com/~/compose?embeds[]=" +
    encodeURIComponent(baseRoute + `&fid=${fid}`)

  if (leaderboard == '1') {
    return {
      image: await generateLeaderboard(fid),
      imageOptions: {
        aspectRatio: '1:1'
      },
      buttons: [
        <Button action="post" target={baseRoute + '&leaderboard=1'}>
          Refresh ↻
        </Button>,
        <Button action="post" target={baseRoute}>
          My Stats
        </Button>,
        <Button action="link" target={shareLink + '&leaderboard=1'}>
          Share
        </Button>,
        <Button action="link" target="https://warpcast.com/horsefacts.eth/0x7d161970">
          Go Yoink 🚩
        </Button>,
      ],
    }
  }

  return {
    image: await generateImage(fid),
    buttons: [
      <Button action="post" target={baseRoute}>
        Refresh ↻
      </Button>,
      <Button action="post" target={baseRoute + '&leaderboard=1'}>
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