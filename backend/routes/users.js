const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // Create a new user
  router.post("/", async (req, res) => {
    const { username, email, password_hash } = req.body;
    try {
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password_hash]
      );
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  // Get all users
  router.get("/", async (req, res) => {
    try {
      const allUsers = await pool.query("SELECT * FROM users");
      res.json(allUsers.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  // Get a user by username
  router.get("/:username", async (req, res) => {
    const { username } = req.params;
    try {
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);

      if (user.rows.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  return router;
};
