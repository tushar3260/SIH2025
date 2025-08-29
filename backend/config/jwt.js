import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
export const JWT_EXPIRES_IN = "7d"; // 7 days
