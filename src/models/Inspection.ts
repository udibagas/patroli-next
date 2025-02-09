import {
  CreationOptional,
  DataTypes,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";
import Shift from "./Shift";

type ReportProps = {
  SiteId: number;
  shift: string;
  reportDate: Date;
};

class Inspection extends Model<
  InferAttributes<Inspection>,
  InferCreationAttributes<Inspection>
> {
  declare id: CreationOptional<number>;
  declare UserId: number;
  declare shift: string;
  declare reportDate: Date;
  declare StationId: number;
  declare SiteId: number;
  declare result: string;

  static report({ SiteId, shift, reportDate }: ReportProps) {
    const options: FindOptions<InferAttributes<Inspection, { omit: never }>> = {
      where: { shift, reportDate },
      order: [["createdAt", "asc"]],
      include: [
        {
          model: sequelize.models.User,
          attributes: ["name"],
        },
        {
          model: sequelize.models.Station,
          attributes: ["name", "code"],
          include: [
            {
              model: sequelize.models.Area,
              attributes: ["name"],
            },
          ],
        },
        {
          model: sequelize.models.InspectionImage,
          attributes: ["path"],
        },
      ],
    };

    if (SiteId) {
      options.where = options.where || {};
      options.where = { ...options.where, SiteId };
    }

    return this.findAll(options);
  }
}

Inspection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User harus diisi" },
        notEmpty: { msg: "User harus diisi" },
      },
    },
    shift: {
      type: DataTypes.STRING,
    },
    reportDate: {
      type: DataTypes.DATEONLY,
    },
    StationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Lokasi harus diisi" },
        notEmpty: { msg: "Lokasi harus diisi" },
      },
    },
    SiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Site harus diisi" },
        notEmpty: { msg: "Site harus diisi" },
      },
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Keterangan harus diisi" },
        notEmpty: { msg: "Keterangan harus diisi" },
      },
    },
  },
  {
    sequelize,
    modelName: "Inspection",
  }
);

Inspection.belongsTo(sequelize.models.User);
Inspection.belongsTo(sequelize.models.Station);
Inspection.hasMany(sequelize.models.InspectionImage);
Inspection.belongsTo(sequelize.models.Site);

Inspection.beforeCreate(async (instance) => {
  const shift = await Shift.getCurrentShift();
  instance.shift = shift?.name || "-";
  // ini masih belum sesuai
  instance.reportDate = shift?.nextDay
    ? new Date(new Date().setDate(new Date().getDate() - 1))
    : new Date();
});

export default Inspection;
