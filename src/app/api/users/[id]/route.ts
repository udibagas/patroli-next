import User from "@/models/User";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const { name, password, role, SiteId } = await request.json();

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    await user.update({ name, password, role, SiteId });
    await user.reload();
    return Response.json(user);
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    await user.destroy();
    return Response.json({ message: "User deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}
