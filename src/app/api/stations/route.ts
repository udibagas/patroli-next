import Station from "@/models/Station";
import { handleError } from "@/utils/errorHandler";
import { FindOptions, InferAttributes } from "sequelize";

export async function GET() {
  const options: FindOptions<InferAttributes<Station, { omit: never }>> = {
    order: [["name", "ASC"]],
  };

  try {
    const data = await Station.findAll(options);
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { code, name, SiteId } = await request.json();

  try {
    const data = await Station.create({ code, name, SiteId });
    return Response.json(data);
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
