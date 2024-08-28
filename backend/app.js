const express = require("express");
const { Pool } = require("pg");
const port = 3000;

const app = express();
app.use(express.json());
// Database connection pool
const pool = new Pool({
  user: "root",
  host: "db", // the service name of database in docker-compose.yml
  database: "test_db",
  password: "root",
  port: 5432, // Default PostgreSQL port
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
// Catch-all route for undefined endpoints

// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
// });
//
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
