CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL, 
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `email_verified_at` TIMESTAMP NULL,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `age` INT NOT NULL,
  `weight` DECIMAL(5,2) NOT NULL,
  `height` DECIMAL(3,2) NOT NULL,
  `sex` TINYINT NOT NULL COMMENT '0: Feminino, 1: Masculino',
  `objective` VARCHAR(255) NULL COMMENT 'Ex: Perder peso, Aprender o Básico, Ficar em Forma, Ganhar Flexibilidade, Ganhar Peso',
  `activity_level` VARCHAR(255) NULL COMMENT 'Ex: Iniciante, Intermediário, Avançado, True Beast, Novato',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_profiles_user_id_unique` (`user_id` ASC),
  CONSTRAINT `fk_user_profiles_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `roles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `roles_slug_unique` (`slug` ASC)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users_roles` (
  `user_id` BIGINT UNSIGNED NOT NULL,
  `role_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_role_user_roles_idx` (`role_id` ASC),
  CONSTRAINT `fk_role_user_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_user_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `fithub`.`roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `instructor_profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `specialization` VARCHAR(15) NULL,
  `bio` TEXT NULL,
  `hire_date` DATE NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `instructor_profiles_user_id_unique` (`user_id` ASC),
  CONSTRAINT `fk_instructor_profiles_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `events` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `instructor_id` BIGINT UNSIGNED NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `event_date` DATETIME NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_events_users_creator_idx` (`user_id` ASC),
  INDEX `fk_events_users_instructor_idx` (`instructor_id` ASC),
  CONSTRAINT `fk_events_users_creator`
    FOREIGN KEY (`user_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_users_instructor`
    FOREIGN KEY (`instructor_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- (Atualmente em construção)
-- Tabela `workouts`
-- Armazena os planos de treino criados por instrutores e atribuídos a alunos.
-- -----------------------------------------------------
/*CREATE TABLE IF NOT EXISTS `workouts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `instructor_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_workouts_users_instructor_idx` (`instructor_id` ASC),
  INDEX `fk_workouts_users_student_idx` (`user_id` ASC),
  CONSTRAINT `fk_workouts_users_instructor`
    FOREIGN KEY (`instructor_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_users_student`
    FOREIGN KEY (`user_id`)
    REFERENCES `fithub`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
) ENGINE = InnoDB; */
