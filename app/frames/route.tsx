/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { generateImage, generateLeaderboard } from "./generate";
import { getShareLink } from "../data";

const handleRequest = frames(async (ctx) => {
  const initFid = ctx.searchParams.fid
  const leaderboard = ctx.searchParams.leaderboard || '0'
  
  if (ctx.message) {
    if (!ctx.message.isValid) {
      throw new Error('Could not validate request')
    }
  }

  let fid = ctx.message?.requesterFid;
  if (fid == undefined) {
    if (initFid == undefined) {
      return {
        image: "/intro",
        buttons: [
          <Button action="post">
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

  if (leaderboard == '1') {
    return {
      image: await generateLeaderboard(fid),
      imageOptions: {
        aspectRatio: '1:1'
      },
      buttons: [
        <Button action="post" target="/?leaderboard=1">
          Refresh ↻
        </Button>,
        <Button action="post">
          My Stats
        </Button>,
        <Button action="link" target={getShareLink("Check out my Yoink Stats!", { f: fid, l: '1' })}>
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
      <Button action="post">
        Refresh ↻
      </Button>,
      <Button action="post" target="/?leaderboard=1">
        Leaderboard
      </Button>,
      <Button action="link" target={getShareLink("Check out my Yoink Stats!", { f: fid })}>
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