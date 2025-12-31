import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    blocked: {
      type: Boolean,
      default: false,
    },

    profileImageName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving if modified
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Compare provided password with stored hash
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Check if user account is blocked
 */
userSchema.methods.isBlocked = function () {
  return this.blocked === true;
};

const User = mongoose.model("User", userSchema);

export default User;
