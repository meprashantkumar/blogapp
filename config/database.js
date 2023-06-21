import mongoose from "mongoose";

const connectDb = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Blog_App",
  });
  console.log(`Database Connected on ${connection.host}`);
};

export default connectDb;
