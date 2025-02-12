import InspectionTemplate from "@/models/InspectionTemplate";
import { handleError } from "@/utils/errorHandler";
import { FindOptions, InferAttributes } from "sequelize";

export const dynamic = "force-static";

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
    return Response.json(data);
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
