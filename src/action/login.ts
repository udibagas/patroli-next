import { NextRequest } from "next/server";

export function login(request: NextRequest) {
  console.log(request.body);
  return "OK";
}
