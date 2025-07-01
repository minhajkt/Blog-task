import express from 'express'
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import mongoose from 'mongoose';

const router = express.Router()

router.post('/', async(req, res) => {
    try {
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        throw new Error("All fields are required");
      }

      const newPost = await Post.create({ title, content, author });
      return res
        .status(200)
        .json({ message: "New Post created successfully", newPost });
    } catch (error) {
        console.log('error', error.message)
      return res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/', async(req, res) => {
    try {
        const allPosts = await Post.find()
        if(!allPosts) {
            return res.status(404).json({message : "No posts found"})
        }
        return res.status(200).json({mesage : "Posts found", allPosts})
    } catch (error) {
        console.log('err', error)
        return res.status(500).json({message : "Internal server error"})
    }
})

router.delete('/:postId', async(req, res) => {
    try {
        const {postId} = req.params 
        const selectedPost = await Post.findById(postId)
        if(!selectedPost) {
            return res.status(404).json({message : "Select a post to delete"})
        }
        const updatedData = await Post.findByIdAndDelete(selectedPost)
        return res.status(200).json({message : "Post deleted successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res
        .status(404)
        .json({ message: "PostId required to get the related comments" });
    }
    console.log('post id', postId)
    console.log('looking for commnet')
    const p = new mongoose.ObjectId(postId)
    console.log('p', p)
    const postDetails = await Comment.find({ postId: new mongoose.Types.ObjectId( postId )});
    if (!postDetails) {
      return res
        .status(404)
        .json({ message: "This post doesnt have any comments yet" });
    }
  } catch (error) {
    console.log('err', error.message)
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;