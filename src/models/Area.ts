import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class Area extends Model<InferAttributes<Area>, InferCreationAttributes<Area>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare StationId: number;
}

Area.init(
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
    StationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Station harus diisi" },
        notEmpty: { msg: "Station harus diisi" },
      },
    },
  },
  {
    sequelize,
    modelName: "Area",
    timestamps: false,
  }
);

export default Area;
