import InspectionTemplate from "@/models/InspectionTemplate";
import { handleError } from "@/utils/errorHandler";

export const dynamic = "force-static";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const { result } = await request.json();

  try {
    const template = await InspectionTemplate.findByPk(id);
    if (!template) {
      return Response.json(
        { message: "InspectionTemplate not found" },
        { status: 404 }
      );
    }

    await template.update({ result });
    await template.reload();
    return Response.json(template);
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
    const template = await InspectionTemplate.findByPk(id);
    if (!template) {
      return Response.json(
        { message: "InspectionTemplate not found" },
        { status: 404 }
      );
    }

    await template.destroy();
    return Response.json({ message: "InspectionTemplate deleted" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
