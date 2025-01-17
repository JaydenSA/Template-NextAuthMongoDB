import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    // ensuring that the environment variable is defined
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
