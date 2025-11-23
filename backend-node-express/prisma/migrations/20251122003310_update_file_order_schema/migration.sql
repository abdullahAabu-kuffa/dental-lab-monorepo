/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `origenalName` on the `File` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "approvedAt",
DROP COLUMN "deletedAt",
DROP COLUMN "filePath",
DROP COLUMN "orderId",
DROP COLUMN "origenalName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL;
