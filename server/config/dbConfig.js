require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Connection to db failed", err));

const connect = mongoose.connection;

// Verify the connection
connect.on("connected", () => {
  console.log("Connected to db successfully");
});

// Verify connection error
connect.on("error", (err) => {
  console.log("Connection to db failed", err);
});

module.exports = mongoose;
