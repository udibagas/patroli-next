import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let session;

  try {
    session = req.cookies.get("session")?.value;

    if (!session) {
      const auth = req.headers.get("authorization");
      if (!auth) throw new Error("Unauthorized");

      const [scheme, token] = auth.split(" ");
      if (scheme !== "Bearer") throw new Error("Invalid scheme");
      if (!token) throw new Error("Invalid token");
      session = token;
    }

    return decryptAndResponse(session);
  } catch (error: unknown) {
    console.error((error as Error).message);

    if (pathname.startsWith("/api")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

async function decryptAndResponse(session: string | undefined) {
  const payload = await decrypt(session);
  const response = NextResponse.next();
  response.cookies.set("UserId", payload.id as string);
  return response;
}

export const config = {
  matcher: [
    "/((?!login|register|api/login|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
