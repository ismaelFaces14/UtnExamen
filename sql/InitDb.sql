
CREATE DATABASE IF NOT EXISTS UTNExamen;
USE UTNExamen; 

CREATE USER IF NOT EXISTS 'utnuser'@'%' IDENTIFIED BY 'utnpass';
GRANT ALL PRIVILEGES ON UTNExamen.* TO 'utnuser'@'%';
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('superAdmin', 'admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL
);


CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT (CURRENT_DATE),
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);


INSERT INTO usuarios (usuario, password, rol)
VALUES ('super', '$2b$10$4paky8qA.fGgptnxkOtel.2FLJUaAsZgXrQdT4RhGqTzv2CsVa0le', 'superAdmin');