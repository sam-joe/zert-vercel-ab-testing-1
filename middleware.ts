import { precompute } from "flags/next";
import { type NextRequest, NextResponse } from "next/server";
import { precomputeFlags } from "./flags";

const COOKIE_NAME = "ab-visitor-id";
const HEADER_NAME = "x-ab-visitor-id";

function getOrGenerateVisitorId(request: NextRequest): {
  visitorId: string;
  isNew: boolean;
} {
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing) return { visitorId: existing, isNew: false };
  const visitorId = crypto.randomUUID();
  return { visitorId, isNew: true };
}

export const config = {
  matcher: ["/", "/about"],
};

export async function middleware(request: NextRequest) {
  const { visitorId, isNew } = getOrGenerateVisitorId(request);

  const code = await precompute(precomputeFlags);

  const pathname = request.nextUrl.pathname;
  const path = pathname === "/" ? "" : pathname;
  const url = new URL(`/${code}${path}${request.nextUrl.search}`, request.url);

  const response = NextResponse.rewrite(url);

  if (isNew) {
    response.cookies.set(COOKIE_NAME, visitorId, { path: "/" });
    response.headers.set(HEADER_NAME, visitorId);
  }

  return response;
}
