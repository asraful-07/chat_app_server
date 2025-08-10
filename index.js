const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./lib/db");
const authRoutes = require("./routes/auth.route");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// route
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
