-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Disename3D
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Disename3D
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Disename3D` DEFAULT CHARACTER SET utf8 ;
USE `Disename3D` ;

-- -----------------------------------------------------
-- Table `Disename3D`.`materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`materials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL NOT NULL,
  `discount` INT NULL DEFAULT 0,
  `height` DECIMAL NOT NULL,
  `time` INT NOT NULL,
  `description` TEXT NOT NULL,
  `material_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_materials_idx` (`material_id` ASC) VISIBLE,
  INDEX `fk_products_categories_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_materials`
    FOREIGN KEY (`material_id`)
    REFERENCES `Disename3D`.`materials` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `Disename3D`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`images_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`images_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `images` VARCHAR(45) NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_images_products_products_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_images_products_products`
    FOREIGN KEY (`products_id`)
    REFERENCES `Disename3D`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `firts_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` TINYINT NOT NULL DEFAULT 0,
  `date_birth` DATE NOT NULL,
  `adress` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `province` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `genre_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`avatars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`avatars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `avatar` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_avatars_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_avatars_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `Disename3D`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Disename3D`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disename3D`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `status` TINYINT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_carts_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_carts_products_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_carts_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `Disename3D`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `Disename3D`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
