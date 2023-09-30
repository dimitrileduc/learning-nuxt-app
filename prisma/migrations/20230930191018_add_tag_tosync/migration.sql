/*
  Warnings:

  - Added the required column `tag` to the `VideoBySigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoBySigns" ADD COLUMN     "tag" TEXT NOT NULL;
