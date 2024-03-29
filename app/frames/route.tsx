/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
 
const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <>
        <div>🚩</div>
        <div>
          {ctx.pressedButton
            ? `I clicked ${ctx.searchParams.value}`
            : `Click some button`}
        </div>
      </>
    ),
    buttons: [
      <Button action="post" target={{ query: { value: "Yes" }, pathname: "/frames" }}>
        Check Stats
      </Button>,
      <Button action="post" target={{ query: { value: "No" }, pathname: "/frames" }}>
        Say No
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;