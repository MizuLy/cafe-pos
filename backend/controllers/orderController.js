const {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../models/orderModel");

// CREATE
const addO = async (req, res) => {
  try {
    const { drink_id, quantity } = req.body;

    const result = await addOrder(drink_id, quantity);

    res.status(201).json({
      message: "Order added",
      order_id: result.order_id,
      total_price: result.total_price,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

// GET
const getO = async (req, res) => {
  try {
    const result = await getOrder();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
const updateO = async (req, res) => {
  try {
    const { drink_id, quantity } = req.body;
    const { id } = req.params;

    const row = await updateOrder(id, drink_id, quantity);

    if (!row) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
const deleteO = async (req, res) => {
  try {
    const { id } = req.params;

    const row = await deleteOrder(id);

    if (!row) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addO, getO, updateO, deleteO };
