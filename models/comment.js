import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: { type: String, requirid: true },
    commenter: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
