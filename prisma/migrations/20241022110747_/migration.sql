/*
  Warnings:

  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `weight`,
    ADD COLUMN `tax` VARCHAR(191) NULL;
