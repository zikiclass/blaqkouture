-- CreateTable
CREATE TABLE `Product` (
    `productId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `overprice` DOUBLE NULL,
    `details` VARCHAR(191) NULL,
    `stockquantity` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `img1` VARCHAR(191) NULL,
    `img2` VARCHAR(191) NULL,
    `img3` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
