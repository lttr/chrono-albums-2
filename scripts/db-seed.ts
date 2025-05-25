import { drizzle } from 'drizzle-orm/libsql';
import { seed } from "drizzle-seed";
import config from "../server/database/drizzle.config";
import * as schema from "../server/database/schema";

async function main() {
  const db = drizzle(`file:${config.dbCredentials.url}`);
  
  console.log("Seeding database...");
  await seed(db, schema);
  console.log("Database seeded successfully!");
}

main().catch(error => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
