/* eslint-disable react/jsx-key */
import { NextRequest } from "next/server";
import { frames } from "../frames";

// https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fyoink-stats.vercel.app%2Fframes%2Faction

type ActionResponse = {
  name: string; // An action name up to 30 characters.
  icon: string; // An icon ID. See "Valid Icons"
  description: string; // A short description up to 80 characters.
  aboutUrl: string; // External link to an "about" page for extended description.
  action: {
    type: 'post'
  }
}

export async function GET(req: NextRequest) {
  const info: ActionResponse = {
    name: 'Yoink Stats',
    icon: 'list-ordered',
    description: 'Check /yoink stats for a user',
    aboutUrl: 'https://yoink-stats.vercel.app',
    action: {
      type: 'post'
    }
  }
  return Response.json(info)
}

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
    return { userId, username, yoinks, times };
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

function formatTimeAlt(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    days.toString().padStart(2, '0') + ':' +
    hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    remainingSeconds.toString().padStart(2, '0')
  )
}

export async function POST(req: NextRequest) {
  let message = 'Could not find Yoink Stats'

  const handleRequest = frames(async (ctx) => {
    const fid = ctx.message?.castId?.fid
    if (fid) {
      let res = await fetch("https://yoink.terminally.online/api/stats");
      const stats = await res.json();
      const leaderboard = getUsers(stats).sort((a, b) => b.times - a.times);
      const rank = leaderboard.findIndex(p => p.userId == `farcaster:${fid}`)+1;
      if (rank > 0) {
        const user = leaderboard[rank-1];
        //message = `#${rank} ⧖ ${formatTime(user.times)} ⚐ ${user.yoinks}`
        message = `🏆 #${rank} ⏱ ${formatTime(user.times)} 🚩 ${user.yoinks}`
        
        if (message.length > 30) {
          message = `🏆 #${rank} 🚩 ${user.yoinks}`
        }
        //total = leaderboard.length;
        //yoinks = user.yoinks;
        //time = user.times;
        //username = user.username;
      }
    }
    return ({
      image: <div></div>
    })
  })

  await handleRequest(req)

  return Response.json({ message })
}

//export const POST = frames(async (ctx) => {
  //let fid = ctx.castId?.fid;
  //return Response.json({ message: 'test' })
//})