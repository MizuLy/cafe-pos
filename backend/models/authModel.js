const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
const register = async (name, email, password) => {
  try {
    // Check for existing email
    const [existing] = await db.query("SELECT * FROM `user` WHERE email = ?", [
      email,
    ]); // existing = existing email
    if (existing.length > 0) return false;

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO `user`(`name`, `email`, `password`) VALUES (?,?,?)",
      [name, email, hashedPassword],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// LOGIN
const login = async (email, password) => {
  try {
    const [result] = await db.query("SELECT * FROM `user` WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) return null;

    const user = result[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return false;

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = { register, login };
