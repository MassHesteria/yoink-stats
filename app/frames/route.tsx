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

const IntroPage = () => {
  return (
    <div tw="flex">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-center p-8">
        <h2 tw="flex flex-col text-8xl font-bold tracking-tight text-left">
          <span tw="font-bold pb-5" style={{color: "#b16286"}}>Do you Yoink? 🚩</span>
          <span tw="font-bold" style={{color: "#8ec07c"}}>Check your stats!</span>
        </h2>
        {/*<div tw="mt-8 flex md:mt-0">
          <div tw="flex rounded-md shadow">
            <a
              href="#"
              tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
            >
              Get started
            </a>
          </div>
          <div tw="ml-3 flex rounded-md shadow">
            <a
              href="#"
              tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
            >
              Learn more
            </a>
          </div>
        </div>*/}
      </div>
    </div>
  )
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
      <div tw="w-full h-full text-white justify-center items-center flex flex-col"
           style={{backgroundColor: "#282828" }}>
        <IntroPage />
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