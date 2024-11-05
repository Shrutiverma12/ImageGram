import express from "express";
import postRouter from "./postRoute.js";
import userRouter from "./userRoute.js";
import commentRouter from "./commentRouter.js";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);

export default router;
