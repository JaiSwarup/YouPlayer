import { migrate } from "drizzle-orm/postgres-js/migrator";
import { openConnection } from "./sdb";

async function main() {
  const { sdb, closeConnection } = await openConnection();
  await migrate(sdb, { migrationsFolder: "drizzle" });
  await closeConnection();
}

main();
