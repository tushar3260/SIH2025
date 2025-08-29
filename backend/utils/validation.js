import { body, param, query } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("name required"),
  body("email").isEmail().withMessage("valid email required"),
  body("password").isLength({ min:6 }).withMessage("password >= 6 chars")
];

export const loginValidation = [
  body("email").isEmail().withMessage("valid email required"),
  body("password").notEmpty().withMessage("password required")
];

export const bookValidation = [
  body("practitionerId").notEmpty().withMessage("practitionerId required"),
  body("therapyId").notEmpty().withMessage("therapyId required"),
  body("start").notEmpty().withMessage("start iso required")
];
