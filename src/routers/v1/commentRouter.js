import express from "express";
import {
  createComment,
  getCommentById,
} from "../../controllers/commentController.js";
import { isauthenticated } from "../../middleware/authModdleware.js";

const router = express.Router();

router.get("/:id", isauthenticated, getCommentById);

router.post("/", isauthenticated, createComment);

export default router;
