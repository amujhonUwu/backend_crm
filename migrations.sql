
CREATE TABLE Person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,          -- Primer nombre (obligatorio)
  middle_name VARCHAR(100),                  -- Segundo nombre (opcional)
  last_name1 VARCHAR(100) NOT NULL,            -- Primer apellido (obligatorio)
  last_name2 VARCHAR(100) NOT NULL,            -- Segundo apellido (obligatorio)
  date_of_birth DATE,                        -- Fecha de nacimiento (opcional)
  gender ENUM('Masculino', 'Femenino', 'Otro') DEFAULT 'Otro',
  phone VARCHAR(20),                         -- Teléfono (opcional)
  document_type ENUM('DNI', 'Pasaporte', 'Otro') DEFAULT 'DNI',  -- Tipo de documento
  document_number VARCHAR(50),               -- Número de documento (opcional)
  address VARCHAR(255),                      -- Dirección (opcional)
  nationality VARCHAR(100),                  -- Nacionalidad (opcional)
  marital_status ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo')  -- Estado civil (opcional)
);


CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,        -- Correo (obligatorio)
  password_hash VARCHAR(255) NOT NULL,         -- Contraseña hasheada (obligatorio)
  username VARCHAR(100) UNIQUE,                -- Nombre de usuario (opcional)
  role ENUM('admin', 'manager', 'user') DEFAULT 'user',  -- Rol del usuario
  status ENUM('active', 'suspended', 'pending') DEFAULT 'pending', -- Estado de la cuenta
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,                   -- Último inicio de sesión (opcional)
  person_id INT,                               -- Referencia opcional a la tabla Person
  FOREIGN KEY (person_id) REFERENCES Person(id)
);
