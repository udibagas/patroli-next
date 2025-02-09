import {
  CreationOptional,
  DataTypes,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class Station extends Model<
  InferAttributes<Station>,
  InferCreationAttributes<Station>
> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
  declare SiteId: number;

  static findByName(name: string, SiteId: number) {
    const options: FindOptions<InferAttributes<Station, { omit: never }>> = {
      where: { name },
    };

    if (SiteId) {
      options.where = options.where || {};
      options.where = { ...options.where, SiteId };
    }

    return Station.findOne(options);
  }
}

Station.init(
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
        notEmpty: { msg: "Kode harus diisi" },
        notNull: { msg: "Kode harus diisi" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nama harus diisi" },
        notNull: { msg: "Nama harus diisi" },
      },
    },
    SiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Site harus diisi" },
        notNull: { msg: "Site harus diisi" },
      },
    },
  },
  {
    sequelize,
    modelName: "Station",
    timestamps: false,
  }
);

Station.hasMany(sequelize.models.Area);
Station.belongsTo(sequelize.models.Site);

export default Station;
