import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full justify-center items-center"
        style={{ backgroundColor: "#282828" }}
      >
        <div tw="flex py-12 px-4 p-8">
          <h2 tw="flex flex-col text-6xl tracking-tight text-left">
            <span tw="pb-5" style={{ color: "#b16286" }}>
              Do you Yoink? 🚩
            </span>
            <span tw="" style={{ color: "#8ec07c" }}>
              Check your stats!
            </span>
          </h2>
        </div>
      </div>
    ),
    {
      width: 764,
      height: 400,
    }
  );
}
