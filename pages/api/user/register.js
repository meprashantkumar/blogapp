import connectDb from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({
          message: "Please Enter All Details",
        });

      await connectDb();

      let user = await User.findOne({ email });

      if (user)
        return res.status(400).json({
          message: "User Already There",
        });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(201).json({
        message: "User Registerd",
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: `${method} method is not allowed!`,
    });
  }
}

export default handler;
