import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
 
export async function GET(_: NextRequest) {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full justify-center items-center"
        style={{ backgroundColor: "#282a36" }}
      >
        <div tw="flex">
          <span tw="w-4/5 text-3xl" style={{ color: "#f8f8f2" }}>
            Thanks for using this frame to track your Yoink Stats!
          </span>
        </div>
        <div tw="flex">
          <span tw="w-4/5 text-3xl pt-6" style={{ color: "#f8f8f2" }}>
            Unfortunately the leaderboard has been brought offline.
          </span>
        </div>
        <div tw="flex">
          <span tw="w-4/5 text-3xl pt-6" style={{ color: "#f8f8f2" }}>
            I&apos;ll probably bring this frame back if it ever gets brought online again.
          </span>
        </div>
        <div tw="flex w-full justify-end text-3xl pr-27 pt-2" style={{ color: "#ffb86c" }}>
          - mass
        </div>
      </div>
    ),
    {
      width: 764,
      height: 400,
    },
  );
}
