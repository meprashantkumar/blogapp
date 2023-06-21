import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    requied: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

const User = mongoose.model("User", schema);

export default User;
