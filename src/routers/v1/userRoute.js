import express from "express";
import {
  getProfile,
  signup,
  singin,
} from "../../controllers/userController.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";

const router = express.Router();

router.get("/profile", getProfile);
/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 *
 */
router.post("/signup", validate(zodSignupSchema), signup);
/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 *
 */
router.post("/signin", validate(zodSigninSchema), singin);

export default router;
