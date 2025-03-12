import User from "@/models/User";
import { handleError } from "@/utils/errorHandler";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/users");
    return Response.json(user);
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
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
    revalidatePath("/users");
    return Response.json({ message: "User deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
