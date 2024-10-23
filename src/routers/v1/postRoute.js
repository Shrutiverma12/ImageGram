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

//After /posts we handle the remaing url
const router = express.Router();
/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: "My First Post"
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 example: "This is the content of my post."
 *
 */
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
