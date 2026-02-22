const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Property Schema
const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  type: String
});

const Property = mongoose.model("Property", propertySchema);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// GET All Properties
app.get("/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// POST New Property
app.post("/properties", async (req, res) => {
  const newProperty = new Property(req.body);
  await newProperty.save();
  res.json(newProperty);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));
