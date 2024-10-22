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
router.post("/signup", validate(zodSignupSchema), signup);
router.post("/signin", validate(zodSigninSchema), singin);

export default router;
