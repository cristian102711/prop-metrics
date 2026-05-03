import { defineConfig } from "@prisma/config";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, ".env") });

export default defineConfig({
  datasource: {
    // DIRECT_URL: port 5432 sin pgbouncer — requerido por Prisma CLI para migraciones
    url: process.env.DIRECT_URL!,
  },
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
});