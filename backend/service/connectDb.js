import mongoose from "mongoose";

const connectDb = async () => {
  const connected = await mongoose.connect(`${process.env.MONGODB_URI}`);
  if (connected) {
    console.log("database connected successfully");
  }
};

export default connectDb;
