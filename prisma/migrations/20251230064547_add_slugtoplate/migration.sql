/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Plate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Plate" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Plate_slug_key" ON "Plate"("slug");
