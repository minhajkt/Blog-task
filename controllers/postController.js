import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
import { MESSAGES, STATUS } from "../utils/constants.js";

export const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title?.trim() || !content?.trim() || !author?.trim()) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const newPost = await Post.create({ title, content, author });
    return res.status(STATUS.CREATED).json({ message: MESSAGES.POST_CREATED, post: newPost });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(STATUS.OK).json({ message: MESSAGES.POSTS_FETCHED, posts });
  } catch (error) {
    console.log("err", error);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.POST_NOT_FOUND });
    }
    return res.status(STATUS.OK).json({ message: MESSAGES.POSTS_FETCHED, post });
  } catch (error) {
    console.log("err", error.message);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_ERROR });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.POST_NOT_FOUND });
    }
    await Comment.deleteMany({ postId });
    return res.status(STATUS.OK).json({ message: MESSAGES.POST_DELETED });
  } catch (error) {
    console.log("err", error.message);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_ERROR });
  }
};
