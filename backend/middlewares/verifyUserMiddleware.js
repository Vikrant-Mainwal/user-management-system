import asyncHandler from "express-async-handler";
import { BadRequestError, NotAuthorizedError } from "base-error-handler";
import User from "../models/userModel.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  const { currentUser } = req;

  // Ensure token payload exists
  if (!currentUser || !currentUser.id) {
    throw new NotAuthorizedError("Authentication required");
  }

  // Fetch user from database
  const user = await User.findById(currentUser.id).select("-password");

  if (!user) {
    throw new BadRequestError("User not found");
  }

  // Check if user account is blocked
  if (user.isBlocked()) {
    throw new NotAuthorizedError("User account is blocked");
  }

  // Attach user object to request
  req.user = user;

  next();
});

export default verifyUser;
