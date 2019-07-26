-- MySQL Script generated by MySQL Workbench
-- jeu. 25 juil. 2019 16:04:35 CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `emotion` ;
-- -----------------------------------------------------
-- Schema emotion
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emotion` DEFAULT CHARACTER SET utf8 ;
USE `emotion` ;

-- -----------------------------------------------------
-- Table `emotion`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emotion`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `birthday` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `address` VARCHAR(45) NOT NULL,
  `phoneNumber` INT NOT NULL,
  `driverLicence` VARCHAR(45) NOT NULL,
  `roles` JSON NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pointFidelity` INT NULL,
  `username` VARCHAR(45) NOT NULL,
  `tokenResetPassword` VARCHAR(255) NULL ,
  `tokenValidateAccount` VARCHAR(255) NULL ,
  PRIMARY KEY (`idusers`))
ENGINE = INNODB;

-- -----------------------------------------------------
-- Table `emotion`.`location`

CREATE TABLE IF NOT EXISTS `emotion`.`location` (
  `idlocation` INT NOT NULL AUTO_INCREMENT,
  `startDate` DATETIME NOT NULL,
  `endDate` DATETIME NOT NULL,
  `users_idusers` INT NOT NULL,
  `cancelLocation` BOOLEAN NOT NULL DEFAULT FALSE,
  `pointFidelityUsed` INT NULL,
  `returnVehicle` BOOLEAN NOT NULL DEFAULT FALSE,
  `status` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idlocation`),
  CONSTRAINT `fk_location_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `emotion`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;

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
  `hiddenOffers` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`idoffers`),
  CONSTRAINT `fk_offers_location1`
    FOREIGN KEY (`location_idlocation`)
    REFERENCES `emotion`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;

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
  `available` BOOLEAN NOT NULL DEFAULT TRUE,
  `offers_idoffers` INT NULL,
  `typeVehicle` VARCHAR(45) NOT NULL,
  `imgVehicle` VARCHAR(45) NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`idvehicle`),
  INDEX `fk_vehicle_offers1` (`offers_idoffers` ASC),
  CONSTRAINT `fk_vehicle_offers1`
    FOREIGN KEY (`offers_idoffers`)
    REFERENCES `emotion`.`offers` (`idoffers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;


INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`)
VALUES('1','admin','admin','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$Lr8Xk/PSOvYl6xTH.fWvIe9QoE2f.oKnjPihuJ8YhizgvgDghq9CW','admin@gmail.com',NULL,'admin',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`)
VALUES('2','user','user','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_USER\"]}','$2a$10$2tU2lENq4kmHfJePyMTe9uoeQtI.u1AXKuPQF7JQ3VSFQoMbFVb5O','user@gmail.com',NULL,'user',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`)
VALUES('3','proprio','proprio','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$m6xzuBf8/2Xi84tRulMs3eLVZpfw0LqZBU0PjdFJ46ZxearZxHKtC','proprio@gmail.com',NULL,'proprio',NULL,NULL);

-- VEHICULE
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`) VALUES('1','Peugeot','308','76287','black','BJ-604-VV','125000','2011-07-17 11:23:29','6500','1',NULL,'voiture','default.jpg');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`) VALUES('2','Renault','Clio 2','9898','blue','PO-097-UO','150000','2013-07-26 11:24:33','4500','1',NULL,'voiture','default.jpg');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`) VALUES('3','Yamaha','T-Max','989786','grey','PO-OI9-UJ','26000','2018-11-15 11:25:38','8900','1',NULL,'scooter','default.jpg');

INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `location_idlocation`, `hiddenOffers`) VALUES('1','Sun Event','260','Louer à gogo','60','600','20',NULL,'1');
INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `location_idlocation`, `hiddenOffers`) VALUES('2','Top Price','400','Unique en son genre louer la','40','750','50',NULL,'1');
INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `location_idlocation`, `hiddenOffers`) VALUES('3','Derniere chance','600','Blabla','70','900','60',NULL,'1');


INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`) VALUES('1','2019-07-01 11:31:22','2019-07-05 11:31:39','1','0',NULL,'0','En attente');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`) VALUES('2','2019-07-08 11:33:24','2019-07-21 11:33:28','2','0',NULL,'1','Terminer');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`) VALUES('3','2019-10-08 11:33:55','2019-12-29 11:34:08','2','0',NULL,'0','En attente');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`) VALUES('4','2019-06-04 11:34:41','2019-06-29 11:34:54','3','0',NULL,'0','En attente');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`) VALUES('5','2014-02-05 11:35:17','2014-08-21 11:35:23','3','0',NULL,'0','En attente');


UPDATE vehicle SET offers_idoffers = 1 WHERE idvehicle = 1;
UPDATE vehicle SET offers_idoffers = 2 WHERE idvehicle = 2;
UPDATE vehicle SET offers_idoffers = 3 WHERE idvehicle = 3;

UPDATE offers SET location_idlocation = 1 WHERE idoffers = 1;
UPDATE offers SET location_idlocation = 2 WHERE idoffers = 2;
UPDATE offers SET location_idlocation = 3 WHERE idoffers = 3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
