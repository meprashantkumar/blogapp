import connectDb from "@/config/database";

const { checkAuth } = require("@/middlewares/isAuth");
const { Blog } = require("@/models/Blogs");

async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    try {
      await connectDb();
      const user = await checkAuth(req);

      if (!user)
        return res.status(403).json({
          message: "Please Login",
        });

      if (user.role !== "admin")
        return res.status(403).json({
          message: "You are not Admin",
        });

      const { title, description, category, blog, image } = req.body;

      if (!title || !description || !category || !blog)
        return res.status(400).json({ message: "Please add all fields" });

      await Blog.create({
        title,
        description,
        category,
        owner: user._id,
        ownername: user.name,
        blog,
        image,
      });

      res.status(201).json({
        message: "Blog Created",
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
