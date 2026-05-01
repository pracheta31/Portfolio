require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// allow requests from your frontend
// in production, replace * with your actual deployed frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// simple schema — just one document that holds the count
const counterSchema = new mongoose.Schema({
  name: { type: String, default: "portfolio" },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// GET /api/visits — return current count
app.get("/api/visits", async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "portfolio" });
    if (!counter) {
      counter = await Counter.create({ name: "portfolio", count: 0 });
    }
    res.json({ count: counter.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /api/visit — increment count by 1, return new count
app.post("/api/visit", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "portfolio" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json({ count: counter.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
