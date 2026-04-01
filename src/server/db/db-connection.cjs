const { URL } = require("url");
require("dotenv").config();

function parseBool(value, defaultValue) {
  if (value === undefined || value === null || value === "") return defaultValue;
  return value === "true" || value === "1" || value === "yes";
}

function sslDialectOptions() {
  return {
    ssl: {
      require: true,
      rejectUnauthorized: parseBool(process.env.DB_SSL_REJECT_UNAUTHORIZED, false),
    },
  };
}

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  return {
    username: decodeURIComponent(url.username || ""),
    password: decodeURIComponent(url.password || ""),
    database: url.pathname.replace(/^\//, ""),
    host: url.hostname,
    port: url.port || "5432",
    dialect: "postgres",
    dialectOptions: sslDialectOptions(),
  };
}

function isNextProductionBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function validateProductionDiscrete() {
  if (isNextProductionBuild()) return;
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.DATABASE_URL) return;
  const pwd = process.env.DB_PASSWORD;
  if (pwd === undefined || pwd === "") {
    throw new Error(
      "Em produção defina DATABASE_URL ou DB_PASSWORD (conexão sem senha explícita não é permitida)."
    );
  }
}

function loadDiscreteConfig() {
  validateProductionDiscrete();

  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "5432";
  const database = process.env.DB_NAME || "apaeagenda";
  const username = process.env.DB_USER || "postgres";
  const password = process.env.DB_PASSWORD ?? "";

  const useSsl = parseBool(process.env.DB_SSL, false);
  const dialectOptions = useSsl ? sslDialectOptions() : undefined;

  return {
    username,
    password,
    database,
    host,
    port,
    dialect: "postgres",
    dialectOptions,
  };
}

function loadConfig() {
  if (process.env.DATABASE_URL) {
    return parseDatabaseUrl(process.env.DATABASE_URL);
  }
  return loadDiscreteConfig();
}

/**
 * Config no formato esperado pelo sequelize-cli (migrations/seeders).
 */
function getSequelizeCliConfig() {
  return loadConfig();
}

/**
 * Instância Sequelize alinhada à mesma lógica de config.js.
 */
function buildSequelize(Sequelize) {
  const logging = process.env.NODE_ENV === "development" ? console.log : false;
  const cfg = loadConfig();

  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging,
      dialectOptions: cfg.dialectOptions || sslDialectOptions(),
    });
  }

  const { host, port, database, username, password, dialect, dialectOptions } = cfg;
  return new Sequelize(database, username, password, {
    host,
    port: Number(port),
    dialect,
    logging,
    dialectOptions,
  });
}

module.exports = { getSequelizeCliConfig, buildSequelize };
