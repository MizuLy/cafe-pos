const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome admin", user: req.user });
});

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

module.exports = router;
