/* eslint-disable react/jsx-key */
import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { Button } from "frames.js/next";
import { getHostName } from "../data";
 
const frames = createFrames({
  middleware: [farcasterHubContext(
    process.env['VERCEL_REGION'] ? {} : {
    hubHttpUrl: 'http://localhost:3010/hub'
  })],
});

const handleRequest = frames(async (ctx) => {
  const warpcastLink = 'https://warpcast.com/~/add-cast-action?url=' +
    encodeURIComponent(getHostName() + '/frames/action')

  return {
    image: (
      <div tw='flex w-full h-full bg-stone-200'>
        <div tw='flex flex-col m-auto'>
          <span>Get Yoink Stats for Users with a Cast Action</span>
          <span tw='mx-auto mt-4 p-7 border-purple-500 rounded-lg border-2 bg-purple-900 font-extrabold text-white'>🏆 #33 ⏱ 4h 32m 16s 🚩 567</span>
        </div>

      </div>
    ),
    buttons: [
      <Button action="link" target={warpcastLink}>
        Install Yoink Stats Cast Action
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;