/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getHostName } from "../data";

interface Flag {
  yoinkedAt: number;
  holderId: string;
  holderName: string;
  holderPlatform: string;
}

export interface Stats {
  flag: Flag;
  yoinks: number;
  userYoinks: { [key: string]: number };
  userTimes: { [key: string]: number };
  users: { [key: string]: string };
}

const getUsers = (stats: Stats) => {
  return Object.keys(stats.users).map((userId) => {
    const username = stats.users[userId];
    const yoinks = stats.userYoinks[userId] || 0;
    const times = stats.userTimes[userId] || 0;
    const color = userId.startsWith("farcaster")
      ? "text-fc-purple"
      : userId.startsWith("lens")
        ? "text-lens-pink"
        : "text-black";
    const url = userId.startsWith("farcaster")
      ? `https://warpcast.com/${username}`
      : `https://hey.xyz/u/${username}`;
    return { userId, username, yoinks, times, color, url };
  })
}

const handleRequest = frames(async (ctx) => {
  const username = ctx.message?.requesterUserData?.username;

  let temp = "";
  if (username) {
    let res = await fetch("https://yoink.terminally.online/api/stats");
    const stats = await res.json();
    const leaderboard = getUsers(stats).sort((a, b) => b.times - a.times);
    const rank = leaderboard.findIndex(p => p.username === username)+1;
    temp = `${rank} of ${leaderboard.length}`
  }

  return {
    image: (
      <div tw="flex">
        <div>🚩</div>
        {username &&
          <div>{temp}</div>
        }
        <div>
          {ctx.pressedButton
            ? `I clicked ${ctx.searchParams.value}`
            : `Click some button`}
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={getHostName() + "/frames?value=Yes"}>
        Check Stats
      </Button>,
      <Button action="link" target="http://yoink.terminally.online">
        Leaderboard
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;