-- CreateTable
CREATE TABLE `chats` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `createdAt` BIGINT NULL,
    `userId` BIGINT NULL,
    `path` VARCHAR(255) NULL,
    `sharePath` VARCHAR(255) NULL,
    `messages` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prompts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `act` VARCHAR(512) NULL,
    `prompt` TEXT NULL,
    `userId` BIGINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
