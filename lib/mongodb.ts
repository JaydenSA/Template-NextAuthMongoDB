import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
const options = {appName: 'devrel.article.nextauthjs'};

export const connectDB = async () => {
  try {
    // ensuring that the environment variable is defined
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }
    const { connection } = await mongoose.connect(MONGODB_URI as string, options);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
