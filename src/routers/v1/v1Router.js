import express from "express";
import postRouter from "./postRoute.js";
import userRouter from "./userRoute.js";
import commentRouter from "./commentRouter.js";
import likeRouter from "./likeRouter.js";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);

export default router;
