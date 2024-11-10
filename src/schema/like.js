import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    likeableId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    likeType: {
      type: String,
      required: true,
      default: "like",
      enum: ["like", "love", "support"],
    },
  },
  { timestamps: true }
);
const like = mongoose.model("Like", likeSchema);
export default like;
