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

export interface User {
  rank: number;
  userId: string;
  username: string;
  yoinks: number;
  times: number;
}

export const getUsers = async () => {
  const res = await fetch("https://yoink.terminally.online/api/stats");
  const stats = await res.json();
  return Object.keys(stats.users)
    .map((userId) => {
      return {
        userId,
        username: stats.users[userId],
        yoinks: stats.userYoinks[userId] || 0,
        times: stats.userTimes[userId] || 0
      }
    })
    .sort((a, b) => b.times - a.times)
    .map((v, i) => {
      return {
        rank: i+1,
        userId: v.userId,
        username: v.username,
        yoinks: v.yoinks,
        times: v.times
      }
    })
}

export const getUser = (fid: number, users: User[]) => {
  return users.find(p => p.userId == `farcaster:${fid}`);
}

export function formatTime(seconds: number) {
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

  if (days <= 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
}
