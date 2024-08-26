const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // Create a new category
  router.post("/", async (req, res) => {
    const { user_id, category_name } = req.body;
    try {
      const newCategory = await pool.query(
        "INSERT INTO categories (user_id, category_name) VALUES ($1, $2) RETURNING *",
        [user_id, category_name]
      );
      res.json(newCategory.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  // Get all categories
  router.get("/", async (req, res) => {
    try {
      const allCategories = await pool.query("SELECT * FROM categories");
      res.json(allCategories.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  return router;
};
