USE `beer_shelf`;

CREATE TABLE `breweries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `beer_advocate_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
