import connectDb from "@/config/database";
import { checkAuth } from "@/middlewares/isAuth";

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
      res.json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: `${method} is not allowed!`,
    });
  }
}

export default handler;
