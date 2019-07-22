-- MySQL Script generated by MySQL Workbench
-- Wed Jun 26 12:56:15 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emotion
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `emotion` ;

-- -----------------------------------------------------
-- Schema emotion
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emotion` DEFAULT CHARACTER SET utf8 ;
USE `emotion` ;

-- -----------------------------------------------------
-- Table `emotion`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emotion`.`location` (
  `idlocation` INT NOT NULL AUTO_INCREMENT,
  `startDate` DATETIME NOT NULL,
  `endDate` DATETIME NOT NULL,
  PRIMARY KEY (`idlocation`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emotion`.`offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emotion`.`offers` (
  `idoffers` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `penality` VARCHAR(45) NOT NULL,
  `nbKm` INT NOT NULL,
  `pointFidelityOffers` INT NOT NULL,
  `location_idlocation` INT NULL,
  PRIMARY KEY (`idoffers`),
  CONSTRAINT `fk_offers_location1`
    FOREIGN KEY (`location_idlocation`)
    REFERENCES `emotion`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emotion`.`vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emotion`.`vehicle` (
  `idvehicle` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `serialNumber` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `licensePlate` VARCHAR(45) NOT NULL,
  `nbKm` INT NOT NULL,
  `datePurchase` DATETIME NOT NULL,
  `price` INT NOT NULL,
  `available` INT NOT NULL,
  `lising` INT NOT NULL,
  `offers_idoffers` INT,
  PRIMARY KEY (`idvehicle`),
  CONSTRAINT `fk_vehicle_offers1`
    FOREIGN KEY (`offers_idoffers`)
    REFERENCES `emotion`.`offers` (`idoffers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emotion`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emotion`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `birthday` DATETIME NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phoneNumber` INT NOT NULL,
  `driverLicence` VARCHAR(45) NOT NULL,
  `roles` JSON NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pointFidelity` INT NULL,
  `username` VARCHAR(45) NOT NULL,
  `offers_idoffers` INT NULL,
  PRIMARY KEY (`idusers`),
  CONSTRAINT `fk_users_offers1`
    FOREIGN KEY (`offers_idoffers`)
    REFERENCES `emotion`.`offers` (`idoffers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
