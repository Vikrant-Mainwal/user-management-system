import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "base-error-handler";

import generateAuthToken from "../utils/jwtHelpers/generateAuthToken.js";
import destroyAuthToken from "../utils/jwtHelpers/destroyAuthToken.js";

import {
  fetchAllUsers,
  blockUserAccount,
  unblockUserAccount,
  updateUserDetails,
} from "../utils/adminHelpers.js";

/* ======================================================
   AUTHENTICATE ADMIN
====================================================== */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    throw new BadRequestError("Invalid email or password");
  }

  generateAuthToken(res, admin._id, admin.email);

  res.status(200).json({
    name: admin.name,
    email: admin.email,
  });
});

/* ======================================================
   REGISTER ADMIN
====================================================== */
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, adminRegistrationKey } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Missing required fields");
  }

  if (!adminRegistrationKey || adminRegistrationKey !== process.env.ADMIN_REGISTRATION_KEY) {
    throw new NotAuthorizedError("Invalid admin registration key");
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new BadRequestError("Admin already exists");
  }

  const admin = await Admin.create({ name, email, password });

  generateAuthToken(res, admin._id, admin.email);

  res.status(201).json({
    name: admin.name,
    email: admin.email,
  });
});

/* ======================================================
   LOGOUT ADMIN
====================================================== */
const logoutAdmin = asyncHandler(async (req, res) => {
  destroyAuthToken(res);
  res.status(200).json({ message: "Admin logged out successfully" });
});

/* ======================================================
   GET ADMIN PROFILE
====================================================== */
const getAdminProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
});

/* ======================================================
   UPDATE ADMIN PROFILE
====================================================== */
const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (!admin) {
    throw new NotFoundError("Admin not found");
  }

  admin.name = req.body.name || admin.name;
  admin.email = req.body.email || admin.email;

  if (req.body.password) {
    admin.password = req.body.password;
  }

  const updatedAdmin = await admin.save();

  res.status(200).json({
    name: updatedAdmin.name,
    email: updatedAdmin.email,
  });
});

/* ======================================================
   USER MANAGEMENT (ADMIN ONLY)
====================================================== */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await fetchAllUsers();
  res.status(200).json({ users });
});

const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const result = await blockUserAccount(userId);

  if (!result.success) {
    throw new BadRequestError(result.message);
  }

  res.status(200).json({ message: result.message });
});

const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const result = await unblockUserAccount(userId);

  if (!result.success) {
    throw new BadRequestError(result.message);
  }

  res.status(200).json({ message: result.message });
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId, name, email } = req.body;

  if (!userId || !name || !email) {
    throw new BadRequestError("Invalid user update request");
  }

  const result = await updateUserDetails({ userId, name, email });

  if (!result.success) {
    throw new BadRequestError("Unable to update user");
  }

  res.status(200).json({ message: result.message });
});

export {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  blockUser,
  unblockUser,
  updateUser,
};
