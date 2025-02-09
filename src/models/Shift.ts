import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  QueryTypes,
} from "sequelize";
import sequelize from "@/utils/sequelize";

class Shift extends Model<
  InferAttributes<Shift>,
  InferCreationAttributes<Shift>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare start: string;
  declare end: string;
  declare nextDay: boolean;

  static async getCurrentShift(): Promise<Shift | null> {
    const time = new Date()
      .toLocaleString("id-ID", { timeStyle: "short" })
      .replace(".", ":");

    const records: Shift[] = await sequelize.query(
      `SELECT "name" FROM "Shifts" WHERE ? BETWEEN "start" AND "end"`,
      {
        replacements: [time],
        type: QueryTypes.SELECT,
      }
    );

    return records.length > 0 ? records[0] : null;
  }

  static findByName(name: string) {
    return Shift.findOne({ where: { name } });
  }

  async getEarlyStart() {
    const data = await Shift.findOne({
      attributes: ["start"],
      where: { name: this.name },
      order: [["start", "ASC"]],
    });

    if (!data) return "-";
    return data.start;
  }

  async getLateEnd() {
    const data = await Shift.findOne({
      attributes: ["end"],
      where: { name: this.name },
      order: [["end", "DESC"]],
    });

    if (!data) return "-";
    return data.end;
  }
}

Shift.init(
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
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Start harus diisi" },
        notEmpty: { msg: "Start harus diisi" },
      },
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "End harus diisi" },
        notEmpty: { msg: "End harus diisi" },
      },
    },
    nextDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Shift",
    timestamps: false,
  }
);

export default Shift;
