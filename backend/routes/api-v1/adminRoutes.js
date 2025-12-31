import express from "express";
import { requireAuth, validateRequest } from "base-auth-handler";

import verifyAdmin from "../../middlewares/verifyAdminMiddleware.js";

import {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  blockUser,
  unBlockUser,
} from "../../controllers/adminController.js";

import {
  adminSignInDataValidation,
  adminSignUpDataValidation,
  adminUserBlockingDataValidation,
  adminUserUpdateDataValidation,
} from "./backendDataValidationConfig.js";

const router = express.Router();

/* ===================== AUTH ROUTES ===================== */

router.post(
  "/",
  adminSignUpDataValidation,
  validateRequest,
  registerAdmin
);

router.post(
  "/auth",
  adminSignInDataValidation,
  validateRequest,
  authAdmin
);

router.post("/logout", logoutAdmin);

/* ===================== PROFILE ROUTES ===================== */

router
  .route("/profile")
  .get(requireAuth, verifyAdmin, getAdminProfile)
  .put(requireAuth, verifyAdmin, updateAdminProfile);

/* ===================== USER MANAGEMENT ===================== */

router.post(
  "/users",
  requireAuth,
  verifyAdmin,
  getAllUsers
);

router.patch(
  "/users/block",
  requireAuth,
  verifyAdmin,
  adminUserBlockingDataValidation,
  validateRequest,
  blockUser
);

router.patch(
  "/users/unblock",
  requireAuth,
  verifyAdmin,
  adminUserBlockingDataValidation,
  validateRequest,
  unBlockUser
);

router.put(
  "/users/update",
  requireAuth,
  verifyAdmin,
  adminUserUpdateDataValidation,
  validateRequest,
  updateUserData
);

export default router;
