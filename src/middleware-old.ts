import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { jwtVerify } from "jose";

export interface ExtendedRequest extends NextRequest {
  user?: User;
}

export async function middleware(request: ExtendedRequest) {
  console.log(request.url.match(/\/((?!api).*)/));

  const cookieToken = request.cookies.get("token")?.value;
  let token = cookieToken;

  if (!token) {
    const headerToken = request.headers.get("Authorization");
    token = headerToken?.split("Bearer ")[1];
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    const { id } = payload as { id: number };
    // const user = await User.findByPk(id);

    // if (!user) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    // request.user = user;
    return NextResponse.next();
  } catch (error) {
    console.log((error as Error).message);

    if (request.url.startsWith("/api")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // matcher: ["/api/((?!login).*)", "/((?!login).*)"],
  matcher: ["/((?!login|api/login|_next/static|_next/image|.*\\.png$).*)"],
};
