import Redis from "ioredis";
import { SimilarDocument } from "../types/rag.types";
import { prisma } from "../lib/prisma";
import type { FeatureExtractionPipeline } from "@xenova/transformers";
import { getHFClient, MODEL_ID } from "./aiClient";

const redis: Redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

const SIMILARITY_THRESHOLD = 0.4;

let embeddingPipelinePromise: Promise<FeatureExtractionPipeline> | null = null;
async function getEmbeddingPipeline() {
  if (!embeddingPipelinePromise) {
    const { pipeline } = await import("@xenova/transformers");
    embeddingPipelinePromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embeddingPipelinePromise;
}

console.log("🔧 RAG Service initialized with Postgres pgvector");

function isGreetingOrSmallTalk(rawQuestion: string): boolean {
  const q = rawQuestion.trim().toLowerCase();

  const patterns = [
    /^hi\b/,
    /^hello\b/,
    /^hey\b/,
    /^yo\b/,
    /^hi there\b/,
    /^hello there\b/,
    /^good (morning|afternoon|evening)\b/,
    /^what'?s up\b/,
    /^how are you\b/,
    /^thank you\b/,
    /^thanks\b/,
  ];

  return patterns.some((re) => re.test(q));
}

function buildGreetingAnswer(): string {
  return (
    "Hi! I’m your dental lab assistant. " +
    "You can ask me about things like zirconia crowns, composite fillings, implants, " +
    "or procedures such as crown preparation or implant placement that are stored in the lab’s knowledge base."
  );
}

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
    // const { pipeline } = await import("@xenova/transformers");

    // Model downloads on first run (~100MB), cached afterwards
    // const extractor = await pipeline(
    //   "feature-extraction",
    //   "Xenova/all-MiniLM-L6-v2"
    // );
    const extractor = await getEmbeddingPipeline();
    const output: any = await extractor(text.trim(), {
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
  const client = getHFClient();
  const prompt = `You are a helpful dental lab assistant.

You can ONLY use information from the "Knowledge Base Data" section below. 
Do NOT invent details that are not clearly supported by that data.

When you answer:
- Speak in a natural, friendly tone.
- Do NOT use phrases like "based on the provided data", "based on the information in our knowledge base", or "according to the knowledge base".
- Never start your answer with "Based on..." or "According to...".
- Start your answer directly. For example, write "A zirconia crown is an excellent option for..." instead of "Based on the data, a zirconia crown is...".
- If the information is not available in the knowledge base, say: "I don't have this information in my knowledge base. Please contact the lab owner for more details."
- You may use short paragraphs or bullet points if it makes the explanation clearer.

Knowledge Base Data:
${context}

User question:
${question}

Answer:`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `  💬 HF chatCompletion attempt ${attempt}/${retries} using ${MODEL_ID}...`
      );

      const completion = await client.chatCompletion({
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
function sanitizeAnswer(text: string): string {
  let cleaned = text.trim();

  // Remove common meta-intro phrases
  const patterns = [
    /^based on (the )?(information|data) (in|from) (our )?(knowledge base|data)[, ]*/i,
    /^based on (the )?(information|data) provided[, ]*/i,
    /^according to (the )?(knowledge base|provided data)[, ]*/i,
    /^from (the )?(knowledge base|provided data)[, ]*/i,
  ];

  for (const pattern of patterns) {
    if (pattern.test(cleaned)) {
      cleaned = cleaned.replace(pattern, "").trim();
    }
  }

  // Make sure the first letter is capitalized if it's a letter
  if (cleaned.length > 0) {
    cleaned = cleaned[0].toUpperCase() + cleaned.slice(1);
  }

  return cleaned;
}

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
    //handle greetings / small talk without RAG
    if (isGreetingOrSmallTalk(userQuestion)) {
      const answer = buildGreetingAnswer();
      return {
        answer,
        sources: [],
        cached: false,
        duration: 0,
      };
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
    const topSimilarity = similarDocs[0]?.similarity ?? 0;
    if (!similarDocs.length || topSimilarity < SIMILARITY_THRESHOLD) {
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
    const rawAnswer: string = await generateAnswer(context, userQuestion);
    const answer = sanitizeAnswer(rawAnswer);
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
    const rows = await prisma.$queryRaw<{ id: number }[]>`
  INSERT INTO "KnowledgeBaseEntry" (title, category, content, metadata, embedding, "updatedAt")
  VALUES (
    ${data.title},
    ${data.category},
    ${data.content},
    ${JSON.stringify(data.metadata || {})}::jsonb,
    ${JSON.stringify(embedding)}::vector,
    NOW()
  )
  RETURNING id
`;

    if (!rows.length) {
      throw new Error("Insert failed: no id returned from Postgres");
    }

    console.log(`  ✅ Stored: ${data.title} (id=${rows[0].id})`);

    return { id: String(rows[0].id) };
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
