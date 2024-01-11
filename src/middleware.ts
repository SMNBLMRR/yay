import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse, NextRequest } from "next/server";

import { withAuth } from "next-auth/middleware";

let redis: Redis;
let ratelimit: Ratelimit;

if (process.env.UPSTASH_REDIS_REST_URL) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL ?? "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
  });

  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "3 s"),
  });
}

async function rateLimitMiddleware(
  request: NextRequest
): Promise<Response | undefined> {
  if(process.env.UPSTASH_REDIS_REST_URL){
    const ip = request.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (success) return NextResponse.next();
    return NextResponse.redirect(new URL("/blocked", request.url));
  }
}

export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname;
    if (pathName.startsWith("/api")) {
      return await rateLimitMiddleware(req);
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/today", "/api/:path*"],
};
