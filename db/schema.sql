-- Drop Tables if they exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TYPE valid_priority AS ENUM('Low', 'Med', 'High');

-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    tags VARCHAR(255),
    is_completed BOOLEAN DEFAULT FALSE,
    priority valid_priority,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash)
VALUES ('demo_user', 'demo_user@example.com', '$2a$10$EMkuvqbGdlLF8..l7Ehdz.11mOoTeNTx76CS255J/C08fxGe8j2dm');

INSERT INTO tasks (user_id, title, description, start_date, end_date, tags, is_completed, priority)
VALUES 
    (1, 'Go to convention', 'Description for Task 1', '2024-09-01', '2024-09-10', 'tag1', FALSE, 'Low'),
    (1, 'Complete Assignment', 'Description for Task 2', '2024-09-05', '2024-09-15', 'tag2', FALSE, 'Med'),
    (1, 'Bake cake', 'Description for Task 3', '2024-09-10', '2024-09-20', 'tag3', TRUE, 'High');


