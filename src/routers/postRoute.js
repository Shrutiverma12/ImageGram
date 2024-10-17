import express from "express";
import { multerUploader } from "../config/multerConfig.js";
import { createPost } from "../controllers/postController";
const router = express.Router();

router.post("/posts", multerUploader.single("image"), createPost);

router.get("/posts");
