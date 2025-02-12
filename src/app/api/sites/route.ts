import Site from "@/models/Site";
import { handleError } from "@/utils/errorHandler";
import { FindOptions, InferAttributes } from "sequelize";

export const dynamic = "force-static";

export async function GET() {
  const options: FindOptions<InferAttributes<Site, { omit: never }>> = {
    order: [["name", "ASC"]],
  };

  try {
    const data = await Site.findAll(options);
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { code, name } = await request.json();

  try {
    const data = await Site.create({ code, name });
    return Response.json(data);
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
