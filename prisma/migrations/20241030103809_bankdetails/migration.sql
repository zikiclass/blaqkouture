-- CreateTable
CREATE TABLE `BankDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank` VARCHAR(191) NULL,
    `accountNumber` VARCHAR(191) NULL,
    `accountName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
