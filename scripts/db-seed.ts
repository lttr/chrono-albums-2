import { drizzle } from 'drizzle-orm/libsql';
import { seed } from "drizzle-seed";
import config from "../server/database/drizzle.config";
import * as schema from "../server/database/schema";

const currentYear = new Date().getFullYear();
const firstYear = 1968;

async function main() {
  const db = drizzle(`file:${config.dbCredentials.url}`);
  
  console.log("Seeding database...");
  
  await seed(db, schema).refine((f) => ({
    album: {
      count: 20,
      columns: {
        // Ensure month is always between 1-12
        month: f.int({ minValue: 1, maxValue: 12 }),
        // Ensure year is always valid
        year: f.int({ minValue: firstYear, maxValue: currentYear }),
      }
    },
    category: {
      count: 5
    },
    project: {
      count: 3
    },
    media: {
      count: 10,
      columns: {
        height: f.int({ minValue: 0, maxValue: 1000 }),
        width: f.int({ minValue: 0, maxValue: 1000 }),
      }
    }
  }));
  
  console.log("Database seeded successfully!");
}

main().catch(error => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
