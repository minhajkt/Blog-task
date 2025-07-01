import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.delete("/:postId", deletePost);

export default router;
