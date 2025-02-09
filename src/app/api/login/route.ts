import User from "@/models/User";

export async function POST(request: Request) {
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

    const token = user.generateToken();

    return Response.json(
      { token, user },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${token}; HttpOnly` },
      }
    );
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}
