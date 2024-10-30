/*
  Warnings:

  - Made the column `bank` on table `BankDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountNumber` on table `BankDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountName` on table `BankDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `BankDetails` MODIFY `bank` VARCHAR(191) NOT NULL,
    MODIFY `accountNumber` VARCHAR(191) NOT NULL,
    MODIFY `accountName` VARCHAR(191) NOT NULL;
