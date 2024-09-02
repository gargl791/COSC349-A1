const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (pool) => {
  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      // Check user credentials in the database
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid email or password");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.rows[0].password_hash,
      );
      if (!validPassword)
        return res.status(401).json("Invalid email or password");

      // Generate JWT token
      const token = generateAuthToken(user.rows[0]);

      res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

  const validate = (data) => {
    const schema = joi.object({
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };

  const generateAuthToken = (user) => {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
  };

  return router;
};
