import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //console.log(">>>>>>")
  console.log(request)
  //request.headers.set('pathname', request.nextUrl.pathname);

  if (request.nextUrl.pathname == '/') {
    //console.log('rewrite')
    return NextResponse.rewrite(new URL('/', request.nextUrl));
  }
}