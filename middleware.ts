import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isProductWrite =
    req.nextUrl.pathname.startsWith("/api/products") && req.method !== "GET";

  if (!isAdminRoute && !isProductWrite) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (authHeader) {
    const base64 = authHeader.split(" ")[1];
    const [user, pass] = atob(base64).split(":");
    if (user === validUser && pass === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*"],
};
