import User from "../models/userModel.js";

/**
 * Retrieve all registered users (limited fields)
 */
const fetchUsersList = async () => {
  try {
    return await User.find({}, { name: 1, email: 1 });
  } catch (err) {
    console.error("Unable to retrieve users:", err);
    throw err;
  }
};

/**
 * Disable a user account
 */
const disableUserAccount = async (userId) => {
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return { success: false, message: "User does not exist." };
    }

    existingUser.blocked = true;
    await existingUser.save();

    return { success: true, message: "User account disabled successfully." };
  } catch (err) {
    console.error("Failed to disable user:", err);
    throw err;
  }
};

/**
 * Enable a previously blocked user
 */
const enableUserAccount = async (userId) => {
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return { success: false, message: "User does not exist." };
    }

    existingUser.blocked = false;
    await existingUser.save();

    return { success: true, message: "User account reactivated successfully." };
  } catch (err) {
    console.error("Failed to activate user:", err);
    throw err;
  }
};

/**
 * Update user profile information
 */
const updateUserProfile = async ({ userId, name, email }) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "User not found." };
    }

    user.name = name;
    user.email = email;

    await user.save();

    return { success: true, message: "Profile updated successfully." };
  } catch (err) {
    console.error("Profile update error:", err);
    throw err;
  }
};

export {
  fetchUsersList,
  disableUserAccount,
  enableUserAccount,
  updateUserProfile,
};
