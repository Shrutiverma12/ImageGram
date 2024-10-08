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
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "user",
  },
});

const post = mongoose.model("Post", postSchema);

export default postSchema;
