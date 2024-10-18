import express from "express";
import postRouter from "./postRoute.js";
import userRouter from "./userRoute.js";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);

export default router;
