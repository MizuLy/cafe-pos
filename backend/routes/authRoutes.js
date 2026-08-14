const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", verifyToken, currentUserController);

module.exports = router;
