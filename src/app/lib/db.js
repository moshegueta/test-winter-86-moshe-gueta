import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/posts_db";

if (!global._mongoose) {
  global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (global._mongoose.conn) return global._mongoose.conn;
  if (!global._mongoose.promise) {
    global._mongoose.promise = mongoose.connect(MONGO_URL);
  }
  global._mongoose.conn = await global._mongoose.promise;
  return global._mongoose.conn;
}
