import { validationResult } from "express-validator";
import { HttpError } from "../utils/helpers.js";

export const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join(", ");
    return next(new HttpError(400, msg));
  }
  next();
};
