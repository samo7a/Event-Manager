SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `EventManager` DEFAULT CHARACTER SET utf8 ;
USE `EventManager` ;


CREATE TABLE IF NOT EXISTS `EventManager`.`SuperAdmins` (
  `sa_id` INT NOT NULL AUTO_INCREMENT,
  `sa_firstName` VARCHAR(45) NOT NULL,
  `sa_lastName` VARCHAR(45) NOT NULL,
  `sa_email` VARCHAR(45) NOT NULL,
  `sa_password` VARCHAR(100) NOT NULL,
  `sa_profilePicture` BLOB NULL,
  PRIMARY KEY (`sa_id`),
  UNIQUE INDEX `sa_email_UNIQUE` (`sa_email` ASC) VISIBLE)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Universities` (
  `u_id` INT NOT NULL,
  `u_name` VARCHAR(45) NOT NULL,
  `u_noOfStudents` INT NOT NULL,
  `u_description` VARCHAR(1000) NOT NULL,
  `u_profilePicture` BLOB NULL,
  `locationName` VARCHAR(45) NOT NULL,
  `latitude` REAL NOT NULL,
  `longitude` REAL NOT NULL,
  PRIMARY KEY (`u_id`)
 )
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `EventManager`.`Students` (
  `s_id` INT NOT NULL AUTO_INCREMENT,
  `s_firstName` VARCHAR(45) NOT NULL,
  `s_lastName` VARCHAR(45) NOT NULL,
  `s_email` VARCHAR(45) NOT NULL,
  `s_password` VARCHAR(100) NOT NULL,
  `s_profilePicture` BLOB NULL,
  `u_id` INT NOT NULL,
  PRIMARY KEY (`s_id`),
  UNIQUE INDEX `s_email_UNIQUE` (`s_email` ASC) VISIBLE,
INDEX `fk_Students_Universities1_idx` (`u_id` ASC) VISIBLE,
  CONSTRAINT `fk_Students_Universities1`
    FOREIGN KEY (`u_id`)
    REFERENCES `EventManager`.`Universities` (`u_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Events` (
  `e_id` INT NOT NULL,
  `e_name` VARCHAR(45) NOT NULL, 
  `e_description` VARCHAR(1000) NULL,
  `e_contactPhone` VARCHAR(10) NULL,
  `e_contactEmail` VARCHAR(45) NULL,
  `e_type` ENUM('private', 'public', 'rso') NOT NULL,
  `locationName` VARCHAR(45) NOT NULL,
  `latitude` REAL NOT NULL,
  `longitude` REAL NOT NULL,
  `e_category` VARCHAR(45) NULL,
  `e_time` TIME NOT NULL,
  `e_date` DATE NOT NULL,
  `e_profilePicture` BLOB NULL,
  `isApproved` BIT(1) NULL,
  PRIMARY KEY (`e_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `EventManager`.`Rso` (
  `rso_id` INT NOT NULL AUTO_INCREMENT,
  `rso_name` VARCHAR(45) NOT NULL,
  `rso_description` VARCHAR(1000) NULL,
  `rso_profilePicture` BLOB NULL,
  `s_id` INT NULL,
  PRIMARY KEY (`rso_id`),
    FOREIGN KEY (`s_id`)
    REFERENCES `EventManager`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Hosts` (
  `hostId` INT NOT NULL AUTO_INCREMENT,
  `rso_id` INT NOT NULL,
  `e_id` INT NOT NULL,
  PRIMARY KEY (`hostId`),
    FOREIGN KEY (`rso_id`)
    REFERENCES `EventManager`.`Rso` (`rso_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`e_id`)
    REFERENCES `EventManager`.`Events` (`e_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Signup` (
  `signedupId` INT NOT NULL AUTO_INCREMENT,
  `e_id` INT NULL,
  `s_id` INT NULL,
  PRIMARY KEY (`signedupId`),
    FOREIGN KEY (`e_id`)
    REFERENCES `EventManager`.`Events` (`e_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`s_id`)
    REFERENCES `EventManager`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`CreatesEvents` (
  `createdId` INT NOT NULL AUTO_INCREMENT,
  `e_id` INT NULL,
  `s_id` INT NULL,
  PRIMARY KEY (`createdId`),
    FOREIGN KEY (`e_id`)
    REFERENCES `EventManager`.`Events` (`e_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`s_id`)
    REFERENCES `EventManager`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`CreatesUniversities` (
  `createdId` INT NOT NULL AUTO_INCREMENT,
  `u_id` INT NULL,
  `sa_id` INT NULL,
  PRIMARY KEY (`createdId`),
    FOREIGN KEY (`sa_id`)
    REFERENCES `EventManager`.`SuperAdmins` (`sa_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`u_id`)
    REFERENCES `EventManager`.`Universities` (`u_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Comments` (
  `commentId` INT NOT NULL AUTO_INCREMENT, 
  `e_id` INT NULL,
  `s_id` INT NULL,
  `comment` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`commentId`),
    FOREIGN KEY (`e_id`)
    REFERENCES `EventManager`.`Events` (`e_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`s_id`)
    REFERENCES `EventManager`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`Rates` (
  `ratingId` INT NOT NULL AUTO_INCREMENT,
  `e_id` INT  NULL,
  `s_id` INT  NULL,
  `rating` REAL NOT NULL,
  PRIMARY KEY (`ratingId`),
    FOREIGN KEY (`e_id`)
    REFERENCES `EventManager`.`Events` (`e_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`s_id`)
    REFERENCES `mydb`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
	CHECK (rating >= 0 AND rating <= 5))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `EventManager`.`isAMember` (
  `memberId` INT NOT NULL AUTO_INCREMENT,
  `s_id` INT  NULL,
  `rso_id` INT  NULL,
    PRIMARY KEY (`memberId`),
    FOREIGN KEY (`s_id`)
    REFERENCES `EventManager`.`Students` (`s_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
    FOREIGN KEY (`rso_id`)
    REFERENCES `EventManager`.`Rso` (`rso_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


