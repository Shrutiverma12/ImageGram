import express from "express";
import { createPost, getAllPosts } from "../../controllers/postController.js";
import { multerUploads } from "../../config/multerConfig.js";

const router = express.Router();

//After /posts we handle the remaing url
router.post("/", multerUploads, createPost);

router.get("/", getAllPosts);

export default router;
