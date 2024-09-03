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
    due_date DATE,
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
-- -- Insert into users
-- INSERT INTO users (username, email, password_hash)
-- VALUES
-- ('john_doe', 'john@example.com', 'hashedpassword1'),
-- ('jane_smith', 'jane@example.com', 'hashedpassword2'),
-- ('alex_jones', 'alex@example.com', 'hashedpassword3');

-- -- Insert into tasks
-- INSERT INTO tasks (user_id, title, description, due_date, is_completed, priority)
-- VALUES
-- (1, 'Task 1', 'Description for task 1', '2024-09-01', FALSE, 3),
-- (2, 'Task 2', 'Description for task 2', '2024-09-05', TRUE, 2),
-- (3, 'Task 3', 'Description for task 3', '2024-09-10', FALSE, 5);

-- -- Insert into categories
-- INSERT INTO categories (user_id, category_name)
-- VALUES
-- (1, 'Work'),
-- (2, 'Personal'),
-- (3, 'Urgent');
-- -- Select all data from users
-- SELECT * FROM users;


-- -- Select all data from tasks
-- SELECT * FROM tasks;

-- -- Select all data from categories
-- SELECT * FROM categories;
