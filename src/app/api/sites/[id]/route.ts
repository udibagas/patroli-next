import Site from "@/models/Site";
import { handleError } from "@/utils/errorHandler";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const { code, name } = await request.json();

  try {
    const site = await Site.findByPk(id);
    if (!site) {
      return Response.json({ message: "Site not found" }, { status: 404 });
    }

    await site.update({ code, name });
    await site.reload();
    return Response.json(site);
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
    const area = await Site.findByPk(id);
    if (!area) {
      return Response.json({ message: "Site not found" }, { status: 404 });
    }

    await area.destroy();
    return Response.json({ message: "Site deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
