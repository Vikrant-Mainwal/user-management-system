import asyncHandler from "express-async-handler";
import { BadRequestError } from "base-error-handler";
import Admin from "../models/adminModel.js";

const verifyAdmin = asyncHandler(async (req, res, next) => {
  const { currentUser } = req;

  // Ensure JWT payload exists
  if (!currentUser || !currentUser.id) {
    throw new BadRequestError("Invalid authentication token");
  }

  // Find admin using ID from token
  const admin = await Admin.findById(currentUser.id).select("-password");

  if (!admin) {
    throw new BadRequestError("Admin account not found");
  }

  // Attach admin info to request object
  req.user = admin;

  next();
});

export default verifyAdmin;
