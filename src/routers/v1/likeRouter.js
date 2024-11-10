import express from "express";
import { isauthenticated } from "../../middleware/authModdleware.js";
import { createLike, getLikeById } from "../../controllers/likeController.js";

const router = express.Router();

router.get("/:id", isauthenticated, getLikeById);

router.post("/", isauthenticated, createLike);

export default router;
