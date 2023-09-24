/*
  Warnings:

  - You are about to drop the column `branch_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[branch]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "branch_id",
ADD COLUMN     "branch" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_branch_key" ON "User"("branch");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branch_fkey" FOREIGN KEY ("branch") REFERENCES "Branch"("name") ON DELETE SET NULL ON UPDATE CASCADE;
