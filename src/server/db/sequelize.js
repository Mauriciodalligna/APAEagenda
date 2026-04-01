import { Sequelize } from "sequelize";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { buildSequelize } = require("./db-connection.cjs");

export const sequelize = buildSequelize(Sequelize);

export async function verifyDatabaseConnection() {
  await sequelize.authenticate();
  return true;
}

export default sequelize;
