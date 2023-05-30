-- AlterTable
ALTER TABLE "CreditBalance" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CreditBalance_pkey" PRIMARY KEY ("id");
