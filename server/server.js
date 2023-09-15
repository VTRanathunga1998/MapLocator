require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const medicineRoutes = require("./routes/medicinesRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Import the combined authRoutes
const authRoutes = require("./routes/authRoutes");

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/search", searchRoutes);

// Use the authRoutes for authentication
app.use("/api/auth", authRoutes);

// Set the strictQuery option to false to prevent the deprecation warning
mongoose.set("strictQuery", false);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
