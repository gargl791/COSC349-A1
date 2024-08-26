const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
// Database connection pool
const pool = new Pool({
  user: "root",
  host: "localhost", // Or the IP address of the Docker container
  database: "test_db",
  password: "root",
  port: 6543, // Default PostgreSQL port
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connection successful:", result.rows);
  });
});

// Import routes
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const categoryRoutes = require("./routes/categories");

// Use routes
app.use("/api/users", userRoutes(pool));
app.use("/api/tasks", taskRoutes(pool));
app.use("/api/categories", categoryRoutes(pool));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
