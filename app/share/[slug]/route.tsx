import { NextRequest } from "next/server";
import { deserializeFromBase64 } from "../../data";
import { GET as FrameGET } from "../../frames/route"

export async function GET(
   req: NextRequest,
   { params }: { params: { slug: string}}
) {
  const args = deserializeFromBase64(params.slug)
  if (args.f) {
    req.nextUrl.searchParams.append("fid", args.f)
  }
  if (args.l) {
    req.nextUrl.searchParams.append("leaderboard", args.l)
  }

  return FrameGET(req)
}
