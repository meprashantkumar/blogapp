import { checkAuth } from "@/middlewares/isAuth";

const { default: connectDb } = require("@/config/database");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      await connectDb();

      const { id } = req.query;
      const blog = await Blog.findById(id);

      res.json({
        blog,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: `${method} is not allowed`,
    });
  }
}

export default handler;
