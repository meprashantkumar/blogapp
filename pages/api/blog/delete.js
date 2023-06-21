import { checkAuth } from "@/middlewares/isAuth";

const { default: connectDb } = require("@/config/database");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;

  if (method === "DELETE") {
    try {
      await connectDb();

      const user = await checkAuth(req);

      if (!user)
        return res.status(403).json({
          message: "Please Login",
        });

      const { id } = req.query;
      const blog = await Blog.findById(id);

      if (blog.owner.toString() === user._id.toString()) {
        await blog.deleteOne();
      } else {
        return res.status(403).json({
          message: "You are not authorized",
        });
      }

      res.json({
        message: "Deleted Successfully",
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
