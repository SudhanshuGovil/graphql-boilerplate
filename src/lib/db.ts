import mongoose from "mongoose";

async function connectDb(url: string) {
  return mongoose.connect(url);
}

export default connectDb;
