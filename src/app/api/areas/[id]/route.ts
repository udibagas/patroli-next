import Area from "@/models/Area";
import { revalidatePath } from "next/cache";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return Response.json({ message: "Area not found" }, { status: 404 });
    }

    await area.destroy();
    revalidatePath("/areas");
    return Response.json({ message: "Area deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
