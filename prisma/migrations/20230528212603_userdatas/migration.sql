-- CreateTable
CREATE TABLE "userData" (
    "userEmail" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "userData_userEmail_key" ON "userData"("userEmail");
