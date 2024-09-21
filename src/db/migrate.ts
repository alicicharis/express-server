import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

(async () => {
  await migrate(db, { migrationsFolder: "src/drizzle" });
  process.exit(0);
})();
