import Station from "@/models/Station";
import { handleError } from "@/utils/errorHandler";

export const dynamic = "force-static";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const { code, name } = await request.json();

  try {
    const station = await Station.findByPk(id);
    if (!station) {
      return Response.json({ message: "Station not found" }, { status: 404 });
    }

    await station.update({ code, name });
    await station.reload();
    return Response.json(station);
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
    const station = await Station.findByPk(id);
    if (!station) {
      return Response.json({ message: "Station not found" }, { status: 404 });
    }

    await station.destroy();
    return Response.json({ message: "Station deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
