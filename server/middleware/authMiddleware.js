import ErrorHandler from "../middleware/Error.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLogin = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new ErrorHandler("Token not found..", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return next(new ErrorHandler("Invalid JWT Token", 401));
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new ErrorHandler("User not login", 404));
  }

  req.user = user;
  next();
};
