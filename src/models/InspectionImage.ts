import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class InspectionImage extends Model<
  InferAttributes<InspectionImage>,
  InferCreationAttributes<InspectionImage>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare path: string;
  declare InspectionId: number;
  declare SiteId: number;

  static deleteByPath(path: string) {
    return this.destroy({ where: { path } });
  }
}

InspectionImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Nama harus diisi" },
        notEmpty: { msg: "Nama harus diisi" },
      },
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Path harus diisi" },
        notEmpty: { msg: "Path harus diisi" },
      },
    },
    InspectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Inspeksi harus diisi" },
        notEmpty: { msg: "Inspeksi harus diisi" },
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
  },
  {
    sequelize,
    modelName: "InspectionImage",
    timestamps: false,
  }
);

InspectionImage.belongsTo(sequelize.models.Inspection);
InspectionImage.belongsTo(sequelize.models.Site);

export default InspectionImage;
