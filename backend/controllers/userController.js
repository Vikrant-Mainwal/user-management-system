import asyncHandler from "express-async-handler";
import { BadRequestError } from "base-error-handler";
import User from "../models/userModel.js";
import generateAuthToken from "../utils/jwtHelpers/generateAuthToken.js";
import destroyAuthToken from "../utils/jwtHelpers/destroyAuthToken.js";

/* ======================================================
   USER LOGIN
====================================================== */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required.");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new BadRequestError("Invalid email or password.");
  }

  if (user.isBlocked()) {
    throw new BadRequestError("Your account has been blocked.");
  }

  generateAuthToken(res, user._id, user.email);

  res.status(200).json({
    name: user.name,
    email: user.email,
    profileImageName: user.profileImageName,
  });
});

/* ======================================================
   REGISTER USER
====================================================== */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError("User already exists.");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  generateAuthToken(res, newUser._id, newUser.email);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
});

/* ======================================================
   LOGOUT USER
====================================================== */
const logoutUser = asyncHandler(async (req, res) => {
  destroyAuthToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

/* ======================================================
   GET USER PROFILE
====================================================== */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    name: user.name,
    email: user.email,
    profileImageName: user.profileImageName,
  });
});

/* ======================================================
   UPDATE USER PROFILE
====================================================== */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new BadRequestError("User not found.");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  if (req.file) {
    user.profileImageName = req.file.filename;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    name: updatedUser.name,
    email: updatedUser.email,
    profileImageName: updatedUser.profileImageName,
  });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
