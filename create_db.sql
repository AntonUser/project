CREATE SCHEMA `trello_db` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `trello_db`.`user` (
  `id` INT NOT NULL,
  `user_name` VARCHAR(45),
  `column_id` INT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
