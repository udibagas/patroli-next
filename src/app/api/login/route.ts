import { createSession } from "@/app/lib/session";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { name, password } = await request.json();

  const options = {
    where: { name },
    attributes: { include: ["password"] },
  };

  try {
    const user = await User.findOne(options);
    if (!user) throw new Error("Username atau password salah");

    if (!user.verify(password)) {
      throw new Error("Username atau password salah");
    }

    const token = await createSession(user);
    return Response.json({ token, user: user.toJSON() });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}
