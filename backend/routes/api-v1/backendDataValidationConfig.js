import { body } from "express-validator";

/* ===================== USER VALIDATIONS ===================== */

const userRegisterValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty."),
];

const userLoginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required."),
];

/* ===================== ADMIN VALIDATIONS ===================== */

const adminRegisterValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Admin name is required."),

  body("email")
    .isEmail()
    .withMessage("A valid email address is required."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required."),

  body("adminRegistrationKey")
    .trim()
    .notEmpty()
    .withMessage("Admin registration key is required."),
];

const adminLoginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required."),
];

const adminUserActionValidation = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required."),
];

const adminUserUpdateValidation = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required."),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty."),

  body("email")
    .isEmail()
    .withMessage("Invalid email format."),
];

export {
  userRegisterValidation,
  userLoginValidation,
  adminRegisterValidation,
  adminLoginValidation,
  adminUserActionValidation,
  adminUserUpdateValidation,
};
