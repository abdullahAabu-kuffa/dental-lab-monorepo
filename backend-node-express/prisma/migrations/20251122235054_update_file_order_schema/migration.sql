/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `storageStatus` on the `File` table. All the data in the column will be lost.
  - Added the required column `b2FileId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b2FileName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileName",
DROP COLUMN "storageStatus",
ADD COLUMN     "b2FileId" TEXT NOT NULL,
ADD COLUMN     "b2FileName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "StorageStatus";
