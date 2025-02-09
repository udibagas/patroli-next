import Shift from "@/models/Shift";
import { handleError } from "@/utils/errorHandler";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const { name, start, end, nextDay } = await request.json();

  try {
    const shift = await Shift.findByPk(id);
    if (!shift) {
      return Response.json({ message: "Shift not found" }, { status: 404 });
    }

    await shift.update({ name, start, end, nextDay });
    await shift.reload();
    return Response.json(shift);
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
    const shift = await Shift.findByPk(id);
    if (!shift) {
      return Response.json({ message: "Shift not found" }, { status: 404 });
    }

    await shift.destroy();
    return Response.json({ message: "Shift deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
