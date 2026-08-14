const express = require("express");
const {
  addD,
  getD,
  updateD,
  deleteD,
} = require("../controllers/drinkController");

const router = express.Router();

router.post("/", addD);
router.get("/", getD);
router.put("/:id", updateD);
router.delete("/:id", deleteD);

module.exports = router;
