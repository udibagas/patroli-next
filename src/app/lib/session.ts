import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import User from "@/models/User";

interface SessionPayload extends Record<string, unknown> {
  id: number;
  name: string;
  role: "admin" | "user";
  expiresAt: Date;
}

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  console.log("session", session);
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({
    id: user.id,
    name: user.name,
    role: user.role,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
