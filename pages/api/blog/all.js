const { default: connectDb } = require("@/config/database");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      await connectDb();

      const search = req.query.search || "";
      const category = req.query.category || "";

      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const total = await Blog.countDocuments();

      const skip = (page - 1) * size;

      const blogs = await Blog.find({
        title: {
          $regex: search,
          $options: "i",
        },
        category: {
          $regex: category,
          $options: "i",
        },
      })
        .skip(skip)
        .limit(size)
        .sort("-createdAt");

      res.json({
        blogs: blogs,
        total,
        page,
        size,
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
