// import axios, { AxiosError } from "axios";
// import Redis from "ioredis";
// import { db } from "../firebase/config"; // Your Firebase instance
// import {
//   collection,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   Timestamp,
// } from "firebase/firestore";
// import {
//   KnowledgeBaseItem,
//   SimilarDocument,
// } from "../types/rag.types";
// import dotenv from "dotenv";
// import { InferenceClient } from "@huggingface/inference";

// dotenv.config();
// const redis: Redis = new Redis(
//   process.env.REDIS_URL || "redis://localhost:6379"
// );

// const HF_TOKEN: string = process.env.HUGGINGFACE_API_KEY || "";
// const HF_LLM_API: string =
//   "https://router.huggingface.co/mistralai/Mistral-7B-Instruct-v0.1";

// if (!HF_TOKEN) {
//   throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
// }
// const hfClient = new InferenceClient(HF_TOKEN);

// console.log("🔧 RAG Service initialized with Firebase Firestore");

// /**
//  * Generate embedding locally using @xenova/transformers
//  * NO API CALLS - runs entirely in Node.js
//  * First run loads model (~3-5s), subsequent runs are fast (~100ms)
//  */
// async function generateEmbedding(text: string): Promise<number[]> {
//   try {
//     if (!text || text.trim().length === 0) {
//       throw new Error("Text cannot be empty");
//     }

//     console.log(`  📤 Generating embedding locally...`);
//     const startTime: number = Date.now();

//     // Dynamically import to avoid loading on startup
//     const { pipeline } = await import("@xenova/transformers");

//     // Model downloads on first run (~100MB), cached afterwards
//     const extractor = await pipeline(
//       "feature-extraction",
//       "Xenova/all-MiniLM-L6-v2"
//     );

//     const output = await extractor(text.trim(), {
//       pooling: "mean",
//       normalize: true,
//     });

//     const embedding: number[] = Array.from(output.data);
//     const duration: number = Date.now() - startTime;

//     console.log(
//       `  ✅ Embedding generated in ${duration}ms (${embedding.length} dimensions)`
//     );

//     return embedding;
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error(`  ❌ Embedding error: ${errorMessage}`);
//     throw error;
//   }
// }

// /**
//  * Generate answer using Hugging Face Inference Providers
//  * Model: mistralai/Mistral-7B-Instruct-v0.2:featherless-ai
//  */
// async function generateAnswer(
//   context: string,
//   question: string,
//   retries: number = 3
// ): Promise<string> {
//   const modelId = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai";

//   const prompt = `You are a helpful dental lab AI assistant. Use ONLY the provided knowledge base data to answer the question accurately.

// Knowledge Base Data:
// ${context}

// Question: ${question}

// Answer based ONLY on the provided data. If the information is not available, say "I don't have this information in my knowledge base. Please consult with the lab owner."`;

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       console.log(
//         `  💬 HF chatCompletion attempt ${attempt}/${retries} using ${modelId}...`
//       );

//       const completion = await hfClient.chatCompletion({
//         model: modelId,
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         max_tokens: 500,
//         temperature: 0.7,
//       });

//       const answer =
//         completion.choices?.[0]?.message?.content?.trim() || "";

//       if (!answer) {
//         throw new Error("Empty response from HF chatCompletion");
//       }

//       console.log("  ✅ Answer generated from HF");
//       return answer;
//     } catch (err) {
//       const error = err as any;
//       const status = error?.response?.status;
//       const data = error?.response?.data;

//       console.error(
//         `  ❌ HF attempt ${attempt}/${retries} failed`,
//         status ? `status=${status}` : "",
//         data ? `body=${JSON.stringify(data)}` : "",
//         error?.message ? `msg=${error.message}` : ""
//       );

//       // Auth / quota / permission errors – don’t keep retrying
//       if (status === 400 || status === 401 || status === 402 || status === 403) {
//         throw new Error(
//           `HF error ${status}: ${JSON.stringify(data) || error?.message || "Unknown error"}`
//         );
//       }

//       if (attempt === retries) {
//         throw new Error(
//           `HF chatCompletion failed after ${retries} attempts: ${
//             error?.message || "Unknown error"
//           }`
//         );
//       }

//       const delayMs = Math.pow(2, attempt - 1) * 2000;
//       console.log(`  ⏳ Retrying in ${delayMs}ms...`);
//       await new Promise((r) => setTimeout(r, delayMs));
//     }
//   }

//   throw new Error("Unreachable");
// }

// /**
//  * Calculate cosine similarity between two vectors
//  * Both vectors should be normalized (unit length)
//  */
// function cosineSimilarity(a: number[], b: number[]): number {
//   if (a.length === 0 || b.length === 0) {
//     return 0;
//   }

//   let dotProduct = 0;
//   let normA = 0;
//   let normB = 0;

//   for (let i = 0; i < Math.min(a.length, b.length); i++) {
//     dotProduct += a[i] * b[i];
//     normA += a[i] * a[i];
//     normB += b[i] * b[i];
//   }

//   const denominator = Math.sqrt(normA) * Math.sqrt(normB);
//   if (denominator === 0) return 0;

//   return dotProduct / denominator;
// }

// /**
//  * Find similar documents using manual similarity search
//  * Firestore doesn't have native vector search, so we calculate on client
//  * Works great for <1000 documents with caching
//  */
// async function findSimilarDocuments(
//   embedding: number[],
//   limit: number = 3
// ): Promise<SimilarDocument[]> {
//   try {
//     console.log(`  ⏱️ Searching knowledge base in Firestore...`);
//     const startTime: number = Date.now();

//     // Get all documents from KnowledgeBase collection
//     const docsRef = collection(db, "KnowledgeBase");
//     const snapshot = await getDocs(docsRef);

//     // Calculate similarity for each document
//     const similarities = snapshot.docs
//       .map((doc) => {
//         const data = doc.data() as any;
//         const docEmbedding: number[] = data.embedding || [];

//         // Calculate cosine similarity
//         const similarity = cosineSimilarity(embedding, docEmbedding);

//         return {
//           id: doc.id,
//           title: data.title,
//           category: data.category,
//           content: data.content,
//           similarity,
//         };
//       })
//       // Sort by similarity descending (highest first)
//       .sort((a, b) => b.similarity - a.similarity)
//       // Take top N
//       .slice(0, limit);

//     const duration: number = Date.now() - startTime;
//     console.log(`  ✅ Firestore search completed in ${duration}ms`);

//     return similarities;
//   } catch (error) {
//     console.error("Firestore search error:", error);
//     throw error;
//   }
// }

// /**
//  * Main RAG Query with Redis caching
//  * 1. Check cache first (95% hit rate)
//  * 2. Generate embedding
//  * 3. Find similar documents
//  * 4. Generate answer with LLM
//  * 5. Cache for 24 hours
//  */
// export async function ragQuery(userQuestion: string): Promise<{
//   answer: string;
//   sources: SimilarDocument[];
//   cached: boolean;
//   duration: number;
// }> {
//   try {
//     if (!userQuestion || userQuestion.trim().length === 0) {
//       throw new Error("Question cannot be empty");
//     }

//     const cacheKey: string = `rag:${userQuestion
//       .toLowerCase()
//       .slice(0, 100)
//       .replace(/\s+/g, "_")}`;

//     // 1. Check cache first
//     const cached: string | null = await redis.get(cacheKey);
//     const totalStartTime: number = Date.now();

//     if (cached) {
//       const cachedData = JSON.parse(cached);
//       console.log("✅ Cache HIT (0ms)");
//       return {
//         answer: cachedData.answer,
//         sources: cachedData.sources,
//         cached: true,
//         duration: Date.now() - totalStartTime,
//       };
//     }

//     console.log("🔄 Cache MISS - generating new answer");
//     const startTime: number = Date.now();

//     // 2. Generate embedding
//     console.log("  ⏱️ Generating embedding...");
//     const questionEmbedding: number[] =
//       await generateEmbedding(userQuestion);

//     // 3. Find similar documents
//     const similarDocs = await findSimilarDocuments(questionEmbedding, 3);

//     if (similarDocs.length === 0) {
//       const noDataAnswer: string =
//         "I don't have relevant information in my knowledge base. Please contact the lab for more details.";

//       // Cache even negative results
//       await redis.setex(
//         cacheKey,
//         86400,
//         JSON.stringify({
//           answer: noDataAnswer,
//           sources: [],
//         })
//       );

//       return {
//         answer: noDataAnswer,
//         sources: [],
//         cached: false,
//         duration: Date.now() - totalStartTime,
//       };
//     }

//     // 4. Build context from similar documents
//     const context: string = similarDocs
//       .map(
//         (doc, index) =>
//           `[${index + 1}] Title: ${doc.title}
// Category: ${doc.category}
// Content: ${doc.content}
// Relevance: ${(doc.similarity * 100).toFixed(1)}%`
//       )
//       .join("\n\n---\n\n");

//     console.log("  ⏱️ Generating answer with LLM...");
//     const answer: string = await generateAnswer(context, userQuestion);

//     // 5. Cache for 24 hours
//     const cacheData = {
//       answer,
//       sources: similarDocs,
//     };

//     await redis.setex(cacheKey, 86400, JSON.stringify(cacheData));

//     const queryDuration: number = Date.now() - startTime;
//     const totalDuration: number = Date.now() - totalStartTime;

//     console.log(`✅ Answer generated in ${queryDuration}ms (total: ${totalDuration}ms)`);

//     return {
//       answer,
//       sources: similarDocs,
//       cached: false,
//       duration: totalDuration,
//     };
//   } catch (error) {
//     console.error("RAG query error:", error);
//     throw error;
//   }
// }

// /**
//  * Store new knowledge base item with embedding in Firestore
//  */
// export async function storeKnowledgeBaseItem(data: {
//   title: string;
//   category: string;
//   content: string;
//   metadata?: Record<string, any>;
// }): Promise<{ id: string }> {
//   try {
//     if (!data.title || !data.category || !data.content) {
//       throw new Error("Title, category, and content are required");
//     }

//     console.log(`  📝 Processing: ${data.title}...`);

//     // Generate embedding for the combined text
//     const textToEmbed: string = `${data.title}. ${data.category}. ${data.content}`;
//     const embedding: number[] = await generateEmbedding(textToEmbed);

//     // Add to Firestore
//     const docsRef = collection(db, "KnowledgeBase");
//     const docRef = await addDoc(docsRef, {
//       title: data.title,
//       category: data.category,
//       content: data.content,
//       metadata: data.metadata || {},
//       embedding, // Store embedding as array of numbers
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     console.log(`  ✅ Stored: ${data.title} (ID: ${docRef.id})`);

//     return { id: docRef.id };
//   } catch (error) {
//     console.error("Store knowledge base item error:", error);
//     throw error;
//   }
// }

// /**
//  * Bulk import knowledge base items
//  */
// export async function bulkImportItems(
//   items: Array<{
//     title: string;
//     category: string;
//     content: string;
//     metadata?: Record<string, any>;
//   }>
// ): Promise<Array<{ id: string }>> {
//   try {
//     if (!Array.isArray(items) || items.length === 0) {
//       throw new Error("Items must be a non-empty array");
//     }

//     console.log(`\n📥 Starting bulk import of ${items.length} items...`);

//     const results = await Promise.all(
//       items.map((item, index) => {
//         console.log(`\n[${index + 1}/${items.length}] Processing...`);
//         return storeKnowledgeBaseItem(item);
//       })
//     );

//     console.log(`\n✅ Bulk import completed: ${results.length} items stored`);

//     return results;
//   } catch (error) {
//     console.error("Bulk import error:", error);
//     throw error;
//   }
// }

// /**
//  * Get RAG statistics
//  */
// export async function getRAGStatistics(): Promise<{
//   totalItems: number;
//   cachedQueries: number;
// }> {
//   try {
//     const docsRef = collection(db, "KnowledgeBase");
//     const snapshot = await getDocs(docsRef);

//     const cacheKeys = await redis.keys("rag:*");

//     return {
//       totalItems: snapshot.size,
//       cachedQueries: cacheKeys.length,
//     };
//   } catch (error) {
//     console.error("Get statistics error:", error);
//     throw error;
//   }
// }

// /**
//  * Clear Redis cache for RAG queries
//  */
// export async function clearCache(): Promise<void> {
//   try {
//     const keys = await redis.keys("rag:*");
//     if (keys.length > 0) {
//       await redis.del(...keys);
//       console.log(`🗑️ Cleared ${keys.length} cache entries`);
//     }
//   } catch (error) {
//     console.error("Clear cache error:", error);
//     throw error;
//   }
// }

// /**
//  * Get cache statistics
//  */
// export async function getCacheStats(): Promise<{ totalEntries: number }> {
//   try {
//     const keys = await redis.keys("rag:*");
//     return { totalEntries: keys.length };
//   } catch (error) {
//     console.error("Get cache stats error:", error);
//     throw error;
//   }
// }

import Redis from "ioredis";
import { SimilarDocument } from "../types/rag.types";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
import { prisma } from "../lib/prisma";
dotenv.config();
const databaseUrl = process.env.DATABASE_URL;
const redis: Redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

const HF_TOKEN: string = process.env.HUGGINGFACE_API_KEY || "";
const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai";

if (!HF_TOKEN) {
  throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
}

const hfClient = new InferenceClient(HF_TOKEN);

console.log("🔧 RAG Service initialized with Postgres pgvector");

/**
 * Generate embedding locally using @xenova/transformers
 * NO API CALLS - runs entirely in Node.js
 * First run loads model (~3-5s), subsequent runs are fast (~100ms)
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Text cannot be empty");
    }

    console.log(`  📤 Generating embedding locally...`);
    const startTime: number = Date.now();

    // Dynamically import to avoid loading on startup
    const { pipeline } = await import("@xenova/transformers");

    // Model downloads on first run (~100MB), cached afterwards
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const output = await extractor(text.trim(), {
      pooling: "mean",
      normalize: true,
    });

    const embedding: number[] = Array.from(output.data);
    const duration: number = Date.now() - startTime;

    console.log(
      `  ✅ Embedding generated in ${duration}ms (${embedding.length} dimensions)`
    );

    return embedding;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`  ❌ Embedding error: ${errorMessage}`);
    throw error;
  }
}

/**
 * Generate answer using Hugging Face Inference Providers
 * Model: mistralai/Mistral-7B-Instruct-v0.2:featherless-ai
 */
async function generateAnswer(
  context: string,
  question: string,
  retries: number = 3
): Promise<string> {
  const prompt = `You are a helpful dental lab AI assistant. Use ONLY the provided knowledge base data to answer the question accurately.

Knowledge Base Data:
${context}

Question: ${question}

Answer based ONLY on the provided data. If the information is not available, say "I don't have this information in my knowledge base. Please consult with the lab owner."`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `  💬 HF chatCompletion attempt ${attempt}/${retries} using ${MODEL_ID}...`
      );

      const completion = await hfClient.chatCompletion({
        model: MODEL_ID,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const answer = completion.choices?.[0]?.message?.content?.trim() || "";

      if (!answer) {
        throw new Error("Empty response from HF chatCompletion");
      }

      console.log("  ✅ Answer generated from HF");
      return answer;
    } catch (err) {
      const error = err as any;
      const status = error?.response?.status;
      const data = error?.response?.data;

      console.error(
        `  ❌ HF attempt ${attempt}/${retries} failed`,
        status ? `status=${status}` : "",
        data ? `body=${JSON.stringify(data)}` : "",
        error?.message ? `msg=${error.message}` : ""
      );

      // Auth / quota / permission errors – don't keep retrying
      if (
        status === 400 ||
        status === 401 ||
        status === 402 ||
        status === 403
      ) {
        throw new Error(
          `HF error ${status}: ${JSON.stringify(data) || error?.message || "Unknown error"}`
        );
      }

      if (attempt === retries) {
        throw new Error(
          `HF chatCompletion failed after ${retries} attempts: ${
            error?.message || "Unknown error"
          }`
        );
      }

      const delayMs = Math.pow(2, attempt - 1) * 2000;
      console.log(`  ⏳ Retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  throw new Error("Unreachable");
}

/**
 * Find similar documents using Postgres pgvector
 * Uses ivfflat index for O(log n) similarity search
 */
async function findSimilarDocuments(
  embedding: number[],
  limit: number = 3
): Promise<SimilarDocument[]> {
  try {
    console.log(`  ⏱️ Searching knowledge base in Postgres pgvector...`);
    const startTime: number = Date.now();

    // Query using pgvector cosine distance operator (<=>)
    // ivfflat index automatically used for fast search
    const results = await prisma.$queryRaw<
      Array<{
        id: number;
        title: string;
        category: string;
        content: string;
        similarity: number;
      }>
    >`
      SELECT 
        id, 
        title, 
        category, 
        content,
        1 - (embedding <=> ${JSON.stringify(embedding)}::vector) AS similarity
      FROM "KnowledgeBaseEntry"
      ORDER BY embedding <=> ${JSON.stringify(embedding)}::vector
      LIMIT ${limit}
    `;

    const duration: number = Date.now() - startTime;
    console.log(
      `  ✅ Postgres pgvector search completed in ${duration}ms (${results.length} results)`
    );

    return results.map((r) => ({
      id: String(r.id),
      title: r.title,
      category: r.category,
      content: r.content,
      similarity: r.similarity,
    }));
  } catch (error) {
    console.error("Postgres pgvector search error:", error);
    throw error;
  }
}

/**
 * Main RAG Query with Redis caching
 * 1. Check cache first (95% hit rate)
 * 2. Generate embedding
 * 3. Find similar documents using pgvector (O(log n))
 * 4. Generate answer with LLM
 * 5. Cache for 24 hours
 */
export async function ragQuery(userQuestion: string): Promise<{
  answer: string;
  sources: SimilarDocument[];
  cached: boolean;
  duration: number;
}> {
  try {
    if (!userQuestion || userQuestion.trim().length === 0) {
      throw new Error("Question cannot be empty");
    }

    const cacheKey: string = `rag:${userQuestion
      .toLowerCase()
      .slice(0, 100)
      .replace(/\s+/g, "_")}`;

    // 1. Check cache first
    const cached: string | null = await redis.get(cacheKey);
    const totalStartTime: number = Date.now();

    if (cached) {
      const cachedData = JSON.parse(cached);
      console.log("✅ Cache HIT (0ms)");
      return {
        answer: cachedData.answer,
        sources: cachedData.sources,
        cached: true,
        duration: Date.now() - totalStartTime,
      };
    }

    console.log("🔄 Cache MISS - generating new answer");
    const startTime: number = Date.now();

    // 2. Generate embedding
    console.log("  ⏱️ Generating embedding...");
    const questionEmbedding: number[] = await generateEmbedding(userQuestion);

    // 3. Find similar documents using pgvector (now O(log n) with ivfflat index)
    const similarDocs = await findSimilarDocuments(questionEmbedding, 3);

    if (similarDocs.length === 0) {
      const noDataAnswer: string =
        "I don't have relevant information in my knowledge base. Please contact the lab for more details.";

      await redis.setex(
        cacheKey,
        86400,
        JSON.stringify({
          answer: noDataAnswer,
          sources: [],
        })
      );

      return {
        answer: noDataAnswer,
        sources: [],
        cached: false,
        duration: Date.now() - totalStartTime,
      };
    }

    // 4. Build context from similar documents
    const context: string = similarDocs
      .map(
        (doc, index) =>
          `[${index + 1}] Title: ${doc.title}
Category: ${doc.category}
Content: ${doc.content}
Relevance: ${(doc.similarity * 100).toFixed(1)}%`
      )
      .join("\n\n---\n\n");

    console.log("  ⏱️ Generating answer with LLM...");
    const answer: string = await generateAnswer(context, userQuestion);

    // 5. Cache for 24 hours
    const cacheData = {
      answer,
      sources: similarDocs,
    };

    await redis.setex(cacheKey, 86400, JSON.stringify(cacheData));

    const queryDuration: number = Date.now() - startTime;
    const totalDuration: number = Date.now() - totalStartTime;

    console.log(
      `✅ Answer generated in ${queryDuration}ms (total: ${totalDuration}ms)`
    );

    return {
      answer,
      sources: similarDocs,
      cached: false,
      duration: totalDuration,
    };
  } catch (error) {
    console.error("RAG query error:", error);
    throw error;
  }
}

/**
 * Store new knowledge base item with embedding in Postgres pgvector
 */
export async function storeKnowledgeBaseItem(data: {
  title: string;
  category: string;
  content: string;
  metadata?: Record<string, any>;
}): Promise<{ id: string }> {
  try {
    if (!data.title || !data.category || !data.content) {
      throw new Error("Title, category, and content are required");
    }

    console.log(`  📝 Processing: ${data.title}...`);

    // Generate embedding for the combined text
    const textToEmbed: string = `${data.title}. ${data.category}. ${data.content}`;
    const embedding: number[] = await generateEmbedding(textToEmbed);

    // Insert into Postgres with pgvector
    const result = await prisma.$executeRaw`
      INSERT INTO "KnowledgeBaseEntry" (title, category, content, metadata, embedding, "updatedAt")
      VALUES (${data.title}, ${data.category}, ${data.content}, ${JSON.stringify(
        data.metadata || {}
      )}::jsonb, ${JSON.stringify(embedding)}::vector, NOW())
      RETURNING id
    `;

    console.log(`  ✅ Stored: ${data.title}`);

    return { id: String(result) };
  } catch (error) {
    console.error("Store knowledge base item error:", error);
    throw error;
  }
}

/**
 * Bulk import knowledge base items
 */
export async function bulkImportItems(
  items: Array<{
    title: string;
    category: string;
    content: string;
    metadata?: Record<string, any>;
  }>
): Promise<Array<{ id: string }>> {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Items must be a non-empty array");
    }

    console.log(`\n📥 Starting bulk import of ${items.length} items...`);

    const results = await Promise.all(
      items.map((item, index) => {
        console.log(`\n[${index + 1}/${items.length}] Processing...`);
        return storeKnowledgeBaseItem(item);
      })
    );

    console.log(`\n✅ Bulk import completed: ${results.length} items stored`);

    return results;
  } catch (error) {
    console.error("Bulk import error:", error);
    throw error;
  }
}

/**
 * Get RAG statistics
 */
export async function getRAGStatistics(): Promise<{
  totalItems: number;
  cachedQueries: number;
}> {
  try {
    const itemCount = await prisma.knowledgeBaseEntry.count();
    const cacheKeys = await redis.keys("rag:*");

    return {
      totalItems: itemCount,
      cachedQueries: cacheKeys.length,
    };
  } catch (error) {
    console.error("Get statistics error:", error);
    throw error;
  }
}

/**
 * Clear Redis cache for RAG queries
 */
export async function clearCache(): Promise<void> {
  try {
    const keys = await redis.keys("rag:*");
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`🗑️ Cleared ${keys.length} cache entries`);
    }
  } catch (error) {
    console.error("Clear cache error:", error);
    throw error;
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{ totalEntries: number }> {
  try {
    const keys = await redis.keys("rag:*");
    return { totalEntries: keys.length };
  } catch (error) {
    console.error("Get cache stats error:", error);
    throw error;
  }
}
