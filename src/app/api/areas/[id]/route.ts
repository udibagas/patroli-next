import Area from "@/models/Area";

export const dynamic = "force-static";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return Response.json({ message: "Area not found" }, { status: 404 });
    }

    await area.destroy();
    return Response.json({ message: "Area deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
