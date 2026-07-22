CREATE DATABASE IF NOT EXISTS bookstore_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bookstore_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_year INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO books (title, author, published_year, price) VALUES
('เดอะพราวส์ (The proud)', 'สมชาย รักดี', 2023, 299.00);

INSERT INTO users (username, password)
VALUES ('admin', '$2b$10$3gwPXzc/ExQNRg1jDV4KMu03qEo6gNwEVb/mfW7zjrXbHaeJLiUZS')
ON DUPLICATE KEY UPDATE password = VALUES(password);