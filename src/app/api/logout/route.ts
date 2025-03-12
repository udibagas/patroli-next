import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
  request.cookies.delete("token");
  return Response.json({ message: "Logged out" }, { status: 200 });
}
