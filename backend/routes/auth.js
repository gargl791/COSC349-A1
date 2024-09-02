const express = require("express");
const router = express.Router();
const joi = require("joi");

module.exports = (pool) => {
  router.post("/login", async (req, res) => {
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

      // if (user.rows[0].password !== password) {
      //   return res.status(401).json("Invalid email or password");
      // }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.rows[0].password_hash,
      );
      if (!validPassword)
        return res.status(401).json("Invalid email or password");

      res.status(200).json("Login successful");
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

  return router;
};
