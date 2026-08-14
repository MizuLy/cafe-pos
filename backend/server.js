const express = require("express");
const cors = require("cors");
const drinkRouter = require("./routes/drinkRoutes");
const orderRouter = require("./routes/orderRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 8880;

// Middleware
app.use(express.json());
app.use(cors());

// Auth
app.use("/api/auth", authRouter);

// CRUD
app.use("/api/user", userRouter);
app.use("/api/drink", drinkRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
