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

function formatTime(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (remainingSeconds > 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
}

const IntroPage = () => {
  return (
    <div tw="flex">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-center p-8">
        <h2 tw="flex flex-col text-8xl font-bold tracking-tight text-left">
          <span tw="font-bold pb-5" style={{color: "#b16286"}}>Do you Yoink? 🚩</span>
          <span tw="font-bold" style={{color: "#8ec07c"}}>Check your stats!</span>
        </h2>
      </div>
    </div>
  )
}

const NonePage = ({ username }: { username: string }) => {
  const nameSizeClass = username.length > 20 ? "text-7xl" : "text-8xl";
  const displayName = username.length > 0 ? username : "(unknown)";
  return (
    <div tw="flex h-full">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <h2 tw="flex flex-col font-bold tracking-tight text-left">
          <div tw="flex flex-col">
            <div tw="flex flex-col justify-end">
              <div tw={`flex ${nameSizeClass}`}>
                <span tw="" style={{color: "#b16286"}}>{displayName}</span>
              </div>
            </div>
            <div tw="flex flex-col text-right justify-end">
              <div tw="flex text-7xl mb-1">
                <span style={{color: "#8ec07c"}}>You've never Yoinked!</span>
              </div>
            </div>
          </div>
        </h2>
      </div>
      <span tw="absolute bottom-2 right-4">/yoink 🚩</span>
    </div>
  )
}

const RankPage = ({ username, rank, total, yoinks, time }: { username: string, rank: number, total: number, yoinks: number, time: number}) => {
  const nameSizeClass = username.length > 20 ? "text-7xl" : "text-8xl";
  if (rank <= 0) {
    return <NonePage username={username} />
  }
  return (
    <div tw="flex h-full">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <h2 tw="flex flex-col font-bold tracking-tight text-left">
          <div tw="flex flex-col">
            <div tw="flex flex-col justify-end">
              <div tw={`flex ${nameSizeClass}`}>
                <span tw="" style={{color: "#b16286"}}>{username}</span>
              </div>
            </div>
            <div tw="flex flex-col text-right justify-end">
              <div tw="flex text-7xl mb-1">
                {/*<span tw="pr-4" style={{color: "#928374" }}>Rank</span>*/}
                <span tw="pr-4" style={{color: "#fabd2f"}}>{rank}</span>
                <span tw="pr-4" style={{color: "#928374"}}>/</span>
                <span tw="" style={{color: "#fabd2f"}}>{total}</span>
              </div>
            </div>
          </div>
          <div tw="flex pt-9 flex-wrap">
            <div tw="flex pr-10">
              <span tw="" style={{color: "#8ec07c"}}>Yoinks</span>
              <span tw="pl-4" style={{color: "#458588"}}>{yoinks}</span>
            </div>
            <div tw="flex">
              <span tw="" style={{color: "#8ec07c"}}>Time Held</span>
              <span tw="pl-4" style={{color: "#458588"}}>{formatTime(time)}</span>
            </div>
          </div>
          <div tw="flex">
            <span tw="" style={{color: "#8ec07c"}}>Average Time Held</span>
            <span tw="pl-4" style={{color: "#458588"}}>{formatTime(Math.floor(time/yoinks))}</span>
          </div>
        </h2>
      </div>
      <span tw="absolute bottom-2 right-4">/yoink 🚩</span>
    </div>
  )
}

const handleRequest = frames(async (ctx) => {
  const username = ctx.message?.requesterUserData?.username;

  let temp = "";
  let rank = 10000;
  let total = 10000;
  let yoinks = 12345678
  let time = 1234567890;
  if (username) {
    let res = await fetch("https://yoink.terminally.online/api/stats");
    const stats = await res.json();
    const leaderboard = getUsers(stats).sort((a, b) => b.times - a.times);
    rank = leaderboard.findIndex(p => p.username === username)+1;
    if (rank > 0) {
      total = leaderboard.length;
      const user = leaderboard[rank-1];
      yoinks = user.yoinks;
      time = user.times;
      temp = username;
    }
  }

  return {
    image: (
      <div tw="w-full h-full text-white justify-center items-center flex flex-col"
           style={{backgroundColor: "#282828" }}>
        {username ?
        <RankPage username={temp} rank={rank} total={total} yoinks={yoinks} time={time} />
        :
        <IntroPage />
        }
      </div>
    ),
    buttons: [
      <Button action="post" target={getHostName() + "/frames"}>
        Check Stats
      </Button>,
      <Button action="link" target="https://yoink.terminally.online">
        Full Leaderboard
      </Button>,
      <Button action="link" target="https://warpcast.com/horsefacts.eth/0x2dacf32d">
        Go Yoink!
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;