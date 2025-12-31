import express from "express";
import { requireAuth, validateRequest } from "base-auth-handler";

import verifyUser from "../../middlewares/verifyUserMiddleware.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../../controllers/userController.js";

import {
  userSignUpDataValidation,
  userSignInDataValidation,
} from "./backendDataValidationConfig.js";

import { uploadUserProfileImage } from "../../config/multerConfig.js";

const router = express.Router();

/* ===================== AUTH ROUTES ===================== */

router.post(
  "/",
  userSignUpDataValidation,
  validateRequest,
  registerUser
);

router.post(
  "/auth",
  userSignInDataValidation,
  validateRequest,
  authUser
);

router.post("/logout", logoutUser);

/* ===================== PROFILE ROUTES ===================== */

router
  .route("/profile")
  .get(requireAuth, verifyUser, getUserProfile)
  .put(
    requireAuth,
    verifyUser,
    uploadUserProfileImage.single("profileImage"),
    updateUserProfile
  );

export default router;
