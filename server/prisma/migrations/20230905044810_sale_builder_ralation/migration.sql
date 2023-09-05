/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Builder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Builder" ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT,
ALTER COLUMN "extra_phone" SET DATA TYPE TEXT,
ALTER COLUMN "region" SET DATA TYPE TEXT,
ALTER COLUMN "address" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Builder_phone_number_key" ON "Builder"("phone_number");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_builder_id_fkey" FOREIGN KEY ("builder_id") REFERENCES "Builder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
