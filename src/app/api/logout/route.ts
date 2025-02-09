export function POST() {
  return Response.json(
    { message: "Logged out" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict",
      },
    }
  );
}
