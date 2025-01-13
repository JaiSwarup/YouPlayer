import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "./config";
import { schema } from "./schema";

const client = postgres(config.DB_URL, {prepare : false, ssl: { rejectUnauthorized: false },})

export const db = drizzle(client, { schema, casing: "snake_case" });
