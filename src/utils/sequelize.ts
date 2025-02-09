import { Sequelize, Dialect } from "sequelize";
import pg from "pg";
import config from "../config/config.json";

const { username, password, database, host, dialect } =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const sequelize = new Sequelize(database, username, password || "", {
  host,
  dialect: dialect as Dialect,
  logging: false,
  dialectModule: pg,
});

export default sequelize;
