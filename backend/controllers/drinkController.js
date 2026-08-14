const {
  addDrink,
  getDrinks,
  updateDrink,
  deleteDrink,
} = require("../models/drinkModel");

// CREATE
const addD = async (req, res) => {
  try {
    const { item_name, price, image_url } = req.body;

    const result = await addDrink(item_name, price, image_url);

    res.status(201).json({
      message: "Drink added",
      id: result.insertId,
      item_name,
      price,
      image_url,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// GET
const getD = async (req, res) => {
  try {
    const results = await getDrinks();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// UPDATE
const updateD = async (req, res) => {
  try {
    const { item_name, price, image_url } = req.body;
    const { id } = req.params;

    const row = await updateDrink(item_name, price, image_url, id);

    if (!row) return res.status(404).json({ message: "Drink not found" });

    res
      .status(200)
      .json({ message: "Drink updated", item_name, price, image_url });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// DELETE
const deleteD = async (req, res) => {
  try {
    const { id } = req.params;

    const row = await deleteDrink(id);

    if (!row) return res.status(404).json({ message: "Drink not found" });

    res.status(200).json({ message: "Drink deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { addD, getD, updateD, deleteD };
