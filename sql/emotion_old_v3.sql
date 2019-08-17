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
  `hiddenOffers` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdBy` INT NULL,
  PRIMARY KEY (`idoffers`),
 CONSTRAINT `fk_offers_users`
    FOREIGN KEY (`createdBy`)
    REFERENCES `emotion`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `finalPrice` INT NOT NULL,
  `offers_idoffers` INT NULL,
  `vehicle_idvehicle` INT NULL,
  PRIMARY KEY (`idlocation`),
  CONSTRAINT `fk_location_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `emotion`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_offers`
    FOREIGN KEY (`offers_idoffers`)
    REFERENCES `emotion`.`offers` (`idoffers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_vehicle`
    FOREIGN KEY (`vehicle_idvehicle`)
    REFERENCES `emotion`.`vehicle` (`idvehicle`)
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
  `createdBy` INT NULL,
  PRIMARY KEY (`idvehicle`),
  INDEX `fk_vehicle_offers1` (`offers_idoffers` ASC),
  CONSTRAINT `fk_vehicle_offers1`
    FOREIGN KEY (`offers_idoffers`)
    REFERENCES `emotion`.`offers` (`idoffers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
   CONSTRAINT `fk_vehicle_users`
    FOREIGN KEY (`createdBy`)
    REFERENCES `emotion`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;

-- INSERT USERS
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('1','admin','admin','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$Lr8Xk/PSOvYl6xTH.fWvIe9QoE2f.oKnjPihuJ8YhizgvgDghq9CW','admin@gmail.com','50','admin',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('2','user','user','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_USER\"]}','$2a$10$2tU2lENq4kmHfJePyMTe9uoeQtI.u1AXKuPQF7JQ3VSFQoMbFVb5O','user@gmail.com','100','user',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('3','proprio','proprio','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$m6xzuBf8/2Xi84tRulMs3eLVZpfw0LqZBU0PjdFJ46ZxearZxHKtC','proprio@gmail.com','200','proprio',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('4','user1','user1','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$kQnKTChHigC14mfv0LsXBuuc/ghSNpFODd5TIoGew903A60uj4pS2','i.ghezal@ecole-ipssi.net','150','user1',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('5','user2','user2','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$mkFdI6/TbHZKdJpspNGBW.xnHLWO7uPTfP8Bpde1tywTXhiN3lmUu','razer-raphael@live.fr','250','user2',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('6','user3','user3','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$9PRm9xz/mCRQj0b.iPH6iOF/gBMHmopWmKEckW1aKDS1kgSdN9RKu','rayapin.antoine36@gmail.com','450','user3',NULL,NULL);
INSERT INTO `users` (`idusers`, `firstname`, `lastname`, `birthday`, `address`, `phoneNumber`, `driverLicence`, `roles`, `password`, `email`, `pointFidelity`, `username`, `tokenResetPassword`, `tokenValidateAccount`) VALUES('7','user4','user4','2019-05-28 12:33:06','5 rue de Paris','603050606','1234567','{\"role\":[\"ROLE_ADMIN\",\"ROLE_PROPRIO\",\"ROLE_USER\"]}','$2a$10$EnFRfgxhhXhdvfpjqQWYZuPQIGGIp/c.ADqyp20WNLUJknj4MZq8G','alex.rigueur@gmail.com','290','user4',NULL,NULL);

-- INSERT VEHICULE
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('1','Peugeot','308','76287','noir','BJ-604-VV','125000','2011-07-17 11:23:29','6500','1','1','voiture','default.jpg','7');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('2','Renault','Clio 2','9898','bleu','PO-097-UO','150000','2013-07-26 11:24:33','4500','1','2','voiture','default.jpg','3');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('3','Yamaha','T-Max','989786','gris','PO-OI9-UJ','26000','2018-11-15 11:25:38','8900','1','3','scooter','default.jpg','4');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('4','Seat','Ibiza','87987','rouge','JH-876-JI','180000','2018-05-18 11:25:38','250000','1','3','voiture','default.jpg','3');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('5','Fiat','500','876876','gris','OJ-O99-DH','26000','2017-06-15 11:25:38','110000','1','2','voiture','default.jpg','5');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('6','Mazda','rx8','87786','jaune','VF-909-AF','26000','2016-07-15 11:25:38','125000','1','2','voiture','default.jpg','3');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('9','Volkswagen','Polo','576565','bleu clair','ED-875-HU','175000','2016-07-30 11:25:38','7000','1','2','voiture','default.jpg','6');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('10','Volkswagen','Golf','87657868','gris metal','UH-987-OU','190000','2019-03-21 11:25:38','90000','1','2','voiture','default.jpg','3');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('11','Volkswagen','Golf','87657868','gris metal','UH-987-OU','190000','2019-03-21 11:25:38','90000','1','1','voiture','default.jpg','6');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('12','Volkswagen','Golf','87657868','gris metal','UH-987-OU','190000','2019-03-21 11:25:38','90000','1','3','voiture','default.jpg','7');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('13','Mazda','rx8','87786','jaune','VF-909-AF','26000','2016-07-15 11:25:38','125000','1','1','voiture','default.jpg','4');
INSERT INTO `vehicle` (`idvehicle`, `brand`, `model`, `serialNumber`, `color`, `licensePlate`, `nbKm`, `datePurchase`, `price`, `available`, `offers_idoffers`, `typeVehicle`, `imgVehicle`, `createdBy`) VALUES('14','Volkswagen','Golf','87657868','gris metal','UH-987-OU','190000','2019-03-21 11:25:38','90000','1','2','voiture','default.jpg','7');

-- INSERT OFFERS
INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `hiddenOffers`, `createdBy`) VALUES('1','Sun Event','260','Louer à gogo','60','600','20','1','3');
INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `hiddenOffers`, `createdBy`) VALUES('2','Top Price','400','Unique en son genre louer la','40','750','50','1','3');
INSERT INTO `offers` (`idoffers`, `title`, `price`, `description`, `penality`, `nbKm`, `pointFidelityOffers`, `hiddenOffers`, `createdBy`) VALUES('3','Derniere chance','600','Blabla','70','900','60','1','3');

-- INSERT LOCATION
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('1','2019-07-01 11:31:22','2019-07-05 11:31:39','4','0',NULL,'0','En attente','260','1','1');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('2','2019-07-08 11:33:24','2019-07-21 11:33:28','4','0',NULL,'1','Terminer','600','3','3');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('4','2019-06-04 11:34:41','2019-06-29 11:34:54','5','0',NULL,'0','En attente','400','2','2');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('5','2014-02-05 11:35:17','2014-08-21 11:35:23','6','0',NULL,'0','En attente','260','1','11');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('6','2018-12-10 11:35:17','2018-12-30 11:35:23','4','0',NULL,'0','En attente','400','2','14');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('7','2014-02-17 11:35:17','2014-08-30 11:35:23','7','0',NULL,'1','Terminer','400','2','14');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('8','2019-07-02 11:35:17','2019-09-21 11:35:23','5','0',NULL,'0','En attente','400','2','5');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('9','2019-03-05 11:35:17','2019-09-06 11:35:23','4','0',NULL,'0','En cours','400','2','6');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('10','2019-01-09 11:35:17','2019-01-13 11:35:17','4','0',NULL,'1','Terminer','600','3','12');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('11','2019-05-15 11:35:17','2019-05-17 11:35:17','5','0',NULL,'1','Terminer','400','2','6');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('12','2019-05-15 11:35:17','2019-05-18 11:35:17','7','0',NULL,'1','Terminer','260','1','1');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('13','2017-12-13 11:35:17','2017-12-31 11:35:17','5','0',NULL,'1','Terminer','400','2','9');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('14','2019-07-02 11:35:17','2019-09-21 11:35:23','5','0',NULL,'0','En attente','600','3','4');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('15','2017-12-13 11:35:17','2017-12-31 11:35:17','5','0',NULL,'1','Terminer','400','2','10');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('16','2014-02-05 11:35:17','2014-08-21 11:35:23','6','0',NULL,'0','En attente','260','1','11');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('17','2014-02-17 11:35:17','2014-08-30 11:35:23','6','0',NULL,'1','Terminer','260','1','13');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('18','2017-12-13 11:35:17','2017-12-31 11:35:17','7','0',NULL,'1','Terminer','600','3','12');
INSERT INTO `location` (`idlocation`, `startDate`, `endDate`, `users_idusers`, `cancelLocation`, `pointFidelityUsed`, `returnVehicle`, `status`, `finalPrice`, `offers_idoffers`, `vehicle_idvehicle`) VALUES('19','2019-05-15 11:35:17','2019-05-17 11:35:17','4','0',NULL,'1','Terminer','400','2','5');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;