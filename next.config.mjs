import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ["sequelize", "pg", "pg-hstore", "bcrypt", "jsonwebtoken"],
  reactStrictMode: true,
};

export default nextConfig;

 
