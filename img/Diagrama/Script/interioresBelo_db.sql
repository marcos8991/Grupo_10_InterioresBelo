-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema interioresbelo_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema interioresbelo_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `interioresbelo_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `interioresbelo_db` ;

-- -----------------------------------------------------
-- Table `interioresbelo_db`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`rols` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `rolId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `rolId` (`rolId` ASC) VISIBLE,
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`rolId`)
    REFERENCES `interioresbelo_db`.`rols` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `interioresbelo_db`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`sections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(600) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` VARCHAR(255) NOT NULL,
  `sectionId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sectionId` (`sectionId` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`sectionId`)
    REFERENCES `interioresbelo_db`.`sections` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT NULL DEFAULT NULL,
  `productId` INT NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `orderId` (`orderId` ASC) VISIBLE,
  INDEX `productId` (`productId` ASC) VISIBLE,
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `carts_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `interioresbelo_db`.`orders` (`id`),
  CONSTRAINT `carts_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `interioresbelo_db`.`products` (`id`),
  CONSTRAINT `carts_ibfk_3`
    FOREIGN KEY (`userId`)
    REFERENCES `interioresbelo_db`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file` VARCHAR(255) NULL DEFAULT NULL,
  `productId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`productId`)
    REFERENCES `interioresbelo_db`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `interioresbelo_db`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `interioresbelo_db`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
