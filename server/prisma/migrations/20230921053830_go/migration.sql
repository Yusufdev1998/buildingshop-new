/*
  Warnings:

  - You are about to drop the column `branch_id` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "branch_id",
ADD COLUMN     "branch" TEXT;
