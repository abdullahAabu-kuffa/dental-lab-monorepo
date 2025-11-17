-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fileId_fkey";

-- DropIndex
DROP INDEX "File_orderId_key";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "fileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
