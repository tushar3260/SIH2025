import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../utils/helpers.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) throw new HttpError(401, "Not authorized");
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).lean();
    if (!user) throw new HttpError(401, "User not found");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const permit = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new HttpError(403, "Forbidden"));
  next();
};
