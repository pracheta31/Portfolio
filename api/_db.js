// shared mongoose connection — reused across serverless function calls
// Vercel keeps functions warm so this avoids reconnecting every request

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// cache the connection on the global object so it survives between invocations
let cached = global._mongoConn;
if (!cached) {
  cached = global._mongoConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// counter schema — one document, just holds a number
const counterSchema = new mongoose.Schema({
  name:  { type: String, default: "portfolio" },
  count: { type: Number, default: 0 },
});

export const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);
