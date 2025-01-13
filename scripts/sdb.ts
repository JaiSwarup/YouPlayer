import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { schema } from "@/lib/schema";

dotenv.config({ path: ".env.local" });

export async function openConnection() {
  const client = postgres(process.env.DB_URL!, {max : 1, ssl: { rejectUnauthorized: false }});
  const sdb = drizzle(client, { schema, casing: "snake_case" });
  const closeConnection = async () => await client.end();
  return {
    sdb,
    closeConnection,
  }
}