/*
  Warnings:

  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banned` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "banned" SET NOT NULL;
