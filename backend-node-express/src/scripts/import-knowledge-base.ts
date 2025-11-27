// import csv from "csv-parser";
// import fs from "fs";
// import path from "path";
// import { bulkImportItems } from "../services/rag.service";

// /**
//  * Item structure matching Firebase storage
//  */
// interface KnowledgeBaseItem {
//   title: string;
//   category: string;
//   content: string;
//   metadata?: Record<string, any>;
// }

// async function importKnowledgeBase(): Promise<void> {
//   try {
//     // Get the CSV file path (relative to project root)
//     const csvPath = path.join(process.cwd(), "knowledge-base.csv");

//     // Check if CSV file exists
//     if (!fs.existsSync(csvPath)) {
//       console.error(`❌ CSV file not found at: ${csvPath}`);
//       console.error("Make sure knowledge-base.csv exists in the project root");
//       console.error("\nCSV format should be:");
//       console.error("title,category,content,metadata");
//       console.error('"Zirconia Crown","Crowns","Strong ceramic material...","{}"');
//       process.exit(1);
//     }

//     console.log(`📂 Reading CSV from: ${csvPath}`);

//     const items: KnowledgeBaseItem[] = [];

//     // Read and parse CSV
//     fs.createReadStream(csvPath)
//       .pipe(csv())
//       .on("data", (data: Record<string, string>) => {
//         try {
//           // Trim all string values
//           const item: KnowledgeBaseItem = {
//             title: data.title?.trim(),
//             category: data.category?.trim(),
//             content: data.content?.trim(),
//             metadata: data.metadata ? JSON.parse(data.metadata) : undefined,
//           };

//           // Validate required fields
//           if (!item.title || !item.category || !item.content) {
//             console.warn(
//               `⚠️ Skipping invalid row: missing required fields`
//             );
//             console.warn(`   Data: ${JSON.stringify(data)}`);
//             return;
//           }

//           items.push(item);
//           console.log(`✓ Parsed: "${item.title}" (${item.category})`);
//         } catch (error: unknown) {
//           const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";
//           console.warn(
//             `⚠️ Error parsing row: ${errorMessage}`
//           );
//           console.warn(`   Data: ${JSON.stringify(data)}`);
//         }
//       })
//       .on("end", async () => {
//         try {
//           if (items.length === 0) {
//             console.error("❌ No valid items found in CSV");
//             process.exit(1);
//           }

//           console.log(`\n📥 Starting bulk import of ${items.length} items to Firebase...\n`);
//           const startTime: number = Date.now();

//           // Call the Firebase bulk import
//           const results = await bulkImportItems(items);

//           const duration: number = Date.now() - startTime;

//           console.log(`\n✅ Successfully imported ${results.length} items to Firebase`);
//           console.log(`⏱️ Total time: ${duration}ms`);
//           console.log(
//             `📊 Average: ${(duration / results.length).toFixed(0)}ms per item`
//           );
//           console.log(`\n📝 Firestore Document IDs:`);
//           results.forEach((result, index) => {
//             console.log(`   [${index + 1}] ${result.id}`);
//           });
//           console.log();

//           process.exit(0);
//         } catch (error: unknown) {
//           const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";
//           console.error("❌ Import failed:", errorMessage);
//           console.error("\nMake sure:");
//           console.error("  1. Firebase is configured in .env");
//           console.error("  2. Firestore 'KnowledgeBase' collection exists");
//           console.error("  3. Internet connection is working");
//           process.exit(1);
//         }
//       })
//       .on("error", (error: Error) => {
//         console.error("❌ CSV read error:", error.message);
//         process.exit(1);
//       });
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error("❌ Fatal error:", errorMessage);
//     process.exit(1);
//   }
// }

// // Run the import
// importKnowledgeBase();


import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { bulkImportItems } from "../services/rag.service";

/**
 * Item structure for Postgres pgvector storage
 */
interface KnowledgeBaseItem {
  title: string;
  category: string;
  content: string;
  metadata?: Record<string, any>;
}

async function importKnowledgeBase(): Promise<void> {
  try {
    // Get the CSV file path (relative to project root)
    const csvPath = path.join(process.cwd(), "knowledge-base.csv");

    // Check if CSV file exists
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ CSV file not found at: ${csvPath}`);
      console.error("Make sure knowledge-base.csv exists in the project root");
      console.error("\nCSV format should be:");
      console.error("title,category,content,metadata");
      console.error(
        '"Zirconia Crown","Materials","Strong ceramic material...","{}"'
      );
      process.exit(1);
    }

    console.log(`📂 Reading CSV from: ${csvPath}`);

    const items: KnowledgeBaseItem[] = [];

    // Read and parse CSV
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data: Record<string, string>) => {
        try {
          // Trim all string values
          const item: KnowledgeBaseItem = {
            title: data.title?.trim(),
            category: data.category?.trim(),
            content: data.content?.trim(),
            metadata: data.metadata ? JSON.parse(data.metadata) : undefined,
          };

          // Validate required fields
          if (!item.title || !item.category || !item.content) {
            console.warn(`⚠️ Skipping invalid row: missing required fields`);
            console.warn(`   Data: ${JSON.stringify(data)}`);
            return;
          }

          items.push(item);
          console.log(`✓ Parsed: "${item.title}" (${item.category})`);
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.warn(`⚠️ Error parsing row: ${errorMessage}`);
          console.warn(`   Data: ${JSON.stringify(data)}`);
        }
      })
      .on("end", async () => {
        try {
          if (items.length === 0) {
            console.error("❌ No valid items found in CSV");
            process.exit(1);
          }

          console.log(
            `\n📥 Starting bulk import of ${items.length} items to Postgres pgvector...\n`
          );
          const startTime: number = Date.now();

          // Call the Postgres bulk import
          const results = await bulkImportItems(items);

          const duration: number = Date.now() - startTime;

          console.log(
            `\n✅ Successfully imported ${results.length} items to Postgres pgvector`
          );
          console.log(`⏱️ Total time: ${duration}ms`);
          console.log(
            `📊 Average: ${(duration / results.length).toFixed(0)}ms per item`
          );
          console.log(`\n📝 Database Entry IDs:`);
          results.forEach((result, index) => {
            console.log(`   [${index + 1}] ${result.id}`);
          });
          console.log();

          process.exit(0);
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error("❌ Import failed:", errorMessage);
          console.error("\nMake sure:");
          console.error("  1. DATABASE_URL is set in .env");
          console.error("  2. Postgres pgvector is enabled");
          console.error("  3. KnowledgeBaseEntry table exists");
          console.error("  4. Internet connection is working");
          process.exit(1);
        }
      })
      .on("error", (error: Error) => {
        console.error("❌ CSV read error:", error.message);
        process.exit(1);
      });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Fatal error:", errorMessage);
    process.exit(1);
  }
}

// Run the import
importKnowledgeBase();
