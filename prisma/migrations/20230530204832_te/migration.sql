-- AlterTable
ALTER TABLE "userData" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "userData_pkey" PRIMARY KEY ("id");
