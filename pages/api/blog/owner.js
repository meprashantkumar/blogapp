import User from "@/models/User";

const { default: connectDb } = require("@/config/database");

async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      await connectDb();

      const { id } = req.query;
      const owner = await User.findById(id)
        .select("-email")
        .select("-password")
        .select("-createdAt");

      res.json({
        owner,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: `${method} method is not allowed`,
    });
  }
}

export default handler;
