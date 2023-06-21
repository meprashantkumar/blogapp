const { default: connectDb } = require("@/config/database");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      await connectDb();
      const blogs = await Blog.find();

      res.json({
        blogs: blogs.reverse(),
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
