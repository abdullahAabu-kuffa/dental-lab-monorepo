-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "clientType" TEXT NOT NULL DEFAULT 'web',
ADD COLUMN     "userAgent" TEXT;
