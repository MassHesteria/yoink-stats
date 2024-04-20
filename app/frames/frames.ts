import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getHubRoute } from "../data";
 
export const frames = createFrames({
  middleware: [farcasterHubContext({
    hubHttpUrl: getHubRoute()
  })]
});