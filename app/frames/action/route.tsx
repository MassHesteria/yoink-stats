/* eslint-disable react/jsx-key */
import { NextRequest } from "next/server";
import { frames } from "../frames";

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
    icon: 'zap',
    description: 'Check /yoink stats for a user',
    aboutUrl: 'https://yoink-stats.vercel.app',
    action: {
      type: 'post'
    }
  }
  return Response.json(info)
}

export async function POST(req: NextRequest) {
  let fid = undefined

  console.log(JSON.stringify(req))

  return Response.json({ message: 'test' })
}

//export const POST = frames(async (ctx) => {
  //let fid = ctx.castId?.fid;
  //return Response.json({ message: 'test' })
//})