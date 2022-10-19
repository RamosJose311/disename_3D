-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_disename-3d
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_disename-3d
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_disename-3d` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_disename-3d` ;

-- -----------------------------------------------------
-- Table `db_disename-3d`.`genders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`genders` (
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
-- Table `db_disename-3d`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` TINYINT(1) NOT NULL,
  `dateBirth` DATETIME NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `province` VARCHAR(255) NOT NULL,
  `contry` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `genderId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `genderId` (`genderId` ASC) VISIBLE,
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`genderId`)
    REFERENCES `db_disename-3d`.`genders` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_disename-3d`.`avatars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`avatars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `avatar` VARCHAR(255) NOT NULL,
  `userId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `avatars_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `db_disename-3d`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_disename-3d`.`materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`materials` (
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
-- Table `db_disename-3d`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`categories` (
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
-- Table `db_disename-3d`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `discount` INT NULL DEFAULT '0',
  `height` DECIMAL(10,0) NOT NULL,
  `time` INT NOT NULL,
  `description` TEXT NOT NULL,
  `materialId` INT NOT NULL,
  `view` VARCHAR(255) NOT NULL,
  `categoryId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `materialId` (`materialId` ASC) VISIBLE,
  INDEX `categoryId` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`materialId`)
    REFERENCES `db_disename-3d`.`materials` (`id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`categoryId`)
    REFERENCES `db_disename-3d`.`categories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_disename-3d`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT(1) NOT NULL,
  `userId` INT NOT NULL,
  `productId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `carts_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `db_disename-3d`.`users` (`id`),
  CONSTRAINT `carts_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `db_disename-3d`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_disename-3d`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_disename-3d`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `images` VARCHAR(255) NULL DEFAULT NULL,
  `productsId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deletedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `productsId` (`productsId` ASC) VISIBLE,
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`productsId`)
    REFERENCES `db_disename-3d`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
