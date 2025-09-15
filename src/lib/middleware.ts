// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Routes that require authentication
const protectedRoutes = ["/api/user-points"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only check protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // ✅ Attach decoded payload (like email) to request headers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-email", decoded.email);

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // apply middleware only to API routes
};
