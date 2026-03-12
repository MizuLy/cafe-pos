const db = require("../config/db");

// CREATE
const addDrink = async (item_name, price, image_url) => {
  try {
    const [result] = await db.query(
      "INSERT INTO `drink`(`item_name`, `price`, `image_url`) VALUES (?,?,?)",
      [item_name, price, image_url],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// GET
const getDrinks = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM `drink` ORDER BY created_at DESC",
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// UPDATE
const updateDrink = async (item_name, price, image_url, id) => {
  try {
    const [row] = await db.query(
      "UPDATE `drink` SET `item_name`=?,`price`=?,`image_url`=? WHERE id = ?",
      [item_name, price, image_url, id],
    );

    if (row.affectedRows === 0) return null;

    return row;
  } catch (err) {
    throw err;
  }
};

// DELETE
const deleteDrink = async (id) => {
  try {
    const [row] = await db.query("DELETE FROM `drink` WHERE id = ?", [id]);

    if (row.affectedRows === 0) return null;

    return row.affectedRows;
  } catch (err) {
    throw err;
  }
};

module.exports = { addDrink, getDrinks, updateDrink, deleteDrink };
