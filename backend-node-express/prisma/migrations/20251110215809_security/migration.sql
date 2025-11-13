-- CreateTable
CREATE TABLE "Security_Token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Security_Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Security_Token_token_key" ON "Security_Token"("token");

-- CreateIndex
CREATE INDEX "Security_Token_userId_idx" ON "Security_Token"("userId");

-- AddForeignKey
ALTER TABLE "Security_Token" ADD CONSTRAINT "Security_Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
