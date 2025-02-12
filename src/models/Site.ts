import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class Site extends Model<InferAttributes<Site>, InferCreationAttributes<Site>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
}

Site.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "Kode sudah dipakai",
      validate: {
        notNull: { msg: "Kode harus diisi" },
        notEmpty: { msg: "Kode harus diisi" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "Nama sudah dipakai",
      validate: {
        notNull: { msg: "Nama harus diisi" },
        notEmpty: { msg: "Nama harus diisi" },
      },
    },
  },
  {
    sequelize,
    modelName: "Site",
    timestamps: false,
  }
);

export default Site;
