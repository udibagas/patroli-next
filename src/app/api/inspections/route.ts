import Area from "@/models/Area";
import Inspection from "@/models/Inspection";
import InspectionImage from "@/models/InspectionImage";
import Site from "@/models/Site";
import Station from "@/models/Station";
import User from "@/models/User";
import { handleError } from "@/utils/errorHandler";
import sequelize from "@/utils/sequelize";
import { NextRequest } from "next/server";
import { FindAndCountOptions, InferAttributes } from "sequelize";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") as string) || 1; // Default to page 1 if not specified
  const limit = parseInt(searchParams.get("limit") as string) || 10; // Default to 10 items per page if not specified
  const offset = (page - 1) * limit;
  // const { SiteId } = request.user;
  const SiteId = null;

  const options: Omit<
    FindAndCountOptions<InferAttributes<Inspection, { omit: never }>>,
    "group"
  > = {
    where: {},
    distinct: true,
    order: [["updatedAt", "desc"]],
    include: [
      {
        model: Site,
        attributes: ["name"],
      },
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Station,
        attributes: ["name"],
        include: [
          {
            model: Area,
            attributes: ["name"],
          },
        ],
      },
      {
        model: InspectionImage,
        attributes: ["path"],
      },
    ],
    limit: limit,
    offset: offset,
  };

  if (SiteId) {
    options.where = options.where || {};
    options.where = { ...options.where, SiteId };
  }

  try {
    const { count: total, rows } = await Inspection.findAndCountAll(options);

    return Response.json(
      {
        total,
        page,
        rows,
        from: offset + 1,
        to: offset + rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { id: UserId, SiteId } = request.user;
  const { location, result } = await request.json();

  try {
    const station = await Station.findByName(location, SiteId);

    if (!station) {
      throw new Error("Station tidak ditemukan");
    }

    const inspection = await sequelize.transaction(async (t) => {
      const inspection = await Inspection.create(
        {
          result,
          UserId,
          SiteId,
          StationId: station.id,
        },
        { transaction: t }
      );

      // if (req.files) {
      //   const images = req.files["images[]"] || [];

      //   if (images.length > 0) {
      //     for (const file of images) {
      //       const { path, originalname } = file;
      //       await InspectionImage.create(
      //         {
      //           SiteId,
      //           path,
      //           InspectionId: inspection.id,
      //           name: originalname,
      //         },
      //         { transaction: t }
      //       );
      //     }
      //   }
      // }

      return inspection;
    });

    return Response.json(inspection, { status: 201 });
  } catch (error) {
    const { status, body } = handleError(error);
    return Response.json(body, { status });
  }
}
