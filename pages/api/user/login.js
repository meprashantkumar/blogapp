import connectDb from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }

      await connectDb();

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "invalid credentials",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user,
        token,
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
