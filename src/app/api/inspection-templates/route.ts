import InspectionTemplate from "@/models/InspectionTemplate";
import { handleError } from "@/utils/errorHandler";
import { revalidatePath } from "next/cache";
import { FindOptions, InferAttributes } from "sequelize";

export async function GET() {
  const options: FindOptions<
    InferAttributes<InspectionTemplate, { omit: never }>
  > = {
    order: [["result", "ASC"]],
  };

  try {
    const data = await InspectionTemplate.findAll(options);
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { result } = await request.json();

  try {
    const data = await InspectionTemplate.create({ result });
    revalidatePath("/inspection-templates");
    return Response.json(data, { status: 201 });
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
