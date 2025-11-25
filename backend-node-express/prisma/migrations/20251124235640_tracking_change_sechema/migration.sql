/*
  Warnings:

  - The `status` column on the `OrderTracking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `actorId` to the `OrderTracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepOrder` to the `OrderTracking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TrackingStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "OrderTracking" ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "stepOrder" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TrackingStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_invoiceId_idx" ON "Order"("invoiceId");

-- CreateIndex
CREATE INDEX "Order_approvedBy_idx" ON "Order"("approvedBy");

-- CreateIndex
CREATE INDEX "OrderTracking_orderId_idx" ON "OrderTracking"("orderId");

-- CreateIndex
CREATE INDEX "OrderTracking_orderId_createdAt_idx" ON "OrderTracking"("orderId", "createdAt");

-- AddForeignKey
ALTER TABLE "OrderTracking" ADD CONSTRAINT "OrderTracking_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
