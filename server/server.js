const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig"); // Ensure this path is correct

// Middleware and routes setup
app.use(express.json());
app.use(cors()); // Enable CORS for all origins
const usersRoute = require("./routes/usersRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use("/api/users", usersRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
