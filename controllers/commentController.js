import mongoose from "mongoose";
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
import { MESSAGES, STATUS } from "../utils/constants.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content, commenter } = req.body;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.INVALID_POST_ID });
  }

  if (!content?.trim() || !commenter?.trim()) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: MESSAGES.COMMENT_FIELDS_REQUIRED });
  }

  try {
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.POST_NOT_FOUND });
    }

    const comment = await Comment.create({ postId, content, commenter });
    return res.status(STATUS.CREATED).json({ message: MESSAGES.COMMENT_ADDED, comment });
  } catch (error) {
    console.log("err", error.message);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.INVALID_POST_ID });
    }
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return res.status(STATUS.OK).json({ message: MESSAGES.COMMENTS_FETCHED, comments });
  } catch (error) {
    console.log("err", error.message);
    return res.status(STATUS.SERVER_ERROR).json({ message: MESSAGES.INTERNAL_ERROR });
  }
};
