const db = require("../config/db");

// CREATE
const addOrder = async (drink_id, quantity) => {
  try {
    // Select from Drink table
    const [drink] = await db.query(
      "SELECT item_name, price FROM `drink` WHERE id = ?",
      [drink_id],
    );

    console.log("Drink", drink);

    if (drink.length === 0) throw new Error("Drink not found");

    const { item_name, price } = drink[0];
    const total_price = price * quantity;

    const [result] = await db.query(
      "INSERT INTO `order`(item_name, price, quantity, total_price, created_at) VALUES (?,?,?,?, NOW())",
      [item_name, price, quantity, total_price],
    );

    return {
      order_id: result.insertId,
      total_price,
    };
  } catch (err) {
    throw err;
  }
};

// GET
const getOrder = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM `order` ORDER BY created_at DESC",
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
const updateOrder = async (order_id, drink_id, quantity) => {
  try {
    // Select from Drink table
    const [drink] = await db.query(
      "SELECT item_name, price FROM `drink` WHERE id = ?",
      [drink_id],
    );

    if (drink.length === 0) throw new Error("Drink not found");

    const { item_name, price } = drink[0];
    const total_price = price * quantity;

    const [row] = await db.query(
      "UPDATE `order` SET `item_name`=?,`price`=?,`quantity`=?,`total_price`=? WHERE id = ?",
      [item_name, price, quantity, total_price, order_id],
    );

    if (row.affectedRows === 0) return null;

    return row;
  } catch (err) {
    throw err;
  }
};

// DELETE
const deleteOrder = async (id) => {
  try {
    const [row] = await db.query("DELETE FROM `order` WHERE id = ?", [id]);

    if (row.affectedRows === 0) return null;

    return row.affectedRows;
  } catch (err) {
    throw err;
  }
};

module.exports = { addOrder, getOrder, updateOrder, deleteOrder };
