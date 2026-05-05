const { connectDB, Counter } = require("./_db.js");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    let counter = await Counter.findOne({ name: "portfolio" });
    if (!counter) {
      counter = await Counter.create({ name: "portfolio", count: 0 });
    }

    return res.status(200).json({ count: counter.count });
  } catch (err) {
    console.error("visits error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
