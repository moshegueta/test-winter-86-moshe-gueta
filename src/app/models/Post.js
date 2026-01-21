import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  likes: Number,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
