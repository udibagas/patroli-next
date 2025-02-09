import Shift from "@/models/Shift";
import { handleError } from "@/utils/errorHandler";
import { FindOptions, InferAttributes } from "sequelize";

export async function GET() {
  const options: FindOptions<InferAttributes<Shift, { omit: never }>> = {
    order: [["name", "ASC"]],
  };

  try {
    const data = await Shift.findAll(options);
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name, start, end, nextDay } = await request.json();

  try {
    const data = await Shift.create({ name, start, end, nextDay });
    return Response.json(data);
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
