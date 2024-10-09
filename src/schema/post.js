import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    minLength: 5,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "User",
  },
});

const post = mongoose.model("Post", postSchema);

export default post;
