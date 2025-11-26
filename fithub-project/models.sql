DROP SCHEMA IF EXISTS `fithub_db` ;
CREATE SCHEMA IF NOT EXISTS `fithub_db` DEFAULT CHARACTER SET utf8;
USE `fithub_db`;

CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabela `user_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_profiles` (
  `id` INT NOT NULL,
  `age` INT NULL,
  `weight` DECIMAL(5,2) NULL,
  `height` DECIMAL(3,2) NULL,
  `sex` CHAR(1) NULL,
  `objective` VARCHAR(45) NULL,
  `activity_level` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `time_slots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `time_slots` (
  `id` INT NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `max_capacity` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `users` (Depende de `roles` e `user_profiles`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email_verified_at` TIMESTAMP NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `user_profiles_id` INT NOT NULL,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_user_profiles1_idx` (`user_profiles_id` ASC),
  INDEX `fk_users_roles1_idx` (`roles_id` ASC),
  CONSTRAINT `fk_users_user_profiles1`
    FOREIGN KEY (`user_profiles_id`)
    REFERENCES `user_profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `waiting_list` (Depende de `time_slots`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waiting_list` (
  `id` INT NOT NULL,
  `desired_date` DATE NULL,
  `request_timestamp` TIMESTAMP NULL,
  `time_slots_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_waiting_list_time_slots1_idx` (`time_slots_id` ASC),
  CONSTRAINT `fk_waiting_list_time_slots1`
    FOREIGN KEY (`time_slots_id`)
    REFERENCES `time_slots` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `bookings` (Depende de `time_slots`, `users`, `user_profiles`, `roles`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT NOT NULL,
  `booking_date` DATE NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `creation_timestamp` TIMESTAMP NULL,
  `time_slots_id` INT NOT NULL,
  `users_id` INT NULL,
  `users_user_profiles_id` INT NULL,
  `users_roles_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bookings_time_slots1_idx` (`time_slots_id` ASC),
  INDEX `fk_bookings_users1_idx` (`users_id` ASC),
  INDEX `fk_bookings_user_profiles1_idx` (`users_user_profiles_id` ASC),
  INDEX `fk_bookings_roles1_idx` (`users_roles_id` ASC),
  CONSTRAINT `fk_bookings_time_slots1`
    FOREIGN KEY (`time_slots_id`)
    REFERENCES `time_slots` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookings_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookings_user_profiles1`
    FOREIGN KEY (`users_user_profiles_id`)
    REFERENCES `user_profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookings_roles1`
    FOREIGN KEY (`users_roles_id`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `restrictions` (Depende de `users`, `user_profiles`, `roles`)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restrictions` (
  `id` INT NOT NULL,
  `reason` VARCHAR(255) NULL,
  `expiration_date` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NULL,
  `users_id` INT NULL,
  `users_user_profiles_id` INT NULL,
  `users_roles_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_restrictions_users1_idx` (`users_id` ASC),
  INDEX `fk_restrictions_user_profiles1_idx` (`users_user_profiles_id` ASC),
  INDEX `fk_restrictions_roles1_idx` (`users_roles_id` ASC),
  CONSTRAINT `fk_restrictions_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_restrictions_user_profiles1`
    FOREIGN KEY (`users_user_profiles_id`)
    REFERENCES `user_profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_restrictions_roles1`
    FOREIGN KEY (`users_roles_id`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
