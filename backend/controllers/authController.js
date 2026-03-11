const { register, login } = require("../models/authModel");
const jwt = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await register(name, email, password);

    if (result === false)
      return res.status(400).json({ message: "Email already registered" });

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login(email, password);

    if (user === null) res.status(404).json({ message: "User not found" });
    if (user === false)
      res.status(400).json({ message: "Incorrect email or password" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerController, loginController };
