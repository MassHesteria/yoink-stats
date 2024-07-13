import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
 
export const frames = createFrames({
  basePath: '/frames',
  imagesRoute: '/',
  middleware: [farcasterHubContext(
    process.env['VERCEL_REGION'] ? {} : {
    hubHttpUrl: 'http://localhost:3010/hub'
  })],
});