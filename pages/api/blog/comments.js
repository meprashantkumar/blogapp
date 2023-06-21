import { checkAuth } from "@/middlewares/isAuth";

const { default: connectDb } = require("@/config/database");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    try {
      await connectDb();

      const user = await checkAuth(req);

      if (!user)
        return res.status(403).json({
          message: "Please Login",
        });

      const { id } = req.query;
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "blog not found",
        });
      }

      const comments = await blog.comments;

      res.json({
        comments,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  if (method === "POST") {
    try {
      await connectDb();

      const user = await checkAuth(req);

      if (!user)
        return res.status(403).json({
          message: "Please Login",
        });

      const { id } = req.query;
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "blog not found",
        });
      }

      blog.comments.comment = req.body.comment;

      blog.comments.push({
        user: user.name,
        userid: user._id,
        comment: req.body.comment,
      });

      await blog.save();

      res.json({
        message: "Comment added",
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
