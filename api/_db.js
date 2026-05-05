const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

let cached = global._mongoConn;
if (!cached) {
  cached = global._mongoConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const counterSchema = new mongoose.Schema({
  name: { type: String, default: "portfolio" },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

module.exports = { connectDB, Counter };
