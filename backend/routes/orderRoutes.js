const express = require("express");
const {
  addO,
  getO,
  updateO,
  deleteO,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", addO);
router.get("/", getO);
router.put("/:id", updateO);
router.delete("/:id", deleteO);

module.exports = router;
