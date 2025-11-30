import { prisma } from "../lib/prisma";

/**
 * Perform vector similarity search using raw SQL
 * Uses pgvector's cosine distance operator (<->)
 * with HNSW index for O(log n) performance
 */
export async function findSimilarByVector(
  embedding: number[],
  limit: number = 3,
  threshold?: number
): Promise<
  Array<{
    id: number;
    title: string;
    category: string;
    content: string;
    metadata: Record<string, unknown> | null;
    distance: number;
  }>
> {
  try {
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error("Embedding must be a non-empty array");
    }

    // Convert embedding to pgvector format: "[0.1, 0.2, ...]"
    const vectorString: string = `[${embedding.join(",")}]`;

    // Raw SQL query using pgvector's cosine distance operator
    // The <-> operator returns distance (lower is more similar)
    const query: string = `
      SELECT 
        id,
        title,
        category,
        content,
        metadata,
        embedding <-> $1::vector AS distance
      FROM "KnowledgeBase"
      WHERE embedding IS NOT NULL
      ${threshold ? `AND (embedding <-> $1::vector) < $${threshold}` : ""}
      ORDER BY embedding <-> $1::vector
      LIMIT $2
    `;

    const results = await prisma.$queryRawUnsafe(
      query,
      vectorString,
      limit
    );

    // Type the results properly
    const typedResults = results as Array<{
      id: number;
      title: string;
      category: string;
      content: string;
      metadata: string | null;
      distance: number;
    }>;

    // Parse metadata back to object
    return typedResults.map((item) => ({
      ...item,
      metadata: item.metadata ? JSON.parse(item.metadata) : null,
    }));
  } catch (error) {
    console.error("Vector search error:", error);
    throw error;
  }
}

/**
 * Alternative: Using cosine similarity (1 is identical, 0 is orthogonal, -1 is opposite)
 * The <=> operator returns similarity (higher is more similar)
 * Can be useful for filtering by minimum similarity threshold
 */
export async function findSimilarByVectorSimilarity(
  embedding: number[],
  minSimilarity: number = 0.5, // Minimum cosine similarity (0-1)
  limit: number = 3
): Promise<
  Array<{
    id: number;
    title: string;
    category: string;
    content: string;
    metadata: Record<string, unknown> | null;
    similarity: number;
  }>
> {
  try {
    const vectorString: string = `[${embedding.join(",")}]`;

    // Using the similarity operator (<=>)
    const query: string = `
      SELECT 
        id,
        title,
        category,
        content,
        metadata,
        (embedding <=> $1::vector) AS similarity
      FROM "KnowledgeBase"
      WHERE embedding IS NOT NULL
      AND (embedding <=> $1::vector) >= $2
      ORDER BY embedding <=> $1::vector DESC
      LIMIT $3
    `;

    const results = await prisma.$queryRawUnsafe<
      Array<{
        id: number;
        title: string;
        category: string;
        content: string;
        metadata: string | null;
        similarity: number;
      }>
    >(query, vectorString, minSimilarity, limit);

    return results.map((item) => ({
      ...item,
      metadata: item.metadata ? JSON.parse(item.metadata) : null,
    }));
  } catch (error) {
    console.error("Vector similarity search error:", error);
    throw error;
  }
}

/**
 * Get vector search statistics (for monitoring)
 */
export async function getVectorIndexStats(): Promise<{
  totalItems: number;
  itemsWithEmbeddings: number;
  indexSize: string;
}> {
  try {
    const stats = await prisma.$queryRawUnsafe<
      Array<{
        total: number;
        with_embeddings: number;
        index_size: string;
      }>
    >(`
      SELECT 
        COUNT(*) as total,
        COUNT(embedding) as with_embeddings,
        pg_size_pretty(pg_relation_size('KnowledgeBase_embedding_idx')) as index_size
      FROM "KnowledgeBase";
    `);

    return {
      totalItems: stats[0]?.total || 0,
      itemsWithEmbeddings: stats[0]?.with_embeddings || 0,
      indexSize: stats[0]?.index_size || "0 bytes",
    };
  } catch (error) {
    console.error("Get stats error:", error);
    throw error;
  }
}
