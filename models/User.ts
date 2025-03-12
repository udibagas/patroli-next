import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/utils/sequelize";
import { hashSync } from "bcrypt";
// import Site from "@/models/Site";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare role: "admin" | "user";
  declare password?: string;
  declare SiteId: number;

  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: "Nama sudah dipakai",
      allowNull: false,
      validate: {
        notNull: { msg: "Nama harus diisi" },
        notEmpty: { msg: "Nama harus diisi" },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        hasPassword(value: string | undefined) {
          if (!this.id && !value) {
            throw new Error("Password harus diisi");
          }
        },
      },
    },
    role: DataTypes.STRING,
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
    modelName: "User",
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

// User.belongsTo(Site);

User.beforeSave((instance) => {
  if (instance.password) {
    instance.password = hashSync(instance.password, 10);
  }
});

export default User;
