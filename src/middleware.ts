import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { createEdgeRouter } from "next-connect";
import { IronSessionData, getIronSession } from "iron-session";
import { sessionOptions } from "./utils/session-config";
/*
const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.use("/", async (request: NextRequest) => {
  // Store current request url in a custom header, which you can read later
  
   //  https://github.com/vercel/next.js/issues/43704
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
});

router.get("/dashboard", async (request: NextRequest) => {
  const response = NextResponse.next();
  // Check isAuthenticated
  const session = await getSessionIron(request, response);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
});
*/
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const response = NextResponse.next();
    // Check isAuthenticated
    const session = await getIronSession<IronSessionData>(
      request,
      response,
      sessionOptions
    );
    if (!session.user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    const response = NextResponse.next();
    // Check isAuthenticated
    const session = await getIronSession<IronSessionData>(
      request,
      response,
      sessionOptions
    );
    if (session.user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Store current request url in a custom header, which you can read later

  //  https://github.com/vercel/next.js/issues/43704
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
