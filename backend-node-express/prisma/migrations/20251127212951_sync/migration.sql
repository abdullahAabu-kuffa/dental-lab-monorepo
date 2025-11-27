/*
  Warnings:

  - Made the column `embedding` on table `KnowledgeBaseEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "KnowledgeBaseEntry_embedding_ivfflat_idx";

-- AlterTable
ALTER TABLE "KnowledgeBaseEntry" ALTER COLUMN "embedding" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
