import User from "@/models/User";
import { NextRequest } from "next/server";

export const dynamic = "force-static";

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

    const token = await user.generateToken();
    return Response.json(
      { token, user },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
            60 * 60 * 24 * 7
          }`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}
