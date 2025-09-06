import ErrorHandler from "../middleware/Error.js";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 500));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("Email already existed please login again", 500));
  }

  const user = await User.create({
    name,
    email,
    password
  });

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Registered successfully...",
    user
  });
};
