import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

(async () => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "src/drizzle" });
  console.log("Migrated");
  process.exit(0);
})();
