CREATE DATABASE IF NOT EXISTS empreendedor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'empreendedor'@'localhost' IDENTIFIED BY 'empreendedor123';

GRANT ALL PRIVILEGES ON empreendedor_db.* TO 'empreendedor'@'localhost';

FLUSH PRIVILEGES;