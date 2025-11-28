CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "KnowledgeBaseEntry" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "metadata" JSONB DEFAULT '{}',
  "embedding" vector(384),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX "KnowledgeBaseEntry_category_idx" ON "KnowledgeBaseEntry" ("category");
CREATE INDEX "KnowledgeBaseEntry_createdAt_idx" ON "KnowledgeBaseEntry" ("createdAt");
CREATE INDEX "KnowledgeBaseEntry_embedding_ivfflat_idx" 
ON "KnowledgeBaseEntry" USING ivfflat ("embedding" vector_cosine_ops) WITH (lists = 100);
