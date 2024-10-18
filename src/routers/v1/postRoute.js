import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../../controllers/postController.js";
import { multerUploads } from "../../config/multerConfig.js";

const router = express.Router();

//After /posts we handle the remaing url
router.post("/", multerUploads, createPost);

router.get("/", getAllPosts);

router.delete("/:id", deletePost);

export default router;
