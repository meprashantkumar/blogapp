import User from "@/models/User";
import jwt from "jsonwebtoken";

export const checkAuth = async (req) => {
  const { token } = req.headers;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(user._id).select("-password");
};
