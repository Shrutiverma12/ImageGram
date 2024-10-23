import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../../controllers/postController.js";
import { multerUploads } from "../../config/multerConfig.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAdmin, isauthenticated } from "../../middleware/authModdleware.js";

const router = express.Router();

//After /posts we handle the remaing url
router.post(
  "/",
  isauthenticated,
  multerUploads,
  validate(zodPostSchema),
  createPost
);

router.get("/", getAllPosts);

router.delete("/:id", isauthenticated, deletePost);

router.put("/:id", isauthenticated, isAdmin, multerUploads, updatePost);

export default router;
