-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "devices" JSONB NOT NULL DEFAULT '[]';
