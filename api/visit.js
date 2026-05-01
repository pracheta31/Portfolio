// POST /api/visit — increments the visitor count by 1
// called once per browser session from the frontend

import { connectDB, Counter } from "./_db.js";

export default async function handler(req, res) {
  // only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const counter = await Counter.findOneAndUpdate(
      { name: "portfolio" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ count: counter.count });
  } catch (err) {
    console.error("visit error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
