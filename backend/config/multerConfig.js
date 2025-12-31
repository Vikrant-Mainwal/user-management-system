import multer from "multer";
import path from "path";
import { BadRequestError } from "base-error-handler";

/**
 * Configure storage for uploaded profile images
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/Public/UserProfileImages");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

/**
 * Validate uploaded file type
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("Only image files are allowed"), false);
  }
};

/**
 * Multer middleware instance
 */
export const uploadUserProfileImage = multer({
  storage,
  fileFilter,
});
