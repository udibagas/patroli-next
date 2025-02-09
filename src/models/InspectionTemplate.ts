import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class InspectionTemplate extends Model<
  InferAttributes<InspectionTemplate>,
  InferCreationAttributes<InspectionTemplate>
> {
  declare id: CreationOptional<number>;
  declare result: string;
}

InspectionTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Result harus diisi" },
        notEmpty: { msg: "Result harus diisi" },
      },
    },
  },
  {
    sequelize,
    modelName: "InspectionTemplate",
    timestamps: false,
  }
);

export default InspectionTemplate;
