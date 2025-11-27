import axios from "axios";
import Redis from "ioredis";
import { prisma } from "../lib/prisma";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
const HF_EMBEDDING_API = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";
const HF_LLM_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

/**
 * Generate embedding for text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await axios.post(
      HF_EMBEDDING_API,
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        timeout: 10000,
      }
    );

    // HF returns nested array, flatten it
    return response.data[0] || [];
  } catch (error) {
    console.error("Embedding error:", error);
    throw new Error("Failed to generate embedding");
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Find similar materials using embeddings
 */
async function findSimilarMaterials(questionEmbedding: number[], limit: number = 3) {
  try {
    // Get all materials with embeddings
    const allMaterials = await prisma.labMaterial.findMany();

    // Calculate similarity for each material
    const similarities = allMaterials.map((material) => {
      const embedding = JSON.parse(material.embedding) as number[];
      const similarity = cosineSimilarity(questionEmbedding, embedding);
      return { ...material, similarity };
    });

    // Sort by similarity and return top N
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  } catch (error) {
    console.error("Find similar materials error:", error);
    throw error;
  }
}

/**
 * Generate answer using HuggingFace LLM
 */
async function generateAnswer(context: string, question: string): Promise<string> {
  try {
    const prompt = `You are a helpful dental lab assistant. Use ONLY the provided materials data to answer the question.

Lab Materials Data:
${context}

Question: ${question}

Answer based ONLY on the provided data. If the information is not available, say "This information is not available in our materials database."`;

    const response = await axios.post(
      HF_LLM_API,
      { inputs: prompt, parameters: { max_length: 500 } },
      {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        timeout: 30000,
      }
    );

    return response.data[0]?.generated_text || "No answer generated";
  } catch (error) {
    console.error("LLM error:", error);
    throw new Error("Failed to generate answer");
  }
}

/**
 * Main RAG Query with caching
 */
export async function ragQuery(userQuestion: string): Promise<string> {
  try {
    // 1. Check Redis cache first
    const cacheKey = `rag:${userQuestion.toLowerCase().slice(0, 100)}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("✅ Cache HIT");
      return cached;
    }

    console.log("🔄 Cache MISS - generating new answer");

    // 2. Generate embedding for question
    const questionEmbedding = await generateEmbedding(userQuestion);

    // 3. Find similar materials
    const similarMaterials = await findSimilarMaterials(questionEmbedding, 3);

    // 4. Build context from retrieved materials
    const context = similarMaterials
      .map(
        (material) =>
          `Material: ${material.name}
Category: ${material.category}
Description: ${material.description}
Specifications: ${material.specifications}
Price: $${material.price}`
      )
      .join("\n\n---\n\n");

    // 5. Generate answer
    const answer = await generateAnswer(context, userQuestion);

    // 6. Cache for 24 hours
    await redis.setex(cacheKey, 86400, answer);

    return answer;
  } catch (error) {
    console.error("RAG query error:", error);
    throw error;
  }
}

/**
 * Store material with embedding
 */
export async function storeMaterialWithEmbedding(materialData: {
  name: string;
  category: string;
  description: string;
  specifications: string;
  price: number;
  supplier?: string;
}) {
  try {
    // Combine text for embedding
    const textToEmbed = `${materialData.name}. ${materialData.description}. ${materialData.specifications}`;

    // Generate embedding
    const embedding = await generateEmbedding(textToEmbed);

    // Store in database
    const material = await prisma.labMaterial.create({
      data: {
        ...materialData,
        embedding: JSON.stringify(embedding),
      },
    });

    return material;
  } catch (error) {
    console.error("Store material error:", error);
    throw error;
  }
}

/**
 * Bulk import materials
 */
export async function bulkImportMaterials(materials: any[]) {
  try {
    const results = await Promise.all(
      materials.map((material) => storeMaterialWithEmbedding(material))
    );

    return results;
  } catch (error) {
    console.error("Bulk import error:", error);
    throw error;
  }
}
