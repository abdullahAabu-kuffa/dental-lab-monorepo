-- CreateIndex
CREATE INDEX "Invoice_createdAt_idx" ON "Invoice"("createdAt");

-- CreateIndex
CREATE INDEX "Invoice_status_createdAt_idx" ON "Invoice"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "OrderTracking_process_idx" ON "OrderTracking"("process");

-- CreateIndex
CREATE INDEX "OrderTracking_status_idx" ON "OrderTracking"("status");

-- CreateIndex
CREATE INDEX "OrderTracking_createdAt_idx" ON "OrderTracking"("createdAt");

-- CreateIndex
CREATE INDEX "OrderTracking_process_status_idx" ON "OrderTracking"("process", "status");
