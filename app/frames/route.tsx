/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
 
const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <>
        <div>hello</div>
        <div>
          {ctx.pressedButton
            ? `I clicked ${ctx.searchParams.value}`
            : `Click some button`}
        </div>
      </>
    ),
    buttons: [
      <Button action="post" target={{ query: { value: "Yes" } }}>
        Say Yes
      </Button>,
      <Button action="post" target={{ query: { value: "No" } }}>
        Say No
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;