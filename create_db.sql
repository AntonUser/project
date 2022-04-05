CREATE SCHEMA `trello_db` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `trello_db`.`user` (
  `id` INT NOT NULL,
  `user_name` VARCHAR(45),
  `column_id` INT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `trello_db`.`column` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45),
  PRIMARY KEY (`id`),
  INDEX `columns_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `columns`
    FOREIGN KEY (`user_id`)
    REFERENCES `trello_db`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `trello_db`.`card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `column_id` INT NOT NULL,
  `value` VARCHAR(150) NULL,
  PRIMARY KEY (`id`),
  INDEX `column_id_idx` (`column_id` ASC) VISIBLE,
  CONSTRAINT `column_id`
    FOREIGN KEY (`column_id`)
    REFERENCES `trello_db`.`column_entity` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `trello_db`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `card_id` INT NOT NULL,
  `value` VARCHAR(155) NULL,
  PRIMARY KEY (`id`),
  INDEX `card_id_idx` (`card_id` ASC) VISIBLE,
  CONSTRAINT `card_id`
    FOREIGN KEY (`card_id`)
    REFERENCES `trello_db`.`card` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
