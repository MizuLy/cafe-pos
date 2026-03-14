const { register, login, currentUser } = require("../models/authModel");
const jwt = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const result = await register(name, email, password, avatar);

    if (result === false)
      return res.status(400).json({ message: "Email already registered" });

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login(email, password);

    if (user === null)
      return res.status(404).json({ message: "User not found" });
    if (user === false)
      return res.status(400).json({ message: "Incorrect email or password" });

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

const currentUserController = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await currentUser(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerController, loginController, currentUserController };
